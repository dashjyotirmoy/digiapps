import React, { Component } from "react";
import Grid from "../../Grid-Layout/Grid";
import classnames from "classnames";
import { Row, Container, Col, Button } from "react-bootstrap";
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
import {
  qualityDataDispatch,
  qualityBuildDataDispatch,
  qualityDrilledDownDataDispatch,
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
    displayMetric: false,
    metricType: "",
    layout: {
      lg: [],
      md: [],
    },
    gridCol: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
    gridBreakpoints: { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 },
    qualityMetrics: [],
    show: true,
    componentType: "quality",
    selectedRepo: "",
    selectedRepoKey: "",
    repoData: [],
    showCode:false,
    showBuild:false
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
    this.props
      .qualityDrilledDownDataDispatch(
        this.props.currentExecId,
        this.props.projectID,
        this.state.selectedRepoKey,
        metricType
      )
      .then((item) => {});
  };
  onDisplayMetricExitClick = () => {
    this.setState({
      displayMetric: false,
      metricType: "",
    });
  };
  // routeToSecurity = () => {
  //   this.props.history.push("/security");
  // };
  fetchQualityData = () => {
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
    this.props
      .qualityDataDispatch(this.props.currentExecId, this.props.projectID)
      .then((item) => {
        // if (this.props.qualityData.repositories.length > 0) {
        this.initialData = this.props.qualityData;
        this.setRepository(this.props.qualityData);
        let layout_instance = new Layout(2);
        this.setState({
          layout: layout_instance.layout,
        });
        this.setState({
          show: false,
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
            { name: item.repoName },
            { title: "Outstanding Bugs" },
            outstandingBugs,
          ],
          AvResolutionTime: [
            { name: item.repoName },
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

  createMetrics = (repoId, arr) => {
    let selectedIndex;
    let metricsData = arr.map((obj, index) => {
      if (repoId === obj.repoKey) {
        selectedIndex = index;
        return Object.entries(obj);
      }
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
        item[1].value >= "80"
          ? "lowest"
          : item[1].value >= "70" && item[1].value <= "80"
          ? "low"
          : item[1].value >= "50" && item[1].value <= "70"
          ? "medium"
          : item[1].value >= "30" && item[1].value <= "50"
          ? "high"
          : item[1].value < "30"
          ? "critical"
          : null;
    }
    if (item[0] === "duplication") {
      metricValue =
        item[1].value < 3
          ? "lowest"
          : item[1].value >= 3 && item[1].value <= 5
          ? "low"
          : item[1].value >= 5 && item[1].value <= 10
          ? "medium"
          : item[1].value >= 10 && item[1].value <= 20
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
        { name: rawData.repoName },
        { title: "Bugs, Vulnerabilities & Code Smells" },
        rawData,
      ],
      coverage: [
        { name: rawData.repoName },
        { title: "Coverage" },
        rawData.coverage,
      ],
      outstandingbugs: [
        { name: rawData.repoName },
        { title: "Outstanding Bugs" },
        outstandingBugs,
      ],
      AvResolutionTime: [
        { name: rawData.repoName },
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

  componentWillReceiveProps(nextProps) {
    if (this.props.projectID !== nextProps.projectID) {
      this.setState({
        all_data: true,
      });
    }
  }

  componentDidMount() {
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
    });
  }

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
      selectedIndex: selectedIndex,
    };
  };
  setRepository = (res) => {
    const repositoryData = res.repositories;
    if (repositoryData.length > 0 && repositoryData !== null) {
      const { list } = this.markSelected(
        repositoryData,
        repositoryData[0].repoKey
      );
      const repoDetails = list.map((ele) => {
        return {
          id: ele.repoKey,
          projectName: ele.repoName,
        };
      });

      this.setState({
        repoData: repoDetails,
        selectedRepo: "",
      });
      this.props.repoDropValDispatch("");
    } else {
      this.setState({
        repoData: [],
        selectedRepo: "",
      });
      this.props.repoDropValDispatch("");
    }
  };

  updateRepository = (repoId) => {
    const { list, selectedIndex } = this.markSelected(
      this.props.qualityData.repositories,
      repoId
    );
    const repoDetails = list.map((ele) => {
      return {
        id: ele.repoKey,
        projectName: ele.repoName,
      };
    });

    this.setState({
      componentType: "quality",
      selectedRepo: repoDetails[selectedIndex].projectName,
      selectedRepoKey: repoDetails[selectedIndex].id,
    });
    this.props.repoDropValDispatch(repoDetails[selectedIndex].projectName);
    if (repoId !== "selectProject") {
      this.updateQualityData(repoId, selectedIndex);
      if (this.state.repoData[0].id !== "selectProject") {
        this.state.repoData.unshift({
          id: "selectProject",
          projectName: "select Repository",
        });
      }
    } else {
      if (this.state.repoData[0].id === "selectProject") {
        this.state.repoData.shift();
      }
      let layout_instance = new Layout(2);
      this.setState({
        selectedRepo: "",
        show: false,
        layout: layout_instance.layout,
      });
      let type;
      type = this.setRawDefaultRepo(
        this.initialData.repositories,
        this.initialData.outstandingBugs,
        this.initialData.averageDefectResolutionTime
      );
      this.createCharts(this.createChartObject(type));

      // this.removeChartComponent(0);
      // this.removeChartComponent(0);
    }
  };

  updateQualityData = (repoId, selectedIndex) => {
    const qualityMetrics = this.createMetrics(
      repoId,
      this.props.qualityData.repositories
    );
    test = qualityMetrics;
    let layout_instance = new Layout(chartCompList.length);
    this.setState({
      layout: layout_instance.layout,
    });

    const type = this.setRawRepoObjects(
      this.props.qualityData.repositories[selectedIndex],
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
});
    // if (repoID !== 'selectRepository') {
    this.updateRepository(repoID);
    // } else {
    //   this.setDefaultQualityData();
    // }
  };

  componentDidUpdate() {
    if (this.state.all_data) {
      this.fetchQualityData();
    }
  }

  setBuild =()=>{
    this.props.qualityBuildDataDispatch(this.props.projectID, this.props.currentRepo)
       .then(() => { this.setQualityBuildData(this.props.qualityBuildData) });
    // this.setState({
    //   componentType:"QualityBuild",
    // })
  }

  setQualityBuildData = (rawData) => {
    this.setState({
      showBuild:true,
      showCode:false,
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
    if (this.state.show) {
      return <Spinner show="true" />;
    } else {
      return (
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
                        : "Select Repository"}
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
            <Col md={9}>
              <span>
                <Button variant="outline-dark" className={this.state.showCode? "bgblue":"Buildbg"} onClick ={this.setCode}>
                  Code
                </Button>
              </span> 

              <span className="ml-3">
                <Button variant="outline-dark" className={this.state.showBuild?"bgblue":"Buildbg"} onClick ={this.setBuild}>
                  Build
                </Button>
              </span>
            </Col>
          </Row>
          <Row
            className={classnames(
              " Quality quality-metric-area w-100 p-0 m-0",
              { "d-none": !this.state.selectedRepo || this.state.componentType !== "quality" }
            )}
          >
            <Row className="metric-legend w-100 text-white">
              <Col
                xl={3}
                lg={3}
                md={3}
                className="offset-xl-9 offset-lg-9 offset-md-9"
              >
                <Row>
                  <span className="font-size-xs mr-3 ">
                    <FontAwesomeIcon
                      className="critical ml-3"
                      icon={faSquare}
                    />{" "}
                    Critical{" "}
                  </span>
                  <span className="font-size-xs mr-3">
                    <FontAwesomeIcon className="high ml-3" icon={faSquare} />{" "}
                    High
                  </span>
                  <span className="font-size-xs mr-3 ">
                    <FontAwesomeIcon className="medium ml-3" icon={faSquare} />{" "}
                    Medium
                  </span>
                  <span className="font-size-xs mr-3 ">
                    <FontAwesomeIcon className="low ml-3" icon={faSquare} /> Low
                  </span>
                  <span className="font-size-xs mr-3 ">
                    <FontAwesomeIcon className="lowest ml-3" icon={faSquare} />{" "}
                    Very Low
                  </span>
                </Row>
              </Col>
            </Row>
            {this.state.componentType === "quality" ? (
            <Container fluid className=" w-100 h-90 d-flex align-item-center">
              <div className="h-100 w-100 d-flex overflow-auto">
                {this.state.qualityMetrics.map((ele) => {
                  return (
                    <div
                      key={ele.type}
                      className="border-radius-10 border border-dark flex-grow-1 metric-card mx-3 mb-3 p-3"
                    >
                      <Row className="h-15 m-0 text-white d-flex justify-content-between">
                        <span>{ele.type}</span>
                        <span>
                          {ele.position ? (
                            <FontAwesomeIcon
                              className={ele.position}
                              icon={faSquare}
                            />
                          ) : (
                            ""
                          )}
                        </span>
                      </Row>
                      <Row className="align-items-center d-flex h-75 justify-content-center row text-white metric-value">
                        {ele.value}
                      </Row>
                      <Row className="d-flex justify-content-end px-3 text-white-50">
                        {/* <TooltipHoc info=""> */}
                        <FontAwesomeIcon
                          className="show-cursor"
                          onClick={() =>
                            this.onDisplayMetricsClickHandler(ele.type)
                          }
                          icon={faEllipsisV}
                        />
                        {/* </TooltipHoc> */}
                      </Row>
                    </div>
                  );
                })}
              </div>
            </Container>
            ) : null}
          </Row>

          {this.state.charts.length  && this.state.componentType === "quality" ? (
            <Grid
              chartData={this.state.charts[0]}
              layouts={this.state.layout}
              removeDelegate={this.removeChartComponent}
              breakpoint={this.state.gridBreakpoints}
              columnSize={this.state.gridCol}
            />
          ) : null}
          
          <ModalBackDrop show={this.state.displayMetric}>
            <div className="chart-title w-50 h-50 grid-graph-comp">
              <div
                className="position-absolute px-2 text-right text-white w-50"
                style={{ zIndex: "100" }}
              >
                <p
                  className="d-inline px-1"
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
                  className="show-cursor d-inline"
                  onClick={this.onDisplayMetricExitClick}
                >
                  <TooltipHoc info="Remove">
                    <span className="d-inline-block">X</span>
                  </TooltipHoc>
                </p>
              </div>
              <BubbleHigh title={this.state.metricType} />
            </div>
          </ModalBackDrop>
          {this.state.componentType === "QualityBuild" ? (
           <QualityBuild cardsData={this.state.charts}/>
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
    qualityData: state.qualityData.currentQualityData.qualityDetails,
    projectID: state.productDetails.currentProject.projectDetails.id,
    currentRepo: state.qualityData.currentRepo,
    qualityBuildData: state.qualityData.qualityBuildDetails,
    sprintId: state.productDetails.currentSprint.sprintInfo.id,
  };
};

//function to dispatch action to the reducer

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      qualityDataDispatch,
      qualityBuildDataDispatch,
      resetProjectRepoDispatch,
      qualityDrilledDownDataDispatch,
      repoDropValDispatch,
    },
    dispatch
  );
};

//Connect react component to redux

export default connect(mapStateToProps, mapDispatchToProps)(Quality);
