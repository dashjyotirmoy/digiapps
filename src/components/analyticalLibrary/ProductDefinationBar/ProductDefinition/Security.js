import React, { Component } from "react";
import Grid from "../../Grid-Layout/Grid";
import { Row, Col } from "react-bootstrap";
import Dropdown from "../../Dropdown/Dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown
} from "@fortawesome/free-solid-svg-icons";
// import Spinner from "../../Spinner/Spinner";



class Security extends Component {
  state = {
    charts: [],
    displayMetric: false,
    metricType: "",
    layout: {
      lg: [
        { i : "0", x : "0", y : "0", w : "3", h : 1, isResizable : false },
        { i : "1", x : "3", y : "0", w : "3", h : 1, isResizable : false },
        { i : "2", x : "6", y : "0", w : "3", h : 1, isResizable : false },
        { i : "3", x : "9", y : "0", w : "3", h : 3, isResizable : false },
        { i : "4", x : "0", y : "1", w : "9", h : 2, isResizable : false },
      ],
      md: []
    },
    gridCol: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
    gridBreakpoints: { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 },
    qualityMetrics: [],
    show: false,
    selectedRepo: "",
    repoData: []
  };

  removeChartComponent = (chartIndex) => {

  }

  fetchSecurityData = (props) => {
    this.setState({
        all_data: false,
        charts: []
    });



  }

    render() {
      
        return (
        //  <div style={{ color: "white" }}>security </div>

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
                        : "Select Project"}
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
          </Row>
          {/* <Grid
            //   chartData={this.state.charts[0]}
              layouts={this.state.layout}
              removeDelegate={this.removeChartComponent}
              breakpoint={this.state.gridBreakpoints}
              columnSize={this.state.gridCol}
            /> */}
            {/* <ResponsiveGridLayout
                // maxRows={2}
                className="layout"
                autoSize={false}
                layouts={this.state.layouts}
                compactType={"vertical"}
                breakpoints={this.state.gridBreakpoints}
                cols={this.state.gridCol}
                preventCollision={false}
            >
            ok
            </ResponsiveGridLayout> */}
        </React.Fragment>
        );
      }
    }

export default Security;
