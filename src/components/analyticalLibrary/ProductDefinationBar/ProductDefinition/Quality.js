import React, { Component } from "react";
import Grid from "../../Grid-Layout/Grid";
import { Row, Container, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquare, faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import mockApi from "../../../../utility/Http/devOpsApisMock";
import LineHigh from "../../Charts/LineHigh/LineHigh";
import AreaHigh from "../../Charts/AreaHigh/AreaHigh";

const qualityMetrics = [
  {
    type: "Bugs",
    position: "critical",
    value: "32"
  },
  {
    type: "Vulnerabilities",
    position: "medium",
    value: "53"
  },
  {
    type: "Code Smells",
    position: "critical",
    value: "1.4K"
  },
  {
    type: "Coverage",
    position: "low",
    value: "22%"
  },
  {
    type: "Duplications",
    position: "medium",
    value: "4.4%"
  }
];

const chartComp = [
  {
    name: "Bugs, Vulnerabilities & Code Smells",
    type: "MultipleLineHigh",
    component: LineHigh
  },
  {
    name: "Coverage & Duplications",
    type: "AreaHigh",
    component: AreaHigh
  }
];

class Quality extends Component {
  state = {
    charts: [],
    layout: {
      lg: [
        { i: "0", x: 0, y: 0, w: 6, h: 2, isResizable: false },
        { i: "1", x: 6, y: 0, w: 6, h: 2, isResizable: false }
        // { i: "2", x: 0, y: 0, w: 6, h: 2, isResizable: false },
        // { i: "3", x: 6, y: 2, w: 6, h: 2, isResizable: false }
      ],
      md: [
        { i: "0", x: 0, y: 0, w: 5, h: 2, isResizable: false },
        { i: "1", x: 6, y: 0, w: 5, h: 2, isResizable: false }
        // { i: "2", x: 0, y: 2, w: 4, h: 2, isResizable: false },
        // { i: "3", x: 4, y: 2, w: 6, h: 2, isResizable: false }
      ]
    },
    gridCol: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
    gridBreakpoints: { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 },
    countData: []
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

  createChartObject = typeObj => {
    const processedData = typeObj[0].map(ele => {
      return {
        name: ele[0].name,
        data: ele,
        title: ele[1].title
      };
    });
    return processedData;
  };

  createCharts = (list, removed) => {
    const updatedList = list.filter((ele, index) => {
      if (index !== removed) return Object.assign({}, ele);
    });

    updatedList.map(ele => {
      ele.data = ele.data.splice(2);
      ele.component = this.setChart(ele.title, ele.data);
    });
    this.setState({
      charts: updatedList
    });
  };

  setChart = (title, data) => {
    const chartArry = chartComp.map(item => {
      if (item.name === title) {
        return <item.component type={item.type} title={title} data={data} />;
      }
    });
    return chartArry;
  };

  // type: "Bugs",
  // position: "critical",
  // value: "32"

  componentDidMount() {
    const qualityData = mockApi.getQualityMetricsData();
    qualityData.then(item => {
      this.state.countData = this.createMetrics(item.data.repository);
      const type = this.setType(
        item.data.repository,
        item.data.outstandingBugs
      );

      const splitArr = this.splitType(type);

      this.createCharts(this.createChartObject(splitArr));
    });
  }

  createMetrics = arr => {
    let metricsData = arr.map(obj => Object.entries(obj));
    metricsData = metricsData[0].slice(2);
    return this.createMetricObject(metricsData);
  };

  createMetricObject = mergObj => {
    return mergObj.map(item => {
      return {
        type: item[0],
        position: "critical",
        value:
          item[0] === "coverage"
            ? item[1].value
            : item[0] === "duplication"
            ? item[1]
            : item[1].count
      };
    });
  };

  splitType = type => {
    const splitArr = type.map(obj => Object.values(obj));
    return splitArr;
  };

  setType = (rawData, outStandingBugs) => {
    const item = rawData.map((item, index) => {
      return {
        bugs_vulnerability_codeSmell: [
          { name: item.name },
          { title: "Bugs, Vulnerabilities & Code Smells" },
          { bugs: item.bugs },
          { vulberablities: item.vulnerabilities },
          { codesmells: item.codeSmells }
        ],
        coverage: [
          { name: item.name },
          { title: "Coverage & Duplications" },
          item.coverage
        ]
      };
    });
    return item;
  };

  render() {
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
              {this.state.countData.map(ele => {
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
            chartData={this.state.charts}
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

export default Quality;
