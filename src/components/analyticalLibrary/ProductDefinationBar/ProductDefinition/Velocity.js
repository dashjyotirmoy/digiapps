//Component to render velocity and efficienty reports

import React, { Component } from "react";
import Grid from "../../Grid-Layout/Grid";
import ControlChartHigh from "../../Charts/ControlChartHigh/ControlChartHigh";
import { chartDataDispatch } from "../../../../store/actions/chartData";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import VelocityTrend from "../../Charts/VelocityTrends/VelocityTrend";
import SprintBurndown from "../../Charts/SprintBurnDown/SprintBurnDown";
import Spinner from "../../Spinner/Spinner";
import BreakDownHigh from "../../Charts/ProjectBreakDown/ProjectBreakDown";
import { translations } from "../../Translations/Translations";
import Layout from "../../../../utility/layoutManager/layoutManager";

class Velocity extends Component {
  state = {
    charts: [],
    layout : {
      lg: [],
      md:[]
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
      let copy = [...this.state.layout[key]];
      if(key === "lg"){
        let layout_instance = new Layout(copy.length - 1);
        copy = layout_instance.layout.lg
      }
      else if(key === "md"){
        let layout_instance = new Layout(copy.length - 1);
        copy = layout_instance.layout.md
      }
      layouts[key] = copy
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

    updatedList.map(ele => {
      ele.component = this.setChart(
        ele.type,
        translations[ele.title.toLowerCase()] || ele.title,
        ele.data
      );
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
      case "ProjectBurnDown":
        return <BreakDownHigh title={title} type={type} data={data} />;
      case "SprintBurndown":
        return <SprintBurndown title={title} type={type} data={data} />;
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
          ele.name === "Velocity Trend"
            ? "VelocityTrends"
            : ele.name === "Project Burndown"
            ? "ProjectBurnDown"
            : ele.name === "Sprint Burndown"
            ? "SprintBurndown"
            : "ControlChartHigh",
        data:
          ele.name === "Velocity Trend" ||
          ele.name === "Sprint Burndown" ||
          ele.name === "Project Burndown"
            ? ele
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
    let layout_instance = new Layout(5);
    this.setState({
      layout: layout_instance.layout
    })
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
        this.createCharts(
          this.createChartObject(this.props.velocityCharts.details)
        );
        let layout_instance = new Layout(5);
            this.setState({
              layout: layout_instance.layout
            })
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
