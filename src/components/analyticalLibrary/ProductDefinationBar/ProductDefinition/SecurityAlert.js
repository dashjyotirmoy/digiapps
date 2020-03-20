import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { repoDropValDispatchSecurityAlert, securityAlertDataDispatch } from '../../../../store/actions/securityAlertData';
import { resetProjectRepoDispatch } from "../../../../store/actions/projectInsights";
// import Spinner from "../../Spinner/Spinner";

class SecurityAlert extends Component {
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
        .securityAlertDataDispatch(this.props.projectID, this.props.projectID)
        .then(item => {
            if(this.props.securityProjectData.projectDetail.length > 0){
                this.setRepository(this.props.securityProjectData);

                this.setState({
                    show: false
                  });
                if(this.state.selectedRepo === "") {
                    type = this.setRawObjects(this.props.securityProjectData);
                    this.createCharts(this.createChartObject(type));
                }
            }
            else {
                this.props.resetProjectRepoDispatch(
                    this.props.securityProjectData.projects
                );
            }
        })
        .catch(error => {
            console.error(error);
        });
  }

  setRepository = res => {
    const repositoryData = res.projectDetail;
    if (repositoryData !== null) {
      const { list } = this.markSelected(
        repositoryData,
        repositoryData[0].projId
      );
      const repoDetails = list.map(ele => {
        return {
          id: ele.projId,
          projectName: ele.projName
        };
      });

      this.setState({
        repoData: repoDetails,
        selectedRepo: ""
      });

      this.props.repoDropValDispatchSecurity("");
    }
  };

  markSelected = (prodList, id) => {
    const resetList = this.resetSelect(prodList);
    let selectedIndex = 0;
    const selectedParamList = resetList.map((ele, index) => {
      if (ele.repoKey === id) {
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

  setRawObjects(rawData) {
    const item =  {
        productPolicyViolationsCount: [
          { name: rawData.name },
          { title: "Policy Violations" },
          rawData.policyViolationsCount
        ],
        productVulnerabilityAlerts: [
          { name: rawData.name },
          { title: "Per Vulnerability Alert" },
          rawData.vulnerabilityAlerts
        ],
        productLibraryAlerts: [
          { name: rawData.name},
          { title: "Per Library Alert" },
          rawData.libraryAlerts
        ],
        productLibraryStatistics: [
          { name: rawData.name },
          { title: "Library Statistics" },
          rawData.libraryStatistics
        ]
      };
    // const splitArr = this.splitRawObj(item);
    const splitArr = Object.values(item);
    return splitArr;
  }

  setRepoObjects = (rawData, selectedRepoData) => {
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

  splitRawObj = type => {
    const splitArr = type.map(obj => Object.values(obj));
    return splitArr;
  };

  createCharts = (list, removed) => {
    // let list_temp = list[0];
    const updatedList = list.filter((ele, index) => {
      if (index !== removed) {
        return Object.assign({}, ele);
      }
    });
    // updatedList.map(ele => {
    //   ele.component = this.setChart(
    //     ele.title,
    //     ele.data[2]
    //   );
    // });
    // let chartList = []; chartList[0] = updatedList;
    this.setState({
      charts: updatedList
    });
  };

  createChartObject = typeObj => {
    const processedData = typeObj.map((item, index) => {
      // return item.map(ele => {
      //   return {
      //     name: ele[1].title,
      //     data: ele,
      //     title: ele[1].title
      //   };
      // });
      return  {
        name: item[0].name,
        data: item,
        title: item[1].title
      }
    });
    return processedData;
  };

  handleRepoChange = repoID => {
    this.updateRepository(repoID);
  };

  updateRepository = repoId => {
    const { list, selectedIndex } = this.markSelected(
      this.props.securityProjectData.projects,
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

    const type = this.setRepoObjects(
        this.props.securityProjectData,
        this.props.securityProjectData.projects[selectedIndex],
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
          <div>security component view</div>
        </React.Fragment>
        );
      }
}

//function to map the state received from reducer

const mapStateToProps = state => {
  return {
    currentExecId: state.execData.executiveId,
    securityProjectData: state.securityData.currentSecurityData.securityProjectDetails,
    projectID: state.productDetails.currentProject.projectDetails.id,
    currentRepo: state.securityData.currentRepo,
    sprintId: state.productDetails.currentSprint.sprintInfo.id
  };
};

//function to dispatch action to the reducer

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { securityAlertDataDispatch, resetProjectRepoDispatch, repoDropValDispatchSecurityAlert },
    dispatch
  );
};

//Connect react component to redux

export default connect(mapStateToProps, mapDispatchToProps)(SecurityAlert);
