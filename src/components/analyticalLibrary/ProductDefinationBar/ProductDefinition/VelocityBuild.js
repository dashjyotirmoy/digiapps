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

            </Col>
            <Col
              xl={6} lg={6} md={6}
              className="d-flex justify-content-end text-white"
            >
              <Row className="">
                <Col className="pointer" onClick={() => { alert("1m") }} style={{ color: "#6b798b" }} >1m</Col>
                <Col className="pointer" onClick={() => { alert("3m") }} style={{ color: "#6b798b" }}>3m</Col>
                <Col className="pointer" onClick={() => { alert("6m") }} style={{ color: "#6b798b" }}>6m</Col>
                <Col className="pointer" onClick={() => { alert("1y") }} style={{ color: "#6b798b" }}>1y</Col>
                <Col style={{ color: "#6b798b" }}>DD</Col>
                <Col style={{ color: "#6b798b" }}><FontAwesomeIcon icon={faFilter} className="pointer" onClick={() => { alert("Filter") }} /></Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <BuildTreds buildTrendsData={props} />
          </Row>
        </Container>
      ) : <div style={{ color: "#ffffff", fontSize: "20px", textAlign: "center" }}>Please select the dropdown for Chart Data</div>}
    </React.Fragment>
  )
}

export default VelocityBuild;