import React from "react";
// import 'react-circular-progressbar/dist/styles.css';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Row, Col, Container, Card, Badge, ProgressBar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Sec.css";
import DocumentCancelSvg from './DocumentCancel';
import InsecureProtectionSvg from './InsecureProtection';
import LibrarySvg from './LibrarySvg';
import Alert from 'react-bootstrap/Alert';;

const Sec = props => {
  let topProject = props.cardsData[4].data[2].slice(0, 5);
  props.cardsData[4].data[2].sort((a, b) => b.vulnerableLibraries.totalCount.localeCompare(a.vulnerableLibraries.totalCount));
  let options = {
    chart: {
      type: "pie",
      height: 60 + '%',
      backgroundColor: "#232D3B",
    },
    // title: {
    //     text: null
    // },
    title: {
      align: 'center',
      verticalAlign: "middle",
      y: 2,
      text: `<span style='color: #798EA8; font-size: 14px'>Total</span><br><span style='color: #FFFFFF; font-size: 30px'>${props.cardsData[2].data[2].alertMetrics.totalCount}</span>`,
      floating: true,
      style: {
        color: "#fff"
      }
    },
    legend: {
      enabled: true,
      symbolRadius: 0,
      reversed: true,
      itemStyle: {
        color: '#C8CED5',
        fontWeight: 'normal'
      }
    },
    pie: {
      shadow: false
    },
    tooltip: {
      formatter: function () {
        return "<b>" + this.point.name + "</b>: " + this.y;
      }
    },
    credits: {
      enabled: false
    },
    series: [
      {
        name: "Browsers",
        data: [
          {
            // name: "Low",
            color: "#C2B12C",
            y: parseInt(props.cardsData[2].data[2].alertMetrics.low),
            borderColor: '#C2B12C'
          },
          {
            // name: "Medium",
            color: "#C0792A",
            y: parseInt(props.cardsData[2].data[2].alertMetrics.medium),
            borderColor: '#C0792A'
          },
          {
            // name: "High",
            color: "#E75555",
            y: parseInt(props.cardsData[2].data[2].alertMetrics.high),
            borderColor: '#E75555'
          }
        ],
        size: "78%",
        innerSize: "90%",
        // showInLegend: true,
        dataLabels: {
          enabled: false
        },

      }
    ]
  };

  return (
    <React.Fragment>
      <Container fluid style={{ paddingTop: "10px" }}>
        <Row>
          <Col sm={9}>
            <Row>
              <Col sm={4}>
                <Card className="borderadius policy-height">
                  <Card.Body className="pt-2 bg">
                    <Row>
                      <Col sm={8} className="mb-3">
                        {" "}
                        <p>Policy Violations</p>
                      </Col>
                      <Col sm={4} className="iconend">
                        <DocumentCancelSvg />
                      </Col>
                    </Row>
                    <Row className="justify-content-center mr-3 mb-3">
                      <h3>{props.cardsData[0].data[2]}</h3>
                    </Row>
                    <Row className="text-center">
                      <Col sm={11}>
                        {/* <Badge style={{ color: '#222222', background: '#B65355' }}>0</Badge>{' '}
                        <Badge style={{ color: '#222222', background: '#C0792A' }}>2</Badge>{' '}
                        <Badge style={{ color: '#222222', background: '#C2B12C' }}>10</Badge>{' '} */}
                      </Col>
                      <Col sm={1}>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>


              <Col sm={4}>
                <Card className="borderadius">
                  <Card.Body className="pt-2 bg">
                    <Row>
                      <Col sm={8} className="mb-3">
                        {" "}
                        <p>Per Vulnerability Alert</p>
                      </Col>
                      <Col sm={4} className="iconend"> <InsecureProtectionSvg /></Col>
                    </Row>
                    <Row className="justify-content-center mr-3 mb-3">
                      <h3>{props.cardsData[1].data[2].alertMetrics.totalCount}</h3>
                    </Row>
                    <Row className="text-center">
                      <Col sm={11}>
                        <Badge style={{ color: '#222222', background: '#B65355' }}>{props.cardsData[1].data[2].alertMetrics.high}</Badge>{' '}
                        <Badge style={{ color: '#222222', background: '#C0792A' }}>{props.cardsData[1].data[2].alertMetrics.medium}</Badge>{' '}
                        <Badge style={{ color: '#222222', background: '#C2B12C' }}>{props.cardsData[1].data[2].alertMetrics.low}</Badge>{' '}
                      </Col>
                      {/* <Col sm={1}>
                        <FontAwesomeIcon
                          icon={faEllipsisV}
                          color={"#D8D8D8"}
                        ></FontAwesomeIcon>
                      </Col> */}
                    </Row>
                  </Card.Body>
                </Card></Col>


              <Col sm={4}>
                <Card className="borderadius">
                  <Card.Body className="pt-2 bg">
                    <Row>
                      <Col sm={8} className="mb-3">
                        {" "}
                        <p>Per Library Alert</p>
                      </Col>
                      <Col sm={4} className="iconend"><LibrarySvg /></Col>
                    </Row>
                    <Row className="justify-content-center mr-3 mb-3">
                      <h3>{props.cardsData[2].data[2].alertMetrics.totalCount}</h3>
                    </Row>
                    <Row className="text-center">
                      <Col sm={11}>
                        <Badge style={{ color: '#222222', background: '#B65355' }}>{props.cardsData[2].data[2].alertMetrics.high}</Badge>{' '}
                        <Badge style={{ color: '#222222', background: '#C0792A' }}>{props.cardsData[2].data[2].alertMetrics.medium}</Badge>{' '}
                        <Badge style={{ color: '#222222', background: '#C2B12C' }}>{props.cardsData[2].data[2].alertMetrics.low}</Badge>{' '}
                      </Col>
                      {/* <Col sm={1}>
                        <FontAwesomeIcon
                          icon={faEllipsisV}
                          color={"#D8D8D8"}
                        ></FontAwesomeIcon>
                      </Col> */}
                    </Row>
                  </Card.Body>
                </Card></Col>
            </Row>
            {/* code for table */}

            <Row className="mt-5">
              <Col >
                <Card.Body className="bg card-height">
                  <p>Vulnerable Projects</p>
                  <Card.Body>
                    <div className="wrap">
                      <table className="table table-hover table-dark">
                        <thead className="tabhead">
                          <tr>
                            <th scope="col">Projects</th>
                            <th scope="col">Libraries</th>
                            <th scope="col">Vulnerebality Count</th>
                            <th scope="col">Vulnerabilities</th>
                            {/* <th scope="col">Licence</th> */}
                          </tr>
                        </thead>
                      </table>

                      <div className="inner_table">
                        <table className="table table-hover table-dark" >
                          <tbody className="tabrow">
                            {
                              topProject.map((item, index) => {
                                return (
                                  <tr key={index}>
                                    <td>{item.name}</td>
                                    <td>{item.librariesCount}</td>
                                    <td>{item.vulnerableLibraries.totalCount}</td>
                                    <td>
                                      <ProgressBar className="w-200">
                                        <ProgressBar style={{ backgroundColor: '#B65355' }} now={item.vulnerableLibraries.high} label={`${item.vulnerableLibraries.high}`} key={1} max={item.vulnerableLibraries.totalCount} />
                                        <ProgressBar style={{ backgroundColor: '#C0792A' }} now={item.vulnerableLibraries.medium} label={`${item.vulnerableLibraries.medium}`} key={2} max={item.vulnerableLibraries.totalCount} />
                                        <ProgressBar style={{ backgroundColor: '#C2B12C' }} now={item.vulnerableLibraries.low} label={`${item.vulnerableLibraries.low} `} key={3} max={item.vulnerableLibraries.totalCount} />
                                      </ProgressBar>
                                      {/* <ButtonGroup
                                        style={{ lineHeight: '1rem', minHeight: '2rem', maxHeight: '2rem' }}
                                      >
                                        <Button
                                          style={{ borderRadius: '30px 0px 0px 30px', backgroundColor: '#B65355', border: '0px', color: '#222222' }}
                                        >
                                          <span style={{ lineHeight: '' }}>
                                            <span style={{ fontSize: '' }}> High</span><span style={{ fontSize: '' }}> {item.vulnerableLibraries.high}</span>
                                          </span>
                                        </Button>
                                        <Button
                                          style={{ backgroundColor: '#C0792A', border: '0px', color: '#222222' }}
                                        >
                                          Medium {item.vulnerableLibraries.medium}
                                        </Button>
                                        <Button
                                          style={{ borderRadius: '0px 30px 30px 0px', backgroundColor: '#C2B12C', border: '0px', color: '#222222' }}
                                        >
                                          Low {item.vulnerableLibraries.low}
                                        </Button>
                                      </ButtonGroup> */}
                                    </td>
                                    {/* <td>{item.licenseCount}</td> */}
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
          </Col>


          <Col sm={3}>
            <Row>
              <Card.Body className="bg">
                <p>Vulnerability Analysis</p>
                <HighchartsReact highcharts={Highcharts} options={options} />
                <Col
                  className="p-4"
                >Library Statistics
                </Col>
                <Col>
                  <Alert
                    className="pl-4"
                    style={{ borderRadius: '40px', backgroundColor: '#334154' }}
                  >
                    <span
                      className="pl-3"
                      style={{ fontSize: '25px', fontWeight: 'bold' }}
                    >
                      {props.cardsData[3].data[2].vulnerableCount}
                    </span> &nbsp; <span style={{ color: '#A7AEB7' }}>
                      Vulnerable
                      </span>
                  </Alert>
                </Col>
                <Col>
                  <Alert
                    className="pl-4"
                    style={{ borderRadius: '40px', backgroundColor: '#334154' }}
                  >
                    <span
                      className="pl-3"
                      style={{ fontSize: '25px', fontWeight: 'bold' }}
                    >

                      {props.cardsData[3].data[2].vulnerableAndOutdatedCount}
                    </span> &nbsp; <span style={{ color: '#A7AEB7' }}>
                      Vulnerable {'&'} Outdated
                      </span>
                  </Alert>
                </Col>
                <Col>
                  <Alert
                    className="pl-4"
                    style={{ borderRadius: '40px', backgroundColor: '#334154' }}
                  >
                    <span
                      className="pl-3"
                      style={{ fontSize: '25px', fontWeight: 'bold' }}
                    >
                      {props.cardsData[3].data[2].outdatedCount}
                    </span> &nbsp; <span style={{ color: '#A7AEB7' }}>
                      Outdated</span>
                  </Alert>
                </Col>
              </Card.Body>
            </Row>
          </Col>
        </Row>


      </Container>
    </React.Fragment>
  );
};

export default Sec;
