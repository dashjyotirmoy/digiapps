import React, { Component } from "react";
import Grid from "../../Grid-Layout/Grid";
import { Row, Container, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquare,
  faEllipsisV,
  faInfoCircle
} from "@fortawesome/free-solid-svg-icons";
import LineHigh from "../../Charts/LineHigh/LineHigh";
import AreaHigh from "../../Charts/AreaHigh/AreaHigh";
import StackedBar from "../../Charts/StackedBar/StackedBar";
import { qualityDataDispatch } from "../../../../store/actions/qualityData";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ColumnHigh from "../../Charts/ColumnHigh/ColumnHigh";
import BubbleHigh from "../../Charts/BubbleChart/BubbleChart";
import { TooltipHoc } from "../../TooltiHOC/TooltipHoc";
import ModalBackDrop from "../../ModalBackDrop/ModalBackDrop";
import { resetProjectRepoDispatch } from "../../../../store/actions/projectInsights";
import Spinner from "../../Spinner/Spinner";

const chartCompList = [
  {
    name: "Bugs, Vulnerabilities & Code Smells",
    type: "MultipleLineHigh",
    component: LineHigh
  },
  {
    name: "Coverage",
    type: "AreaHigh",
    component: AreaHigh
  },

  {
    name: "Outstanding Bugs",
    type: "BarHigh",
    component: StackedBar
  },
  {
    name: "Average Defect Resolution Time",
    type: "DefectHigh",
    component: ColumnHigh
  }
];

class Quality extends Component {
  state = {
    charts: [],
    displayMetric: false,
    metricType: "",
    layout: {
      lg: [
        { i: "0", x: 0, y: 0, w: 6, h: 2, isResizable: false },
        { i: "1", x: 6, y: 0, w: 6, h: 2, isResizable: false },
        { i: "2", x: 0, y: 0, w: 6, h: 2, isResizable: false },
        { i: "3", x: 6, y: 2, w: 6, h: 2, isResizable: false }
      ],
      md: [
        { i: "0", x: 0, y: 0, w: 5, h: 2, isResizable: false },
        { i: "1", x: 6, y: 0, w: 5, h: 2, isResizable: false },
        { i: "2", x: 0, y: 2, w: 4, h: 2, isResizable: false },
        { i: "3", x: 4, y: 2, w: 6, h: 2, isResizable: false }
      ]
    },
    gridCol: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
    gridBreakpoints: { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 },
    qualityMetrics: [],
    show: true
  };

  onDisplayMetricsClickHandler = metricType => {
    this.setState({
      displayMetric: true,
      metricType: metricType
    });
  };
  onDisplayMetricExitClick = () => {
    this.setState({
      displayMetric: false,
      metricType: ""
    });
  };

