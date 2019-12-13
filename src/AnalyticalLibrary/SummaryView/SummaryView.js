import React, { Suspense, Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faCircle,
  faArrowUp,
  faArrowDown,
  faTh
} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import ErrorBoundaries from "../../Components/ErrorBoundaries";
import Translate from "../Translations/Translations";
import { execInsightsDispatch } from "../../store/Actions/execInsights";
import { bindActionCreators } from "redux";
import summaryConstants from "../../Utility/Constants/SummaryViewConstants";
const Styles = styled.div`
  .data-header {
    height: 100%;
    color: #fff;
  }
`;
class SummaryView extends Component {
  state = {
    data: {},
    flag: false
  };

  componentDidMount() {
    this.props.execInsightsDispatch(this.props.currentExecId);
  }

  render() {
    let dimData = this.props.widData;
    const Components = this.props.lazyFunc(dimData);
    const ItemMetric = Components["ItemMetric"];
    const MainMetrics = Components["MainMetrics"];
    const mainMetrics = summaryConstants.mainMetrics.map((item, key) => {
      return {
        name: Translate[item] || item,
        value: this.props.metricsData ? this.props.metricsData[item] : 0
      };
    });

    const validItemMetrics = summaryConstants.itemMetrics.filter(item => {
      if (this.props.metricsData && this.props.metricsData[item]) return item;
    });

    const itemMetrics = validItemMetrics.map((item, key) => {
      return {
        name: Translate[item] || item,
        value: this.props.metricsData ? this.props.metricsData[item] : 0
      };
    });
    return (
      <ErrorBoundaries>
        <div className="h-12">
          <Suspense fallback={<div>...Loading</div>}>
            <Styles style={{ height: "100%" }}>
              <Container fluid className="data-header summary-view">
                <main className="align-items-center d-flex h-100 w-100">
                  <Row className="h-75 m-0 p-0 row w-100">
                    <div className="h-100 d-none d-md-block d-lg-block d-xl-block">
                      <Row className="d-flex p-0 m-0 w-100 h-100">
                        <Col
                          md={12}
                          lg={12}
                          xl={12}
                          className="h-100 px-2 d-flex align-items-center justify-item-center"
                        >
                          <FontAwesomeIcon
                            className="font-size-smaller"
                            icon={faArrowLeft}
                          />
                          <div className="w-100 px-1">
                            <p className=" m-0 text-center text-black m-0 font-title">
                              {this.props.execDataReceived
                                ? this.props.metricsData.name.split(" ")[0]
                                : ""}
                            </p>
                            <p className="font-aggegate-sub-text m-0 text-center text-white-50 m-0">
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
                      <MainMetrics mainMetrics={mainMetrics} />
                    </div>
                    <div className="h-100 px-xl-2 px-lg-2 d-inline-block d-flex flex-grow-1 d-inline-block">
                      <ItemMetric itemMetrics={itemMetrics} />
                    </div>
                  </Row>
                </main>
              </Container>
            </Styles>
          </Suspense>
        </div>
      </ErrorBoundaries>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentExecId: state.execData.executiveId,
    metricsData: state.execData.currentExecutiveInfo.executiveData,
    execDataReceived: state.execData.currentExecutiveInfo.executiveDataReceived
  };
};
const mapDispatchToProps = dispatch => {
  return bindActionCreators({ execInsightsDispatch }, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(SummaryView);
