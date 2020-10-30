import React, { Component } from "react";
import { Row, Col,Button, Container} from "react-bootstrap";
import Dropdown from "../../Dropdown/Dropdown";
// import SecurityAlert from "./SecurityAlert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faSquare
} from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { repoDropValDispatchSecurity, securityProjectDataDispatch, securityRepoDataDispatch, securityPolicyDataDispatch, securityAlertDataDispatch } from '../../../../store/actions/securityData';
import { resetProjectRepoDispatch } from "../../../../store/actions/projectInsights";
import Sec from '../../Charts/SecurityProject/Sec';
import App from '../../Charts/SecurityProject/Alert'
import Spinner from "../../Spinner/Spinner";
import Policy from '../../Charts/SecurityPolicy/Policy';
import SecurityOnProjectSelection from '../../Charts/SecurityDropdown/SecurityOnProjSelection';
import "../../Charts/SecurityProject/Sec.css"
// import Button from 'react-bootstrap/Button'


class Security extends Component {

  state = {
    charts: [],
    layout: {
      lg: [
        { i: "0", x: "0", y: "0", w: "3", h: 1, isResizable: false },
        { i: "1", x: "3", y: "0", w: "3", h: 1, isResizable: false },
        { i: "2", x: "6", y: "0", w: "3", h: 1, isResizable: false },
        { i: "3", x: "9", y: "0", w: "3", h: 3, isResizable: false },
        { i: "4", x: "0", y: "1", w: "9", h: 2, isResizable: false },
      ],
      md: []
    },
    gridCol: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
    gridBreakpoints: { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 },
    show: true,
    showbutton: false,
    selectedRepo: "",
    repoData: [],
    componentType: "Product",
    alertActive:false,
    policyActive:false,
   
  };

  removeChartComponent = (chartIndex) => {

  }

  fetchSecurityData = (props) => {
    this.setState({
      all_data: false,
      showbutton: false,
      charts: []
    });
    this.setDefaultData();
  }

  setDefaultData() {
    let type;
    this.props
      .securityProjectDataDispatch(this.props.projectID)
      .then(item => {
        if (this.props.securityProjectData.projectDetail.length > 0) {
          this.setRepository(this.props.securityProjectData);

          this.setState({
            show: false
          });
          if (this.state.selectedRepo === "") {
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

      // repoDetails.unshift({id: "selectProject", projectName: "select Project"});
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

  setRawObjects(rawData) {
    const item = {
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
        { name: rawData.name },
        { title: "Per Library Alert" },
        rawData.libraryAlerts
      ],
      productLibraryStatistics: [
        { name: rawData.name },
        { title: "Library Statistics" },
        rawData.libraryStatistics
      ],
      topProjects: [
        { name: rawData.name },
        { title: "Top 5 Projects" },
        rawData.topProjects
      ]
    };
    // const splitArr = this.splitRawObj(item);
    const splitArr = Object.values(item);
    return splitArr;
  }

  setRepoObjects = (rawData) => {
    const item = {
      productPolicyViolationsCount: [
        { name: rawData.projName },
        { title: "Policy Violations" },
        rawData.policyViolationsCount
      ],
      productVulnerabilityAlerts: [
        { name: rawData.projName },
        { title: "Per Vulnerability Alert" },
        rawData.vulnerabilityAlerts
      ],
      productLibraryAlerts: [
        { name: rawData.projName },
        { title: "Per Library Alert" },
        rawData.libraryAlerts
      ],
      productLibraryStatistics: [
        { name: rawData.projName },
        { title: "Library Statistics" },
        rawData.libraryStatistics
      ],
      vulnerabilities: [
        { name: rawData.projName },
        { title: "Vulnerabilities" },
        rawData.vulnerabilities
      ],
      libraries: [
        { name: rawData.projName },
        { title: "Libraries" },
        rawData.libraries
      ]
    };

    const splitArr = Object.values(item);

    return splitArr;
  };

  splitRawObj = type => {
    const splitArr = type.map(obj => Object.values(obj));
    return splitArr;
  };

  createCharts = (list, removed) => {
    // let list_temp = list[0];
    // eslint-disable-next-line array-callback-return
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
      charts: updatedList,
      componentType: "Product"
    });
  };

  createRepoCharts = (list, removed) => {
    // let list_temp = list[0];
    // eslint-disable-next-line array-callback-return
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
      charts: updatedList,
      componentType: "Project"
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
      return {
        name: item[0].name,
        data: item,
        title: item[1].title
      }
    });
    return processedData;
  };

  handleRepoChange = repoID => {
    
    this.setState({
      alertActive:false,
      policyActive:false,
      showbutton: true
  });
    this.updateRepository(repoID);
  };

