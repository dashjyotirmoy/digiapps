import React from 'react';
import { Container, Row, Col, Tabs, Tab } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFunnelDollar } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

const StyleMainTab = styled.div`
  .nav-tabs { {
    border-bottom:0;
  }
  
  .nav-item{
    border:unset !important;
  }
  
  .nav-link.active{
    background-color: unset;
    border-bottom:1px solid blue !important;
    font-weight:700 !important;
  }
  .nav-link.active>small{
    
  }
`;
const StyleSideTab = styled.div`
  .nav-tabs { {
    border-bottom:0;
  }
  
  .nav-item{
    border:unset !important;
  }
  .nav-link {
    display: block;
    padding: .5rem .5rem;
}
  .nav-link.active{
    background-color: unset;
    font-weight:700 !important;
  }

`;

const VelocityTab = () => {
    return (
        <Container fluid>
            <Row className="d-flex w-100 p-0 m-0">
                <Col md={8} lg={9} xl={9} className="p-0">
                    <StyleMainTab>
                        <Tabs defaultActiveKey="quality" className="border-0">
                            <Tab eventKey="home" title={<span className="font-aggegate-sub-text" > Velocity and Effeciency</span>}>
                            </Tab>
                            <Tab eventKey="quality" title={<span className="font-aggegate-sub-text" > Quality</span>}>
                            </Tab>
                            <Tab eventKey="contact" title={<span className="font-aggegate-sub-text" > Organizational Effectiveness</span>} >
                            </Tab>
                            <Tab eventKey="customer" title={<span className="font-aggegate-sub-text" > Customer Value</span>} >
                            </Tab>
                        </Tabs>
                    </StyleMainTab>

                </Col>
                <Col md={4} lg={3} xl={3} className="d-flex justify-content-xl-end justify-content-lg-end justify-content-md-start">
                    <Row className="w-100 p-0 m-0 align-content-center d-flex justify-content-around">
                        <Col className="p-0 font-aggegate-sub-text nav-link">1m</Col>
                        <Col className="p-0 font-aggegate-sub-text">3m</Col>
                        <Col className="p-0 font-aggegate-sub-text">6m</Col>
                        <Col className="p-0 font-aggegate-sub-text">1y</Col>
                        <Col className="p-0 font-aggegate-sub-text">custom</Col>
                        <Col className="p-0 font-aggegate-sub-text"><FontAwesomeIcon icon={faFunnelDollar} /></Col>
                    </Row>
                </Col>
            </Row>
        </Container >
    );
}

export default VelocityTab;