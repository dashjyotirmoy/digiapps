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
import axios from "axios";
import { showComponents } from "../../Actions";
import { bindActionCreators } from "redux";
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
    this.props.showComponents();
    // axios.get("/JsonData/SummaryBarData.json").then(res => {
    //   const data = res.data;
    //   this.setState({ data: data, flag: true });
    // });
  }

  render() {
    let sample = this.props.NameVal;
    let dimData = this.props.data;
    const Components = this.props.func(dimData);
    const ItemMetric = Components["ItemMetric"];
    const MainMetrics = Components["MainMetrics"];
    const nameArr = ["totalProduct", "totalMembers", "totalHrs"];
    const NameVal = nameArr.map((item, key) => {
      return {
        name: Translate[item] || item,
        value: this.props.NameVal ? this.props.NameVal[item] : 0
      };
    });
    const ItemArr = [
      "averageReleaseCycle",
      "averageDeploymentLeadTime",
      "averageMTTD",
      "averageMTTR",
      "averageCustRating"
    ];

    const ItemNameVal = ItemArr.map((item, key) => {
      return {
        name: Translate[item] || item,
        value: this.props.NameVal ? this.props.NameVal[item] : 0
      };
    });
    return (
      <ErrorBoundaries>
        <div className="h-10">
          <Suspense fallback={<div>...Loading</div>}>
            <Styles style={{ height: "100%" }}>
              <Container fluid className="data-header">
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
                            <p className="font-size-smaller m-0 text-center text-black m-0">
                              {this.props.execData.username}
                            </p>
                            <p className="font-aggegate-sub-text m-0 text-center text-white-50 m-0">
                              <small>{this.props.execData.designation}</small>
                            </p>
                          </div>
                          <FontAwesomeIcon icon={faTh} />
                        </Col>
                      </Row>
                    </div>
                    <div className="h-100 px-xl-2 px-lg-2 grid-graph-comp rounded w-auto d-inline-block">
                      <MainMetrics NameVal={NameVal} />
                    </div>
                    <div className="h-100 px-xl-2 px-lg-2 d-inline-block d-flex flex-grow-1 d-inline-block">
                      <ItemMetric ItemNameVal={ItemNameVal} />
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
    NameVal: state.components.data,
    execData: {
      username: state.components.userName,
      designation: state.components.designation
    }
  };
};
const mapDispatchToProps = dispatch => {
  return bindActionCreators({ showComponents }, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(SummaryView);
