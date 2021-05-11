//Component to render velocity and efficienty reports

import React, { Component } from "react";
import Grid from "../../Grid-Layout/Grid";
import ControlChartHigh from "../../Charts/ControlChartHigh/ControlChartHigh";
import { buildPullDataDispatch,buildReleaseDataDispatch,buildRepoDropValDispatch } from "../../../../store/actions/buildChartData";
// import { velocityRepoDropValDispatch } from "../../../../store/actions/chartData";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown
} from "@fortawesome/free-solid-svg-icons";
import StackedBar from "../../Charts/StackedBar/StackedBar";
import PieChart from "../../Charts/PieChart/PieChart";
import LineHigh from "../../Charts/LineHigh/LineHigh";
import ColumnHigh from "../../Charts/ColumnHigh/ColumnHigh";
import VelocityTrend from "../../Charts/VelocityTrends/VelocityTrend";
import Spinner from "../../Spinner/Spinner";
import Layout from "../../../../utility/layoutManager/layoutManager";
import { Row, Col, Button } from "react-bootstrap";
import Dropdown from "../../Dropdown/Dropdown";
import { labelConst } from "../../../../utility/constants/labelsConstants";
import { widgetListDispatch } from "../../../../store/actions/executiveInsights";
class BuildRelease extends Component {
  state = {
    charts: [],
    velocityBuildData: [],
    showbutton: true,
    layout: {
      lg: [],
      md: []
    },
    gridCol: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
    gridBreakpoints: { lg: 1200, md: 768, sm: 576, xs: 480, xxs: 0 },
    show: true,
    selectedRepo: "",
    codeActive: true,
    buildActive: false,
    repoData: [],
    filterStatus: 'Team',
    showRemovedItemsList: [],
    removed: [],
    bgTheme:'',
    clientId:'',
    defaultFilter:"",
    defaultDrop:"",
    resetFilter: false,
    selectWidget: 'Select Widget',
    dropFilter: [{ value: "all_time", label: "All Time" },{ value: "last_1_month", label: "Last Month" }, { value: "last_3_months", label: "Last 3 Months" }],
    dropData: [{value: "all_branches", label: "All Branches" },{ value: "long_live_branches", label: "Long Live Branches" }],
    repositoryWidgets:[{
      name:'Build Results',
      type:'BuildResult',
      showDrop: true,
      showFilter: true,
      
    },
    {
      name:'Mean Time to Fix Broken Builds',
      type:'MeanTimeBrokenBuild',
      showDrop: true,
      showFilter: true,
   
    },
    {
      name:'Release Cadence',
      type:'ReleaseCadence',
      showDrop: false,
      showFilter: true,
   
    },
    {
      name:'Open v/s Closed Pull Requests',
      type:'OpenClosedPullRequests',
      showDrop: false,
      showFilter: true,
     
    },
    {
      name:'Mean Time to Merge Pull Requests',
      type:'MeanTimeMergePullRequest',
      showDrop: false,
      showFilter: true,
  
    },{
      name:'Committed PRs with & without Rework',
      type:'CommittedPrsWithAndWithoutRework',
      showDrop: false,
      showFilter: true,
    }
  ],

  };

  addCharts = (event) => {
    if(event.target.value!==''){
    const widgetName = event.target.value;
    const userObj = this.state.showRemovedItemsList.find(u => u.name === widgetName);
    const key = this.state.showRemovedItemsList.findIndex(u => u.name === widgetName);
    this.addChartList(userObj,key);
    const layouts = {};
    Object.keys(this.state.layout).map(key => {
      let copy = [...this.state.layout[key]];
      if (key === "lg") {
        let layout_instance = new Layout(copy.length + 1);
        copy = layout_instance.layout.lg;
      } else if (key === "md") {
        let layout_instance = new Layout(copy.length + 1);
        copy = layout_instance.layout.md;
      }
      layouts[key] = copy;
    });

    this.setState({
      layout: layouts
    });
  }
  };
  addChartList= (list,removedindex) => {
    let updatedList = [...this.state.charts];
    let updatedRemoveBadge = this.state.showRemovedItemsList.filter((ele,index)=>{
      if (index !== removedindex) return Object.assign({},ele)
    });    
    updatedList.unshift(list)
    updatedList.map(ele => {
      ele.component = this.setChart(
        ele.type,
        ele.title,
        ele.data
      );
    });
    this.setState({
      charts: updatedList,
      showRemovedItemsList: updatedRemoveBadge
    });
  };
  //function to remove a chart component from the grid layout