  fetchQualityData = () => {
    this.setState({
      all_data: false,
      charts: [],
      qualityMetrics: []
    });
    this.props
      .qualityDataDispatch(this.props.currentExecId, this.props.projId)
      .then(item => {
        if (this.props.qualityData.repositories.length > 0) {
          const qualityMetrics = this.createMetrics(
            this.props.qualityData.repositories
          );
          this.setState({
            qualityMetrics,
            show: false
          });
          console.log(this.state.qualityMetrics);
          const type = this.setRawRepoObjects(
            this.props.qualityData.repositories,
            this.props.qualityData.outstandingBugs,
            this.props.qualityData.averageDefectResolutionTime
          );

          this.createCharts(this.createChartObject(type));
        } else {
          this.props.resetProjectRepoDispatch(
            this.props.qualityData.repositories
          );
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  createMetrics = arr => {
    let selectedIndex;
    let metricsData = arr.map((obj, index) => {
      if (this.props.currentRepo === obj.repoName) {
        selectedIndex = index;
        return Object.entries(obj);
      }
    });
    metricsData = metricsData.splice(selectedIndex, 1);
    return this.createMetricObject(metricsData[0].slice(2));
  };

  createMetricObject = mergObj => {
    return mergObj.map(item => {
      return {
        type: item[0],
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
            : item[1].count
      };
    });
  };

  setMetricPos = item => {
    console.log(item);
    let metricValue;
    if (
      item[0] === "bugs" ||
      item[0] === "vulnerabilities" ||
      item[0] === "codeSmells"
    ) {
      metricValue =
        item[1].rating === "1.0"
          ? "low"
          : item[1].rating === "2.0"
          ? "lowest"
          : item[1].rating === "3.0"
          ? "medium"
          : item[1].rating === "4.0"
          ? "high"
          : item[1].rating === "5.0"
          ? "critical"
          : null;
    }
    if (item[0] === "coverage") {
      console.log(item[1].value);
      metricValue =
        item[1].value >= "80"
          ? "low"
          : item[1].value >= "70" && item[1].value <= "80"
          ? "lowest"
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
          ? "low"
          : item[1].value >= 3 && item[1].value <= 5
          ? "lowest"
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

  setRawRepoObjects = (rawData, outstandingBugs, averageResolution) => {
    const item = rawData.map((item, index) => {
      return {
        bugs_vulnerability_codeSmell: [
          { name: item.repoName },
          { title: "Bugs, Vulnerabilities & Code Smells" },
          { bugs: item.bugs },
          { vulberablities: item.vulnerabilities },
          { codesmells: item.codeSmells }
        ],
        coverage: [
          { name: item.repoName },
          { title: "Coverage" },
          item.coverage
        ],
        outstandingbugs: [
          { name: item.repoName },
          { title: "Outstanding Bugs" },
          outstandingBugs
        ],
        AvResolutionTime: [
          { name: item.repoName },
          { title: "Average Defect Resolution Time" },
          averageResolution
        ]
      };
    });
    const splitArr = this.splitRawObj(item);
    return splitArr;
  };

  splitRawObj = type => {
    const splitArr = type.map(obj => Object.values(obj));
    return splitArr;
  };

  createChartObject = typeObj => {
    const processedData = typeObj.map((item, index) => {
      return item.map(ele => {
        if (ele[0].name === this.props.currentRepo) {
          return {
            name: ele[1].title,
            data: ele,
            title: ele[1].title
          };
        }
      });
    });
    return processedData;
  };

  createCharts = (list, removed) => {
    let selectedIndex;
    const updatedList = list.filter((ele, index) => {
      if (index !== removed) return Object.assign({}, ele);
    });

    updatedList.map((item, ind) => {
      return item.map((ele, index) => {
        if (ele != undefined) {
          selectedIndex = ind;
          ele.data = ele.data.splice(2);
          ele.component = this.setChart(ele.title, ele.data);
        }
      });
    });
    const chartList = updatedList.splice(selectedIndex, 1);
    this.setState({
      charts: chartList
    });
  };

  setChart = (title, data) => {
    const chartArry = chartCompList.map(item => {
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

  removeChartComponent = chartIndex => {
    const charts = [...this.state.charts];
    this.createCharts(charts, chartIndex);
    const layouts = {};
    Object.keys(this.state.layout).map(key => {
      const copy = [...this.state.layout[key]];
      copy.splice(chartIndex, 1);
      const indexUpdate = copy.map((ele, index) => {
        return {
          ...ele,
          i: index.toString()
        };
      });
      layouts[key] = indexUpdate;
    });
    this.setState({
      layout: layouts
    });
  };

  componentWillReceiveProps(nextProps) {
    if (
      this.props.currentRepo !== nextProps.currentRepo ||
      this.props.projId !== nextProps.projId
    ) {
      this.setState({
        all_data: true
      });
    }
  }

  componentDidMount() {
    if (this.props.currentRepo) {
      this.setState({
        all_data: true
      });
    }
  }

  componentDidUpdate() {
    if (this.state.all_data) {
      this.fetchQualityData();
    }
  }

  render() {
    if (this.state.show) {
      return <Spinner show="true" />;
    } else {
      return (
        <React.Fragment>
          <Row className="Quality quality-metric-area w-100 p-0 m-0 ">
            <Row className="metric-legend w-100 text-white">
              <Col
                xl={2}
                lg={2}
                md={3}
                className="offset-xl-10 offset-lg-10 offset-md-9"
              >
                <Row>
                  <Col className="font-size-xs pr-0">
                    <FontAwesomeIcon className="critical" icon={faSquare} />{" "}
                    Critical{" "}
                  </Col>
                  <Col className="font-size-xs pr-0">
                    <FontAwesomeIcon className="medium" icon={faSquare} />{" "}
                    Medium{" "}
                  </Col>
                  <Col className="font-size-xs pr-0">
                    <FontAwesomeIcon className="low" icon={faSquare} /> Low
                  </Col>
                </Row>
              </Col>
            </Row>
            <Container fluid className=" w-100 h-90 d-flex align-item-center">
              <div className="h-100 w-100 d-flex overflow-auto">
                {this.state.qualityMetrics.map(ele => {
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
                        <TooltipHoc info="">
                          <FontAwesomeIcon
                            className="show-cursor"
                            onClick={() =>
                              this.onDisplayMetricsClickHandler(ele.type)
                            }
                            icon={faEllipsisV}
                          />
                        </TooltipHoc>
                      </Row>
                    </div>
                  );
                })}
              </div>
            </Container>
          </Row>

          {this.state.charts.length ? (
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
                  <TooltipHoc info={`${this.state.metricType} Data`}>
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
        </React.Fragment>
      );
    }
  }
}
//function to map the state received from reducer

const mapStateToProps = state => {
  return {
    currentExecId: state.execData.executiveId,
    qualityData: state.qualityData.currentQualityData.qualityDetails,
    projId: state.productDetails.currentProject.projectDetails.id,
    currentRepo: state.qualityData.currentRepo
  };
};

//function to dispatch action to the reducer

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { qualityDataDispatch, resetProjectRepoDispatch },
    dispatch
  );
};

//Connect react component to redux

export default connect(mapStateToProps, mapDispatchToProps)(Quality);
