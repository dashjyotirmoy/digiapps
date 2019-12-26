import React, { Component } from "react";
import Grid from "../../Grid-Layout/Grid";
import { Row, Container, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquare, faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import active from "../../../../content/img/activityStatus.png";
import coverage from "../../../../content/img/coverage.png";
import outstandingDefects from '../../../../content/img/outstandingDefects.png';
import resultCount from '../../../../content/img/resultCount.png';
import BVCLineHigh from '../../Charts/BVCLineHigh/BVCLineHigh';
import CoverageAreaHigh from '../../Charts/CoverageAreaHigh/CoverageAreaHigh';
const initialData = [
  {
    name: "rct",
    type: "BVCLineHigh",
    data: "Activity Status",
    title: active,
    component: {}
  },
  {
    name: "dlt",
    type: "CoverageAreaHigh",
    data: "Coverage",
    title: coverage,
    component: {}
  },
  {
    name: "tp",
    type: "img",
    data: "Result Count and Pass Rate",
    title: resultCount,
    component: {}
  },
  {
    name: "dcp",
    type: "img",
    data: "Outstanding Defects",
    title: outstandingDefects,
    component: {}
  }
];

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
    graphCount: 6,
    currentBreakpoint: "lg",
    currentColCount: 0,
    gridCol: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
    gridBreakpoints: { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }
  };
  removeChartComponent = chartIndex => {
    const charts = [...this.state.charts];
    this.createCharts(charts, chartIndex);
    //charts.splice(chartIndex, 1);
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

  createCharts = (list, removed) => {
    const updatedList = list.filter((ele, index) => {
      if (index !== removed) return Object.assign({}, ele);
    });
    updatedList.map(ele => {
      ele.component = this.setChart(ele.type, ele.title, ele.data);
    });
    this.setState({
      charts: updatedList
    });
  };

  setChart = (type, title, data) => {
    switch (type) {
      case "BVCLineHigh":
        return <BVCLineHigh />;
      case "CoverageAreaHigh":
        return <CoverageAreaHigh />;
      case "img":
        return (
          <div className="chart-title w-100 h-100">
            <div
              className="chart-title ml-3 mt-1 position-absolute"
              style={{ zIndex: "1" }}
            >
              {data}
            </div>
            <img src={title} className="h-100 w-100 border-radius-10" />
          </div>
        );
    }
  };
  componentDidMount() {
    this.createCharts(initialData);
  }
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
              {qualityMetrics.map(ele => {
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
