import React, { Component } from "react";
import Grid from "../../Grid-Layout/Grid";
import { Row, Container, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquare, faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import mockApi from "../../../../utility/Http/devOpsApisMock";
import LineHigh from "../../Charts/LineHigh/LineHigh";
import AreaHigh from "../../Charts/AreaHigh/AreaHigh";
import StackedBar from "../../Charts/StackedBar/StackedBar";
import { qualityDataDispatch } from "../../../../store/actions/qualityData";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ColumnHigh from "../../Charts/DefectColumn/DefectHigh";

const chartCompList = [
  {
    name: "Bugs, Vulnerabilities & Code Smells",
    type: "MultipleLineHigh",
    component: LineHigh
  },
  {
    name: "Coverage & Duplications",
    type: "AreaHigh",
    component: AreaHigh
  },
  {
    name: "Average Defect Resolution Time",
    type: "DefectHigh",
    component: ColumnHigh
  },

  {
    name: "Outstanding Bugs",
    type: "BarHigh",
    component: StackedBar
  }
];

class Quality extends Component {
  state = {
    charts: [],
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
    qualityMetrics: []
  };

  fetchQualityData = () => {
    this.props
      .qualityDataDispatch(this.props.currentExecId, this.props.projId)
      .then(item => {
        const qualityMetrics = this.createMetrics(
          this.props.qualityData.repositories
        );
        this.setState({
          qualityMetrics
        });
        const type = this.setRawRepoObjects(
          this.props.qualityData.repositories,
          this.props.qualityData.outstandingBugs,
          this.props.qualityData.averageDefectResolutionTime
        );

        this.createCharts(this.createChartObject(type));
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
              : ""
            : item[0] === "duplication"
            ? item[1] != null
              ? `${item[1]}%`
              : ""
            : item[1].count
      };
    });
  };

  setMetricPos = item => {
    let metricValue =
      item[0] === "coverage"
        ? "low"
        : item[0] === "duplication" || item[0] === "vulnerabilities"
        ? "medium"
        : item[0] === "bugs" || item[0] === "codeSmells"
        ? "critical"
        : null;
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
          { title: "Coverage & Duplications" },
          item.coverage
        ],

        AvResolutionTime: [
          { name: item.repoName },
          { title: "Average Defect Resolution Time" },
          averageResolution
        ],
        outstandingbugs: [
          { name: item.repoName },
          { title: "Outstanding Bugs" },
          outstandingBugs
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
            name: ele[0].name,
            data: ele,
            title: ele[1].title
          };
        }
      });
    });
    return processedData;
    // => {
    //   ele => {
    //     return {
    //       name: item[0].name,
    //       data: ite,
    //       title: item[1].title
    //     }
    //   };
    // });
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
    console.log("Final", chartList);
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

  componentDidUpdate(prevProps) {
    if (this.props.currentRepo != prevProps.currentRepo) {
      this.fetchQualityData();
    }
  }

  componentDidMount() {
    if (this.props.currentRepo) {
      this.fetchQualityData();
    }
  }
  render() {
    console.log(this.state.chartList);
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
                  <FontAwesomeIcon className="medium" icon={faSquare} /> Medium{" "}
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
                        <FontAwesomeIcon
                          className={ele.position}
                          icon={faSquare}
                        />
                      </span>
                    </Row>
                    <Row className="align-items-center d-flex h-75 justify-content-center row text-white metric-value">
                      {ele.value}
                    </Row>
                    <Row className="d-flex justify-content-end px-3 text-white-50">
                      <FontAwesomeIcon icon={faEllipsisV} />
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
      </React.Fragment>
    );
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
  return bindActionCreators({ qualityDataDispatch }, dispatch);
};

//Connect react component to redux

export default connect(mapStateToProps, mapDispatchToProps)(Quality);
