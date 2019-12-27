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
import Donut from "../Charts/Donut/Donut";
import { translations } from "../Translations/";
import { TooltipHoc } from "../TooltiHOC/TooltipHoc";
import { isQuality } from "../../../utility/classUtility/classUtil";
import Widgets from "../../dashboardController/widgetParser";

class ProductInfoBar extends Component {
  state = {
    productData: [],
    sprintData: [],
    selectedProduct: "",
    selectedSprint: "",
    response: {},
    recieved: false,
    prodAggView: false
  };

  //axios call to fetch executive data

  componentDidMount() {
    api
      .getExecInsightsData(this.props.executiveId)
      .then(this.setProject)
      .catch(error => {
        console.error(error);
      });
  }

  //function to set project details

  setProject = res => {
    const projects = res.data.projects;
    const projLength = projects.length;
    const { list, selectedIndex } = this.markSelected(projects, projects[0].id);
    this.setState({
      productData: list,
      selectedProduct: list[selectedIndex].projectName
    });

    this.getProjectDetails(projects[selectedIndex].id, this.props.executiveId);
  };

  //function to update project details when project dropdown values are changed

  updateProject = projectId => {
    const projects = [...this.state.productData];
    const { list, selectedIndex } = this.markSelected(projects, projectId);
    this.setState({
      productData: list,
      selectedProduct: list[selectedIndex].projectName
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
    this.setState({
      sprintData: sprintDetails,
      selectedSprint: sprintDetails[sprintData.selectedIndex].projectName
    });
    this.getSprintData(
      sprintDetails[sprintData.selectedIndex].id,
      this.props.executiveId
    );
  };

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

  //handler function when project dropdown is changed

  prodOnSelectHandler = (prodId, evtKey) => {
    this.updateProject(prodId);
  };

  //handler function when sprint dropdown is changed

  sprintOnSelectHandler = (sprintId, evtKey) => {
    this.updateSprint(sprintId);
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

    return (
      <div className="h-10" style={{ backgroundColor: "#1c2531" }}>
        <Container fluid className="h-100 border-bottom border-dark border-top">
          <Row
            className="h-100  p-0 m-0"
            style={{ backgroundColor: "#1d2632" }}
          >
            <Col className="h-100 pl-0" sm={5} md={6} lg={6} xl={6}>
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
                  sm={5}
                  md={qualityView ? 4 : 5}
                  lg={qualityView ? 5 : 6}
                  xl={qualityView ? 5 : 6}
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
                  sm={3}
                  className={classnames(
                    "border-right",
                    "border-dark",
                    "p-0",
                    "h-100",
                    { "col-xl-4 col-lg-4 col-md-4": !qualityView },
                    { "col-xl-2_5 col-lg-2_5 col-md-2_5": qualityView }
                  )}
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
                <Col
                  sm={2}
                  className={classnames(
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
                      listData={this.state.sprintData}
                      direction="down"
                      onSelectDelegate={this.sprintOnSelectHandler}
                    >
                      <Row className="h-100 m-0 p-0">
                        <Col sm={10} md={10} lg={10} xl={10}>
                          <p className="font-aggegate-sub-text text-ellipsis font-weight-bold text-white m-auto text-left text-lg-left text-md-left text-sm-left text-xl-center">
                            Repository
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
                </Col>
              </Row>
            </Col>
            <Col sm={7} md={6} lg={6} xl={6} className="h-100">
              <Row className="h-100">
                <Col md={7} xl={8} lg={8} className="h-100">
                  <Row className="p-0 m-0 h-100 w-100 border-right border-dark ">
                    <Col md={12} xl={12} lg={12} className="h-100 pl-0 py-1">
                      {this.props.sprintDataReceived ? (
                        <LineHigh
                          burndown={this.props.sprintData}
                          type="line"
                        ></LineHigh>
                      ) : (
                        "loading"
                      )}
                    </Col>
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
                      <Row className="p-0 m-0 w-100 ">
                        <Col md={5} className="p-0">
                          {this.props.projectRecieved ? (
                            <Donut
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
                      <Row className="p-0 m-0 w-100 ">
                        <Col md={5} className="p-0">
                          {this.props.projectRecieved ? (
                            <Donut
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

////function to map the state received from reducer

const mapStateToProps = state => {
  return {
    executiveId: state.execData.executiveId,
    projectList: state.execData.currentExecutiveInfo.executiveData.projects,
    projectListReceived:
      state.execData.currentExecutiveInfo.executiveDataReceived,
    projDetails: state.productDetails.currentProject.projectDetails,
    projectID: state.productDetails.currentProject.projectDetails.id,
    projectRecieved: state.productDetails.currentProject.projectDataReceived,
    sprintData: state.productDetails.currentSprint.sprintInfo,
    sprintDataReceived: state.productDetails.currentSprint.sprintReceived,
    velocityCharts: state.chartData.currentChartData.chartDetails,
    chartDataReceived: state.chartData.currentChartData.chartDataReceived,
    selectedTab: state.chartData.currentTab
  };
};

//Connect react component to redux

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { projInsightDispatch, sprintInsightsDispatch },
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductInfoBar);
