import React, { Component } from "react";
import Grid from "../../Grid-Layout/Grid";
import { Row, Col } from "react-bootstrap";
import Dropdown from "../../Dropdown/Dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown
} from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { repoDropValDispatchSecurity, securityDataDispatch } from '../../../../store/actions/securityData';
import { resetProjectRepoDispatch } from "../../../../store/actions/projectInsights";
// import Spinner from "../../Spinner/Spinner";



class Security extends Component {
  state = {
    charts: [],
    layout: {
      lg: [
        { i : "0", x : "0", y : "0", w : "3", h : 1, isResizable : false },
        { i : "1", x : "3", y : "0", w : "3", h : 1, isResizable : false },
        { i : "2", x : "6", y : "0", w : "3", h : 1, isResizable : false },
        { i : "3", x : "9", y : "0", w : "3", h : 3, isResizable : false },
        { i : "4", x : "0", y : "1", w : "9", h : 2, isResizable : false },
      ],
      md: []
    },
    gridCol: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
    gridBreakpoints: { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 },
    show: true,
    selectedRepo: "",
    repoData: []
  };

  removeChartComponent = (chartIndex) => {

  }

  fetchSecurityData = (props) => {
    let type;
    this.setState({
        all_data: false,
        charts: []
    });
    this.props
        .securityDataDispatch(this.props.currentExecId, this.props.projectID)
        .then(item => {
            if(this.props.securityData.projects.length > 0){
                this.setRepository(this.props.securityData);

                this.setState({
                    show: false
                  });
                if(this.state.selectedRepo === "") {
                    type = this.setRawDefaultRepo(this.props.securityData);
                    this.createCharts(this.createChartObject(type));
                }
            }
            else {
                this.props.resetProjectRepoDispatch(
                    this.props.securityData.projects
                );
            }
        })
        .catch(error => {
            console.error(error);
        });
  }

  setRawDefaultRepo(rawData) {
    const item = rawData.map((item) => {
      return {
        productPolicyViolationsCount: [
          { name: item.productName },
          { title: "Policy Violations" },
          item.productPolicyViolationsCount
        ],
        productVulnerabilityAlerts: [
          { name: item.productName },
          { title: "Per Vulnerability Alert" },
          item.productVulnerabilityAlerts
        ],
        productLibraryAlerts: [
          { name: item.productName},
          { title: "Per Library Alert" },
          item.productLibraryAlerts
        ],
        productLibraryStatistics: [
          { name: item.productName },
          { title: "Library Statistics" },
          item.productLibraryStatistics
        ]
      };
    });
    const splitArr = this.splitRawObj(item);
    return splitArr;
  }

  setRawRepoObjects = (rawData, selectedRepoData) => {
    const item = {
        productPolicyViolationsCount: [
        { name: selectedRepoData.projectName },
        { title: "Policy Violations" },
        selectedRepoData.policyViolationsCount
      ],
      productVulnerabilityAlerts: [
        { name: selectedRepoData.projectName },
        { title: "Per Vulnerability Alert" },
        selectedRepoData.vulnerabilityAlerts
      ],
      productLibraryAlerts: [
        { name: selectedRepoData.projectName},
        { title: "Per Library Alert" },
        selectedRepoData.libraryAlerts
      ],
      productLibraryStatistics: [
        { name: selectedRepoData.projectName },
        { title: "Library Statistics" },
        selectedRepoData.libraryStatistics
      ]
    };

    const splitArr = Object.values(item);

    return [splitArr];
  };

  createCharts = (list, removed) => {
    let list_temp = list[0];
    const updatedList = list_temp.filter((ele, index) => {
      if (index !== removed) {
        return Object.assign({}, ele);
      }
    });
    updatedList.map(ele => {
      ele.component = this.setChart(
        ele.title,
        ele.data[2]
      );
    });
    let chartList = []; chartList[0] = updatedList;
    this.setState({
      charts: chartList
    });
  };

  createChartObject = typeObj => {
    const processedData = typeObj.map((item, index) => {
      return item.map(ele => {
        return {
          name: ele[1].title,
          data: ele,
          title: ele[1].title
        };
      });
    });
    return processedData;
  };

  handleRepoChange = repoID => {
    this.updateRepository(repoID);
  };

  updateRepository = repoId => {
    const { list, selectedIndex } = this.markSelected(
      this.props.securityData.projects,
      repoId
    );
    const repoDetails = list.map(ele => {
      return {
        id: ele.repoKey,
        projectName: ele.repoName
      };
    });

    this.setState({
      selectedRepo: repoDetails[selectedIndex].projectName
    });

    this.props.repoDropValDispatchSecurity(repoDetails[selectedIndex].projectName);
    this.updateSecurityData(repoId, selectedIndex);
  };

  updateSecurityData = (repoId, selectedIndex) => {

    const type = this.setRawRepoObjects(
        this.props.securityData,
        this.props.securityData.projects[selectedIndex],
        repoId
    );

    this.createCharts(this.createChartObject(type));
  };

  componentDidUpdate() {
    if (this.state.all_data) {
      this.fetchSecurityData();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.projectID !== nextProps.projectID
    ) {
      this.setState({
        all_data: true
      });
    }
  }

  componentDidMount() {
    if (this.state.selectedRepo === undefined || this.state.selectedRepo === "") {
      this.setState({
        all_data: true
      });
    }
  }

    render() {
      
        return (
        //  <div style={{ color: "white" }}>security </div>

        <React.Fragment>
          <Row className="p-0 px-3 m-0 mt-4">
            <Col xl={2} lg={3} md={3}>
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
          </Row>
          {/* <Grid
            //   chartData={this.state.charts[0]}
              layouts={this.state.layout}
              removeDelegate={this.removeChartComponent}
              breakpoint={this.state.gridBreakpoints}
              columnSize={this.state.gridCol}
            /> */}
            {/* <ResponsiveGridLayout
                // maxRows={2}
                className="layout"
                autoSize={false}
                layouts={this.state.layouts}
                compactType={"vertical"}
                breakpoints={this.state.gridBreakpoints}
                cols={this.state.gridCol}
                preventCollision={false}
            >
            ok
            </ResponsiveGridLayout> */}
        </React.Fragment>
        );
      }
}

//function to map the state received from reducer

const mapStateToProps = state => {
  return {
    currentExecId: state.execData.executiveId,
    securityData: state.securityData.currentSecurityData.securityDetails,
    projectID: state.productDetails.currentProject.projectDetails.id,
    currentRepo: state.securityData.currentRepo,
    sprintId: state.productDetails.currentSprint.sprintInfo.id
  };
};

//function to dispatch action to the reducer

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { securityDataDispatch, resetProjectRepoDispatch, repoDropValDispatchSecurity },
    dispatch
  );
};

//Connect react component to redux

export default connect(mapStateToProps, mapDispatchToProps)(Security);