  removeChartComponent = chartIndex => {
    const charts = [...this.state.charts];
    this.createCharts(charts, chartIndex);
    const layouts = {};
    this.state.showRemovedItemsList.push(this.state.charts[chartIndex]);
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
    let updatedList =list && list.filter((ele, index) => {
      if (index !== removed) return Object.assign({}, ele);
    });
    updatedList && updatedList.map(ele => {
      ele.component = this.setChart(
        ele.type,
        ele.title,
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
      case "BuildResult":
        return (
          <PieChart title={title} type={type} data={data} key={title} bgTheme={this.state.bgTheme}/>
        );
      case "MeanTimeBrokenBuild":
        return (
          <ColumnHigh title={title} type={type} data={data} key={title} bgTheme={this.state.bgTheme}/>
        );
      case "OpenClosedPullRequests":
        return (
          <StackedBar title={title} type={type} data={data} key={title} bgTheme={this.state.bgTheme}/>
        );
      case "MeanTimeMergePullRequest":
        return (
          <LineHigh title={title} type={type} data={data} key={title} bgTheme={this.state.bgTheme}/>
        );
      case "ReleaseCadence":
        return (
          <VelocityTrend title={title} type={type} data={data} key={title} bgTheme={this.state.bgTheme}/>
        );
        case "CommittedPrsWithAndWithoutRework":
        return (
          <VelocityTrend title={title} type={type} data={data} key={title} bgTheme={this.state.bgTheme}/>
        );
      default:
        return "";
    }
  };

  // function that create the chart object to paint the chart

  createChartObject = rawData => {
    const processedData = rawData && rawData.map(ele => {
      return {
        i:ele.i,
        name: ele.name,
        type: ele.type,
        data: ele.data,
        title: ele.name,
        showDrop: ele.showDrop,
        showFilter: ele.showFilter,
        component: {}
      };
    });
    return processedData;
  };
  //compare the current props and incoming props
  setBuildReleaseFilterData(releaseData,type){
    // this.setState({
    //   build_data:false
    // });
    this.state.repositoryWidgets.filter((item)=>{
      if(type==='BuildResult'){
        return Object.assign(this.state.repositoryWidgets[0], {data: releaseData.buildResultDTO.allBranchesBuildDTO});
        
      }else if(type==='MeanTimeBrokenBuild'){
          return Object.assign(this.state.repositoryWidgets[1], {data: releaseData.meanTimeToFixBrokenBuildDTO.allBranchesBrokenBuildDTO});
          
      }else if(type==='ReleaseCadence'){
        return Object.assign(this.state.repositoryWidgets[2], {data: releaseData.releaseDetailDTO});
         
      }else if(type==='OpenClosedPullRequests'){
        return Object.assign(this.state.repositoryWidgets[3], {data: releaseData.pullRequestDTO}); 
      }
      else if(type==='MeanTimeMergePullRequest'){
        return Object.assign(this.state.repositoryWidgets[4], {data: releaseData.pullRequestDTO}); 
      }else {
        return Object.assign(this.state.repositoryWidgets[5], {data: releaseData.pullRequestDTO}); 
      }
    });
    this.createCharts(
      this.createChartObject(this.state.repositoryWidgets)
    );
    let layout_instance = new Layout(6);
    this.setState({
      layout: layout_instance.layout
    });
    this.setState({
      // response: this.props.velocityCharts,
      received: true,
      show: false
    });
  };
  setBuildReleaseData(releaseData){
    // this.setState({
    //   build_data:false
    // });
    this.state.repositoryWidgets.map((item)=>{
      if(item.type==='BuildResult'){
        Object.assign(item, {data: releaseData.buildResultDTO.allBranchesBuildDTO});
        
      }else if(item.type==='MeanTimeBrokenBuild'){
          Object.assign(item, {data: releaseData.meanTimeToFixBrokenBuildDTO.allBranchesBrokenBuildDTO});
          
      }else if(item.type==='ReleaseCadence'){
        Object.assign(item, {data: releaseData.releaseDetailDTO});
         
      }else{
        Object.assign(item, {data: this.props.buildPullChart.pullRequestDTO});
         
      }
    });
    this.createCharts(
      this.createChartObject(this.state.repositoryWidgets)
    );
    let layout_instance = new Layout(6);
    this.setState({
      layout: layout_instance.layout
    });
    this.setState({
      received: true,
      show: false
    });
  };
  setRepoitoryWidget() {
    this.setState({
      all_data: false,
    });
    this.props.widgetListDispatch(this.state.clientId ? this.state.clientId:this.props.currentClientId);
    this.props
      .buildPullDataDispatch(this.props.currentClientId,'all_time',this.props.projId,this.props.currentSourceType)
      .then(item => {
        if (this.props.buildPullChart.pullRequestDTO.pullRequestDetailDTOList.length > 0 || this.props.buildPullChart.pullRequestDTO.pullRequestDetailDTOList !== null) {
          this.setRepository(this.props.buildPullChart);
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
  };

  markSelected = (prodList, id) => {
    const resetList = this.resetSelect(prodList);
    let selectedIndex = 0;
    const selectedParamList = resetList.map((ele, index) => {
      if (ele.repoId === id) {
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
  handelDrop = (type,dropValue) => {debugger
    this.setState({
      defaultDrop:''
    });
    const data = this.props.buildReleaseChart;
    if(dropValue==="long_live_branches"){
      if(type==="BuildResult"){
        Object.assign(this.state.repositoryWidgets[0], {data: data.buildResultDTO.onlylongLiveBranchesBuildDTO});
      }else{
        Object.assign(this.state.repositoryWidgets[1], {data: data.meanTimeToFixBrokenBuildDTO.onlyLongLiveBranchesBrokenBuildDTO});
      }
    }else{
      if(type==="Build Results"){
        Object.assign(this.state.repositoryWidgets[0], {data: data.buildResultDTO.allBranchesBuildDTO});
      }else{
        Object.assign(this.state.repositoryWidgets[1], {data: data.meanTimeToFixBrokenBuildDTO.allBranchesBrokenBuildDTO});
      }
    }
    this.createCharts(
      this.createChartObject(this.state.repositoryWidgets)
    );
  };
  handelFilter = (type,filterValue) => {
    this.setState({
      defaultFilter:'',
      defaultDrop: 'all_branches'
    })
    if(type==="BuildResult" || type==="ReleaseCadence" || type==='MeanTimeBrokenBuild'){
      return this.props.buildReleaseDataDispatch(this.props.currentClientId,filterValue,this.props.projId,this.props.buildReleaseChart.repoId,this.props.currentSourceType)
      .then(()=> {
        this.setBuildReleaseFilterData(this.props.buildReleaseChart,type);
      }).catch(error => {
        console.error(error);
      });
    }else if(type==="OpenClosedPullRequests" || type==='MeanTimeMergePullRequest'|| type==='CommittedPrsWithAndWithoutRework'){
      return this.props
      .buildPullDataDispatch(this.props.currentClientId,filterValue,this.props.projId,this.props.currentSourceType)
      .then(() => {
        this.setBuildReleaseFilterData(this.props.buildPullChart,type);
      }).catch(error => {
        console.error(error);
      });
    }
  };
  setRepository = res => {
    const repositoryData = res.pullRequestDTO.pullRequestDetailDTOList;
    if (repositoryData !== null) {
      const { list } = this.markSelected(
        repositoryData,
        repositoryData[0].repoId
      );
      const repoDetails = list.map(ele => {
        return {
          id: ele.repoId,
          projectName: ele.repoName
        };
      });
      this.props.buildReleaseDataDispatch(this.props.currentClientId,"all_time",this.props.projId,repositoryData[0].repoId,this.props.currentSourceType)
      .then(item => {
        this.setBuildReleaseData(this.props.buildReleaseChart);
      }).catch(error => {
        console.error(error);
      });
      // this.props.buildReleaseDataDispatch(this.props.currentClientId,'all_time',this.props.projId,repositoryData[0].repoId,this.props.currentSourceType);
      this.setState({
        repoData: repoDetails,
        selectedRepo: "",
        filterStatus: "Team",
        selectedRepo: repositoryData[0].repoName,
        defaultFilter: 'all_time',
        defaultDrop:'all_branches'
      });
      this.props.buildRepoDropValDispatch("");
    }  else {
      this.setState({
        repoData: [],
        selectedRepo: "",
      });
      this.props.buildRepoDropValDispatch("");
    }
  };
  handleRepoChange = repoID => { 
    this.updateRepository(repoID);
  };

  updateRepository = (repoId) => {
    const { list, selectedIndex } = this.markSelected(
      this.props.buildPullChart.pullRequestDTO.pullRequestDetailDTOList,
      repoId
    );
    const repoDetails = list.map((ele) => {
      return {
        id: ele.repoId,
        projectName: ele.repoName,
      };
    });
    this.setState({
      selectedRepo: repoDetails[selectedIndex].projectName,
      selectedRepoKey: repoDetails[selectedIndex].id,
      filterStatus: "Repository",
      defaultFilter: 'all_time',
      defaultDrop:'all_branches'
      
    });
    this.props.buildRepoDropValDispatch(repoDetails[selectedIndex].projectName);
    this.props.buildReleaseDataDispatch(this.props.currentClientId,"all_time",this.props.projId,repoDetails[selectedIndex].id,this.props.currentSourceType)
    .then(item => {
      this.setBuildReleaseData(this.props.buildReleaseChart);
    }).catch(error => {
      console.error(error);
    });
      this.setState({
        repoData: repoDetails,
        selectedRepo: repoDetails[selectedIndex].projectName
      });
  };
  
  UNSAFE_componentWillReceiveProps(nextProps) {debugger
    if (this.props.projId !== nextProps.projId || this.props.teamId !== nextProps.teamId || this.props.sprintId !== nextProps.sprintId || this.props.projectSprintId !== nextProps.projectSprintId)
    {
      this.setState({
        all_data: true,
        // build_data: true
      });
    }
    if(this.props.currentClientId !== nextProps.currentClientId){
      this.setState({
        clientId: nextProps.currentClientId
      });
    }
  };

  componentDidMount() {
    const clientName = window.location.pathname.replace(/^\/([^\/]*).*$/, '$1');
    const labels = labelConst.filter((item)=> item.clientName === clientName );
    const bgTheme = labels[0].mappings.bgColor;
    bgTheme ? document.body.style.background = '#1d2632': document.body.style.background = '#ffffff';
    if (this.props.projId && (this.props.sprintId || this.props.projectSprintId)) {
      this.setState({
        all_data: true,
        // build_data: true
      });
    }
    let layout_instance = new Layout(6);
    this.setState({
      layout: layout_instance.layout,
      bgTheme: bgTheme
    });
  };

  componentDidUpdate() {
    if (this.state.all_data) {
      this.setRepoitoryWidget();
    }
    // if(this.state.build_data && this.props.buildReleaseChart){
    //     this.setBuildReleaseData(this.props.buildReleaseChart);
    // }
  };
  render() {
    const clientName = window.location.pathname.replace(/^\/([^\/]*).*$/, '$1');
    const labels = labelConst.filter((item)=> item.clientName === clientName );
    const bgTheme = labels[0].mappings.bgColor;
    const currentWidgetList = this.props.widgetList;
    const currentTabWidgets = currentWidgetList && currentWidgetList.filter(item=>item.name === 'velocity');
    if (this.state.show) {
      return <Spinner show="true" />;
    } else {
      return (
        <React.Fragment>
          <Row className={`container-fluid px-3 py-4 mt-12 d-flex justify-content-start`} style={{alignItems:'flex-end'}}>
          <Col md={2}>
              <Dropdown
                listData={this.state.repoData}
                direction="down"
                dropsLable={labels[0].mappings.repository}
                onSelectDelegate={this.handleRepoChange}
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
                        ? <span className=' font-weight-bold'>{this.state.selectedRepo}</span>
                        : "Select Repository"}
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
            <Col md={3} className="mt-auto"><p className={`font-size-small m-0 ${bgTheme ? 'text-white' : 'text-dark'}`}>You are viewing data at <b>{labels[0].mappings.teamLabel}</b>  level</p></Col>
            {this.state.showRemovedItemsList.length !== 0 ? 
            <span className="text-white ml-auto w-20">
            <p className={`m-0 font-size-smaller ${bgTheme ? '' : 'text-dark'}`}>Add Widgets</p>
            <select className={`repo-height rounded w-100 rounded ${bgTheme ? 'bg-prodAgg-btn text-white' : 'bg-prodAgg-light-btn'}`} value={this.state.selectWidget || ''} onChange={(event)=> this.addCharts(event)} >
                     <option selected value=''>{this.state.selectWidget}</option>
              {
                this.state.showRemovedItemsList && this.state.showRemovedItemsList.map((item, index) =>
                <option key={index} value={item.name} className={`${bgTheme ? 'text-white' : 'font-aggegate-sub-text-clr'}`}>
                        {item.name}
              </option>
              )
                }</select></span>: null}
         </Row>
          {this.state.charts.length > 0 ? (
            <Grid
              chartData={this.state.charts}
              layouts={this.state.layout}
              removeDelegate={this.removeChartComponent}
              breakpoint={this.state.gridBreakpoints}
              columnSize={this.state.gridCol}
              bgTheme={bgTheme}
              dropFilter={this.state.dropFilter}
              dropData={this.state.dropData}
              defaultFilter= {this.state.defaultFilter}
              defaultDrop= {this.state.defaultDrop}
              resetAll={this.state.resetFilter}
              onSelectFilter={this.handelFilter}
              onSelectDrop={this.handelDrop}
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
    currentClientId: state.execData.currentClientId,
    widgetList: state.execData.widgetList,
    buildPullChart: state.buildData.buildPullProjectDetails,
    buildReleaseChart: state.buildData.buildReleaseProjectDetails,
    projId: state.productDetails.currentProject.projectDetails.id,
    sprintId: state.productDetails.currentSprint.sprintInfo.id,
    projectSprintId: state.productDetails.currentProjectSprint.sprintInfo.id,
    teamId: state.productDetails.currentSprint.teamId,
    organization: state.productDetails.currentProject.projectDetails.organization,
    velocityInsightDetails: state.insightData.velocityInsightDetails,
    currentSourceType: state.productDetails.currentProject.projectDetails.sourceType,
  };
};

//function to dispatch action to the reducer

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ widgetListDispatch,
  buildPullDataDispatch,buildReleaseDataDispatch, buildRepoDropValDispatch
  }, dispatch);
};

//Connect react component to redux

export default connect(mapStateToProps, mapDispatchToProps)(BuildRelease);
