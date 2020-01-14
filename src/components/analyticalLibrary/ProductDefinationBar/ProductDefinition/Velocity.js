//Component to render velocity and efficienty reports

import React, { Component } from "react";
import Grid from "../../Grid-Layout/Grid";
import ControlChartHigh from "../../Charts/ControlChartHigh/ControlChartHigh";
import { chartDataDispatch } from "../../../../store/actions/chartData";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import throuput from "../../../../content/img/throuput.png";
import depChange from "../../../../content/img/DepChange.png";
import degreeTest from "../../../../content/img/degreeTest.png";
import VelocityTrend from "../../Charts/VelocityTrends/VelocityTrend";
import Spinner from "../../Spinner/Spinner";
import BreakDownHigh from "../../Charts/ProjectBreakDown/ProjectBreakDown";

var initialData = [
  {
    name: "dcp",
    type: "BreakDownHigh",
    data: "BreakDownHigh",
    title: BreakDownHigh,
    component: {}
  },
  {
    name: "dtra",
    type: "img",
    data: "Deployment/Change Frequency",
    title: degreeTest,
    component: {}
  }
];

class Velocity extends Component {
  state = {
    charts: [],
    layout: {
      lg: [
        { i: "0", x: 0, y: 0, w: 4, h: 2, isResizable: false },
        { i: "1", x: 4, y: 0, w: 4, h: 2, isResizable: false },
        { i: "2", x: 8, y: 0, w: 4, h: 2, isResizable: false },
        { i: "3", x: 0, y: 2, w: 6, h: 2, isResizable: false },
        { i: "4", x: 6, y: 2, w: 6, h: 2, isResizable: false }
      ],
      md: [
        { i: "0", x: 0, y: 0, w: 5, h: 2, isResizable: false },
        { i: "1", x: 5, y: 0, w: 5, h: 2, isResizable: false },
        { i: "2", x: 0, y: 2, w: 4, h: 2, isResizable: false },
        { i: "3", x: 4, y: 2, w: 3, h: 2, isResizable: false },
        { i: "4", x: 7, y: 2, w: 3, h: 2, isResizable: false }
      ]
    },
    gridCol: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
    gridBreakpoints: { lg: 1200, md: 768, sm: 576, xs: 480, xxs: 0 },
    show: true
  };

  //function to remove a chart component from the grid layout

  removeChartComponent = chartIndex => {
    const charts = [...this.state.charts];
    this.createCharts(charts, chartIndex);
    const layouts = {};

    Object.keys(this.state.layout).map(key => {
      const copy = [...this.state.layout[key]];
      copy.splice(chartIndex, 1);
      const indexUpdate = copy.map((ele, index) => {
        return {
          ...ele,
          i: index.toString()
        };
      });
      layouts[key] = indexUpdate;
    });

    this.setState({
      layout: layouts
    });
  };

  //function that create charts based on the data from services

  createCharts = (list, removed) => {
    let updatedList = list.filter((ele, index) => {
      if (index !== removed) return Object.assign({}, ele);
    });
    updatedList = initialData.concat(updatedList);
    updatedList.map(ele => {
      ele.component = this.setChart(ele.type, ele.title, ele.data);
    });
    this.setState({
      charts: updatedList
    });
  };

  //function that identifies the chart to render based on type during createCharts() execution

  setChart = (type, title, data) => {
    switch (type) {
      case "VelocityTrends":
        return <VelocityTrend title={title} type={type} data={data} />;
      case "ControlChartHigh":
        return <ControlChartHigh title={title} type={type} data={data} />;
      case "BreakDownHigh":
        return <BreakDownHigh title={title} type={type} data={data} />;

      default:
        return "";
    }
  };

  // function that create the chart object to paint the chart

  createChartObject = rawData => {
    const processedData = rawData.map(ele => {
      return {
        name: ele.name,
        type:
          ele.name === "Velocity Trends"
            ? "VelocityTrends"
            : "ControlChartHigh",
        data:
          ele.name === "Velocity Trends"
            ? ele.velocityTrends.metrics
            : ele.metrics,
        title: ele.name,
        component: {}
      };
    });
    return processedData;
  };

  //compare the current props and incoming props

  componentWillReceiveProps(nextProps) {
    if (
      this.props.sprintId !== nextProps.sprintId &&
      nextProps.projId &&
      nextProps.sprintId
    ) {
      this.setState({
        all_data: true
      });
    }
  }

  componentDidMount() {
    if (this.props.projId && this.props.sprintId) {
      this.setState({
        all_data: true
      });
    }
  }

  componentDidUpdate() {
    if (this.state.all_data) {
      this.fetchChartsData();
    }
  }

  //function to fetch charts data

  fetchChartsData = () => {
    this.setState({
      all_data: false,
      charts: []
    });
    this.props
      .chartDataDispatch(
        this.props.currentExecId,
        this.props.projId,
        this.props.sprintId
      )
      .then(res => {
        this.createCharts(this.createChartObject(this.props.velocityCharts));
        this.setState({
          response: this.props.velocityCharts,
          received: true,
          show: false
        });
      });
  };

  render() {
    if (this.state.show) {
      return <Spinner show="true" />;
    } else {
      return (
        <React.Fragment>
          {this.state.charts.length > 0 ? (
            <Grid
              chartData={this.state.charts}
              layouts={this.state.layout}
              removeDelegate={this.removeChartComponent}
              breakpoint={this.state.gridBreakpoints}
              columnSize={this.state.gridCol}
            />
          ) : null}
        </React.Fragment>
      );
    }
  }
}

//function to map the state received from reducer

const mapStateToProps = state => {
  return {
    currentExecId: state.execData.executiveId,
    velocityCharts: state.chartData.currentChartData.chartDetails,
    projId: state.productDetails.currentProject.projectDetails.id,
    sprintId: state.productDetails.currentSprint.sprintInfo.id
  };
};

//function to dispatch action to the reducer

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ chartDataDispatch }, dispatch);
};

//Connect react component to redux

export default connect(mapStateToProps, mapDispatchToProps)(Velocity);
