import React, { Component } from "react";
import Grid from "../../Grid-Layout/Grid";
import ControlChartHigh from "../../Charts/ControlChartHigh/ControlChartHigh";
import ColumnHigh from "../../Charts/ColumnHigh/ColumnHigh";
import { chartDataDispatch } from "../../../store/Actions/index";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import throuput from "../../../content/img/throuput.png";
import depChange from "../../../content/img/DepChange.png";
import degreeTest from "../../../content/img/degreeTest.png";

import api from "../../../utility/apis/devOpsApis";
var rct = {},
  dlt = {};

var initialData = [
  {
    name: "tp",
    type: "img",
    data: {},
    title: throuput,
    component: {}
  },
  {
    name: "dcp",
    type: "img",
    data: {},
    title: depChange,
    component: {}
  },
  {
    name: "dtra",
    type: "img",
    data: {},
    title: degreeTest,
    component: {}
  }
];

class Velocity extends Component {
  state = {
    charts: [],
    layout: {
      lg: [
        { i: "0", x: 0, y: 0, w: 6, h: 2, isResizable: false },
        { i: "1", x: 6, y: 0, w: 6, h: 2, isResizable: false },
        { i: "2", x: 0, y: 2, w: 4, h: 2, isResizable: false },
        { i: "3", x: 4, y: 2, w: 4, h: 2, isResizable: false },
        { i: "4", x: 8, y: 2, w: 4, h: 2, isResizable: false }
      ],
      md: [
        { i: "0", x: 0, y: 0, w: 5, h: 2, isResizable: false },
        { i: "1", x: 5, y: 0, w: 5, h: 2, isResizable: false },
        { i: "2", x: 0, y: 2, w: 4, h: 2, isResizable: false },
        { i: "3", x: 4, y: 2, w: 3, h: 2, isResizable: false },
        { i: "4", x: 7, y: 2, w: 3, h: 2, isResizable: false }
      ]
    },
    graphCount: 6,
    currentBreakpoint: "lg",
    currentColCount: 0,
    gridCol: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
    gridBreakpoints: { lg: 1200, md: 768, sm: 576, xs: 480, xxs: 0 },
    response: {},
    received: false
  };

  removeChartComponent = chartIndex => {
    const charts = [...this.state.charts];
    this.createCharts(charts, chartIndex);
    //charts.splice(chartIndex, 1);
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

  createCharts = (list, removed) => {
    let updatedList = list.filter((ele, index) => {
      if (index !== removed) return Object.assign({}, ele);
    });
    updatedList = updatedList.concat(initialData);
    updatedList.map(ele => {
      ele.component = this.setChart(ele.type, ele.title, ele.data);
    });
    this.setState({
      charts: updatedList
    });
  };

  setChart = (type, title, data) => {
    switch (type) {
      case "ControlChartHigh":
        return <ControlChartHigh title={title} type={type} data={data} />;
      case "ColumnHigh":
        return <ColumnHigh title={title} type={type} data={data} />;
      case "img":
        return (
          <img src={title} className="h-100 w-100 border-radius-10" alt="img" />
        );
      default:
        return "";
    }
  };

  createChartObject = rawData => {
    const processedData = rawData.map(ele => {
      return {
        name: ele.name,
        type: "ControlChartHigh",
        data: ele.metrics,
        title: ele.name,
        component: {}
      };
    });
    return processedData;
  };

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
          received: true
        });
      });
  };

  render() {
    if (this.state.all_data) {
      this.fetchChartsData();
    }

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

const mapStateToProps = state => {
  return {
    currentExecId: state.execData.executiveId,
    velocityCharts: state.chartData.currentChartData.chartDetails,
    chartDataReceived: state.chartData.currentChartData.chartDataReceived,
    projId: state.productDetails.currentProject.projectDetails.id,
    projectRecieved: state.productDetails.currentProject.projectDataReceived,
    sprintId: state.productDetails.currentSprint.sprintInfo.id,
    sprintDataReceived: state.productDetails.currentSprint.sprintReceived
  };
};
const mapDispatchToProps = dispatch => {
  return bindActionCreators({ chartDataDispatch }, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(Velocity);
