import React, { Component } from "react";
import { Row, Container, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import Dropdown from "../Dropdown/Dropdown";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import classnames from "classnames";
import { projInsightDispatch } from "../../../store/actions/projectInsights";
import { sprintInsightsDispatch } from "../../../store/actions/sprintInsights";
import api from "../../../utility/Http/devOpsApis";
import prodAggEnabled from "../../../content/img/prodAggButton.svg";
import prodAggDisabled from "../../../content/img/prodAggButtonDisabbled.svg";
import { translations } from "../Translations/";
import { TooltipHoc } from "../TooltiHOC/TooltipHoc";
import { isQuality } from "../../../utility/classUtility/classUtil";
import Widgets from "../../dashboardController/widgetParser";

import { qualityDataDispatch } from "../../../store/actions/qualityData";
import Spinner from "../../analyticalLibrary/Spinner/Spinner";
import { execInsightsDispatch } from "../../../store/actions/executiveInsights";

let productMetrics;
class ProductInfoBar extends Component {
  state = {
    productData: [],
    sprintData: [],
    selectedProduct: "",
    selectedSprint: "",
    response: {},
    recieved: false,
    prodAggView: false,
    repoData: [],
    selectedRepo: "",
    show: true
  };

  //axios call to fetch executive data

  componentDidMount() {
    this.props.execInsightsDispatch(this.props.executiveId);
    api
      .getExecInsightsData(this.props.executiveId)
      .then(this.setProject)
      .catch(error => {
        console.error(error);
      });
  }

  //Handling project Data starts
  //function to set project details

  setProject = res => {
    const projects = res.data.projects;
    const projLength = projects.length;
    const { list, selectedIndex } = this.markSelected(projects, projects[0].id);
    const prrojDetail = list.filter(ele => {
      if (ele.id === "fa2a71e3-1469-4240-9f8b-5694a98145cf") {
        return {
          id: ele.id,
          projectName: ele.projectName
        };
      }
    });
    this.setState({
      productData: prrojDetail,
      selectedProduct: prrojDetail[selectedIndex].projectName
    });

    this.getProjectDetails(projects[selectedIndex].id, this.props.executiveId);
  };

  //function to update project details when project dropdown values are changed

  updateProject = projectId => {
    const projects = [...this.state.productData];
    const { list, selectedIndex } = this.markSelected(projects, projectId);
    const prrojDetail = list.filter(ele => {
      if (ele.id === "fa2a71e3-1469-4240-9f8b-5694a98145cf") {
        return {
          id: ele.id,
          projectName: ele.projectName
        };
      }
    });
    this.setState({
      productData: prrojDetail,
      selectedProduct: prrojDetail[selectedIndex].projectName
    });
    this.getProjectDetails(projects[selectedIndex].id, this.props.executiveId);
  };

  //axios call to fetch project details

  getProjectDetails = (projectID, executiveId) => {
    this.props.projInsightDispatch(projectID, executiveId);
    api
      .getProjectInsightsData(projectID, executiveId)
      .then(this.setSprint)
      .catch(error => {
        console.error(error);
      });
  };

  // Handling project Data ends

  //Handling Sprint Data starts
  // axios call to fetch sprint details

  getSprintData = (sprintId, selectedProjectId) => {
    this.props.sprintInsightsDispatch(
      sprintId,
      this.props.executiveId,
      this.props.projectID
    );
  };

  //method to set current sprint value and set sprint details

  setSprint = res => {
    let sprints = res.data.sprintDetails;

    const stateFromProjects = sprints.filter(item => {
      if (item.state === "CURRENT") {
        return item.id;
      }
    });
    const sprintData = this.markSelected(sprints, stateFromProjects[0].id);
    const sprintDetails = sprintData.list.map(ele => {
      return {
        id: ele.id,
        projectName: ele.name
      };
    });
    // this.getQualityData(
    //   this.props.executiveId,
    //   sprintDetails[sprintData.selectedIndex].id
    // );

    productMetrics = this.setProductMetrics(
      res.data.sprintCount,
      res.data.cpi,
      res.data.spi
    );
    this.getSprintData(
      sprintDetails[sprintData.selectedIndex].id,
      this.props.executiveId
    );
    this.setState({
      sprintData: sprintDetails,
      selectedSprint: sprintDetails[sprintData.selectedIndex].projectName,
      show: false
    });
  };

  setProductMetrics(data, cpi, spi) {
    const metrics = [
      { name: "Head Count", value: this.props.metricsData.totalMembers },
      { name: "SPI", value: parseFloat(spi).toFixed(2) },
      { name: "CPI", value: parseFloat(cpi).toFixed(2) },
      { name: "Sprint Count", value: `${data.completed} / ${data.total}` }
    ];
    return metrics;
  }
  //method to update sprint details

  updateSprint = sprintId => {
    const { list, selectedIndex } = this.markSelected(
      this.state.sprintData,
      sprintId
    );
    this.setState({
      sprintData: list,
      selectedSprint: list[selectedIndex].projectName
    });
    this.getSprintData(sprintId, this.props.executiveId);
  };

  // Handling sprint Data ends

  //Handling repository Data starts
  // Axios call to fetch repository  data from quality metrics

  getQualityData = () => {
    const qualityData = api.getQualityMetricsData(
      this.props.executiveId,
      this.props.projectID
    );
    qualityData.then(this.setRepository).catch(error => {
      console.error(error);
    });
  };

  //set the repository dropdown

  setRepository = res => {
    const repositoryData = res.data.repositories;
    if (repositoryData !== null) {
      const { list, selectedIndex } = this.markSelected(
        repositoryData,
        repositoryData[0].repoKey
      );
      const repoDetails = list.map(ele => {
        return {
          id: ele.repoKey,
          projectName: ele.repoName
        };
      });

      // const metricValues = this.splitMetricValues(repoDetails);
      this.setState({
        repoData: repoDetails,
        selectedRepo: repoDetails[selectedIndex].projectName
      });
    } else {
      this.setState({
        repoData: [],
        selectedRepo: ""
      });
    }
  };

  //Handling repository data ends

  //Handlers for reset and selecting starts
  //function to reset selected values
  resetSelect = prodList => {
    const defaultList = prodList.map(ele => {
      ele.selected = false;
      return ele;
    });
    return defaultList;
  };

  markSelected = (prodList, id) => {
    const resetList = this.resetSelect(prodList);
    let selectedIndex = 0;
    const selectedParamList = resetList.map((ele, index) => {
      if (ele.id === id) {
        selectedIndex = index;
        ele.selected = true;
        return ele;
      }
      return ele;
    });
    return {
      list: selectedParamList,
      selectedIndex: selectedIndex
    };
  };

  // handler for reset and selecting ends

  //handler function when project dropdown is changed

  prodOnSelectHandler = (prodId, evtKey) => {
    this.updateProject(prodId);
  };

  //handler function when sprint dropdown is changed

  sprintOnSelectHandler = (sprintId, evtKey) => {
    this.updateSprint(sprintId);
  };

  //handler function when the repository is changed

  handleRepoChange = repoID => {
    this.updateRepository(repoID);
  };

  onProdAggViewClickHandler = () => {
    this.setState(prevState => {
      return {
        prodAggView: !prevState.prodAggView
      };
    });
  };

  render() {
    let dimensionData = this.props.widgetProps;

    const projectDimensions = new Widgets();
    const Components = projectDimensions.loadDimensions(dimensionData);
    const LineHigh = Components["LineHigh"];
    const prodAggViewIcon = this.state.prodAggView
      ? prodAggEnabled
      : prodAggDisabled;
    const qualityView = isQuality(this.props.selectedTab);
    const Donut = Components["Donut"];
    if (this.state.show) {
      return <Spinner show={this.state.show} />;
    } else {
      return (
        <div className="h-10 summary-view">
          <Container
            fluid
            className="h-100 border-bottom border-dark border-top"
          >
            <Row className="h-100  p-0 m-0">
              <Col
                xl={1}
                lg={1}
                md={2}
                className="d-flex justify-content-center align-items-center p-0"
              >
                <div className="w-100">
                  <p className=" m-0 text-center text-white m-0 font-title">
                    {this.props.execDataReceived
                      ? this.props.projectList.name.split(" ")[0]
                      : ""}
                  </p>
                  <p className="font-aggegate-sub-text m-0 text-center text-white-50 m-0 width-fit-content">
                    {this.props.execDataReceived
                      ? this.props.projectList.designation
                      : ""}
                  </p>
                </div>
              </Col>
              <Col className="h-100 pl-0" sm={12} md={5} lg={4} xl={5}>
                <Row className="h-100">
                  <Col
                    sm={2}
                    md={2}
                    className="prodAgg p-0 col-lg-1_5 col-xl-1_5"
                  >
                    <Row className="h-100">
                      <TooltipHoc
                        info={
                          this.state.prodAggView
                            ? translations.prodAggViewEnable
                            : translations.prodAggViewDisable
                        }
                      >
                        <Col
                          onClick={this.onProdAggViewClickHandler}
                          md={12}
                          className="m-auto d-flex justify-content-center show-cursor"
                        >
                          <img src={prodAggViewIcon} />
                        </Col>
                      </TooltipHoc>
                    </Row>
                  </Col>
                  <Col
                    sm={6}
                    md={6}
                    lg={6}
                    xl={6}
                    className="h-100 bg-prodInfo-prod justify-content-center d-flex align-items-center"
                  >
                    {this.props.projectListReceived ? (
                      <Dropdown
                        listData={this.state.productData}
                        direction="down"
                        onSelectDelegate={this.prodOnSelectHandler}
                      >
                        <Row className="h-100">
                          <Col sm={10} md={10} lg={10} xl={10}>
                            <p className="font-aggegate-sub-text text-ellipsis font-weight-bold text-white m-auto text-left text-lg-left text-md-left text-sm-left text-xl-center">
                              {this.state.selectedProduct}
                            </p>
                          </Col>
                          <Col
                            sm={2}
                            md={2}
                            md={2}
                            lg={2}
                            xl={2}
                            className="font-aggegate-sub-text p-0 text-white d-flex align-items-center"
                          >
                            <FontAwesomeIcon icon={faChevronDown} />
                          </Col>
                        </Row>
                      </Dropdown>
                    ) : null}
                  </Col>
                  <Col
                    sm={4}
                    md={4}
                    lg={4}
                    xl={4}
                    className="border-right border-dark p-0 h-100"
                  >
                    <Row className="h-100 p-0 m-0 align-items-center col-md-12 d-flex justify-content-center">
                      <Dropdown
                        listData={this.state.sprintData}
                        direction="down"
                        onSelectDelegate={this.sprintOnSelectHandler}
                      >
                        <Row className="h-100 m-0 p-0">
                          <Col sm={10} md={10} lg={10} xl={10}>
                            <p className="font-aggegate-sub-text text-ellipsis font-weight-bold text-white m-auto text-left text-lg-left text-md-left text-sm-left text-xl-center">
                              {this.state.selectedSprint}
                            </p>
                          </Col>
                          <Col
                            sm={2}
                            md={2}
                            lg={2}
                            xl={2}
                            className="font-aggegate-sub-text p-0 text-white d-flex align-items-center"
                          >
                            <FontAwesomeIcon icon={faChevronDown} />
                          </Col>
                        </Row>
                      </Dropdown>
                    </Row>
                  </Col>
                  {/* <Col sm={2} className={classnames(
                      "border-right",
                      "border-dark",
                      "p-0",
                      "h-100",
                      { "d-none": !qualityView },
                      { "col-xl-2_5 col-lg-2_5 col-md-2_5": qualityView }
                    )}
                  >
                    <Row className="h-100 p-0 m-0 align-items-center col-md-12 d-flex justify-content-center">
                      <Dropdown
                        listData={this.state.repoData}
                        direction="down"
                        onSelectDelegate={this.handleRepoChange}
                      >
                        <Row className="h-100 m-0 p-0">
                          <Col sm={10} md={10} lg={10} xl={10}>
                            <p className="font-aggegate-sub-text text-ellipsis font-weight-bold text-white m-auto text-left text-lg-left text-md-left text-sm-left text-xl-center">
                              {this.state.selectedRepo}
                            </p>
                          </Col>
                          <Col
                            sm={2}
                            md={2}
                            md={2}
                            lg={2}
                            xl={2}
                            className="font-aggegate-sub-text p-0 text-white d-flex align-items-center"
                          >
                            <FontAwesomeIcon icon={faChevronDown} />
                          </Col>
                        </Row>
                      </Dropdown>
                    </Row>
                  </Col> */}
                </Row>
              </Col>
              <Col sm={12} md={5} lg={7} xl={6} className="h-100">
                <Row className="h-100">
                  <Col md={7} xl={8} lg={8} className="h-100">
                    <Row className="p-0 m-0 h-100 w-100 border-right border-dark ">
                    <Row className="px-4 h-100 w-100 d-flex align-items-center justify-content-between ">
                        {productMetrics.map(item => {
                          return (
                            <div
                              key={item.value}
                              className="d-flex d-inline-block 
                        flex-column h-100 justify-content-center max-w-18 px-1 
                        py-0  w-auto "
                            >
                              <p className="font-metric-main-text m-0 text-left text-black m-0">
                                <span className="text-white">
                                  {item.value}{" "}
                                </span>
                              </p>
                              <p className="font-metric-sub-text m-0 text-left text-white-50 m-0">
                                {item.name}
                              </p>
                            </div>
                          );
                        })}
                      </Row>
                    </Row>
                  </Col>
                  <Col
                    lg={4}
                    xl={4}
                    md={5}
                    className="d-md-block p-0 d-lg-block d-xl-block d-sm-none"
                  >
                    <Row className="p-0 m-0 w-100 d-flex align-items-center h-100">
                      <Col
                        md={5}
                        className="align-items-center d-flex h-100 p-0 border-right border-dark"
                      >
                        <Row className="p-0 m-0 w-100 h-100 ">
                          <Col md={5} className="p-0">
                            {this.props.projectRecieved ? (
                              <Donut
                                color={"#7a61ff"}
                                percentage={this.props.projDetails.features}
                              ></Donut>
                            ) : (
                              "loading"
                            )}
                          </Col>
                          <Col
                            md={7}
                            className="p-0 d-flex align-items-center justify-content-center"
                          >
                            <div
                              id="feature-info"
                              className="d-inline-block text-white"
                            >
                              <p className="font-size-smaller m-0 text-left text-lg-center text-md-center text-sm-center text-xl-center">
                                {this.props.projectRecieved
                                  ? `${this.props.projDetails.features.completed}/ ${this.props.projDetails.features.total}`
                                  : "loading"}
                              </p>
                              <p className="font-size-small m-0 text-left text-lg-center text-md-center text-sm-left text-xl-center m-0">
                                Features
                              </p>
                            </div>
                          </Col>
                        </Row>
                      </Col>
                      <Col
                        md={5}
                        className="p-0 offset-md-1 align-items-center d-flex h-100"
                      >
                        <Row className="p-0 m-0 w-100 h-100 ">
                          <Col md={5} className="p-0">
                            {this.props.projectRecieved ? (
                              <Donut
                                color={"#2ece95"}
                                percentage={this.props.projDetails.userStory}
                              ></Donut>
                            ) : (
                              "loading"
                            )}
                          </Col>
                          <Col
                            md={7}
                            className="p-0 d-flex align-items-center justify-content-center"
                          >
                            <div
                              id="feature-info"
                              className="d-inline-block text-white"
                            >
                              <p className="font-size-smaller m-0 text-left text-lg-center text-md-center text-sm-center text-xl-center">
                                {this.props.projectRecieved
                                  ? `${this.props.projDetails.userStory.completed}/ ${this.props.projDetails.userStory.total}`
                                  : "loading"}
                              </p>
                              <p className="font-size-small m-0 text-left text-lg-center text-md-center text-sm-left text-xl-center m-0">
                                User Stories
                              </p>
                            </div>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </div>
      );
    }
  }
}

////function to map the state received from reducer

const mapStateToProps = state => {
  return {
    executiveId: state.execData.executiveId,

    projectList: state.execData.currentExecutiveInfo.executiveData,
    projectListReceived:
      state.execData.currentExecutiveInfo.executiveDataReceived,
    projDetails: state.productDetails.currentProject.projectDetails,
    projectID: state.productDetails.currentProject.projectDetails.id,
    projectRecieved: state.productDetails.currentProject.projectDataReceived,
    sprintData: state.productDetails.currentSprint.sprintInfo,
    sprintDataReceived: state.productDetails.currentSprint.sprintReceived,
    velocityCharts: state.chartData.currentChartData.chartDetails,
    chartDataReceived: state.chartData.currentChartData.chartDataReceived,
    selectedTab: state.chartData.currentTab,
    resetTab: state.qualityData.resetTab,
    execDataReceived: state.execData.currentExecutiveInfo.executiveDataReceived,
    metricsData: state.execData.currentExecutiveInfo.executiveData
  };
};

//Connect react component to redux

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      projInsightDispatch,
      sprintInsightsDispatch,

      qualityDataDispatch,
      execInsightsDispatch
    },
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductInfoBar);
