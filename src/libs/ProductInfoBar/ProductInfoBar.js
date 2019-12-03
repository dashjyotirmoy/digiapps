import React, { Component } from "react";
import { Row, Container, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import Dropdown from "../Dropdown/Dropdown";
import axios from "axios";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { prodInfo } from "../../Actions/index";
import { showComponents } from "../../Actions";
class ProductInfoBar extends Component {
  state = {
    productData: [],
    sprintData: [],
    selectedProduct: "",
    selectedSprint: "",
    response: {},
    recieved: false
  };

  componentDidMount() {
    this.getProjectData().then(this.setProject);
    this.props.prodInfo();
  }

  getProjectData = async projectId => {
    return axios.get(
      "https://digital-insight-dev.eastus.cloudapp.azure.com/digitalops-service/executive/4c78ede2-1be2-66e5-8dc7-bc89cc8dfe0f/executiveInsights"
    );

    // return axios.get("/JsonData/SummaryBarData.json");
  };

  setProject = res => {
    const projects = res.data.projects;
    const projLength = projects.length;
    const { list, selectedIndex } = this.markSelected(projects, projects[0].id);
    this.setState({
      productData: list,
      selectedProduct: list[selectedIndex].projectName
    });
    this.getSprintData(projects[0].id).then(this.setSprint);
  };

  updateProject = projectId => {
    const projects = [...this.state.productData];
    const { list, selectedIndex } = this.markSelected(projects, projectId);
    this.setState({
      productData: list,
      selectedProduct: list[selectedIndex].projectName
    });
    this.getSprintData(projectId).then(this.setSprint);
  };

  getSprintData = sprintId => {
    return axios.get(
      `https://digital-insight-dev.eastus.cloudapp.azure.com/digitalops-service/project/${sprintId}/projectInsights?executiveId=4c78ede2-1be2-66e5-8dc7-bc89cc8dfe0f`
    );
  };

  setSprint = res => {
    let sprints = res.data.sprintDetails;
    const sprintData = this.markSelected(sprints, sprints[0].id);
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
  };

  updateSprint = sprintId => {};

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

  prodOnSelectHandler = (prodId, evtKey) => {
    this.updateProject(prodId);
  };

  sprintOnSelectHandler = (prodId, evtKey) => {
    const { list, selectedIndex } = this.markSelected(
      this.state.sprintData,
      prodId
    );
    this.setState({
      sprintData: list,
      selectedSprint: list[selectedIndex].projectName
    });
  };

  render() {
    let dimData = this.props.widData;
    const Components = this.props.lazyFunc(dimData);
    const LineHigh = Components["LineHigh"];
    const Donut = Components["Donut"];
    return (
      <div className="h-10" style={{ backgroundColor: "#1c2531" }}>
        <Container fluid className="h-100 border-bottom border-dark border-top">
          <Row
            className="h-100  p-0 m-0"
            style={{ backgroundColor: "#1d2632" }}
          >
            <Col className="h-100" sm={5} md={5} lg={5} xl={5}>
              <Row className="h-100">
                <Col
                  sm={4}
                  md={4}
                  lg={4}
                  xl={4}
                  className="h-100 justify-content-center d-flex align-items-center"
                  style={{ backgroundColor: "#334154" }}
                >
                  <Dropdown
                    listData={this.state.productData}
                    direction="down"
                    onSelectDelegate={this.prodOnSelectHandler}
                  >
                    <Row className="h-100">
                      <Col sm={10} md={9} lg={9} xl={9}>
                        <p className="font-aggegate-sub-text text-white m-auto text-left text-lg-left text-md-left text-sm-left text-xl-center">
                          {this.state.selectedProduct}
                        </p>
                      </Col>
                      <Col
                        sm={2}
                        md={2}
                        md={3}
                        lg={3}
                        xl={3}
                        className="font-aggegate-sub-text p-0 text-white"
                      >
                        <FontAwesomeIcon icon={faChevronDown} />
                      </Col>
                    </Row>
                  </Dropdown>
                </Col>
                <Col
                  sm={4}
                  md={4}
                  lg={4}
                  xl={4}
                  style={{ backgroundColor: "#25303f" }}
                >
                  <Row className="h-100">
                    <Col md={12} className="m-auto">
                      <p className="font-aggegate-sub-text m-auto text-center text-white-50">
                        Product Aggregate view
                      </p>
                    </Col>
                  </Row>
                </Col>
                <Col
                  sm={4}
                  md={4}
                  lg={4}
                  xl={4}
                  className="border-right border-dark p-0"
                >
                  <Row className="h-100 p-0 m-0 align-items-center col-md-12 d-flex justify-content-center">
                    <Dropdown
                      listData={this.state.sprintData}
                      direction="down"
                      onSelectDelegate={this.sprintOnSelectHandler}
                    >
                      <Row className="h-100 m-0 p-0">
                        <Col sm={10} md={9} lg={9} xl={9}>
                          <p className="font-aggegate-sub-text text-white m-auto text-left text-lg-left text-md-left text-sm-left text-xl-center">
                            {this.state.selectedSprint}
                          </p>
                        </Col>
                        <Col
                          sm={2}
                          md={2}
                          md={3}
                          lg={3}
                          xl={3}
                          className="font-aggegate-sub-text p-0 text-white"
                        >
                          <FontAwesomeIcon icon={faChevronDown} />
                        </Col>
                      </Row>
                    </Dropdown>
                  </Row>
                </Col>
              </Row>
            </Col>
            <Col sm={7} md={7} lg={7} xl={7} className="h-100">
              <Row className="h-100">
                <Col md={7} xl={8} lg={8} className="h-100">
                  <Row className="p-0 m-0 h-100 w-100 border-right border-dark ">
                    <Col md={12} xl={12} lg={12} className="h-100 pl-0 py-1">
                      {this.props.recieved ? (
                        <LineHigh
                          burndown={this.props.projects}
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
                          {this.props.recieved ? (
                            <Donut
                              percentage={this.props.projects.features}
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
                              <small>
                                {this.props.recieved
                                  ? `${this.props.projects.features.completed}/ ${this.props.projects.features.total}`
                                  : "loading"}
                              </small>
                            </p>
                            <p className="font-size-xs m-0 text-left text-lg-center text-md-center text-sm-left text-xl-center m-0">
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
                          {this.props.recieved ? (
                            <Donut
                              percentage={this.props.projects.backlogs}
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
                              <small>
                                {this.props.recieved
                                  ? `${this.props.projects.backlogs.completed}/ ${this.props.projects.backlogs.total}`
                                  : "loading"}
                              </small>
                            </p>
                            <p className="font-size-xs m-0 text-left text-lg-center text-md-center text-sm-left text-xl-center m-0">
                              Backlogs
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
const mapStateToProps = state => {
  return {
    projects: state.productdetails.products.data,
    recieved: state.productdetails.products.recieved
  };
};
const mapDispatchToProps = dispatch => {
  return bindActionCreators({ prodInfo, showComponents }, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductInfoBar);
