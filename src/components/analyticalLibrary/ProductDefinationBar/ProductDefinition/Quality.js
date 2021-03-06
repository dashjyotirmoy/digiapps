import React, { Component } from "react";
import Grid from "../../Grid-Layout/Grid";
import classnames from "classnames";
import { Row, Container, Col, Button,ButtonGroup,ToggleButton } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquare,
  faEllipsisV,
  faInfoCircle,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import "../../QualityBuild/Quality.css"
import LineHigh from "../../Charts/LineHigh/LineHigh";
import AreaHigh from "../../Charts/AreaHigh/AreaHigh";
import StackedBar from "../../Charts/StackedBar/StackedBar";
import { repoDropValDispatch } from "../../../../store/actions/qualityData";
import BugsSvg from '../../Charts/SecurityProject/Bugs';
import CodeSmellsSvg from '../../Charts/SecurityProject/CodeSmells';
import CoverageSvg from '../../Charts/SecurityProject/Coverage';
import DuplicationsSvg from '../../Charts/SecurityProject/Duplications';
import VulnarabilitiesSvg from '../../Charts/SecurityProject/Vulnarabilities';
import QualityTeamDetails from "../../Charts/Bar/QualityTeamDetails";
import CardChartQuality from "../../CardChart/CardChartQuality";
import {
  qualityDataDispatch,
  qualityBuildDataDispatch,
  qualityDrilledDownDataDispatch,
  qualityDrilledDownDataFilterDispatch,
  qualityReleaseDataDispatch,
  qualityRepoDataDispatch
} from "../../../../store/actions/qualityData";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ColumnHigh from "../../Charts/ColumnHigh/ColumnHigh";
import BubbleHigh from "../../Charts/BubbleChart/BubbleChart";
import { TooltipHoc } from "../../TooltiHOC/TooltipHoc";
import ModalBackDrop from "../../ModalBackDrop/ModalBackDrop";
import { resetProjectRepoDispatch } from "../../../../store/actions/projectInsights";
import Spinner from "../../Spinner/Spinner";
import Dropdown from "../../Dropdown/Dropdown";
import { translations } from "../../Translations/Translations";
import Layout from "../../../../utility/layoutManager/layoutManager";
import { BubbleChartInfo } from "../../../analyticalLibrary/Charts/BubbleChart/BubbleChartInfo";
import QualityBuild from "../../QualityBuild/QualityBuild";
import api from "../../../../utility/Http/devOpsApis";
import SideNavbar from "../../SideNavBar/SideNavbar";
import {
  insightsQuality
}from "../../../../store/actions/qualityData";
import { labelConst } from "../../../../utility/constants/labelsConstants";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { widgetListDispatch } from "../../../../store/actions/executiveInsights";

const chartCompList = [
  {
    name: "Bugs, Vulnerabilities & Code Smells",
    type: translations.MultipleLineHigh,
    component: LineHigh,
    repoDependent: true,
  },
  {
    name: translations.coverage,
    type: translations.AreaHigh,
    component: AreaHigh,
    repoDependent: true,
  },
  {
    name: "Outstanding Bugs",
    type: translations.BarHigh,
    component: StackedBar,
    repoDependent: false,
  },
  {
    name: "Average Defect Resolution Time",
    type: translations.DefectHigh,
    component: ColumnHigh,
    repoDependent: false,
  },
];

let test = [];

