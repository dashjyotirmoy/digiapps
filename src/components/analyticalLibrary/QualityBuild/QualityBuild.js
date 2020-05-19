import React from "react";
import { Container, Col, Row, Card, Button } from "react-bootstrap";
import BuildLine from "../Charts/LineHigh/BuildLine";


const QualityBuild = () => {
  return (
    <React.Fragment>
      <Container fluid>
        <Row>
          <Col md={6} sm={12}>
            <Row>
              <Col>
                <Card.Body className="bg">
                  <h5 className="mb-3">Build Status</h5>
                 <BuildLine/>
                  <Card.Body className="pb-0">

                  </Card.Body>
                </Card.Body>
              </Col>
            </Row>
          </Col>
          <Col md={6} sm={12}>
            <Row>
              <Col>
                <Card.Body className="bg">
                  <h5 className="mb-3">Top 10 Most Broken Tests</h5>

                  <Card.Body >
                    <div className="wrap">
                      <table className="table table-hover table-dark">
                        <thead className="tablehead">
                          <tr>
                            <th>Test Name</th>
                            <th className="w-18">Time Failed</th>
                            <th className="w-23">Recent Failed Builds</th>
                          </tr>
                        </thead>
                      {/* </table>

                      <div className="inner_table">
                        <table className="table table-hover table-dark"> */}
                          <tbody className="tablerow f-12">
                            <tr >
                              <td>
                                <p>Recent Eclipse</p>
                              </td>
                              <td>
                                {" "}
                                <p>1</p>
                              </td>
                              <td>
                                <p>8</p>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    {/* </div> */}
                  </Card.Body>
                </Card.Body>
              </Col>
            </Row>
          </Col>
          </Row>
          <Row className="mt-5">
            <Col>
              <Card.Body className="bg card-height">
                <p>Top 10 Most Broken Tests</p>
                <Card.Body>
                  <div className="wrap">
                    <table className="table table-hover table-dark">
                      <thead className="tablehead">     
                        <tr>
                          <th className="w-40">Packages/Class/Test Method</th>
                          <th>Passed</th>
                          <th>Transistions</th>
                          <th className="text-center">9</th>
                          <th className="text-center">8</th>
                          <th className="text-center">7</th>
                          <th className="text-center">6</th>
                          <th className="text-center">5</th>
                          <th className="text-center">4</th>
                          <th className="text-center">3</th>
                         
                          </tr>
                      </thead>
                           <tbody className="tablerow">
                          <tr>
                            <td>
                              <p>om.ey.digitalops.service.testoml.ey.digital</p>
                            </td>
                            <td>100%(100%)</td>
                            <td>0</td>
                        
                            <td>
                              <Button
                                style={{
                                  minWidth: "4rem",
                                  lineHeight: "1rem",
                                  color: "#222222",
                                  background: "#52901A",
                                  border: "#B65355",
                                }}
                              >
                                Passed
                              </Button>
                            </td>
                            <td>
                              <Button
                                style={{
                                  minWidth: "4rem",
                                  lineHeight: "1rem",
                                  color: "#222222",
                                  background: "#52901A",
                                  border: "#B65355",
                                }}
                              >
                                Passed
                              </Button>
                            </td>
                            <td>
                              <Button
                                style={{
                                  minWidth: "4rem",
                                  lineHeight: "1rem",
                                  color: "#222222",
                                  background: "#52901A",
                                  border: "#B65355",
                                }}
                              >
                                Passed
                              </Button>
                            </td>
                            <td>
                              <Button
                                style={{
                                  minWidth: "4rem",
                                  lineHeight: "1rem",
                                  color: "#222222",
                                  background: "#52901A",
                                  border: "#B65355",
                                }}
                              >
                                Passed
                              </Button>
                            </td>
                            <td>
                              <Button
                                style={{
                                  minWidth: "4rem",
                                  lineHeight: "1rem",
                                  color: "#222222",
                                  background: "#52901A",
                                  border: "#B65355",
                                }}
                              >
                                Passed
                              </Button>
                            </td>
                            <td>
                              <Button
                                style={{
                                  minWidth: "4rem",
                                  lineHeight: "1rem",
                                  color: "#222222",
                                  background: "#52901A",
                                  border: "#B65355",
                                }}
                              >
                                Passed
                              </Button>
                            </td>
                            <td>
                              <Button
                                style={{
                                  minWidth: "4rem",
                                  lineHeight: "1rem",
                                  color: "#222222",
                                  background: "#52901A",
                                  border: "#B65355",
                                }}
                              >
                                Passed
                              </Button>
                            </td>
                            
                          </tr>
                          
                        </tbody>
                      </table>
                    </div>
              
                </Card.Body>
              </Card.Body>
            </Col>
          </Row>
       
      </Container>
    </React.Fragment>
  );
};
export default QualityBuild;
