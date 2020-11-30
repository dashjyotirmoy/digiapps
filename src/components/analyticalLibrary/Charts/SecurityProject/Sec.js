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
import Alert from 'react-bootstrap/Alert';

const Sec = props => {
    const bgTheme = props.bgTheme;
  let topProject = props.cardsData[4].data[2].slice(0, 5);
  props.cardsData[4].data[2].sort((a, b) => b.vulnerableLibraries.totalCount.localeCompare(a.vulnerableLibraries.totalCount));

  var totalCount = props.cardsData[2].data[2].alertMetrics.totalCount;
  let options = {
    chart: {
      type: "pie",
      height: 120,
      width: 120,
      backgroundColor: bgTheme ? '#232D3B':'#ffffff',
    },
    // title: {
    //     text: null
    // },
    title: {
      useHtml: true,
      align: 'center',
      verticalAlign: "middle",
      y: 18,
      text: `<span style='color: bgTheme ? #ffffff:#333333; font-size: 12px'>Total</span><br><span style='color: bgTheme ? #ffffff:#333333; font-size: 30px'>${props.cardsData[2].data[2].alertMetrics.totalCount}</span>`,
      floating: true,
      style: {
        color: bgTheme ? '#ffffff':'#333333'
      }
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
    pie: {
      shadow: false
    },
    tooltip: {
      shape: 'callout',
      formatter: function () {
        return "<b>" + this.point.name + "</b>: " + this.y + "  (" + Math.round(this.point.y / totalCount * 100) + "% )";
      }
    },
    credits: {
      enabled: false
    },
    series: [
      {
        name: "Vulnerability",
        innerSize: '70%',
        data: [
          {
            name: "Low",
            color: "#20c997",
            y: parseInt(props.cardsData[2].data[2].alertMetrics.low),
            borderColor: '#20c997'
          },
          {
            name: "Medium",
            color: "#ffc107",
            y: parseInt(props.cardsData[2].data[2].alertMetrics.medium),
            borderColor: '#ffc107'
          },
          {
            name: "High",
            color: "#E75555",
            y: parseInt(props.cardsData[2].data[2].alertMetrics.high),
            borderColor: '#E75555'
          }
        ],
        size: "90%",
        // showInLegend: true,
        dataLabels: {
          enabled: false
        },
      }
    ]
  };

  return (
    <React.Fragment>
      <Container fluid>        
      <Row>
          <Col>
            <Card.Body className="p-0">
            {(props.cardsData[0].data[2]==null && props.cardsData[1].data[2]==null && props.cardsData[2].data[2]==null 
                && props.cardsData[3].data[2]==null && props.cardsData[4].data[2]==null && props.cardsData[5].data[2]==null)?
                    <h6 style={{textAlign:'center',color:'#FFFFFF'}}>No Data Found</h6>:<>
          <Row className="no-gutters">
              <Col sm={4} className="pr-3">
                <Card className={`${bgTheme ? 'card-border-dark bg-dark-theme':'card-border-light bg-white'}`}>
                  <Card.Body className="p-0">
                        <p className={`m-0 font-weight-bold ${bgTheme ? 'bg-prodInfo-prod' : 'cardHeader'}`}>Policy Violations</p>
                    <Row className="no-gutters px-2 py-3 d-flex align-items-center">
                      <Col>
                        <DocumentCancelSvg />
                      </Col>
                      <Col>
                      <h3 className={`font-weight-bold ${bgTheme ? '' : 'text-dark'}`}>{props.cardsData[0].data[2]}</h3>
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
                <Card className={`${bgTheme ? 'card-border-dark bg-dark-theme':'card-border-light bg-white'}`}>
                  <Card.Body className="p-0">
                  <p className={`m-0 font-weight-bold ${bgTheme ? 'bg-prodInfo-prod' : 'cardHeader'}`}>Unique Vulnerabilities</p>
                  <Row className="no-gutters px-2 py-3 d-flex align-items-center">
                      <Col> <InsecureProtectionSvg /></Col>
                
                      <Col><h3 className={`font-weight-bold ${bgTheme ? '' : 'text-dark'}`}>{props.cardsData[1].data[2].alertMetrics.totalCount}</h3></Col>
                    
                      <Col>
                        <Badge style={{ color: '#ffffff', background: '#FF4136' }}>{props.cardsData[1].data[2].alertMetrics.high}</Badge>{' '}
                        <Badge style={{ color: '#ffffff', background: '#ffc107' }}>{props.cardsData[1].data[2].alertMetrics.medium}</Badge>{' '}
                        <Badge style={{ color: '#ffffff', background: '#57E188' }}>{props.cardsData[1].data[2].alertMetrics.low}</Badge>{' '}
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
                <Card className={`${bgTheme ? 'card-border-dark bg-dark-theme':'card-border-light bg-white'}`}>
                  <Card.Body className="p-0">
                  <p className={`m-0 font-weight-bold ${bgTheme ? 'bg-prodInfo-prod' : 'cardHeader'}`}>Actionable Libraries</p>
                  <Row className="no-gutters px-2 py-3 d-flex align-items-center">
                      <Col sm={4}><LibrarySvg /></Col>
                    <Col>
                      <h3 className={`font-weight-bold ${bgTheme ? '' : 'text-dark'}`}>{props.cardsData[2].data[2].alertMetrics.totalCount}</h3>
                    </Col>
                      <Col>
                        <Badge style={{ color: '#ffffff', background: '#FF4136' }}>{props.cardsData[2].data[2].alertMetrics.high}</Badge>{' '}
                        <Badge style={{ color: '#ffffff', background: '#ffc107' }}>{props.cardsData[2].data[2].alertMetrics.medium}</Badge>{' '}
                        <Badge style={{ color: '#ffffff', background: '#57E188' }}>{props.cardsData[2].data[2].alertMetrics.low}</Badge>{' '}
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
                <Card.Body className={`card-height rounded p-0 ${bgTheme ? 'bg-dark-theme card-border-dark' : 'bg-white card-border-light'}`}>
                  <h6 className={`font-weight-bold ${bgTheme ? 'bg-prodInfo-prod' : 'cardHeader'}`}>Vulnerable Repositories</h6>
                  <Card.Body>
                    <div className={`wrap ${bgTheme ? 'card-border-dark' : 'card-border-light'}`}>
                      <table className={`table table-hover ${bgTheme ? 'table-dark' : 'table-light'}`}>
                        <thead className={`${bgTheme ? 'tabhead' : 'cardHeader text-dark'}`}>
                          <tr>
                            <th scope="col">Repositories</th>
                            <th scope="col">Libraries</th>
                            <th scope="col">Vulnerability Count</th>
                            <th scope="col">Vulnerabilities</th>
                            {/* <th scope="col">Licence</th> */}
                          </tr>
                        </thead>
                      </table>

                      <div className={`${bgTheme ? 'inner_table' : 'inner_table_light'}`}>
                        <table className={`table table-hover ${bgTheme ? 'table-dark' : 'table-light'}`} >
                          <tbody className={`f-12 ${bgTheme ? 'tabrow' : 'text-dark'}`}>
                            {
                              topProject.map((item, index) => {
                                return (
                                  <tr key={index}>
                                    <td>{item.name}</td>
                                    <td>{item.librariesCount}</td>
                                    <td>{item.vulnerableLibraries.totalCount}</td>
                                    <td>
                                    {item.vulnerableLibraries.totalCount === "0" ? (
                                            <p className="ml-3">No Vulnerabilities</p>
                                          ) :
                                          <ProgressBar className="w-100">
                                          <ProgressBar style={{ backgroundColor: '#ec5050',color:'#333333',fontWeight:'bold' }} now={item.vulnerableLibraries.high} label={`${item.vulnerableLibraries.high}`} key={1} max={item.vulnerableLibraries.totalCount} />
                                          <ProgressBar style={{ backgroundColor: '#ffc107',color:'#333333',fontWeight:'bold' }} now={item.vulnerableLibraries.medium} label={`${item.vulnerableLibraries.medium}`} key={2} max={item.vulnerableLibraries.totalCount} />
                                          <ProgressBar style={{ backgroundColor: '#20c997',color:'#333333',fontWeight:'bold' }} now={item.vulnerableLibraries.low} label={`${item.vulnerableLibraries.low} `} key={3} max={item.vulnerableLibraries.totalCount} />
                                        </ProgressBar>
                                          }
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
          <Card.Body className={`p-0 my-3  ${bgTheme ? 'bg-dark-theme card-border-dark' : 'bg-white card-border-light'}`}>
                <p className={`font-weight-bold ${bgTheme ? 'bg-prodInfo-prod' : 'cardHeader'}`}>Vulnerability Analysis</p>
                <Row className="no-gutters align-items-center px-3">
                <Col sm={2} className="border-right">
                <HighchartsReact highcharts={Highcharts} options={options}/>
                </Col>
                <Col sm={10}>
                  <Row className="justify-content-center no-gutters">
                    <Col sm={12} className="px-3">
                    <h6 className="font-weight-bold">Library Statistics</h6>
                     </Col>  
                     
                     <Col sm={12} className="row justify-content-center">
                          <Col sm={4} className="text-center">
                  <Alert
                    className={`${bgTheme ? 'label-bg-dark' : 'label-bg-light'}`}
                  >
                    <span
                      className="pl-3"
                      style={{ fontSize: '18px', fontWeight: 'bold' }}
                    >
                      {props.cardsData[3].data[2].vulnerableCount}
                    </span> &nbsp; <span style={{ fontSize: '12px', color: '#A7AEB7' }}>
                      Vulnerable
                      </span>
                  </Alert>
                </Col>
                <Col sm={4} className="text-center p-0">
                  <Alert
                    className={`${bgTheme ? 'label-bg-dark' : 'label-bg-light'}`}
                  >
                    <span
                      style={{ fontSize: '18px', fontWeight: 'bold' }}
                    >

                      {props.cardsData[3].data[2].vulnerableAndOutdatedCount}
                    </span> &nbsp; <span style={{fontSize: '12px', color: '#A7AEB7' }}>
                      Vulnerable {'&'} Outdated
                      </span>
                  </Alert>
                </Col>
                <Col sm={4} className="text-center">
                  <Alert
                    className={`pl-4  ${bgTheme ? 'label-bg-dark' : 'label-bg-light'}`}
                  >
                    <span
                      style={{ fontSize: '18px', fontWeight: 'bold' }}
                    >
                      {props.cardsData[3].data[2].outdatedCount}
                    </span> &nbsp; <span style={{fontSize: '12px', color: '#A7AEB7' }}>
                      Outdated</span>
                  </Alert>
                  </Col>
                          </Col>     
                      
                      </Row>
                    </Col>
                </Row>
              </Card.Body>
              </>}
             </Card.Body>
          </Col>
        </Row>

      </Container>
    </React.Fragment>
  );
};

export default Sec;
