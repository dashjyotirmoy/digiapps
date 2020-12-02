//Component to render velocity and efficienty reports

import React, { Component } from "react";
import Grid from "../../Grid-Layout/Grid";
import ControlChartHigh from "../../Charts/ControlChartHigh/ControlChartHigh";
import { chartDataDispatch, velocityProjectDataDispatch, velocityBuildDataDispatch, velocityRepoDropValDispatch } from "../../../../store/actions/chartData";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown
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
import CardChartVelocity from "../../CardChart/CardChartVelocity";
import SideNavbar from "../../SideNavBar/SideNavbar";
import Badge from 'react-bootstrap/Badge';
import { labelConst } from "../../../../utility/constants/labelsConstants";
class Velocity extends Component {
  state = {
    charts: [],
    velocityBuildData: [],
    showbutton: true,
    showDropdown: false,
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
    componentType: "velocity",
    repoData: [],
    filterStatus: 'Team',
    showRemovedItemsList: [],
    removed: [],
    bgTheme:'',
    clientId:''
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
  }
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
  }
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
          <VelocityTrend title={title} type={type} data={data} key={title} bgTheme={this.state.bgTheme}/>
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
            bgTheme={this.state.bgTheme}
          />
        );
      case "ProjectBurnDown":
        return (
          <BreakDownHigh title={title} type={type} data={data} key={title} bgTheme={this.state.bgTheme}/>
        );
      case "SprintBurndown":
        return (
          <SprintBurndown title={title} type={type} data={data} key={title} bgTheme={this.state.bgTheme}/>
        );
      default:
        return "";
    }
  };

  // function that create the chart object to paint the chart

  createChartObject = rawData => {
    const processedData = rawData && rawData.map(ele => {
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
      nextProps.sprintId && nextProps.currentClientId && this.state.showRemovedItemsList
    ) {
      this.setState({
        all_data: true,
        clientId: nextProps.currentClientId
      });
    }
  }

  componentDidMount() {
    const clientName = window.location.pathname.replace(/^\/([^\/]*).*$/, '$1');
    const labels = labelConst.filter((item)=> item.clientName === clientName );
    const bgTheme = labels[0].mappings.bgColor;
    bgTheme ? document.body.style.background = '#1d2632': document.body.style.background = '#ffffff';
    if (this.props.projId && this.props.sprintId) {
      this.setState({
        all_data: true
      });
    }
    let layout_instance = new Layout(5);
    this.setState({
      layout: layout_instance.layout,
      bgTheme: bgTheme
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
      .velocityProjectDataDispatch(this.props.projId,this.state.clientId)
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
      if (ele.jobId === id) {
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
        selectedRepo: "",
        filterStatus: "Team"
      });

      this.props.velocityRepoDropValDispatch("");
    }  else {
      this.setState({
        repoData: [],
        selectedRepo: "",
      });
      this.props.velocityRepoDropValDispatch("");
    }
  };

  //function to fetch charts data

  fetchChartsData = () => {debugger
    this.setState({
      all_data: false,
      charts: []
    });
    this.props
      .chartDataDispatch(
        this.state.clientId,
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
    this.updateRepository(repoID);
  };

  updateRepository = (repoId) => {
    const { list, selectedIndex } = this.markSelected(
      this.props.velocityProjectData.jobDetailDtoList,
      repoId
    );
    const repoDetails = list.map((ele) => {
      return {
        id: ele.jobId,
        projectName: ele.jobName,
      };
    });
    this.setState({
      selectedRepo: repoDetails[selectedIndex].projectName,
      selectedRepoKey: repoDetails[selectedIndex].id,
      filterStatus: "Repository"
    });
    this.props.velocityRepoDropValDispatch(repoDetails[selectedIndex].projectName);
    // if (repoId !== "selectProject") {
      this.props.velocityBuildDataDispatch(this.props.projId, repoId)
      .then(() => { this.setVelocityBuildData(this.props.velocityBuildData) });
  };

  setCode = () => {
    this.setState({
      componentType: "velocity",
      buildActive: false,
      showDropdown: false,
      codeActive: true
    });
  }

  setBuild = () => {
      this.setState({
        buildActive: true,
        showDropdown: true,
        componentType:"VelocityBuild",
        codeActive: false
      });
  }

  setVelocityBuildData = (rawData) => {
    this.setState({
      velocityBuildData: rawData,
    })
  }


  render() {
    const clientName = window.location.pathname.replace(/^\/([^\/]*).*$/, '$1');
    const labels = labelConst.filter((item)=> item.clientName === clientName );
    const bgTheme = labels[0].mappings.bgColor;
    let velocityNav=<CardChartVelocity showChart="true" insights={this.props.velocityInsightDetails} cardName="Velocity Variance" cardHeader="Velocity and Efficiency" />
    if (this.state.show) {
      return <Spinner show="true" />;
    } else {
      return (
        <React.Fragment>
          {this.props.velocityInsightDetails &&<SideNavbar card={velocityNav}/>}
          <Row className={`px-3 py-4 d-flex justify-content-start`} style={{alignItems:'flex-end'}}>
              <span className="px-3">
                {this.state.showbutton ? (
                  <Button variant="outline-dark" className={this.state.codeActive ? "bgblue" : "Alertbg"} onClick={this.setCode}>{labels[0].mappings.overviewBtn}</Button>
                ) : null}
              </span>

              <span>
                {this.state.showbutton ? (
                  <Button variant="outline-dark" className={this.state.buildActive ? "bgblue" : "Alertbg"} onClick={this.setBuild}>{labels[0].mappings.buildBtn}</Button>
                  ) : null}
              </span>
            {this.state.showDropdown ? (
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
               ) : null}
            <Col md={3} className="mt-auto"><p className={`font-size-small m-0 ${bgTheme ? 'text-white' : 'text-dark'}`}>You are viewing data at <b>{this.state.filterStatus}</b>  level</p></Col>
            {this.state.componentType === "velocity" ? 
            <span className="text-white ml-auto w-20">
            <p className={`m-0 font-size-smaller ${bgTheme ? '' : 'text-dark'}`}>Add Widgets</p>
            <select className="drop repo-height text-white rounded border border-light w-100" onChange={(event)=> this.addCharts(event)} >
            <option selected value=''>Select Widget</option>
              {
                this.state.showRemovedItemsList && this.state.showRemovedItemsList.map((item, index) =>
                <option key={index} value={item.name} >
                        {item.name}
              </option>
              )
                }</select></span>: null}
         </Row>
          {this.state.charts.length > 0 && this.state.componentType === "velocity"? (
            <Grid
              chartData={this.state.charts}
              layouts={this.state.layout}
              removeDelegate={this.removeChartComponent}
              breakpoint={this.state.gridBreakpoints}
              columnSize={this.state.gridCol}
              bgTheme={bgTheme}
            />
          ) : null}
          {this.state.componentType === "VelocityBuild"? (
            <VelocityBuild cardsData={this.state.velocityBuildData} bgTheme={bgTheme}/>
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
    velocityCharts: state.chartData.currentChartData.chartDetails,
    projId: state.productDetails.currentProject.projectDetails.id,
    sprintId: state.productDetails.currentSprint.sprintInfo.id,
    teamId: state.productDetails.currentSprint.teamId,
    currentRepo: state.chartData.currentRepo,
    velocityBuildData: state.chartData.velocityBuildDetails,
    velocityProjectData: state.chartData.velocityProjectDetails,
    organization: state.productDetails.currentProject.projectDetails.organization,
    velocityInsightDetails: state.insightData.velocityInsightDetails,
  };
};

//function to dispatch action to the reducer

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ chartDataDispatch, velocityProjectDataDispatch, velocityBuildDataDispatch, velocityRepoDropValDispatch }, dispatch);
};

//Connect react component to redux

export default connect(mapStateToProps, mapDispatchToProps)(Velocity);
