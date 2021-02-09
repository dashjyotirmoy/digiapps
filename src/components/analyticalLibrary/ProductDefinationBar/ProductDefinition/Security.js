import React, { Component } from "react";
import { Row, Col,Button, Card } from "react-bootstrap";
import Dropdown from "../../Dropdown/Dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faSquare
} from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {vulnerabilityDataDispatch,repoDropValDispatchSecurity, securityProjectDataDispatch,securityReleaseDataDispatch, securityRepoDataDispatch, securityPolicyDataDispatch,securityReleasePolicyDataDispatch, securityAlertDataDispatch,securityReleaseAlertDataDispatch } from '../../../../store/actions/securityData';
import { widgetListDispatch } from "../../../../store/actions/executiveInsights";
import { resetProjectRepoDispatch } from "../../../../store/actions/projectInsights";
import Sec from '../../Charts/SecurityProject/Sec';
import App from '../../Charts/SecurityProject/Alert'
import Spinner from "../../Spinner/Spinner";
import Policy from '../../Charts/SecurityPolicy/Policy';
import SecurityOnProjectSelection from '../../Charts/SecurityDropdown/SecurityOnProjSelection';
import "../../Charts/SecurityProject/Sec.css"
import api from "../../../../utility/Http/devOpsApis";
import SideNavbar from "../../SideNavBar/SideNavbar";
import {insightsSecurity} from "../../../../store/actions/securityData";
import CardChartSecurity from "../../CardChart/CardChartSecurity";
import { labelConst } from "../../../../utility/constants/labelsConstants";
import BuildColumnSummaryTrend from "../../OverView/BuildColumnSummaryTrend";
import SecSastDast from '../../Charts/SecurityProject/SecSastDast';
import BuildPieKpi from "../../OverView/BuildPieKpi";

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
    branchDropData:[],
    releaseDropData:[],
    selectedBranch:"",
    selectedRelease:"",
    componentType: "Product",
    alertActive:false,
    policyActive:false,
    selectedRepoId: '',
    showInsights:false,
    filterStatus: 'Project',
    clientId: '',
    currenttab:"",
    vulnerable:"Vulnerabilities",
    openSourceVul: "Open Source Vulnerabilities",
    sastDastVul: "SAST and DAST Vulnerabilities"
  };

  removeChartComponent = (chartIndex) => {

  }

  fetchSecurityData = (props) => {
    this.setState({
      all_data: false,
      showbutton: false,
      //charts: [],
      showInsights:false
    });
    this.setDefaultData();
  }

    setDefaultData() {
      let type;
      this.props.vulnerabilityDataDispatch(this.state.clientId ? this.state.clientId:this.props.currentClientId,this.props.projectID)
      this.props.widgetListDispatch(this.state.clientId ? this.state.clientId:this.props.currentClientId)
      this.props
        .securityProjectDataDispatch(this.state.clientId ? this.state.clientId:this.props.currentClientId,this.props.projectID)
        .then(item => {
          if (this.props.securityProjectData.projectDetail && this.props.securityProjectData.projectDetail.length > 0) {
            this.setRepository(this.props.securityProjectData);

            this.setState({
              show: false,
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
        selectedRepo: "",
        selectedRelease:"",
        selectedBranch:"",
      });

      this.props.repoDropValDispatchSecurity("");
    }
  };
  releaseOnSelectHandler= (relaseId, evtKey) => {
   this.updateRelease(relaseId);
  };
  branchOnSelectHandler= (branchId, evtKey) => {
    this.updateBranch(branchId);
  };
  setBranch = (res) => {
    const branch = res.data;
    const { list } = this.markSelectedbranch(branch, branch.id);
    const branchDetail = list.map(ele => {
      return {
        id: ele.id,
        projectName: ele.branchName
      };
    });
    this.setState({
     branchDropData: branchDetail,
      // selectedBranch: branchDetail[selectedIndex].projectName
      selectedBranch: '',
      selectedRelease:'',
      releaseDropData:[],
      showInsights:false
    });
   };
  updateBranch = branchId => {
    const branchList = [...this.state.branchDropData];
    const { list, selectedIndex } = this.markSelectedbranch(branchList, branchId);
    const branchDetail = list.map(ele => {
      return {
        id: ele.id,
        projectName: ele.projectName
      };
    });
    this.setState({
      branchDropData: branchDetail,
      selectedBranch: branchDetail[selectedIndex].projectName,
      showInsights:true
    });
    this.getReleaseDetails(branchDetail[selectedIndex].projectName,this.props.currentClientId,this.props.projectID, this.state.selectedRepo);
    this.props.insightsSecurity(branchDetail[selectedIndex].projectName,this.props.currentClientId,this.props.projectID,this.state.selectedRepo);
    
  };
  setRelease = (res) => {
    const release = res.data;
    
      const { list} = this.markSelectedbranch(release, release.id);
      const releaseDetail = list.map(ele => {
        return {
          id: ele.id,
          projectName: ele.releaseNumber
        };
      });
      if(release.length!==0){
      this.setState({
       releaseDropData: releaseDetail,
        // selectedRelease: releaseDetail[selectedIndex].projectName
        selectedRelease:'',
        filterStatus: "Release"
      });
    }
    else{
      this.setState({
        releaseDropData: [],
        selectedRelease: ''
       });
    }
   };
   updateRelease = releaseId => {
    const releaseList = [...this.state.releaseDropData];
    const { list, selectedIndex } = this.markSelectedbranch(releaseList, releaseId);
    const releaseDetail = list.map(ele => {
      return {
        id: ele.id,
        projectName: ele.projectName
      };
    });
    this.setState({
      releaseDropData: releaseDetail,
      selectedRelease: releaseDetail[selectedIndex].projectName,
      filterStatus: "Release",
      alertActive:false,
      policyActive:false,
    });
    this.props.securityReleaseDataDispatch(this.state.selectedBranch,this.props.currentClientId,this.props.projectID, this.state.selectedRepoId,releaseDetail[selectedIndex].projectName, this.state.selectedRepo) 
      .then(() => { this.updateReleaseSecurityData(releaseId, selectedIndex) });  
  };
  getReleaseDetails = (branchName,clientId,projectID, projName) => {
    api
      .getReleaseDropdownInsight(branchName,clientId,projectID, projName)
      .then(this.setRelease)
      .catch(error => {
        console.error(error);
      });
  };
  markSelected = (prodList, id) => {
    const resetList = this.resetSelect(prodList);
    let selectedIndex = 0;
    const selectedParamList = resetList.map((ele, index) => {
      if (ele.projId == id) {
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
  markSelectedbranch = (prodList, id) => {
    const resetList = this.resetSelect(prodList);
    var selectedIndex = 0;
    const selectedParamList = resetList.map((ele, index) => {
      if (ele.id === Number(id)) {
        selectedIndex = index;
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
        rawData.policyViolationsCount,
        rawData.policyViolationMajorCount,
        rawData.policyViolationMinorCount
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
        rawData.policyViolationsCount,
        rawData.policyViolationMajorCount,
        rawData.policyViolationMinorCount
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
  getBranchDetails = (clientId,projectID, projName) => {
    api
      .getBranchDropdownInsight(clientId,projectID, projName)
      .then(this.setBranch)
      .catch(error => {
        console.error(error);
      });
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
      selectedRepo: repoDetails[selectedIndex].projectName,
      selectedRepoId:repoDetails[selectedIndex].id,
      filterStatus: "Repository"
    });

    this.props.repoDropValDispatchSecurity(repoDetails[selectedIndex].id);
    if (repoId !== 'selectProject') {
      this.props.securityRepoDataDispatch(this.props.currentClientId,this.props.projectID, repoId)
      .then(() => { this.updateSecurityData(repoId, selectedIndex) });
      if (this.state.repoData[0].id !== 'selectProject') {
        this.state.repoData.unshift({id: "selectProject", projectName: "Select Repository"});
      }
    } else {
      this.setState({
        showbutton: false,
        selectedRepo: "",
        filterStatus: "Project"
    });
    this.setDefaultData();
    }
    
    this.getBranchDetails(this.props.currentClientId,this.props.projectID, repoDetails[selectedIndex].projectName);
  };

  updateSecurityData = (repoId, selectedIndex) => {

    const type = this.setRepoObjects(
      this.props.securityRepoData
    );

    this.createRepoCharts(this.createChartObject(type));
  };
  
  updateReleaseSecurityData = (releaseId, selectedIndex) => {

    const type = this.setRepoObjects(
      this.props.securityReleaseData
    );

    this.createRepoCharts(this.createChartObject(type));
  };

  setPolicy = () => {
 
    let policyCurrentState =true;
     let alertCurrentState=false;
    // const currentState = this.state.active;
    
    this.setState({policyActive: policyCurrentState,alertActive:alertCurrentState});
    if(this.state.selectedRepo !== '' && this.state.selectedBranch !== '' && this.state.selectedRelease !== ''){
      this.props.securityReleasePolicyDataDispatch(this.state.selectedBranch,this.props.currentClientId,this.props.projectID, this.props.currentRepo,this.state.selectedRelease,this.state.selectedRepo)
      .then(() => { this.setPolicyData(this.props.securityReleasePolicyData) });
     }else{
     this.props.securityPolicyDataDispatch(this.props.currentClientId,this.props.projectID, this.props.currentRepo)
       .then(() => { this.setPolicyData(this.props.securityPolicyData) });
     }
   }
 
   setPolicyData = (rawData) => {
     this.setState({
       charts: rawData,
       componentType: "Policy"
     })
   }
 
   setAlert = () => {
 
     let alertCurrentState =true;
      let policyCurrentState=false;
     this.setState({ alertActive: alertCurrentState,policyActive:policyCurrentState });
     //(branchName,filterID,projectId,repoId,releaseName,repoName)
     if(this.state.selectedRepo !== '' && this.state.selectedBranch !== '' && this.state.selectedRelease !== ''){
      this.props.securityReleaseAlertDataDispatch(this.state.selectedBranch,this.props.currentClientId,"all_time",this.props.projectID, this.props.currentRepo,this.state.selectedRelease,this.state.selectedRepo)
      .then(() => { this.setAlertData(this.props.securityReleaseAlertData) });
     }else{
     this.props.securityAlertDataDispatch(this.props.currentClientId,this.props.projectID, this.props.currentRepo)
       .then(() => { this.setAlertData(this.props.securityAlertData) });
     }
   }
 
   setAlertData = (rawData) => {
     this.setState({
       charts: rawData,
       componentType: "Alert"
     })
     
 
   }
 
  componentDidUpdate() {
    if (this.state.all_data) {
      const clientName = window.location.pathname.replace(/^\/([^\/]*).*$/, '$1');
      const labels = labelConst.filter((item)=> item.clientName === clientName );
      this.fetchSecurityData();
    }

  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.projectID !== nextProps.projectID) {
      this.setState({
        all_data: true
      });
    }
    if(this.props.currentClientId !== nextProps.currentClientId && nextProps.currenttab){
      this.setState({
        clientId: nextProps.currentClientId,
        currenttab: nextProps.currenttab
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
   
    console.log("total vulnerability",this.props.vulnerabilitytDetails.totalVulnerability);
  
    const clientName = window.location.pathname.replace(/^\/([^\/]*).*$/, '$1');
    const labels = labelConst.filter((item)=> item.clientName === clientName );
    const bgTheme = labels[0].mappings.bgColor;
    let securityNav=<CardChartSecurity showChart="true" insights={this.props.securityDetails} cardName="Open Source Vulnerabilities Risk" cardHeader="Security" bgTheme={bgTheme}/>
    const currentWidgetList = this.props.widgetList;
    const currentTabWidgets = currentWidgetList && currentWidgetList.filter(item=>item.name === "security");
    
    if(this.props.securityProjectData.id !== null){
    if (this.state.show) {
      return <Spinner show="true" />;
    } else {
      return (
        //  <div style={{ color: "white" }}>security </div>

        <React.Fragment>
         {this.props.securityDetails &&  this.state.showInsights?<SideNavbar  card={securityNav}/>:''}
          <Row className={`px-3 py-4 mt-11 d-flex justify-content-start ${bgTheme ? '' : 'bg-light'}`}>
          {currentTabWidgets[0] && currentTabWidgets[0].widgets && currentTabWidgets[0].widgets.includes(this.state.vulnerable) && 
            <Col sm={12} className="mb-3">
            <Card.Body className={`p-0 ${bgTheme ? 'card-border-dark' : 'card-border-light'}`}>
                <div className={`d-inline-flex w-100 justify-content-between ${bgTheme ? 'bg-prodInfo-prod text-light' : 'cardHeader text-dark'}`}>
                  <h6 className="font-weight-bold mb-1 p-0">Vulnerabilities</h6>
                  { !this.state.policyActive?(
                      <div className="text-right">               
                        <span className="font-size-small">
                            <FontAwesomeIcon  className="highbg ml-3" icon={faSquare} />{" "}
                            {labels[0].mappings.high}
                            </span>
                            <span className="font-size-small">
                            <FontAwesomeIcon  className="mediumbg ml-3" icon={faSquare} />{" "}
                            {labels[0].mappings.medium}
                            </span>
                            <span className="font-size-small">
                            <FontAwesomeIcon  className="lowbg ml-3" icon={faSquare} />{" "}
                            {labels[0].mappings.low}
                            </span>                                   
                        </div>
                        
                    ):<div></div>
                  }</div>
                <Card.Body className="p-0">
                  <Row className={`no-gutters p-3 ${bgTheme ? 'bg-dark-theme' : 'bg-white'}`}>
                  <Col sm={5} className="rounded" style={{border:'1px solid #999a9c'}}>
                  <h6 className="font-size-small font-weight-bold px-3 py-2">Vulnerabilities by SCA,SAST & DAST</h6>
                    <Row className="no-gutters px-3 "> 
                    {this.props.vulnerabilitytDetails.totalVulnerability.toolVulnerabilityList.map((item,index)=>
                       <Col className="pr-2"><BuildColumnSummaryTrend summaryTrend={item} type={'securityTab'+item.toolName} key={index} bgTheme={bgTheme}/></Col>
                      )} 
                    </Row>
                  </Col>
                  <Col sm={3} className="px-3">
                  {this.props.vulnerabilitytDetails.projectId!==null ? <BuildPieKpi openVulnerability={this.props.vulnerabilitytDetails.openVulnerabilityInProduction.toolVulnerabilityList}  type="securityTabPie" bgTheme={bgTheme}/>:''}
                  </Col>
                  <Col sm={4}>
                  {this.props.vulnerabilitytDetails.projectId!== null ? <BuildColumnSummaryTrend summaryTrend={this.props.vulnerabilitytDetails.newVulnerability} type="securityTabReverse" bgTheme={bgTheme}/>:''}
                  </Col>
                  </Row>
              </Card.Body>
            </Card.Body> 
          </Col>}</Row>
          <Row className={`px-3 d-flex justify-content-between ${bgTheme ? '' : 'bg-light'}`}>
          {currentTabWidgets[0] && currentTabWidgets[0].widgets && currentTabWidgets[0].widgets.includes(this.state.openSourceVul) && 
          <Col >
          <Card.Body className={`p-0 ${bgTheme ? 'bg-dark-theme card-border-dark' : 'bg-white card-border-light'}`}>
            <div className={`d-inline-flex w-100 justify-content-between ${bgTheme ? 'bg-prodInfo-prod' :'cardHeader'}`}>
              <h6 className="font-weight-bold mb-1">Open Source Vulnerabilities</h6>
              { !this.state.policyActive?(
              <div className={`text-right ${bgTheme ? 'text-white' : 'text-dark'}`}>               
              <span className="font-size-small">
                <FontAwesomeIcon  className="major ml-3" icon={faSquare} />{" "}
                {labels[0].mappings.major}
                </span>
                <span className="font-size-small">
                <FontAwesomeIcon  className="minor ml-3" icon={faSquare} />{" "}
                {labels[0].mappings.minor}
                </span>
                <span className="font-size-small">
                <FontAwesomeIcon  className="highbg ml-3" icon={faSquare} />{" "}
                {labels[0].mappings.high}
                </span>
                <span className="font-size-small">
                <FontAwesomeIcon  className="mediumbg ml-3" icon={faSquare} />{" "}
                {labels[0].mappings.medium}
                </span>
                <span className="font-size-small">
                <FontAwesomeIcon  className="lowbg ml-3" icon={faSquare} />{" "}
                {labels[0].mappings.low}
                </span>                  
                </div>
            ):<div></div>
            }</div>
            <Card.Body className="p-0">
            <Row className='no-gutters my-3 px-3'>
            <Col md={3} className="pr-3">
              <Dropdown
                listData={this.state.repoData}
                direction="down"
                onSelectDelegate={this.handleRepoChange}
                dropsLable={labels[0].mappings.repository}
              >
                <Row className={`h-100 repo-height m-0 p-0 rounded ${bgTheme ? 'bg-prodAgg-btn' : 'bg-prodAgg-light-btn'}`}>
                  <Col
                    sm={10}
                    md={10}
                    lg={10}
                    xl={10}
                    className="d-flex align-item-center justify-content-center"
                  >
                    <p className={`font-aggegate-sub-text text-ellipsis font-weight-bold m-auto text-left ${bgTheme ? 'text-white' : 'font-aggegate-sub-text-clr'}`}>
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
                    className={`font-aggegate-sub-text p-0 d-flex align-items-center ${bgTheme ? 'text-white' : 'font-aggegate-sub-text-clr'}`}
                  >
                    <FontAwesomeIcon icon={faChevronDown} />
                  </Col>
                </Row>
              </Dropdown>
            </Col>
            {this.state.selectedRepo &&
            <Col md={3} className="pr-3">
             <Dropdown
                listData={this.state.branchDropData}
                direction="down"
                dropsLable={labels[0].mappings.branch}
                onSelectDelegate={this.branchOnSelectHandler}
              >
                <Row className={`h-100 repo-height m-0 p-0 rounded ${bgTheme ? 'bg-prodAgg-btn' : 'bg-prodAgg-light-btn'}`}>
                  <Col
                    sm={10}
                    md={10}
                    lg={10}
                    xl={10}
                    className="d-flex align-item-center justify-content-center"
                  >
                    <p className={`font-aggegate-sub-text text-ellipsis font-weight-bold m-auto text-left ${bgTheme ? 'text-white' : 'font-aggegate-sub-text-clr'}`}>
                      {this.state.selectedBranch? <span className=' font-weight-bold'>{this.state.selectedBranch}</span>
                        : "Select Branch"}
                    </p>
                  </Col>
                  <Col
                    sm={2}
                    md={2}
                    g={2}
                    xl={2}
                    className={`font-aggegate-sub-text p-0 d-flex align-items-center  ${bgTheme ? 'text-white' : 'font-aggegate-sub-text-clr'}`}
                  >
                    <FontAwesomeIcon icon={faChevronDown} />
                  </Col>
                </Row>
              </Dropdown>
            </Col>
            }
            {this.state.selectedBranch &&
            <Col md={3} className="pr-3">
            <Dropdown
                listData={this.state.releaseDropData}
                direction="down"
                dropsLable={labels[0].mappings.release}
                onSelectDelegate={this.releaseOnSelectHandler}
              >
                <Row className={`h-100 repo-height m-0 p-0 rounded ${bgTheme ? 'bg-prodAgg-btn' : 'bg-prodAgg-light-btn'}`}>
                  <Col
                    sm={10}
                    md={10}
                    lg={10}
                    xl={10}
                    className="d-flex align-item-center justify-content-center"
                  >
                    <p className={`font-aggegate-sub-text text-ellipsis font-weight-bold m-auto text-left ${bgTheme ? 'text-white' : 'font-aggegate-sub-text-clr'}`}>
                      {this.state.selectedRelease? <span className=' font-weight-bold'>{this.state.selectedRelease}</span>
                        : "Select Release"}
                    </p>
                  </Col>
                  <Col
                    sm={2}
                    md={2}
                    g={2}
                    xl={2}
                    className={`font-aggegate-sub-text p-0 d-flex align-items-center ${bgTheme ? 'text-white' : 'font-aggegate-sub-text-clr'}`}
                  >
                    <FontAwesomeIcon icon={faChevronDown} />
                  </Col>
                </Row>
              </Dropdown>
            </Col>
              }
              <Col md={3} className="mt-auto">
              <p className={`font-size-small m-0 ${bgTheme ? 'text-white' : 'text-dark'}`} >You are viewing data at <b>{this.state.filterStatus}</b> level</p></Col>
          </Row>
          <Row className={`mb-2 no-gutters px-3 ${bgTheme ? '' : 'bg-light'}`}>
            <Col>
              {this.state.showbutton && <>
                <span><Button variant="outline-dark" className={this.state.alertActive?"bgblue":"Alertbg"}  onClick ={this.setAlert}>{labels[0].mappings.alertBtn}</Button>
              </span>
                      
              <span className="ml-3">
            
                          <Button variant="outline-dark"  className={this.state.policyActive?"bgblue":"Alertbg"} onClick ={this.setPolicy}>{labels[0].mappings.policiesBtn}</Button>
                        {/* <button className="bg-prodAgg-btn" style={{ color: '#FFFFFF', paddingLeft: '5px', background: '#1D2632', border: '#364D68', minWidth: '6rem' }} onClick ={this.setPolicy} >Policy</button> */}
        
              </span></>}
            </Col>
            </Row>
            {this.state.charts.length && this.state.componentType === "Product" ? (
            <Sec cardsData={this.state.charts} bgTheme={bgTheme}/>
          ) : null}
          {this.state.charts.length && this.state.componentType === "Project" ? (
            <SecurityOnProjectSelection cardsData={this.state.charts} bgTheme={bgTheme}/>
          ) : null}
          { this.state.componentType === "Policy" ? (
            <Policy cardsData={this.state.charts} bgTheme={bgTheme}/>
          ) : null}
          {this.state.componentType === "Alert" ? (
           <App cardsData = {this.state.charts} bgTheme={bgTheme}/>
          ) : null}
          </Card.Body>
        </Card.Body>
        </Col>}
        {currentTabWidgets[0] && currentTabWidgets[0].widgets && currentTabWidgets[0].widgets.includes(this.state.sastDastVul) && 
        <Col className="col-lg-6">
        <Card.Body className={`p-0 ${bgTheme ? 'bg-dark-theme card-border-dark': 'bg-white card-border-light'}`}>
        <div className={`d-inline-flex w-100 justify-content-between ${bgTheme ? 'bg-prodInfo-prod' :'cardHeader'}`}>
            <h6 className="font-weight-bold mb-1 p-0">SAST and DAST Vulnerabilities</h6>
            <div className="text-right">               
            <span className="font-size-small">
                <FontAwesomeIcon  className="highbg ml-3" icon={faSquare} />{" "}
                {labels[0].mappings.high}
                </span>
                <span className="font-size-small">
                <FontAwesomeIcon  className="mediumbg ml-3" icon={faSquare} />{" "}
                {labels[0].mappings.medium}
                </span>
                  </div>
                  </div>
                <Card.Body className="p-0">
                  {this.props.vulnerabilitytDetails.projectId!== null ? <SecSastDast cardsSastDast={this.props.vulnerabilitytDetails} bgTheme={bgTheme}></SecSastDast>:''}
                </Card.Body>
          </Card.Body>
        </Col>}
        </Row> 
        </React.Fragment>
      );
    }
  }else{
      return <div className={`p-2 text-center ${bgTheme ? 'text-white' : 'text-dark'}`}>No Data Found</div>;
    }
  }
}

//function to map the state received from reducer

const mapStateToProps = state => {
  return {
    // clientList: 
    currentExecId: state.execData.executiveId,
    currentClientId: state.execData.currentClientId,
    widgetList: state.execData.widgetList,
    securityProjectData: state.securityData.securityProjectDetails,
    securityRepoData: state.securityData.securityRepoDetails,
    securityReleaseData: state.securityData.securityReleaseDetails,
    securityPolicyData: state.securityData.securityPolicyDetails,
    securityReleasePolicyData: state.securityData.securityReleasePolicyDetails,
    securityAlertData: state.securityData.securityAlertDetails,
    securityReleaseAlertData: state.securityData.securityReleaseAlertDetails,
    projectID: state.productDetails.currentProject.projectDetails.id,
    currentRepo: state.securityData.currentRepo,
   // sprintId: state.productDetails.currentSprint.sprintInfo.id,
    securityDetails: state.securityData.securityDetails,
    vulnerabilitytDetails:state.securityData.vulnerabilitytDetails
  };
};

//function to dispatch action to the reducer

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { vulnerabilityDataDispatch,
      securityProjectDataDispatch, 
      resetProjectRepoDispatch,
      securityReleaseDataDispatch, 
      repoDropValDispatchSecurity, 
      securityRepoDataDispatch, 
      insightsSecurity,
      securityPolicyDataDispatch,
      securityReleasePolicyDataDispatch, 
      securityAlertDataDispatch,
      securityReleaseAlertDataDispatch,
      widgetListDispatch },
    dispatch
  );
};

//Connect react component to redux

export default connect(mapStateToProps, mapDispatchToProps)(Security);
