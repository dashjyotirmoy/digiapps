import React from 'react';
import { CardGroup, Card, Row, Container, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import Dropdown from '../../../libs/AnalyticalLibrary/DropDown/Dropdown';
import Spline from '../../../libs/AnalyticalLibrary/SpLine/spline';
import CircularProgress from '../../../libs/AnalyticalLibrary/CircularProgress/circularProgress';

const ProductInfoBar = () => {
  const list = ["Red", "Black", "Blue"];

  return (

    <div className="h-10" style={{ backgroundColor: "#F0F0F0" }}>
      <Container fluid className="h-100">
        <Row className="h-100 border p-0 m-0">
          <Col className="h-100" sm={12} md={5} lg={5} xl={5}>
            <Row className="h-100">
              <Col md={4} lg={4} xl={4} className="h-100 justify-content-center d-flex align-items-center" style={{ backgroundColor: "#C9D2F9" }}>
                <Dropdown listData={list} direction="down">
                  <Row className="h-100" >
                    <Col md={9} lg={9} xl={9}>
                      <p className="font-aggegate-sub-text m-auto text-left text-lg-left text-md-left text-sm-left text-xl-center">
                        Product 1
                    </p>
                    </Col>
                    <Col md={3} lg={3} xl={3} className="font-aggegate-sub-text p-0">
                      <FontAwesomeIcon icon={faChevronDown} />
                    </Col>
                  </Row>
                </Dropdown>
              </Col>
              <Col md={4} lg={4} xl={4} style={{ backgroundColor: "white" }}>
                <Row className="h-100" >
                  <Col md={12} className="m-auto">
                    <p className="font-aggegate-sub-text m-auto text-center">Product Aggregate view</p>
                  </Col>
                </Row>
              </Col>
              <Col md={4} lg={4} xl={4} className="border-right p-0">
                <Row className="h-100 p-0 m-0 align-items-center col-md-12 d-flex justify-content-center" >
                  <div>
                    <p className="font-aggegate-main-text d-inline">
                      8
                    </p>
                    <p className="d-inline m-0 text-left text-black-50 m-0 font-aggegate-sub-text "> Current Sprint</p>
                  </div>
                </Row>
              </Col>
            </Row>
          </Col>
          <Col md={7} className="h-100">
            <Row className="h-100">
              <Col md={7} xl={8} lg={8} className="h-100">
                <Row className="p-0 m-0 h-100 w-100 border-right ">
                  <Col md={12} xl={12} lg={12} className="h-100 pl-0 py-1">
                    <Spline></Spline>
                  </Col>
                </Row>
              </Col>
              <Col lg={4} xl={4} md={5} className="d-md-block p-0 d-lg-block d-xl-block d-sm-none">
                <Row className="p-0 m-0 w-100 d-flex align-items-center h-100">
                  <Col md={6} className="border-right p-0">
                    <Row className="p-0 m-0 w-100 ">
                      <Col md={5} className="p-0"><CircularProgress percentage={50} ></CircularProgress></Col>
                      <Col md={7} className="p-0 d-flex align-items-center justify-content-center" >
                        <div id="feature-info" className="d-inline-block">
                          <p className="font-size-smaller m-0 text-left text-lg-center text-md-center text-sm-center text-xl-center">
                            <small>12/14</small>
                          </p>
                          <p className="font-size-xs m-0 text-left text-lg-center text-md-center text-sm-left text-xl-center m-0">
                            Features
                          </p>
                        </div>
                      </Col>
                    </Row>
                  </Col>
                  <Col md={6} className="border-right p-0">
                    <Row className="p-0 m-0 w-100 d-flex align-items-center h-100">
                      <Col md={5} className="p-0"><CircularProgress percentage={30} color={"turquoise"} ></CircularProgress></Col>
                      <Col md={7} className="p-0 d-flex align-items-center justify-content-center" >
                        <div id="backlog-info" className="d-inline-block">
                          <p className="font-size-smaller m-0 text-left text-lg-center text-md-center text-sm-center text-xl-center">
                            <small>29/40</small>
                          </p>
                          <p className="font-size-xs m-0 text-left text-lg-center text-md-center text-sm-left text-xl-center m-0">
                            Backlogs
                          </p>
                        </div>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>

            </Row>
          </Col>
        </Row>
      </Container>
    </div >
  )
}
export default ProductInfoBar;