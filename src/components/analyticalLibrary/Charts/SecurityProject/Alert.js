import React, { useState, useEffect, dispatch } from 'react';
import { Row, Col, Container, Card, Badge, ProgressBar} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Alert.css";
import { connect } from "react-redux";
import styled from "styled-components";
import { bindActionCreators } from "redux";
import { securityMonthAlertDataDispatch } from '../../../../store/actions/securityData';

import moment from 'moment/moment';

const Styles = styled.div`
  .btncolor {
    background-color: #2E3B4D!important;
    border-color: #3A485C!important;
    color: #fff!important;}
`;
 
const App = props => {
  let mediumCount = [];
  let highCount = [];
  let lowCount = [];

  const [showAlertData, setAlertData] = React.useState(props.cardsData);

  const handleChange = (type) => {
    props.securityMonthAlertDataDispatch(props.projectID, props.currentRepo, type.target.value).then(item => {
      filterData();
    });
  }
  // let alertData = props.cardsData;
  
 const filterData = () => {
  mediumCount = showAlertData 
                  && showAlertData.perVulnerabilityAlert
                  && showAlertData.perVulnerabilityAlert.filter(data => data.severity === 'MEDIUM');
            highCount =showAlertData 
            && showAlertData.perVulnerabilityAlert
            && showAlertData.perVulnerabilityAlert.filter(data => data.severity === 'HIGH');
  lowCount = showAlertData 
  && showAlertData.perVulnerabilityAlert
  && showAlertData.perVulnerabilityAlert.filter(data => data.severity === 'LOW');
 }

 useEffect(() => {
  //  dispatch(props.cardsData);
  if (props.securityMonthAlertData && props.securityMonthAlertData.perVulnerabilityAlert ){
    setAlertData(props.securityMonthAlertData)
  }
}, [props.securityMonthAlertData, props.cardsData]);
  

  return (
    <React.Fragment>
      <Container fluid>
        <Row className="mt-2">
          <Col>
            <Card.Body className="bg">
              <h5 className="mb-3">Per Vulnerability Alert</h5>
              <Row className="pl-2">
                <Col sm={1} className="pr-0">
                  <p>Vulnerabilities</p>
                </Col>
                <Col sm={3} className="pl-0">
                  <Badge style={{ color: "#222222", background: "#B65355" }}>
                    {highCount.length}
                  </Badge>{" "}
                  <Badge style={{ color: "#222222", background: "#C0792A" }}>
                    {mediumCount.length}
                  </Badge>{" "}
                  <Badge style={{ color: '#222222', background: '#C2B12C' }}>
                    {lowCount.length}
                  </Badge>{" "}
                </Col>
              </Row>
              <Card.Body>

                <div className="wrap">
                  <table className="table table-hover table-dark">
                    <thead className="tabhead">
                      <tr>
                        <th className="w-8">Severity</th>
                        <th scope="col">Library</th>
                        <th scope="col">Vulnerability Id</th>
                        <th scope="col">CVSS 3 Score</th>
                        <th scope="col">CVSS 2 Score</th>
                        <th scope="col">Published Date</th>
                        <th scope="col">Top Fix type</th>
                        <th scope="col">Top Fix Resolution</th>
                      </tr>
                    </thead>
                  </table>

                  <div className="inner_table">
                    <table className="table table-hover table-dark" >
                      <tbody >
                        
                        {
                          showAlertData && showAlertData.perVulnerabilityAlert && showAlertData.perVulnerabilityAlert.map((item, index) => {
                            return (
                              <tr className="tabrow f-12" key={index}>
                                <td scope="row" className="w-8">
                                  {item.severity === 'MEDIUM' ? (
                                    <Badge className="sevbadge2"></Badge>
                                  ) : null}

                                  {item.severity === 'HIGH' ? (
                                    <Badge className="sevbadge"></Badge>
                                  ) : null}

                                </td>
                                <td>  <p>{item.libraryName}</p></td>

                                <td>
                                  <p>{item.vulnerabilityId}</p>
                                </td>
                                <td>
                                  <p>{item.cvss3score}</p>
                                </td>
                                <td>
                                  <p>{item.cvss2score}</p>
                                </td>
                                <td>
                                  <p>{ moment(item.publishedDate).format("DD-MM-YYYY") }</p>
                                </td>
                                <td>
                                  <p>{item.topFixType}</p>
                                </td>
                                <td>
                                  <p>{item.topFixResolution}</p>
                                </td>

                              </tr>
                            )
                          })
                        }
                      </tbody>
                    </table>
                  </div>
                </div>
              </Card.Body>
            </Card.Body>
          </Col>
        </Row>
      </Container>


      <Container fluid>
        <Row className="mt-5">
          <Col>
            <Card.Body className="bg">
              <h5 className="mb-3">Per Library Alert</h5>
              <Row className="basealign">
                <p>Alerts</p>
                <Col sm={1}>
                <select onChange={handleChange}>
                    <option value="all_time">All Time</option>
                    <option value="last_1_month">Last Month</option>
                    <option value="last_6_month">Last 6 Months</option>
                </select>
                </Col>
                {/* <Button variant="secondary" className="btnstyle">Apply Preferences</Button>{' '}
                <Button variant="secondary" className="ml-4 btnstyle">Ignore Selected</Button>{' '} */}

              </Row>
              <Card.Body >
                <div className="wrap">
                  <table className="table table-hover table-dark">
                    <thead className="tabhead">
                      <tr>
                        <th scope="col">
                          Library
      </th>
                        <th scope="col">
                          Type
      </th>
                        <th scope="col">
                          Description
      </th>
                        <th scope="col">
                          Library Type
      </th>
                        <th scope="col">
                          Creation Date
      </th>
                        <th scope="col">
                          Modified Date
      </th>

                      </tr>
                    </thead>
                  </table>

                  <div className="inner_table">
                    <table className="table table-hover table-dark" >
                      <tbody>

                        {
                          showAlertData && showAlertData.perLibraryAlert && showAlertData.perLibraryAlert.map((item, index) => {
                            return (
                              <tr className="tabrow f-12" key={index}>

                                <td>  <div style={{ float: "left" }}>
                                  <Badge className="sevbadge1"></Badge>{" "}
                                </div>
                                  <div className="margin-4">
                                    <p>{item.libraryName}</p>
                                  </div></td>
                                <td>
                                  <p>{item.vulnerabilityType}</p>
                                </td>
                                <td>
                                <ProgressBar className="w-200">
  <ProgressBar style={{backgroundColor: '#B65355'}} now={item.description.high}label={`${item.description.high}`} key={1} max={item.description.totalCount}/>
  <ProgressBar style={{backgroundColor: '#C0792A'}} now={item.description.medium} label={`${item.description.medium}`}key={2}max={item.description.totalCount} />
  <ProgressBar style={{backgroundColor: '#C2B12C'}} now={item.description.low} label={`${item.description.low}`}key={3} max={item.description.totalCount}/>
</ProgressBar>

                                  {/* <ButtonGroup
                                    style={{ lineHeight: '1rem', minHeight: '2rem', maxHeight: '2rem' }}
                                  >
                                    <Button
                                      style={{ borderRadius: '30px 0px 0px 30px', backgroundColor: '#B65355', border: '0px', color: '#222222' }}
                                    >
                                      <span style={{ lineHeight: '' }}>
                                        <span style={{ fontSize: '' }}> High</span><span style={{ fontSize: '' }}> {item.description.high}</span>
                                      </span>
                                    </Button>
                                    <Button
                                      style={{ backgroundColor: '#C0792A', border: '0px', color: '#222222' }}
                                    >
                                      Medium {item.description.medium}
                                    </Button>
                                    <Button
                                      style={{ borderRadius: '0px 30px 30px 0px', backgroundColor: '#C2B12C', border: '0px', color: '#222222' }}
                                    >
                                      Low {item.description.low}
                                    </Button>
                                  </ButtonGroup> */}
                                </td>
                                <td>
                                  <p>{item.libraryType}</p>
                                </td>
                                <td>
                                  <p>{ moment(item.creationDate).format("DD-MM-YYYY") }</p>
                                </td>
                                <td>
                                  <p>{ moment(item.modifiedDate).format("DD-MM-YYYY") }</p>
                                </td>
                              </tr>
                            )
                          })
                        }
                      </tbody>
                    </table>
                  </div>
                </div>
              </Card.Body>
            </Card.Body>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    currentExecId: state.execData.executiveId,
    securityProjectData: state.securityData.securityProjectDetails,
    securityRepoData: state.securityData.securityRepoDetails,
    securityPolicyData: state.securityData.securityPolicyDetails,
    securityAlertData: state.securityData.securityAlertDetails,
    securityMonthAlertData: state.securityData.securityMonthAlertDetails,
    projectID: state.productDetails.currentProject.projectDetails.id,
    currentRepo: state.securityData.currentRepo,
    sprintId: state.productDetails.currentSprint.sprintInfo.id
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { securityMonthAlertDataDispatch },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
