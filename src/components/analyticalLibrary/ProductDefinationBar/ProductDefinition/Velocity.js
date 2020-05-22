//Component to render velocity and efficienty reports

import React, { Component } from "react";
import Grid from "../../Grid-Layout/Grid";
import ControlChartHigh from "../../Charts/ControlChartHigh/ControlChartHigh";
import { chartDataDispatch, velocityProjectDataDispatch } from "../../../../store/actions/chartData";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faSquare
} from "@fortawesome/free-solid-svg-icons";
import VelocityTrend from "../../Charts/VelocityTrends/VelocityTrend";
import SprintBurndown from "../../Charts/SprintBurnDown/SprintBurnDown";
import Spinner from "../../Spinner/Spinner";
import BreakDownHigh from "../../Charts/ProjectBreakDown/ProjectBreakDown";
import { translations } from "../../Translations/Translations";
import Layout from "../../../../utility/layoutManager/layoutManager";
import { Row, Col, Button } from "react-bootstrap";
import Dropdown from "../../Dropdown/Dropdown";
import VelocityBuild from './VelocityBuild';

class Velocity extends Component {
  state = {
    charts: [],
    showbutton: true,
    layout: {
      lg: [],
      md: []
    },
    gridCol: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
    // dropData: [{ id: "all_time", name: "All Time" }, { id: "last_1_month", name: "Last Month" }, { id: "last_3_month", name: "Last 3 Months" }],
    gridBreakpoints: { lg: 1200, md: 768, sm: 576, xs: 480, xxs: 0 },
    show: true,
    selectedRepo: "",
    codeActive: true,
    buildActive: false,
    repoData: []
  };

  //function to remove a chart component from the grid layout

  removeChartComponent = chartIndex => {
    const charts = [...this.state.charts];
    this.createCharts(charts, chartIndex);
    const layouts = {};

    Object.keys(this.state.layout).map(key => {
      let copy = [...this.state.layout[key]];
      if (key === "lg") {
        let layout_instance = new Layout(copy.length - 1);
        copy = layout_instance.layout.lg;
      } else if (key === "md") {
        let layout_instance = new Layout(copy.length - 1);
        copy = layout_instance.layout.md;
      }
      layouts[key] = copy;
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
        return (
          <VelocityTrend title={title} type={type} data={data} key={title} />
        );
      case "ControlChartHigh":
        return (
          <ControlChartHigh
            title={title}
            type={type}
            data={data}
            key={title}
            projID={this.props.projId}
            organization={this.props.organization}
          />
        );
      case "ProjectBurnDown":
        return (
          <BreakDownHigh title={title} type={type} data={data} key={title} />
        );
      case "SprintBurndown":
        return (
          <SprintBurndown title={title} type={type} data={data} key={title} />
        );
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
    });
  }

  componentDidUpdate() {
    if (this.state.all_data) {
      this.fetchChartsData();
      this.setDefaultData();
    }
  }