class Quality extends Component {
  state = {
    charts: [],
    qualityBuildCharts: [],
    displayMetric: false,
    showbutton: false,
    metricType: "",
    layout: {
      lg: [],
      md: [],
    },
    gridCol: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
    gridBreakpoints: { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 },
    qualityMetrics: [],
    show: true,
    open: true,
    componentType: "quality",
    selectedRepo: "",
    branchDropData:[],
    releaseDropData:[],
    selectedBranch:"",
    selectedRelease:"",
    selectedRepoKey: "",
    repoData: [],
    showCode:false,
    showBuild:false,
    showInsights:false,
    filterStatus: 'Project',
    marginCard: '',
    showRemovedItemsList: [],
    removed: [],
    bgTheme:'',
    clientId:'',
    radioValue:'opened',
    qualityStatusDetails:'',
    defectAggregate: "Defects Aggregated View",
    buildStatus: "Build Status",
    selectWidget: 'Select Widget',
    radios: [
      { name: 'OPEN', value: 'opened' },
      { name: 'CLOSED', value: 'closed' },
      { name: 'ALL', value: 'all' }
    ]
  };
  setRadioValue = (e) => {
    this.setState({
      radioValue: e.currentTarget.checked
    })
  };
  removeKpi = () => {
    this.setState({
      open: false
    })
  };
  clickDetailsByStatus = (data)=> {
    if(data === 'all'){
      this.setState({        
        radioValue:'all'
      })
    }else if(data === 'opened'){
      this.setState({
        radioValue:'opened'
      })
    }else{
      this.setState({
        radioValue:'closed'
      })
      
    }

  };
  onDisplayMetricsClickHandler = (metricType) => {
    // eslint-disable-next-line default-case
    switch (metricType) {
      case "Bugs":
        this.getQualityDrilledDownData("Reliability");
        break;
      case "Vulnerabilities":
        this.getQualityDrilledDownData("Security");
        break;
      case "Code Smells":
        this.setState({
          marginCard: 'ml-3'
        });
        this.getQualityDrilledDownData("Maintainability");
        break;
      case "Coverage":
        this.getQualityDrilledDownData("Coverage");
        break;
      case "Duplications":
        this.getQualityDrilledDownData("Duplications");
    }
    this.setState({
      displayMetric: true,
      metricType: metricType,
    });
  };
  getQualityDrilledDownData = (metricType) => {
    if(this.state.selectedRepo !== '' && this.state.selectedBranch !== '' && this.state.selectedRelease !== ''){
    this.props.qualityDrilledDownDataFilterDispatch(
      this.state.selectedBranch,
      this.props.currentClientId,
      this.props.currentExecId,
      metricType,
      this.props.projectID,
      this.state.selectedRelease,
      this.state.selectedRepoKey,
      this.state.selectedRepo 
    )
    .then((item) => {});
    }else{
    this.props
      .qualityDrilledDownDataDispatch(
        this.props.currentClientId,
        this.props.currentExecId,
        metricType,
        this.state.selectedRepoKey,
        this.props.projectID 
      )
      .then((item) => {});
      }
      
  };
  onDisplayMetricExitClick = () => {
    this.setState({
      displayMetric: false,
      metricType: "",
    });
  };
  fetchQualityData = (props) => {
    this.setState({
      show: true,
      all_data: false,
      charts: [],
      qualityMetrics: [],
    });
    if (
      this.props.currentExecId === "" ||
      this.props.projectID === "" ||
      this.props.projectID === undefined
    ) {
      // this.routeToSecurity();
    } else {
      this.setDefaultQualityData();
    }
  };

