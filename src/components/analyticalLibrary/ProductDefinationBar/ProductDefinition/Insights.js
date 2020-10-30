import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { Container, Col, Row} from "react-bootstrap";
import CardChartSecurity from "../../CardChart/CardChartSecurity";
import CardChartVelocity from "../../CardChart/CardChartVelocity";
import CardChartQuality from "../../CardChart/CardChartQuality";
import { connect } from "react-redux";
import {insightsQuality,insightsSecurity} from "../../../../store/actions/sprintInsights";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown
} from "@fortawesome/free-solid-svg-icons";
import Dropdown from "../../Dropdown/Dropdown";
import Spinner from "../../Spinner/Spinner";
import api from "../../../../utility/Http/devOpsApis";
class Insights extends Component {
  constructor(props) {
    super(props);
    this.state = {
      repoData: [],
      branchDropData:[],
      objectType: "",
      objectSubtype: "",
      selectedRepo: "",
      selectedBranch:"",
      selectedRelease: "",
      disableDrop: true,
      showRelease: false,
      show: true,
      noData:false,
      isDisabledBranch: true,
      isDisabledRelease: true,
      isClearable: true,
      items: [],
      projectList:[],
      selectedProduct: ""
    }
  }
  // Project List Dropdown starts here
  prodOnSelectHandler = (prodId, evtKey) => {
    this.updateProject(prodId);
  };
  branchOnSelectHandler= (branchId, evtKey) => {
    this.updateBranch(branchId);
  };
  getBranchDetails = (projectID, projName) => {
    api
      .getBranchDropdownInsight(projectID, projName)
      .then(this.setBranch)
      .catch(error => {
        console.error(error);
      });
  };
  setBranch = (res) => {
     const branch = res.data;
     const { list, selectedIndex } = this.markSelected(branch, branch[0].id);
     const branchDetail = list.map(ele => {
       return {
         id: ele.id,
         projectName: ele.branchName
       };
     });
     this.setState({
      branchDropData: branchDetail,
       selectedBranch: branchDetail[selectedIndex].projectName
     });
     this.props.insightsSecurity(branchDetail[selectedIndex].projectName, this.props.projectID,this.state.selectedProduct);
     this.props.insightsQuality(branchDetail[selectedIndex].projectName,this.props.currentExecId, this.props.projectID,this.state.selectedProduct);
    };
  setProject = (res) => {
    const projects = res.data;
    if (projects !== null) {
    const { list, selectedIndex } = this.markSelected(projects, projects[0].id);
    const prrojDetail = list.map(ele => {
      return {
        id: ele.id,
        projectName: ele.projectName
      };
    });
    this.setState({
      show:false,
      noData:false,
      repoData: prrojDetail,
      selectedProduct: prrojDetail[selectedIndex].projectName
    });
    this.getBranchDetails(this.props.projectID, projects[selectedIndex].projectName);
  }
  else{
    this.setState({
      show:false,
      noData:true
     
    });
  }
  };
  updateBranch = branchId => {
    const branchList = [...this.state.branchDropData];
    const { list, selectedIndex } = this.markSelected(branchList, branchId);
    const branchDetail = list.map(ele => {
      return {
        id: ele.id,
        projectName: ele.projectName
      };
    });
    this.setState({
      branchDropData: branchDetail,
      selectedBranch: branchDetail[selectedIndex].projectName
    }); 
    this.props.insightsSecurity(branchDetail[selectedIndex].projectName, this.props.projectID,this.state.selectedProduct);
    this.props.insightsQuality(branchDetail[selectedIndex].projectName,this.props.currentExecId, this.props.projectID,this.state.selectedProduct);
    
  };
  updateProject = projectId => {
    const projects = [...this.state.repoData];
    const { list, selectedIndex } = this.markSelected(projects, projectId);
    const prrojDetail = list.map(ele => {
      return {
        id: ele.id,
        projectName: ele.projectName
      };
    });
    this.setState({
      repoData: prrojDetail,
      selectedProduct: prrojDetail[selectedIndex].projectName
    });
    this.getBranchDetails(this.props.projectID, prrojDetail[selectedIndex].projectName);
  };
 
  markSelected = (prodList, id) => {
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
  fetchSecurityData = (props) => {
    this.setState({
      all_data: false
    });
    //setTimeout(() => {
      api
      .getProjectDropdownInsight(this.props.projectID)
      .then(this.setProject)
      .catch(error => {
        console.error(error);
      });
      
      
      //},3000); 

   // this.setDefaultData();
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
    if (this.state.show && !this.state.noData) {
      return <Spinner show="true" />;
    } else if(!this.state.show && this.state.noData){
   return(
    <Container fluid className="mt-3 Insights">
    <Row className="p-0  m-0 mt-4 mb-3 d-flex justify-content-start row">          
     
      <Col md={2}>No Data Found
        </Col></Row></Container>
   )
    }
      else{
      return (
      <Container fluid className="mt-3 Insights">
        <Row className="p-0  m-0 mt-4 mb-3 d-flex justify-content-start row">          
         
          <Col md={2}>
              <Dropdown
                listData={this.state.repoData}
                direction="down"
                dropsLable="Repository"
                onSelectDelegate={this.prodOnSelectHandler}
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
                    {this.state.selectedProduct}
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
          <Col md={2}>
              <Dropdown
                listData={this.state.branchDropData}
                direction="down"
                dropsLable="Branch"
                onSelectDelegate={this.branchOnSelectHandler}
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
                      {this.state.selectedBranch}
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
            <span className='mt-auto'><p className="font-size-small m-0 text-left">You are viewing data at <b>Repository</b> level</p></span>
        </Row>
        <Row className="m-0 p-0">
          <Col
            
            className="bg-card"
          >
            <CardChartSecurity insights={this.props.securityDetails} cardName="Open Source Vulnerabilities Risk" cardHeader="Security"/>
          </Col>
          <Col
            
            className="bg-card p-0"
          >
            <CardChartVelocity insights={this.props.velocityInsightDetails} cardName="Velocity Variance" cardHeader="Velocity and Efficiency" />
          </Col>
          <Col

            className="bg-card"
          >
            <CardChartQuality insights={this.props.qualityDetails} cardName="Code Quality Analysis" cardHeader="Quality" />
          </Col>
        </Row>
      </Container>
    );
      }
  }
};
const mapStateToProps = state => {
  return {
    currentExecId: state.execData.executiveId,
    projectID: state.productDetails.currentProject.projectDetails.id,
    teamId: state.productDetails.currentSprint.teamId,
    velocityInsightDetails: state.insightData.velocityInsightDetails,
    securityDetails: state.insightData.securityDetails,
    qualityDetails: state.insightData.qualityDetails,
  };
};
const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
       insightsQuality,
      insightsSecurity,
    },
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(Insights);
