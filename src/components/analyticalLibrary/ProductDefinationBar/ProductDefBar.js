import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import { Container, Row, Col, Tabs, Tab } from "react-bootstrap";
import { currentTabDispatch } from "../../../store/actions/chartData";
import styled from "styled-components";
import ErrorBoundaries from "../../../components/errorBoundaries";

const StyleMainTab = styled.div`
  .nav-tabs { {
    border-bottom:0;
  }
  
  .nav-item{
    border:unset !important;
  }
  
  .nav-link.active{
    background-color: unset;
    border-bottom:2px solid yellow !important;
    font-weight:700 !important;
    color:#f5f5f5;
  }
  .nav-link.active>small{
    
  }
`;

class ProductDefBar extends Component {
  state = {
    activeLink: ""
  };
  updateView = type => {
    this.props.currentTabDispatch(type.toLowerCase());
    this.props.history.push(`/${type}`);
  };
  componentDidMount() {
    const currentLink = this.getActiveLink().toLowerCase();
    this.props.currentTabDispatch(currentLink);
    this.setState({
      activeLink: currentLink
    });
  }

  getActiveLink = () => {
    const { location } = this.props;
    const activeLink = location.pathname.replace(/\//g, "");
    return activeLink;
  };

  render() {
    return (
      <ErrorBoundaries>
        <Container fluid>
          <Row className="d-flex w-100 p-0 m-0 text-white-50">
            <Col md={8} lg={9} xl={9} className="p-0">
              <StyleMainTab>
                {this.state.activeLink !== "" ? (
                  <Tabs
                    onSelect={e => this.updateView(e)}
                    defaultActiveKey={this.state.activeLink}
                    className="border-0"
                  >
                    <Tab
                      eventKey="security"
                      title={
                        <span className="font-aggegate-sub-text">
                          {" "}
                          Security
                        </span>
                      }
                    ></Tab>

                    <Tab
                      eventKey="velocity"
                      title={
                        <span className="font-aggegate-sub-text">
                          Velocity and Efficiency
                        </span>
                      }
                    ></Tab>
                    <Tab
                      eventKey="quality"
                      title={
                        <span className="font-aggegate-sub-text"> Quality</span>
                      }
                    ></Tab>
                    <Tab
                      eventKey="customer"
                      title={
                        <span className="font-aggegate-sub-text">
                          {" "}
                          Customer Value
                        </span>
                      }
                    ></Tab>
                    <Tab
                      eventKey="insights"
                      title={
                        <span className="font-aggegate-sub-text">
                          {" "}
                          Insights
                        </span>
                      }
                    ></Tab>

                  </Tabs>
                ) : null}
              </StyleMainTab>
            </Col>
          </Row>
        </Container>
      </ErrorBoundaries>
    );
  }
}

const mapStateToProps = state => {
  return {};
};
const mapDispatchToProps = dispatch => {
  return bindActionCreators({ currentTabDispatch }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ProductDefBar));