  setDefaultData() {
    // let type;
    this.props
      .velocityProjectDataDispatch(this.props.projId)
      .then(item => {
        if (this.props.velocityProjectData.jobDetailDtoList.length > 0) {
          this.setRepository(this.props.velocityProjectData);

          this.setState({
            show: false
          });
          // if (this.state.selectedRepo === "") {
          //   type = this.setRawObjects(this.props.velocityProjectData);
          //   this.createCharts(this.createChartObject(type));
          // }
        }
        else {
          this.props.resetProjectRepoDispatch(
            // this.props.securityProjectData.projects
          );
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  markSelected = (prodList, id) => {
    const resetList = this.resetSelect(prodList);
    let selectedIndex = 0;
    const selectedParamList = resetList.map((ele, index) => {
      if (ele.projId === id) {
        selectedIndex = index;
        return ele;
      }
      return ele;
    });
    return {
      list: selectedParamList,
      selectedIndex: selectedIndex
    };
  };

  resetSelect = prodList => {
    const defaultList = prodList.map(ele => {
      return ele;
    });
    return defaultList;
  };

  setRepository = res => {
    const repositoryData = res.jobDetailDtoList;
    if (repositoryData !== null) {
      const { list } = this.markSelected(
        repositoryData,
        repositoryData[0].jobId
      );
      const repoDetails = list.map(ele => {
        return {
          id: ele.jobId,
          projectName: ele.jobName
        };
      });

      // repoDetails.unshift({id: "selectProject", projectName: "select Project"});
      this.setState({
        repoData: repoDetails,
        selectedRepo: ""
      });

      // this.props.repoDropValDispatchSecurity("");
    }
  };

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
        this.props.sprintId,
        this.props.teamId
      )
      .then(res => {
        this.createCharts(
          this.createChartObject(this.props.velocityCharts.details)
        );
        let layout_instance = new Layout(5);
        this.setState({
          layout: layout_instance.layout
        });
        this.setState({
          response: this.props.velocityCharts,
          received: true,
          show: false
        });
      });
  };

  handleRepoChange = repoID => {

  };

  setCode = () => {
    this.setState({
      buildActive: false,
      codeActive: true
    });
  }

  setBuild = () => {
      this.setState({
        buildActive: true,
        codeActive: false
      });
  }


  render() {
    if (this.state.show) {
      return <Spinner show="true" />;
    } else {
      return (
        <React.Fragment>
          <Row className="p-0 px-3 m-0 mt-4 mb-3 d-flex justify-content-start">

          <Col md={2}>
              <Dropdown
                listData={this.state.repoData}
                direction="down"
                onSelectDelegate={this.handleRepoChange}
              >
                <Row className="h-100 bg-prodAgg-btn repo-height m-0 p-0 rounded">
                  <Col
                    sm={10}
                    md={10}
                    lg={10}
                    xl={10}
                    className="d-flex align-item-center justify-content-center"
                  >
                    <p className="font-aggegate-sub-text text-ellipsis font-weight-bold text-white m-auto text-left text-lg-left text-md-left text-sm-left text-xl-center">
                      {this.state.selectedRepo
                        ? this.state.selectedRepo
                        : "Select Project"}
                    </p>
                  </Col>
                  <Col
                    sm={2}
                    md={2}
                    g={2}
                    xl={2}
                    className="font-aggegate-sub-text p-0 text-white d-flex align-items-center"
                  >
                    <FontAwesomeIcon icon={faChevronDown} />
                  </Col>
                </Row>
              </Dropdown>
            </Col>

            <Col md={8}>
              <span>
                {this.state.showbutton ? (
                  <Button variant="outline-dark" className={this.state.codeActive ? "bgblue" : "Alertbg"} onClick={this.setCode}>Code</Button>
                  //  <button className="bg-prodAgg-btn" style={{ color: '#FFFFFF', background: '#1D2632', border: '#364D68', minWidth: '6rem' }} onClick ={this.setAlert} >Alert</button>
                ) : null}
              </span>

              <span className="ml-3">
                {this.state.showbutton ? (
                  <Button variant="outline-dark" className={this.state.buildActive ? "bgblue" : "Alertbg"} onClick={this.setBuild}>Build</Button>
                  //  <button className="bg-prodAgg-btn" style={{ color: '#FFFFFF', paddingLeft: '5px', background: '#1D2632', border: '#364D68', minWidth: '6rem' }} onClick ={this.setPolicy} >Policy</button>
                ) : null}
              </span>
            </Col>
            {/* {this.state.buildActive ? ( */}
            
          {/* ) : null} */}

          </Row>
          {this.state.charts.length > 0 ? (
            <Grid
              chartData={this.state.charts}
              layouts={this.state.layout}
              removeDelegate={this.removeChartComponent}
              breakpoint={this.state.gridBreakpoints}
              columnSize={this.state.gridCol}
            />
          ) : null} */}

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
    sprintId: state.productDetails.currentSprint.sprintInfo.id,
    teamId: state.productDetails.currentSprint.teamId,
    velocityProjectData: state.chartData.velocityProjectDetails,
    organization: state.productDetails.currentProject.projectDetails.organization
  };
};

//function to dispatch action to the reducer

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ chartDataDispatch, velocityProjectDataDispatch }, dispatch);
};

//Connect react component to redux

export default connect(mapStateToProps, mapDispatchToProps)(Velocity);
