import React from 'react';
import { Container, Row, Col, Tabs, Tab } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import BuildTreds from '../../Charts/LineHigh/BuildTrendsLineHigh';
var chartData = {};
const VelocityBuild = props => {
  return (
    <React.Fragment>
       {props && props.cardsData.jobId ? (
      <Container fluid className="p-3">
        <Row>
          <Col xl={6} lg={6} md={6}>
            <p style={{ color: '#f5f5f5' }}>Digital Ops-Service</p>
          </Col>
          <Col
            xl={6} lg={6} md={6}
            className="d-flex justify-content-end text-white"
          >
            <Row className="">
              <Col className="pointer" onClick={() => { alert("1m") }} style={{ color: "#6b798b" }} >1m</Col>
              <Col className="pointer" onClick={() => { alert("3m") }}>3m</Col>
              <Col className="pointer" onClick={() => { alert("6m") }} style={{ color: "#6b798b" }}>6m</Col>
              <Col className="pointer" onClick={() => { alert("1y") }} style={{ color: "#6b798b" }}>1y</Col>
              <Col>DD</Col>
              <Col ><FontAwesomeIcon icon={faFilter} className="pointer" onClick={() => { alert("Filter") }} /></Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <BuildTreds buildTrendsData={props} />
        </Row>
      </Container>
      ) : <div style={{ color: "#ffffff", fontSize: "20px", textAlign: "center" }}>please select the dropdown to see the Chart Data</div>}
    </React.Fragment>
  )
}

export default VelocityBuild;