  updateRepository = repoId => {
    const { list, selectedIndex } = this.markSelected(
      this.props.securityProjectData.projectDetail,
      repoId
    );
    const repoDetails = list.map(ele => {
      return {
        id: ele.projId,
        projectName: ele.projName
      };
    });

    this.setState({
      selectedRepo: repoDetails[selectedIndex].projectName
    });

    this.props.repoDropValDispatchSecurity(repoDetails[selectedIndex].id);
    if (repoId !== 'selectProject') {
      this.props.securityRepoDataDispatch(this.props.projectID, repoId)
      .then(() => { this.updateSecurityData(repoId, selectedIndex) });
      if (this.state.repoData[0].id !== 'selectProject') {
        this.state.repoData.unshift({id: "selectProject", projectName: "select Project"});
      }
    } else {
      this.setState({
        showbutton: false,
        selectedRepo: ""
    });
    this.setDefaultData();
    }
    

  };

  updateSecurityData = (repoId, selectedIndex) => {

    const type = this.setRepoObjects(
      this.props.securityRepoData
    );

    this.createRepoCharts(this.createChartObject(type));
  };

  setPolicy = () => {
 
    let policyCurrentState =true;
     let alertCurrentState=false;
    // const currentState = this.state.active;
    this.setState({policyActive: policyCurrentState,alertActive:alertCurrentState});
     this.props.securityPolicyDataDispatch(this.props.projectID, this.props.currentRepo)
       .then(() => { this.setPolicyData(this.props.securityPolicyData) });
   }
 
   setPolicyData = (rawData) => {
     this.setState({
       charts: rawData.policyViolations,
       componentType: "Policy"
     })
   }
 
   setAlert = () => {
 
     let alertCurrentState =true;
      let policyCurrentState=false;
     this.setState({ alertActive: alertCurrentState,policyActive:policyCurrentState });
     this.props.securityAlertDataDispatch(this.props.projectID, this.props.currentRepo)
       .then(() => { this.setAlertData(this.props.securityAlertData) });
   }
 
   setAlertData = (rawData) => {
     this.setState({
       charts: rawData,
       componentType: "Alert"
     })
     
 
   }
 
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

    if (this.state.show) {
      return <Spinner show="true" />;
    } else {
      return (
        //  <div style={{ color: "white" }}>security </div>

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
<Col md={7}>
            <span>
            {this.state.showbutton ? (
              <Button variant="outline-dark" className={this.state.alertActive?"bgblue":"Alertbg"}  onClick ={this.setAlert}>Alerts</Button>
         
          ) : null}
</span>
         
<span className="ml-3">
{this.state.showbutton ? (
             <Button variant="outline-dark"  className={this.state.policyActive?"bgblue":"Alertbg"} onClick ={this.setPolicy}>Policies</Button>
          //  <button className="bg-prodAgg-btn" style={{ color: '#FFFFFF', paddingLeft: '5px', background: '#1D2632', border: '#364D68', minWidth: '6rem' }} onClick ={this.setPolicy} >Policy</button>
          ) : null}
</span>
</Col>
{ !this.state.policyActive?(
  <Col md={3} className="mt-auto text-right">
  <div>
    <span className="mr-3">
    <FontAwesomeIcon  className="highbg" icon={faSquare} />
    <span style={{color:'#fff'}}>High</span>
    </span>
    <span className="mr-3">
    <FontAwesomeIcon  className="mediumbg" icon={faSquare} />
    <span style={{color:'#fff'}}>Medium</span>
    </span>
    <span className="mr-3">
    <FontAwesomeIcon  className="lowbg" icon={faSquare} />
    <span style={{color:'#fff'}}>Low</span>
    </span>
    </div>
    
    </Col>
):<div></div>
}


          </Row>
          {this.state.charts.length && this.state.componentType === "Product" ? (
            <Sec cardsData={this.state.charts} />
          ) : null}
          {this.state.charts.length && this.state.componentType === "Project" ? (
            <SecurityOnProjectSelection cardsData={this.state.charts} />
          ) : null}
          { this.state.componentType === "Policy" ? (
            <Policy cardsData={this.state.charts} />
          ) : null}
          {this.state.componentType === "Alert" ? (
           <App cardsData = {this.state.charts}/>
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
    securityProjectData: state.securityData.securityProjectDetails,
    securityRepoData: state.securityData.securityRepoDetails,
    securityPolicyData: state.securityData.securityPolicyDetails,
    securityAlertData: state.securityData.securityAlertDetails,
    projectID: state.productDetails.currentProject.projectDetails.id,
    currentRepo: state.securityData.currentRepo,
    sprintId: state.productDetails.currentSprint.sprintInfo.id
  };
};

//function to dispatch action to the reducer

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { securityProjectDataDispatch, resetProjectRepoDispatch, repoDropValDispatchSecurity, securityRepoDataDispatch, securityPolicyDataDispatch, securityAlertDataDispatch },
    dispatch
  );
};

//Connect react component to redux

export default connect(mapStateToProps, mapDispatchToProps)(Security);
