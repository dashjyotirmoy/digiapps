import React from "react";
// import 'react-circular-progressbar/dist/styles.css';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Row, Col, Container, Card, Badge, ProgressBar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../SecurityProject/Sec.css";
import DocumentCancelSvg from './DocumentCancel';
import InsecureProtectionSvg from './InsecureProtection';
import LibrarySvg from './LibrarySvgS';
import Alert from 'react-bootstrap/Alert';


const SecurityOnProjectSelection = (props) => {
  const bgTheme = props.bgTheme;
  if(props.cardsData[4].data[2]!=null){
    props.cardsData[4].data[2].sort((a, b) => b.score.localeCompare(a.score));
  }  
  if(props.cardsData[5].data[2]!=null){
    props.cardsData[5].data[2].sort((a, b) => b.vulnerabilities.totalCount.localeCompare(a.vulnerabilities.totalCount));
  }  
 
  var totalVulCount =props.cardsData[1].data[2]!=null? props.cardsData[1].data[2].alertMetrics.totalCount:'N/A';
  var totalLib = props.cardsData[2].data[2]!=null? props.cardsData[2].data[2].alertMetrics.totalCount:'N/A';
  var totalLibraryStas =props.cardsData[3].data[2]!=null? props.cardsData[3].data[2]:'N/A';
  let options = {
    chart: {
      type: 'pie',
      height: 60 + '%',
      backgroundColor: bgTheme ? '#232D3B':'#ffffff',
    },
    title: {
      text: 'Duplications'
    },
    credits: {
      enabled: false
    },
    legend: {
      enabled: true,
      symbolRadius: 0,
      reversed: true,
      itemStyle: {
        color: bgTheme ?'#C8CED5':'#333333',
        fontWeight: 'normal'
      }
    },
    // eslint-disable-next-line no-dupe-keys
    title: {
      align: 'center',
      verticalAlign: "middle",
      y: 2,
      text: `<span style='color: #798EA8; font-size: 14px'>Total</span><br><span style='color: #FFFFFF; font-size: 30px'>${totalLib}</span>`,
      floating: true,
      style: {
        color: bgTheme ? '#ffffff':'#333333'
      }
    },
    pie: {
      shadow: false
    },
    tooltip: {
      shape: 'callout',
      formatter: function () {
        return totalLib!=='N/A'? "<b>" + this.point.name + "</b>: " + this.y + "  (" + Math.round(this.point.y / totalLib * 100) + "% )":'';
      }
    },
    series: [
      {
        name: 'Vulnerability',
        data: [
          {
            name: 'Low',
            color: '#20c997',
            y: parseInt(props.cardsData[2].data[2].alertMetrics.low),
            borderColor: '#20c997'
          },
          {
            name: 'Medium',
            color: '#ffc107',
            y: parseInt(props.cardsData[2].data[2].alertMetrics.medium),
            borderColor: '#ffc107'
          },
          {
            name: ' High',
            color: '#E75555',
            y: parseInt(props.cardsData[2].data[2].alertMetrics.high),
            borderColor: '#E75555'
          }
        ],
        size: "78%",
        innerSize: "90%",
        // showInLegend: true,
        dataLabels: {
          enabled: false
        }
      }
    ],


  }
  return (
    <React.Fragment>
      <Container fluid >
        <Row className={`${bgTheme ? '' : 'bg-light'}`}>
          <Col sm={9}>
            <Row>
            <Col sm={4} className="pr-3">
              <Card className={`${bgTheme ? 'border-dark':'border'}`}>
                  <Card.Body className={`p-0 ${bgTheme ? 'bg-dark-theme':'bg-white'}`}>
                  <p className={`m-0 font-weight-bold ${bgTheme ? 'bg-prodInfo-prod' : 'cardHeader'}`}>Policy Violations</p>
                    <Row className="no-gutters px-2 py-3 d-flex align-items-center">
                      <Col>
                        <DocumentCancelSvg />
                        </Col>
                      <Col>
                      <h3 className='font-weight-bold'>{props.cardsData[0].data[2]!=null?props.cardsData[0].data[2]:'N/A'}</h3>
                      </Col>
                      <Col>
                      <Badge style={{ color: '#ffffff', background: '#C981B2' }}>{props.cardsData[0].data[3]}</Badge>{' '}
                        <Badge style={{ color: '#ffffff', background: '#42C9C2' }}>{props.cardsData[0].data[4]}</Badge>{' '}
                        </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
              <Col sm={4}  className="pr-3">
              <Card className={`${bgTheme ? 'border-dark':'border'}`}>
                  <Card.Body className={`p-0 ${bgTheme ? 'bg-dark-theme':'bg-white'}`}>
                  <p className={`m-0 font-weight-bold ${bgTheme ? 'bg-prodInfo-prod' : 'cardHeader'}`}>Unique Vulnerabilities</p>
                  <Row className="no-gutters px-2 py-3 d-flex align-items-center">
                      <Col><InsecureProtectionSvg /></Col>
                      <Col><h3 className='font-weight-bold'>{totalVulCount!=='N/A'?props.cardsData[1].data[2].alertMetrics.totalCount:'N/A'}</h3>
                      </Col>
                      <Col>
                        <Badge style={{ color: '#ffffff', background: '#FF4136' }}>{totalVulCount!=='N/A'?props.cardsData[1].data[2].alertMetrics.high:''}</Badge>{' '}
                        <Badge style={{ color: '#ffffff', background: '#ffc107' }}>{totalVulCount!=='N/A'?props.cardsData[1].data[2].alertMetrics.medium:''}</Badge>{' '}
                        <Badge style={{ color: '#ffffff', background: '#57E188' }}>{totalVulCount!=='N/A'?props.cardsData[1].data[2].alertMetrics.low:''}</Badge>{' '}
                      </Col>
                      </Row>
                  </Card.Body>
                </Card></Col>
                <Col sm={4}>
                <Card className={`${bgTheme ? 'border-dark':'border'}`}>
                  <Card.Body className={`p-0 ${bgTheme ? 'bg-dark-theme border-dark' : 'bg-white'}`}>
                  <p className={`m-0 font-weight-bold ${bgTheme ? 'bg-prodInfo-prod' : 'cardHeader'}`}>Actionable Libraries</p>
                  <Row className="no-gutters px-2 py-3 d-flex align-items-center">
                      <Col sm={4}><LibrarySvg /></Col>
                      <Col>
                      <h3 className='font-weight-bold'>{totalLib}</h3>
                      </Col>
                      <Col>
                        <Badge style={{ color: '#ffffff', background: '#FF4136' }}>{totalLib!=='N/A'?props.cardsData[2].data[2].alertMetrics.high:''}</Badge>{' '}
                        <Badge style={{ color: '#ffffff', background: '#ffc107' }}>{totalLib!=='N/A'?props.cardsData[2].data[2].alertMetrics.medium:''}</Badge>{' '}
                        <Badge style={{ color: '#ffffff', background: '#57E188' }}>{totalLib!=='N/A'?props.cardsData[2].data[2].alertMetrics.low:''}</Badge>{' '}
                      </Col>
                    </Row>
                  </Card.Body>
                </Card></Col>
            </Row>

            {/* code for table */}
            <Row className="mt-4">
              <Col sm={6}>
                <Row>
                  <Col>
                    <Card.Body className={`border p-0 ${bgTheme ? 'bg' : 'text-dark bg-white'}`}>
                    <h6 className={`font-weight-bold ${bgTheme ? 'bg-prodInfo-prod' : 'cardHeader'}`}>Vulnerabilities</h6>

                      <Card.Body className="pb-0">
                        <div className="wrap border">
                          <table className={`table table-hover ${bgTheme ? 'table-dark' : 'table-light'}`}>
                            <thead className={`${bgTheme ? 'tabhead' : 'cardHeader'}`}>
                              <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Type</th>
                                <th scope="col">CVSS 3 Severity</th>
                                <th scope="col">CVSS 3 Score</th>
                              </tr>
                            </thead>
                            </table>

                            <div className="inner_table">
                              <table className={`table table-hover ${bgTheme ? 'table-dark' : 'table-light'}`} >
                                <tbody >
                                  {    
                                  props.cardsData[4].data[2].map((item, index) => {
                                    return (
                                      <tr className={`f-12 ${bgTheme ? 'tabrow' : 'text-dark'}`} key={index}>
                                        <td><p>{item.name}</p></td>
                                        <td> <p>{item.type} </p></td>
                                        <td><p>{item.severity}</p></td>
                                        <td><p>{item.score}</p></td>
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

              <Col sm={6}>
                <Row>
                  <Col>
                    <Card.Body className={`border p-0 ${bgTheme ? 'bg' : 'text-dark bg-white'}`}>
                    <h6 className={`font-weight-bold ${bgTheme ? 'bg-prodInfo-prod' : 'cardHeader'}`}>Libraries</h6>

                      <Card.Body className="pb-0">
                        <div className="wrap border">
                          <table className={`table table-hover ${bgTheme ? 'table-dark' : 'table-light'}`}>
                            <thead className={`${bgTheme ? 'tabhead' : 'cardHeader'}`}>
                              <tr>
                                <th className="w-45">Library Name</th>
                                <th  >Vulnerable Libraries</th>
                                <th className="w-23">License Count</th>

                              </tr>
                            </thead>
                          </table>
                          <div className="inner_table">
                            <table className={`table table-hover ${bgTheme ? 'table-dark' : 'table-light'}`} >

                              <tbody >
                                {
                                  props.cardsData[5].data[2].map((item, index) => {
                                    return (
                                      <tr className={`f-12 ${bgTheme ? 'tabrow' : 'text-dark'}`} key={index}>
                                        <td className="w-23"><p>{item.name}</p></td>
                                        <td className="tabpadding w-23">
                                          {item.vulnerabilities.totalCount === "0" ? (
                                            <p className="ml-3">No Vulnerabilities</p>
                                          ) :
                                            <ProgressBar className="">
                                              <ProgressBar style={{ color: '#222222',backgroundColor: '#ec5050',fontWeight:'bold' }} now={item.vulnerabilities.high} label={`${item.vulnerabilities.high}`} key={1} max={item.vulnerabilities.totalCount} />
                                              <ProgressBar style={{ color: '#222222',backgroundColor: '#ffc107',fontWeight:'bold' }} now={item.vulnerabilities.medium} label={`${item.vulnerabilities.medium}`} key={2} max={item.vulnerabilities.totalCount} />
                                              <ProgressBar style={{ color: '#222222',backgroundColor: '#20c997',fontWeight:'bold' }} now={item.vulnerabilities.low} label={`${item.vulnerabilities.low}`} key={3} max={item.vulnerabilities.totalCount} />
                                            </ProgressBar>
                                          }


                                        </td>
                                        <td className="w-10"><p>{item.licenseCount}</p></td>

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
            </Row>

          </Col>

          <Col sm={3}>
            <Row>
              <Card.Body className={`border ${bgTheme ? 'bg' : 'text-dark bg-white'}`}>
                <h6 className={`font-weight-bold ${bgTheme ? 'bg-prodInfo-prod' : 'cardHeader'}`}>Vulnerability Analysis</h6>
                <HighchartsReact highcharts={Highcharts} options={options} />
                <Col
                  className="p-4"
                >Library Statistics
                </Col>
                <Col>
                  <Alert
                    className={`pl-4  ${bgTheme ? 'label-bg-dark' : 'label-bg-light'}`}
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
                    className={`pl-4  ${bgTheme ? 'label-bg-dark' : 'label-bg-light'}`}
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
                    className={`pl-4  ${bgTheme ? 'label-bg-dark' : 'label-bg-light'}`}
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
  )
}
export default SecurityOnProjectSelection;