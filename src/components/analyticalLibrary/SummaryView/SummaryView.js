//Widget component which displays the summarview of the executive details

import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faTh } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { execInsightsDispatch } from "../../../store/actions/executiveInsights";
import { bindActionCreators } from "redux";
import { translations as Translate } from "../Translations";
import { itemMetrics, mainMetrics } from '../../../utility/constants/';
import Widgets from "../../dashboardController/widgetParser";

const Styles = styled.div`
  .data-header {
    height: 100%;
    color: #fff;
  }
`;

class SummaryView extends Component {
  componentDidMount() {
    this.props.execInsightsDispatch(this.props.currentExecId);
  }

  render() {
    let dimensionData = this.props.widgetProps;

    const summaryDimensions = new Widgets(); // instance of the Widgets class
    const Components = summaryDimensions.loadDimensions(dimensionData); // method to load summary view dimensions

    //dynamically importing the components through widget parent class instead of importing directly in the component

    const MainMetrics = Components["MainMetrics"];
    const ItemMetric = Components["ItemMetric"];

    //return an object with mainmetric values

    const mainMetricItems = mainMetrics.map((item, key) => {
      return {
        name: Translate[item] || item,
        value: this.props.metricsData ? this.props.metricsData[item] : 0
      };
    });

    const validItemMetrics = itemMetrics.filter(item => {
      if (this.props.metricsData && this.props.metricsData[item]) return item;
    });

    //return an object with itemmetric values

    const itemMetricsData = validItemMetrics.map((item, key) => {
      return {
        name: Translate[item] || item,
        value: this.props.metricsData ? this.props.metricsData[item] : 0
      };
    });

    return (
      <div className="h-10">
        <Styles style={{ height: "100%" }}>
          <Container fluid className="data-header summary-view">
            <main className="align-items-center d-flex h-100 w-100">
              <Row className="h-75 m-0 p-0 row w-100 d-flex flex-nowrap">
                    <div className="h-100 d-none p-lg-0 d-md-block d-lg-block d-xl-block px-4">
                  <Row className="d-flex p-0 m-0 w-100 h-100">
                    <Col
                      md={12}
                      lg={12}
                      xl={12}
                      className="h-100 px-2 d-flex align-items-center justify-item-center"
                    >
                      <FontAwesomeIcon
                            className="font-metric-main-text"
                        icon={faArrowLeft}
                      />
                          <div className="w-100 px-4">
                        <p className=" m-0 text-center text-black m-0 font-title">
                          {this.props.execDataReceived
                            ? this.props.metricsData.name.split(" ")[0]
                            : ""}
                        </p>
                            <p className="font-aggegate-sub-text m-0 text-center text-white-50 m-0 width-fit-content">
                          {this.props.execDataReceived
                            ? this.props.metricsData.designation
                            : ""}
                        </p>
                      </div>
                      <FontAwesomeIcon icon={faTh} />
                    </Col>
                  </Row>
                </div>
                <div className="h-100 px-xl-2 px-lg-2 grid-graph-comp rounded w-auto d-inline-block align-items-center d-flex ">
                  {this.props.execDataReceived ? (
                    <MainMetrics mainMetric={mainMetricItems} />
                  ) : (
                    "loading"
                  )}
                </div>
                    <div className="mx-3 h-100 px-xl-2 px-lg-2 d-inline-block d-flex flex-grow-1 d-inline-block overflow-auto">
                  {this.props.execDataReceived ? (
                    <ItemMetric itemMetric={itemMetricsData} />
                  ) : (
                    "loading"
                  )}
                </div>
              </Row>
            </main>
          </Container>
        </Styles>
      </div>
    );
  }
}

//function to map the state received from reducer

const mapStateToProps = state => {
  return {
    currentExecId: state.execData.executiveId,
    metricsData: state.execData.currentExecutiveInfo.executiveData,
    execDataReceived: state.execData.currentExecutiveInfo.executiveDataReceived
  };
};

//function to dispatch action to the reducer

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ execInsightsDispatch }, dispatch);
};

//Connect react component to redux

export default connect(mapStateToProps, mapDispatchToProps)(SummaryView);
