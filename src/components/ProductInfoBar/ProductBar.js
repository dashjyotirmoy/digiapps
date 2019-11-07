import React from 'react';
import { CardGroup, Card, Row, Container, Col, Button } from 'react-bootstrap';
import styled from 'styled-components';
import Dropdown from '../Ui/CustomDropdown/Dropdown'

const ProductInfoBar = () => {
  return (
    <div className="h-10" style={{ backgroundColor: "#F0F0F0" }}>
      <Container fluid className="h-100">
        <Row className="h-100 border">
          <Col md={4} >
            <Row className="h-100">
              <Col md={1} className="d-xl-block d-lg-block d-sm-block d-xs-none d-none"></Col>
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

          </Col>
        </Row>
      </Container>
    </div>
  )
}
export default ProductInfoBar;