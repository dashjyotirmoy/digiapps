import React from 'react';
import { CardGroup, Card, Row, Container, Col, Button } from 'react-bootstrap';
import styled from 'styled-components';
import Dropdown from '../Ui/CustomDropdown/Dropdown'
import Spline from './spline';
import CircularProgress from './circularProgress';

const ProductInfoBar = () => {
  return (
    <div className="h-10" style={{ backgroundColor: "#F0F0F0" }}>
      <Container fluid className="h-100">
        <Row className="h-100 border pr-1">
          <Col md={4}>
            <Row className="h-100">
              <Col md={2} className="d-xl-block d-lg-block d-sm-block d-xs-none d-none"></Col>
              <Col md={5} style={{ backgroundColor: "#C9D2F9" }}>
                <Row className="h-100" >
                  <Col md={8} className="m-auto">
                    <p className="font-size-smaller m-auto text-left text-lg-left text-md-left text-sm-left text-xl-center"><b><small>Product 1</small><span className="d-xl-none d-lg-none d-md-none ">dd</span> </b></p>
                  </Col>
                  <Col md={4} className="m-auto">
                    <p className="d-xl-block d-lg-block d-md-block d-sm-none d-none font-size-smaller m-auto text-left text-lg-right text-md-left text-sm-left text-xl-left"><b>dd</b></p>
                  </Col>
                </Row>
              </Col>
              <Col md={5} style={{ backgroundColor: "white" }}>
                <Row className="h-100" >
                  <Col md={12} className="m-auto">
                    <p className="font-size-smaller m-auto text-left text-lg-left text-md-left text-sm-left text-xl-right"><small>Product Aggregate view</small> </p>
                  </Col>
                </Row>
              </Col>

              {/* <Col md={5} className=" " style={{ backgroundColor: "white" }} >

                <p className="font-size-smaller m-0 text-black-50 text-xl-center text-lg-center text-md-center text-left pt-2" ><small>Product Aggregate View</small></p>

              </Col> */}
            </Row>
          </Col>
          <Col md={8}>
            <Row className="h-100">
              <Col style={{ backgroundColor: "light" }} md={2}>
                <Row className="pt-3">
                  <Col md={4}>8</Col>
                  <Col md={8} className="p-0 pt-3">
                    <p className="font-aggegate-sub-text m-0 text-left text-black-50 m-0"><small>Current Sprint</small></p>
                  </Col>
                </Row>
              </Col>
              <Col style={{ backgroundColor: "#F0F0F0" }} md={6}>
                <Spline></Spline>
              </Col>
              <Col style={{ backgroundColor: "#F0F0F0" }} md={4}>
                <Row className="pt-1 pb-1">
                  <Col md={6}>
                    <Row>
                      <Col md={5} className="p-0"><CircularProgress percentage={50} ></CircularProgress></Col>
                      <Col md={7}>texcct1</Col>
                    </Row>
                  </Col>
                  <Col md={6}>
                    <Row>
                      <Col md={5} className="p-0"><CircularProgress percentage={30} color={"turquoise"}></CircularProgress></Col>
                      <Col md={7}>texcct1</Col>
                    </Row>
                  </Col>
                </Row>
              </Col>

            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
export default ProductInfoBar;