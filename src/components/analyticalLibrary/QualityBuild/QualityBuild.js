import React from "react";
import { Container, Col, Row, Card, Button } from "react-bootstrap";
import BuildLine from "../Charts/LineHigh/BuildLine";



let StatusColor = {
  "PASSED": '#52901A',
  "FAILED": '#BA5054',
  "N/A": '#515D6D'
}


const QualityBuild = props => {
  let QualityData = props.cardsData;
  QualityData.testOverviewDTO.buildIds.sort((a, b) => b.localeCompare(a));
  return (
    <React.Fragment>
      <Container fluid>
        <Row className="mt-2">
          <Col md={6} sm={12}>
            <Row>
              <Col>
                <Card.Body className="bg">
                  <h6 className="mb-3">Build Status</h6>
                  <BuildLine chartData={props} />
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
                  <h6 className="mb-3">Top Most Broken Tests</h6>

                  <Card.Body >
                    <div className="wrap">
                      <table className="table table-hover table-dark">
                        <thead className="tablehead">
                          <tr>
                            <th>Test Name</th>
                            <th className="w-18">Times Failed</th>
                            <th className="w-23">Recent Failed Builds</th>
                          </tr>
                        </thead>
                        {/* </table>

                      <div className="inner_table">
                        <table className="table table-hover table-dark"> */}
                        <tbody className="tablerow f-12">
                          {(QualityData && QualityData.brokenTestDetailDTOList.length > 0) ?
                            QualityData && QualityData.brokenTestDetailDTOList.map((item, index) => {
                              return (
                                <tr key={index} >
                                  <td>
                                    <p>{item.testName}</p>
                                  </td>
                                  <td>

                                    <p>{item.failedCount}</p>
                                  </td>
                                  <td>
                                    <p>{item.recentFailedBuilds}</p>
                                  </td>
                                </tr>
                              )
                            }) : <tr><td style={{ textAlign: "center" }} colSpan="3">No data found</td></tr>
                          }

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
              <h6>Test Overview</h6>
              <Card.Body>
                <div className="wrap">
                  <table className="table table-hover table-dark">
                    <thead className="tablehead">
                      <tr>
                        <th className="w-40">Package Name</th>
                        <th>Passed</th>
                        <th>Transitions</th>
                        {
                          QualityData.testOverviewDTO.buildIds.map((item, index) => {
                            return (
                              <th key={index} className="text-center">{item}</th>
                            )
                          })
                        }


                      </tr>
                    </thead>
                    <tbody className="tablerow">

                      {
                        QualityData && QualityData.testOverviewDTO.testDetailDTOList.map((item, index) => {
                          return (
                            <tr key={index}>
                              <td>
                                <p>{item.packageName}</p>
                              </td>
                              <td>{item.passedPercentage}%</td>
                              <td>{item.transitionCount}</td>
                              {item.testStatus.map((item, index) => {
                                return (
                                  <td key={index}>
                                    <Button
                                      style={{
                                        minWidth: "4rem",
                                        lineHeight: "1rem",
                                        color: "#222222",
                                        background: StatusColor[item],
                                        border: StatusColor[item],
                                      }}
                                    >
                                      {item}
                                    </Button>
                                  </td>
                                )
                              })}



                            </tr>
                          )
                        })
                      }


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
