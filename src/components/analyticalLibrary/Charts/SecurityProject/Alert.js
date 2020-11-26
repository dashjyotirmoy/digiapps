import React, { useEffect } from 'react';
import { Row, Col, Container, Card, Badge, ProgressBar,Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Alert.css";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { securityMonthAlertDataDispatch } from '../../../../store/actions/securityData';

import moment from 'moment/moment';

const App = props => {
  const bgTheme = props.bgTheme;
  let mediumCount = [];
  let highCount = [];
  let lowCount = [];
  // let selectItem ="All Time";



  const [showAlertData, setAlertData] = React.useState(props.cardsData);
  // const [repoItem,setrepoItem]=React.useState(selectItem)

  let dropData = [{ id: "all_time", name: "All Time" }, { id: "last_1_month", name: "Last Month" }, { id: "last_3_month", name: "Last 3 Months" }];
  const handleChange = (type) => {
    props.securityMonthAlertDataDispatch(props.projectID, props.currentRepo, type.target.value).then(item => {
      // filterData();

    });
  }
  // let alertData = props.cardsData;

  // const filterData = () => {
    mediumCount = showAlertData
      && showAlertData.perVulnerabilityAlert
      && showAlertData.perVulnerabilityAlert.filter(data => data.severity === 'MEDIUM');
    highCount = showAlertData
      && showAlertData.perVulnerabilityAlert
      && showAlertData.perVulnerabilityAlert.filter(data => data.severity === 'HIGH');
    lowCount = showAlertData
      && showAlertData.perVulnerabilityAlert
      && showAlertData.perVulnerabilityAlert.filter(data => data.severity === 'LOW');
  

  useEffect(() => {
    //  dispatch(props.cardsData);
    if (props.securityMonthAlertData && props.securityMonthAlertData.perVulnerabilityAlert) {
      setAlertData(props.securityMonthAlertData)
    }
  }, [props.securityMonthAlertData, props.cardsData]);


  return (
    <React.Fragment>
      <Container fluid>
        <Row className={`${bgTheme ? '' : 'bg-light'}`}>
          <Col>
            <Card.Body className={`border  ${bgTheme ? 'bg' : 'text-dark bg-white'}`}>
              <h5 className="mb-3">Unique Vulnerabilities</h5>
              <Row className="pl-2">
                <Col sm={1} className="pr-0">
                  <p>Vulnerabilities</p>
                </Col>
                <Col sm={3} className="pl-0">
                  <Badge style={{ color: "#222222", background: "#ec5050" }}>
                    {highCount && highCount.length}
                  </Badge>{" "}
                  <Badge style={{ color: "#222222", background: "#ffc107" }}>
                    {mediumCount && mediumCount.length}
                  </Badge>{" "}
                  <Badge style={{ color: '#222222', background: '#20c997' }}>
                    {lowCount && lowCount.length}
                  </Badge>{" "}
                </Col>
              </Row>
              <Card.Body className="border">

                <div className="wrap border">
                  <table className={`table table-hover ${bgTheme ? 'table-dark' : 'table-light'}`}>
                    <thead className={`${bgTheme ? 'tabhead' : 'cardHeader text-dark'}`}>
                      <tr>
                        <th className="w-8">Severity</th>
                        <th scope="col">Library</th>
                        <th scope="col">Vulnerability Id</th>
                        <th scope="col">CVSS 3 Score</th>
                        <th scope="col">CVSS 2 Score</th>
                        <th scope="col">Published Date</th>
                        <th scope="col">Top Fix Type</th>
                        <th scope="col">Top Fix Resolution</th>
                      </tr>
                    </thead>
                  </table>

                  <div className="inner_table">
                    <table className={`table table-hover ${bgTheme ? 'table-dark' : 'text-light'}`}>
                      <tbody >

                        {
                          showAlertData && showAlertData.perVulnerabilityAlert && showAlertData.perVulnerabilityAlert.map((item, index) => {
                            return (
                              <tr className={`f-12 ${bgTheme ? 'tabrow' : 'text-dark'}`} key={index}>
                                <td className="w-8">
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
                                  {item.cvss3score === null?(
                                    <p className="ml-3">-</p>
                                  ): <p className="ml-3">{item.cvss3score}</p>
                                }
                                 
                                </td>
                                <td>
                                  {item.cvss2score === null?(
                                    <p className="ml-3">-</p>
                                  ):
                                  <p className="ml-3">{item.cvss2score}</p>
                                  }
                                 
                                </td>
                                <td>
                                  <p>{moment(item.publishedDate).format("DD-MM-YYYY")}</p>
                                </td>
                                <td>
                                  <p>{item.topFixType}</p>
                                </td>
                                <td>
                                  <p style={{wordBreak:"break-all"}}>{item.topFixResolution}</p>
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
        <Row className={`py-3 ${bgTheme ? '' : 'bg-light'}`}>
          <Col>
            <Card.Body className={`border ${bgTheme ? 'bg' : 'text-dark bg-white'}`}>
              <h5 className="mb-3">Actionable Libraries</h5>
              <Row className="basealign">
                <p>Alerts</p>
                <Col sm={2}>

                  <select onChange={handleChange} className="drop repo-height text-white rounded border border-dark" style={{backgroundColor:'#33404d'}}>
                    {dropData.map(function (data, key) {
                      return (
                        <option className="text-white" key={key} value={data.id}>{data.name}</option>)
                    })}
                  </select>

{/* <Dropdown>
  <Dropdown.Toggle className="drop" >
  Action
  </Dropdown.Toggle>

  <Dropdown.Menu className="drop" onChange={handleChange}>
  {dropData.map(function (data, key) {
    <Dropdown.Item className="text-white" key={key} value={data.id}>{data.name}</Dropdown.Item>
  })}
  </Dropdown.Menu>
</Dropdown> */}
                </Col>


              </Row>
              <Card.Body className={`pt-2 border  ${bgTheme ? 'bg' : 'text-dark bg-white'}`}>
                <div className="wrap border">
                  <table className={`table table-hover ${bgTheme ? 'table-dark' : 'table-light'}`}>
                    <thead className={`${bgTheme ? 'tabhead' : 'cardHeader'}`}>
                      <tr>
                        <th scope="col">
                          Library
      </th>
                        <th scope="col">
                        Alert Type
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
                    <table className={`table table-hover ${bgTheme ? 'table-dark' : 'table-light'}`} >
                      <tbody>

                        {(showAlertData && showAlertData.perLibraryAlert.length > 0) ?
                          showAlertData && showAlertData.perLibraryAlert && showAlertData.perLibraryAlert.map((item, index) => {
                            return (
                              <tr className={`f-12 ${bgTheme ? 'tabrow' : 'text-dark'}`} key={index}>

                                <td>  <div style={{ float: "left" }}>
                                  <Badge className="sevbadge1"></Badge>{" "}
                                </div>
                                  <div className="ml-4">
                                    <p>{item.libraryName}</p>
                                  </div></td>
                                <td>
                                  <p>{item.alertType}</p>
                                </td>
                                <td>
                                  <ProgressBar className="w-200">
                                    <ProgressBar style={{ color: '#222222',backgroundColor: '#ec5050',fontWeight:'bold' }} now={item.description.high} label={`${item.description.high}`} key={1} max={item.description.totalCount} />
                                    <ProgressBar style={{ color: '#222222',backgroundColor: '#ffc107',fontWeight:'bold' }} now={item.description.medium} label={`${item.description.medium}`} key={2} max={item.description.totalCount} />
                                    <ProgressBar style={{ color: '#222222',backgroundColor: '#20c997',fontWeight:'bold' }} now={item.description.low} label={`${item.description.low}`} key={3} max={item.description.totalCount} />
                                  </ProgressBar>

                                </td>
                                <td>
                                  <p>{item.libraryType}</p>
                                </td>
                                <td>
                                  <p>{moment(item.creationDate).format("DD-MM-YYYY")}</p>
                                </td>
                                <td>
                                  <p>{moment(item.modifiedDate).format("DD-MM-YYYY")}</p>
                                </td>
                              </tr>
                            )
                          }) : <tr><td style={{ textAlign: "center" }} className={`${bgTheme ? 'text-light' : 'text-dark'}`} colSpan="5">No data found</td></tr>
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