  setDefaultQualityData() {
    let type;
    this.props.widgetListDispatch(this.state.clientId ? this.state.clientId:this.props.currentClientId);
    this.props
      .qualityDataDispatch(this.state.clientId ? this.state.clientId:this.props.currentClientId,this.props.currentExecId,this.props.projectID)
      .then((item) => {
        // if (this.props.qualityData.repositories.length > 0) {
        this.initialData = this.props.qualityData;
        this.setRepository(this.props.qualityData);
        let layout_instance = new Layout(2);
        this.setState({
          layout: layout_instance.layout,
          qualityStatusDetails:this.props.qualityData.defectsAggregateDTOList,
          show: false,
          showbutton: false,
        });
        if (this.state.selectedRepo === "") {
          type = this.setRawDefaultRepo(
            this.props.qualityData.repositories,
            this.props.qualityData.outstandingBugs,
            this.props.qualityData.averageDefectResolutionTime
          );
          this.createCharts(this.createChartObject(type));
        }

        // this.createCharts(this.createChartObject(type));
        // } else {
        //   this.props.resetProjectRepoDispatch(
        //     this.props.qualityData.repositories
        //   );
        // }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  setRawDefaultRepo(rawData, outstandingBugs, averageResolution) {
    if (rawData.length > 0) {
      const item = rawData.map((item, index) => {
        return {
          outstandingbugs: [
            { name: item.repositoryName },
            { title: "Outstanding Bugs" },
            outstandingBugs,
          ],
          AvResolutionTime: [
            { name: item.repositoryName },
            { title: "Average Defect Resolution Time" },
            averageResolution,
          ],
        };
      });
      const splitArr = this.splitRawObj(item);
      return splitArr;
    } else {
      const item = [
        {
          outstandingbugs: [
            { name: "" },
            { title: "Outstanding Bugs" },
            outstandingBugs,
          ],
          AvResolutionTime: [
            { name: "" },
            { title: "Average Defect Resolution Time" },
            averageResolution,
          ],
        },
      ];
      const splitArr = this.splitRawObj(item);
      return splitArr;
    }
  }

  createMetrics = (res) => {
    let {repoKey, repoName, ...updatedRes} = res.data;
    let metricsData = Object.entries(updatedRes);
    return this.createMetricObject(metricsData);
  };
  createReleaseMetrics = (repoId, arr) => {
    let selectedIndex;
    let metricsData = arr.map((obj, index) => {
     // if (repoId === obj.repositoryKey) {
        selectedIndex = index;
        return Object.entries(obj);
     // }
    });
    metricsData = metricsData.splice(selectedIndex, 1);
    return this.createMetricObject(metricsData[0].slice(2));
  };
  createMetricObject = (mergObj) => {
    return mergObj.map((item) => {
      return {
        type: translations[item[0]],
        position: this.setMetricPos(item),
        value:
          item[0] === "coverage"
            ? item[1].value != null
              ? `${item[1].value}%`
              : "0.0%"
            : item[0] === "duplication"
            ? item[1] != null
              ? `${item[1].value}%`
              : "0.0%"
            : item[1].count,
      };
    });
  };

  setMetricPos = (item) => {
    let metricValue;
    if (
      item[0] === "bugs" ||
      item[0] === "vulnerabilities" ||
      item[0] === "codeSmells"
    ) {
      metricValue =
        item[1].rating === "1.0"
          ? "lowest"
          : item[1].rating === "2.0"
          ? "low"
          : item[1].rating === "3.0"
          ? "medium"
          : item[1].rating === "4.0"
          ? "high"
          : item[1].rating === "5.0"
          ? "critical"
          : null;
    }
    if (item[0] === "coverage") {
      metricValue =
        item[1].value >= 80
          ? "lowest"
          : item[1].value >= 70 && item[1].value < 80
          ? "low"
          : item[1].value >= 50 && item[1].value < 70
          ? "medium"
          : item[1].value >= 30 && item[1].value < 50
          ? "high"
          : item[1].value < 30
          ? "critical"
          : null;
    }
    if (item[0] === "duplication") {
      metricValue =
        item[1].value < 3
          ? "lowest"
          : item[1].value >= 3 && item[1].value <= 5
          ? "low"
          : item[1].value >= 5 && item[1].value < 10
          ? "medium"
          : item[1].value >= 10 && item[1].value < 20
          ? "high"
          : item[1].value > 20
          ? "critical"
          : null;
    }
    return metricValue;
  };

  setRawRepoObjects = (rawData, outstandingBugs, averageResolution, repoID) => {
    const item = {
      bugs_vulnerability_codeSmell: [
        { name: rawData.data.repoName },
        { title: "Bugs, Vulnerabilities & Code Smells" },
        rawData.data,
      ],
      coverage: [
        { name: rawData.data.repoName },
        { title: "Coverage" },
        rawData.data.coverage,
      ],
      outstandingbugs: [
        { name: rawData.data.repoName },
        { title: "Outstanding Bugs" },
        outstandingBugs,
      ],
      AvResolutionTime: [
        { name: rawData.data.repoName },
        { title: "Average Defect Resolution Time" },
        averageResolution,
      ],
    };

    const splitArr = Object.values(item);

    return [splitArr];
  };

  splitRawObj = (type) => {
    const splitArr = type.map((obj) => Object.values(obj));
    return splitArr;
  };

  createChartObject = (typeObj) => {
    const processedData = typeObj.map((item, index) => {
      return item.map((ele) => {
        return {
          name: ele[1].title,
          data: ele,
          title: ele[1].title,
        };
      });
    });
    return processedData;
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
    let updatedList = this.state.charts[0];
    let updatedRemoveBadge = this.state.showRemovedItemsList.filter((ele,index)=>{
      if (index !== removedindex) return Object.assign({},ele)
    });    
    updatedList.unshift(list)
    updatedList.map((ele,index) => {
      ele.component = this.setChart(ele.title, ele.data[2]);
    });
    let chartList = [];
    chartList[0] = updatedList;
    this.setState({
      charts: chartList,
      showRemovedItemsList: updatedRemoveBadge
    });
  }
  createCharts = (list, removed) => {
    let list_temp = list[0];
    const updatedList = list_temp.filter((ele, index) => {
      if (index !== removed) {
        return Object.assign({}, ele);
      }
    });
    updatedList.map((ele) => {
      ele.component = this.setChart(ele.title, ele.data[2]);
    });
    let chartList = [];
    chartList[0] = updatedList;
    this.setState({
      qualityMetrics: test,
      charts: chartList,
    });
  };
  setChart = (title, data) => {
    const chartArry = chartCompList.map((item) => {
      if (item.name === title) {
        return (
          <item.component
            key={item.type}
            type={item.type}
            title={title}
            data={data}
            projID={this.props.projId}
            organization={this.props.organization}
            bgTheme={this.state.bgTheme}
          />
        );
      }
    });
    return chartArry;
  };
  
  removeChartComponent = (chartIndex) => {
    const charts = [...this.state.charts];
    this.createCharts(charts, chartIndex);
    const layouts = {};
    this.state.showRemovedItemsList.push(this.state.charts[0][chartIndex]);
    Object.keys(this.state.layout).map((key) => {
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
      layout: layouts,
    });
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if ((this.props.selectedTheme !== nextProps.selectedTheme || this.props.sprintId !== nextProps.sprintId || this.props.projectSprintId !== nextProps.projectSprintId) && 
        nextProps.projectID) {
      this.setState({
        all_data: true,
      });
    }
    if (this.props.currentClientId !== nextProps.currentClientId) {
      this.setState({
        clientId: nextProps.currentClientId
      });
    }
  }

  componentDidMount() {debugger
    const clientName = window.location.pathname.replace(/^\/([^\/]*).*$/, '$1');
    const labels = labelConst.filter((item)=> item.clientName === clientName );
    const bgTheme = this.props.selectedTheme || labels[0].mappings.bgColor;
    bgTheme==='dark' ? document.body.style.background = '#1d2632': document.body.style.background = '#ffffff';
    const bgType = (bgTheme==='dark');
    if (
      this.state.selectedRepo === undefined ||
      this.state.selectedRepo === ""
    ) {
      this.setState({
        all_data: true,
      });
    }
    let layout_instance = new Layout(2);
    this.setState({
      layout: layout_instance.layout,
      bgTheme: bgType
    });
  }
  branchOnSelectHandler= (branchId, evtKey) => {
    this.updateBranch(branchId);
  };
  releaseOnSelectHandler = (releaseId, evtKey) => {
    this.updateRelease(releaseId);
  };
  setBranch = (res) => {
    const branch = res.data;
    if(branch.length!==0){
      const { list, selectedIndex } = this.markSelectedbranch(branch, branch.id);
      const branchDetail = list.map(ele => {
        return {
          id: ele.id,
          projectName: ele.branchName
        };
      });
      this.setState({
       branchDropData: branchDetail,
       selectedBranch: '',
       selectedRelease:'', showInsights:false,
       releaseDropData:[]
      });
    }
    else{
      this.setState({
        branchDropData: [],
         selectedBranch: '',
         selectedRelease:'',
         releaseDropData:[],
         showInsights:false,
       });
    }
   };
   setRelease = (res) => {
    const release = res.data;
    
      const { list, selectedIndex } = this.markSelectedbranch(release, release.id);
      const releaseDetail = list.map(ele => {
        return {
          id: ele.id,
          projectName: ele.releaseNumber
        };
      });
      if(release.length!==0){
      this.setState({
       releaseDropData: releaseDetail,
        selectedRelease: '',
        filterStatus: "Release"
      });
    }
    else{
      this.setState({
        releaseDropData: [],
        selectedRelease: ''
       });
    }
    this.props.insightsQuality(this.state.selectedBranch,this.props.currentClientId,this.props.currentExecId, this.props.projectID,this.state.selectedRepo);
   };
   getReleaseDetails = (branchName,clientId,projectID, projName) => {
    api
      .getReleaseDropdownInsight(branchName,clientId,projectID, projName)
      .then(this.setRelease)
      .catch(error => {
        console.error(error);
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
    this.getReleaseDetails(branchDetail[selectedIndex].projectName,this.props.currentClientId,this.props.projectID,this.state.selectedRepo )
    
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
      filterStatus: 'Release',
      showCode:true,
      showBuild:false,
    });
    this.setReleaseData(this.state.selectedBranch,this.props.currentClientId,this.props.currentExecId, this.props.projectID,releaseDetail[selectedIndex].projectName,this.state.selectedRepo,releaseId,selectedIndex);    
  };
  updateReleaseQualityData = (repoId) => {
    const qualityMetrics = this.createReleaseMetrics(
      repoId,
      this.props.qualityBuildReleaseDetails.repositories
    );
    test = qualityMetrics;
    let layout_instance = new Layout(chartCompList.length);
    this.setState({
      componentType: "quality",
      layout: layout_instance.layout,
    });
    const type = this.setRawRepoObjects(
      this.props.qualityBuildReleaseDetails.repositories[0],
      this.props.qualityBuildReleaseDetails.outstandingBugs,
      this.props.qualityBuildReleaseDetails.averageDefectResolutionTime,
      repoId
    );

    this.createCharts(this.createChartObject(type));
  };
  setReleaseData(selectedBranch,clientId,currentExecId,projectID,selectedRelease,selectedRepo,releaseId,selectedIndex) {
    let type;
    this.props.qualityReleaseDataDispatch(selectedBranch,clientId,currentExecId,projectID,selectedRelease,selectedRepo)
      .then((item) => {
        // if (this.props.qualityData.repositories.length > 0) {
        this.initialData = this.props.qualityBuildReleaseDetails;
        this.updateReleaseQualityData(releaseId,selectedIndex);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  getBranchDetails = (clientId,projectID, projName) => {
    api
      .getBranchDropdownInsight(clientId,projectID, projName)
      .then(this.setBranch)
      .catch(error => {
        console.error(error);
      });
  };
 
  markSelected = (prodList, id) => {
    const resetList = this.resetSelect(prodList);
    let selectedIndex = 0;
    const selectedParamList = resetList.map((ele, index) => {
      if (ele.repositoryKey == id) {
        selectedIndex = index;
        return ele;
      }
      return ele;
    });
    return {
      list: selectedParamList,
      selectedIndex: selectedIndex,
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
  setRepository = (res) => {
    const repositoryData = res.repositories;
    if (repositoryData.length > 0 && repositoryData !== null) {
      const { list } = this.markSelected(
        repositoryData,
        repositoryData[0].repositoryKey
      );
      const repoDetails = list.map((ele) => {
        return {
          id: ele.repositoryName,
          projectName: ele.repositoryName,
        };
      });

      this.setState({
        repoData: repoDetails,
        selectedRepo: "",
        selectedBranch:"",
        selectedRelease:"",
        showInsights:false
      });
      this.props.repoDropValDispatch("");
    } else {
      this.setState({
        repoData: [],
        selectedRepo: "",
        selectedBranch:"",
        selectedRelease:"",
        showInsights:false
      });
      this.props.repoDropValDispatch("");
    }
  };

  updateRepository=(res)=>{
    this.setState({
      componentType: "quality",
      selectedRepo: res.data.repoName,
      selectedRepoKey: res.data.repoKey,
      filterStatus: "Repository",
      showRemovedItemsList: []
    });
    //this.props.repoDropValDispatch(res.data.repoName);
    if (res.data.repoKey !== null) {
      this.setState({
        open: false
      })
      this.getBranchDetails(this.props.currentClientId,this.props.projectID, this.state.selectedRepo);
      this.updateQualityData(res.data.repoKey,res);
      if (this.state.repoData[0].id !== "selectProject") {
        this.state.repoData.unshift({
          id: "selectProject",
          projectName: "Select Repository",
        });
      }
    } else {
      if (this.state.repoData[0].id === "selectProject") {
        this.state.repoData.shift();
      }
      let layout_instance = new Layout(2);
      this.setState({
        selectedRepo: "",
        selectedBranch:"",
        showbutton: false,
        show: false,
        open: true,
        layout: layout_instance.layout,
        filterStatus: "Project",
      });
      let type;
      this.props
      .qualityDataDispatch(this.state.clientId ? this.state.clientId:this.props.currentClientId,this.props.currentExecId,this.props.projectID)
      .then(
        type = this.setRawDefaultRepo(
          this.props.qualityData.repositories,
          this.props.qualityData.outstandingBugs,
          this.props.qualityData.averageDefectResolutionTime
        )
      ).catch((error) => {
        console.error(error);
      });
      
      this.createCharts(this.createChartObject(type));
    }
    
  };

  updateQualityData = (repoId,res) => {
    const qualityMetrics = this.createMetrics(res);
    test = qualityMetrics;
    let layout_instance = new Layout(chartCompList.length);
    this.setState({
      layout: layout_instance.layout,
    });
    const type = this.setRawRepoObjects(
      res,
      this.props.qualityData.outstandingBugs,
      this.props.qualityData.averageDefectResolutionTime,
      repoId
    );

    this.createCharts(this.createChartObject(type));
  };

  resetSelect = (prodList) => {
    const defaultList = prodList.map((ele) => {
      return ele;
    });
    return defaultList;
  };
  handleRepoChange = (repoID) => {
    this.setState({
      showCode:true,
      showbutton: true,
      showBuild:false,
      charts:[]
    });
      api.getQualityRepoMetricsData (this.props.currentClientId,this.props.currentExecId,this.props.projectID,repoID).then(
        this.updateRepository).catch(error => {
          console.error(error);
        });
  };

  componentDidUpdate() {
    if (this.state.all_data) {
      this.fetchQualityData();
    }
  }

  setBuild =()=>{
    this.props.qualityBuildDataDispatch(this.props.projectID,this.props.currentClientId,this.state.selectedRepo,'Jenkins')
       .then(() => { this.setQualityBuildData(this.props.qualityBuildData) });
  }

  setQualityBuildData = (rawData) => {
    this.setState({
      showBuild:true,
      showCode:false,
      qualityBuildCharts: rawData,
      componentType:"QualityBuild",
    })
  }

  setCode =()=>{
    this.setState({
      showCode:true,
      showBuild:false,
      componentType:"quality",
    })
  }
  render() {
    const clientName = window.location.pathname.replace(/^\/([^\/]*).*$/, '$1');
    const activeLink = window.location.href.includes("/quality");
    const labels = labelConst.filter((item)=> item.clientName === clientName );
    const bgTheme = (this.props.selectedTheme === "dark");
    const currentWidgetList = this.props.widgetList;
    const currentTabWidgets = currentWidgetList && currentWidgetList.filter(item=>item.name === 'quality');
    let qualityNav=<CardChartQuality showChart="true" insights={this.props.qualityDetails} cardName="Code Quality Analysis" cardHeader="Quality" bgTheme={bgTheme}/>
   
    if (this.state.show) {
      return <Spinner show="true" />;
    } else {
      return (
        <React.Fragment>
          {this.props.qualityDetails && this.state.showInsights? <SideNavbar card={qualityNav}/>:''}
          <Row className={`p-0 px-3 m-0 mt-12 ${bgTheme ? 'bg-dark-theme':'bg-light'}`}>
            <Col xl={2} lg={3} md={3}>
              <Dropdown
                listData={this.state.repoData}
                direction="down"
                dropsLable= {clientName !== "wpc" || !activeLink ?labels[0].mappings.repository:labels[0].mappings.qualityRepo}
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
                        ? this.state.selectedRepo
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
            {this.state.selectedRepo && 
            <Col xl={2} lg={3} md={3}>
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
                    className={`font-aggegate-sub-text p-0 d-flex align-items-center ${bgTheme ? 'text-white' : 'font-aggegate-sub-text-clr'}`}

                  >
                    <FontAwesomeIcon icon={faChevronDown} />
                  </Col>
                </Row>
              </Dropdown>
            </Col>}
             {this.state.selectedBranch &&
            <Col  xl={2} lg={3} md={3}>
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
            }<span className='mt-auto'><p className={`font-size-small m-0 text-left ${bgTheme ? 'text-white' : 'text-dark'}`}>You are viewing data at <b>{this.state.filterStatus}</b> level</p></span>
            <Col
                
                className="ml-auto align-self-end"
              >
                <Row className={classnames(
              " Quality w-100 p-0 m-0 mt-3",
              { "d-none": !this.state.selectedRepo || this.state.componentType !== "quality" }
            )} style={{justifyContent:'flex-end'}}>
              <div className={`${bgTheme ? 'text-white' : 'text-dark'}`}>
                  <span className="font-size-small">
                    <FontAwesomeIcon
                      className="critical ml-3 "
                      icon={faSquare}
                    />{" "}
                    {labels[0].mappings.critical}{" "}
                  </span>
                  <span className="font-size-small">
                    <FontAwesomeIcon className="high ml-3" icon={faSquare} />{" "}
                    {labels[0].mappings.high}
                  </span>
                  <span className="font-size-small">
                    <FontAwesomeIcon className="medium ml-3" icon={faSquare} />{" "}
                    {labels[0].mappings.medium}
                  </span>
                  <span className="font-size-small">
                    <FontAwesomeIcon className="low ml-3" icon={faSquare} /> {labels[0].mappings.low}
                  </span>
                  <span className="font-size-small">
                    <FontAwesomeIcon className="lowest ml-3" icon={faSquare} />{" "}
                    {labels[0].mappings.veryLow}
                  </span>
                  </div>
                </Row>
              </Col>
              </Row>
        <Row className={`p-0 px-3 m-0 mt-2 justify-content-between ${bgTheme ? 'bg-dark-theme':'bg-light'}`}>
          <Col md={3}>
              <span>
              {this.state.showbutton ? (
                <Button variant="outline-dark" className={this.state.showCode? "bgblue":"Buildbg"} onClick ={this.setCode}>
                  {labels[0].mappings.codeBtn}
                </Button>
                ) : null} 
              </span> 
              {currentTabWidgets[0] && currentTabWidgets[0].widgets && currentTabWidgets[0].widgets.includes(this.state.buildStatus) &&
              <span className="ml-3">
              {this.state.showbutton ? (
                <Button variant="outline-dark" className={this.state.showBuild?"bgblue":"Buildbg"} onClick ={this.setBuild}>
                  {labels[0].mappings.buildBtn}
                </Button>
               ) : null}  
              </span>
              }
              </Col>
              <Col md='3' className="text-right mt-auto">{ this.state.showRemovedItemsList.length > 0 && this.state.componentType === "quality" ? 
               <span className="text-white ml-auto w-20">
               <p className="m-0 font-size-smaller text-left">Add Widgets</p>
               <select className={`repo-height rounded w-100 ${bgTheme ? 'bg-prodAgg-btn text-white' : 'bg-prodAgg-light-btn'}`} value={this.state.selectWidget || ''} onChange={(event)=> this.addCharts(event)} >
               <option value=''>{this.state.selectWidget}</option>
                 {
                   this.state.showRemovedItemsList.map((item, index) =>
                   <option key={index} value={item.name} className={`${bgTheme ? 'text-white' : 'font-aggegate-sub-text-clr'}`}>
                           {item.name}
                 </option>
                 )
                   }</select></span>: null}</Col>
        </Row>
          <Row
            className={classnames(
              "Quality  w-100 p-0 m-0 mt-3",
              { "d-none": !this.state.selectedRepo || this.state.componentType !== "quality" }
            )}
          >
            {this.state.componentType === "quality" ? (
            <Container fluid className=" w-100 h-90 d-flex align-item-center">
            <div className="h-100 w-100 d-flex overflow-auto">
              {this.state.qualityMetrics.map((ele) => {
                return (
                  <div
                    key={ele.type}
                    className={`border-radius-10 border ml-3 mb-3 w-50 ${bgTheme ? 'bg-dark-theme border-dark' : 'bg-white'}`}
                  >
                    <Row className={`m-0  d-flex justify-content-between  ${bgTheme ? 'bg-prodInfo-prod text-white p-2' : 'cardHeader text-dark'}`}>
                      <span className="font-weight-bold">{ele.type}</span>
                      <span>
                        {ele.position ? (
                          <FontAwesomeIcon
                          className="show-cursor"
                          onClick={() =>
                            this.onDisplayMetricsClickHandler(ele.type)
                          }
                          icon={faEllipsisV}
                        />
                        ) : (
                          ""
                        )}
                      </span>
                    </Row>
                    <Row className={`align-items-center d-flex px-3 py-2 justify-content-center no-gutters p-3 ${bgTheme ? 'text-white' : 'text-dark'}`}>
                      <Col>{ele.type === "Bugs"? <BugsSvg />:ele.type === "Vulnerabilities"?<VulnarabilitiesSvg />:ele.type === "Code Smells"? <CodeSmellsSvg /> :ele.type ==="Coverage"?<CoverageSvg />: <DuplicationsSvg />}</Col>
                      <Col className="text-center font-size-xxlarge font-weight-bold">{ele.value}</Col>
                      <Col className="text-right">
                        <FontAwesomeIcon
                            className={ele.position}
                            icon={faSquare}
                          />
                     </Col>
                    </Row>
                  </div>
                );
              })}
            </div>
          </Container>
            ) : null}
          </Row>
          {currentTabWidgets[0] && currentTabWidgets[0].widgets && currentTabWidgets[0].widgets.includes(this.state.defectAggregate) &&
          <Row className={classnames(
              "p-0 px-3 m-0 mt-2",
              { "d-none": this.state.selectedRepo || !this.state.open }
            )}>
            <Col>
            <ButtonGroup toggle style={{position: 'relative',top: '10%',left: '46%',zIndex: '1'}}>
              {this.state.radios.map((radio, idx) => (
                <ToggleButton
                    key={idx}
                    type="radio"
                    variant="secondary"
                    name="radio"
                    size="sm"
                    value={radio.value}
                    checked={this.state.radioValue === radio.value}
                    onChange={this.setRadioValue}
                    onClick={(e) => this.clickDetailsByStatus(radio.value)}
                >
                  {radio.name}
                </ToggleButton>
              ))}
            </ButtonGroup>                  
            <div className="border border-dark grid-graph-comp">
                <div
                  className="position-absolute px-2 text-right text-white w-100"
                  style={{ zIndex: "100",right:14}}
                >
                  <p
                    className="d-inline px-1"
                    data-toggle="tooltip"
                    data-placement="top"
                >
                  <TooltipHoc
                    info="Defects Aggregated View shows the open, closed and total defects (functional bugs) for various projects in a portfolio.<br/>"
                    >
                    <span className="d-inline-block">
                      <FontAwesomeIcon icon={faInfoCircle} />
                    </span>
                  </TooltipHoc>
                </p>
                <p
                  className="show-cursor d-inline"
                  onClick={this.removeKpi}
                >
                  <span className="d-inline-block">
                    <FontAwesomeIcon icon={faTimes} />
                  </span>
                </p>
              </div>
                  <QualityTeamDetails  summaryTrend={this.state.qualityStatusDetails} radioValue={this.state.radioValue} organization={this.props.organization} projID={this.props.projId}/>
            </div>
          </Col>
          </Row>}
          {this.state.charts.length  && this.state.componentType === "quality" ? (
            <Grid
              chartData={this.state.charts[0]}
              layouts={this.state.layout}
              removeDelegate={this.removeChartComponent}
              breakpoint={this.state.gridBreakpoints}
              columnSize={this.state.gridCol}
              bgTheme={bgTheme}
            />
          ) : null}
          
          <ModalBackDrop show={this.state.displayMetric}>
            <div className="chart-title w-50 h-55 grid-graph-comp">
              <div
                className="position-absolute px-2 text-right text-white w-50"
                style={{ zIndex: "100" }}
              >
                <p
                  className={`d-inline px-1 ${bgTheme ? 'text-white' : 'text-dark'}`}
                  data-toggle="tooltip"
                  data-placement="top"
                >
                  <TooltipHoc
                    head={this.state.metricType}
                    info={BubbleChartInfo[this.state.metricType]}
                  >
                    <span className="d-inline-block">
                      <FontAwesomeIcon icon={faInfoCircle} />
                    </span>
                  </TooltipHoc>
                </p>
                <p
                  className={`show-cursor d-inline ${bgTheme ? 'text-white' : 'text-dark'}`}
                  onClick={this.onDisplayMetricExitClick}
                >
                  <TooltipHoc info="Remove">
                    <span className="d-inline-block">X</span>
                  </TooltipHoc>
                </p>
              </div>
              <BubbleHigh title={this.state.metricType} bgTheme={bgTheme}/>
            </div>
          </ModalBackDrop>
          {this.state.componentType === "QualityBuild" ? (
           <QualityBuild cardsData={this.state.qualityBuildCharts} bgTheme={bgTheme}/>
          ) : null}
        </React.Fragment>
      );
    }
  }
}


//function to map the state received from reducer

const mapStateToProps = (state) => {
  return {
    currentExecId: state.execData.executiveId,
    currentClientId: state.execData.currentClientId,
    widgetList: state.execData.widgetList,
    qualityData: state.qualityData.currentQualityData.qualityDetails,
    projectID: state.productDetails.currentProject.projectDetails.id,
    sprintId: state.productDetails.currentSprint.sprintInfo.id,
    projectSprintId: state.productDetails.currentProjectSprint.sprintInfo.id,
    currentRepo: state.qualityData.currentRepo,
    qualityBuildData: state.qualityData.qualityBuildDetails,
    qualityDetails: state.qualityData.qualityDetails,
    organization: state.productDetails.currentProject.projectDetails.organization,
    projId: state.productDetails.currentProject.projectDetails.id,
    qualityBuildReleaseDetails: state.qualityData.qualityBuildReleaseDetails,
    qualityBuildRepoDetails: state.qualityData.qualityBuildRepoDetails,
    currentSourceType: state.productDetails.currentProject.projectDetails.sourceType,
    selectedTheme: state.chartData.currentTheme,
  };
};

//function to dispatch action to the reducer

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {  insightsQuality,
      widgetListDispatch,
      qualityDataDispatch,
      qualityBuildDataDispatch,
      resetProjectRepoDispatch,
      qualityDrilledDownDataDispatch,
      repoDropValDispatch,
      qualityReleaseDataDispatch,
      qualityDrilledDownDataFilterDispatch,
      qualityRepoDataDispatch
    },
    dispatch
  );
};

//Connect react component to redux

export default connect(mapStateToProps, mapDispatchToProps)(Quality);
