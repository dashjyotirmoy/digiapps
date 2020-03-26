import React from 'react';
import styled from "styled-components";
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import Badge from 'react-bootstrap/Badge';
import InsecureProtectionSvg from "./InsecureProtectionSvg";
import LibrarySvg from "./LibrarySvg";
import DocumentCancelSvg from './DocumentCancelSvg';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import Alert from 'react-bootstrap/Alert';
import Table from 'react-bootstrap/Table';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';



const Title = styled.h1`
font-size: 2rem;
color: palevioletred;
`

const SecurityOnProjectSelection = (props) => {

  let policyData = props.cardsData;
  console.log(policyData)

  let options = {
    chart: {
      type: 'pie',
      backgroundColor: '#232D3B'
    },
    title: {
      text: 'Duplication'
    },
    credits: {
      enabled: false
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
    title: {
      useHTML: true,
      // verticalAlign: "bottom",
      x: -5,
      y: 160,
      text: `<col> <span style='color: #798EA8'>&nbsp;&nbsp; Total</span><br/><span style='font-size:34px'> &nbsp;&nbsp;${props.cardsData[2].data[2].alertMetrics.totalCount}</span></col>`,
      floating: true,
      style: {
        fontSize: '14px',
        color: '#ffffff'
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
    series: [
      {
        name: 'Browsers',
        data: [
          {
            name: 'Low',
            color: '#C2B12C',
            y: parseInt(props.cardsData[2].data[2].alertMetrics.low),
            borderColor: '#C2B12C'
          },
          {
            name: 'Medium',
            color: '#C0792A',
            y: parseInt(props.cardsData[2].data[2].alertMetrics.medium),
            borderColor: '#C0792A'
          },
          {
            name: ' High',
            color: '#E75555',
            y: parseInt(props.cardsData[2].data[2].alertMetrics.high),
            borderColor: '#E75555'
          }
        ],
        size: "75%",
        innerSize: "85%",
        showInLegend: true,
        dataLabels: {
          enabled: false
        }
      }
    ],


  }

  return (
    <React.Fragment>
      <div className="container-fluid">
        <Row className=" d- flex align-item-center">
          <Col
            sm={8} md={9} lg={9} xl={9}>
            <Row className="d-flex justify-content-around">
              <Card
                style={{ width: '30%', height: '', backgroundColor: '#232D3B', color: '#f5f5f5', borderRadius: '8px' }}
                className="h-100 row">
                <Col sm={12} md={12} lg={12} xl={12} className="d-flex flex-column">
                  <Row
                    className="pt-3"
                    style={{ minHeight: '2rem', maxHeight: '3rem', lineHeight: '1rem' }}
                  >
                    <Col
                      sm={10} md={10} lg={10} xl={10}
                      className=""
                      style={{ fontSize: '16px' }}
                    // style={{ fontSize: '15px', fontFamily: 'cursive' }}
                    >
                      Policy Violation</Col>
                    <Col
                      sm={2} md={2} lg={2} xl={2}
                    >
                      <DocumentCancelSvg />
                    </Col>
                  </Row>
                  <Row
                    className="text-center pb-3 justify-content-center"
                    style={{ fontWeight: 'bold', fontSize: '50px', lineHeight: '1.6' }}
                  >
                    <Col>{props.cardsData[0].data[2]}</Col>
                  </Row>
                  <Row
                    className="pr-3 pb-2"
                    style={{ lineHeight: '1rem', minHeight: '2rem', maxHeight: '3rem' }}
                  >
                    <Col
                      sm={10} md={10} lg={10} xl={10}
                    >
                    </Col>
                    <Col
                      sm={2} md={2} lg={2} xl={2}
                      className=" d-flex justify-content-end"
                    >
                      <FontAwesomeIcon
                        icon={faEllipsisV}
                        color={'#D8D8D8'}
                      >
                      </FontAwesomeIcon>

                    </Col>
                  </Row>
                </Col>
              </Card>
              <Card
                style={{ width: '30%', height: '', backgroundColor: '#232D3B', color: '#f5f5f5', borderRadius: '8px' }}
                className="h-100 row">
                <Col sm={12} md={12} lg={12} xl={12} className="d-flex flex-column">
                  <Row
                    className="pt-3"
                    style={{ minHeight: '2rem', maxHeight: '3rem', lineHeight: '1rem' }}
                  >
                    <Col
                      sm={8} md={8} lg={10} xl={10}
                      className=""
                      style={{ fontSize: '16px' }}
                    // style={{ fontSize: '15px', fontFamily: 'cursive' }}
                    >
                      Per Vulnerability Alert
                      </Col>
                    <Col
                      sm={4} md={4} lg={2} xl={2}
                    >
                      <InsecureProtectionSvg />
                    </Col>
                  </Row>
                  <Row
                    className="text-center pb-3 justify-content-center"
                    style={{ fontWeight: 'bold', fontSize: '50px', lineHeight: '1.6' }}
                  >
                    <Col>{props.cardsData[1].data[2].alertMetrics.totalCount}</Col>
                  </Row>

                  <Row className="pr-3 pb-2">
                    <Col
                      sm={10} md={10} lg={10} xl={10}
                    >
                      <Row
                        className="justify-content-center"
                        style={{ lineHeight: '1rem', minHeight: '2rem', maxHeight: '3rem' }}
                      >
                        <Col sm={6} md={6} lg={6} xl={6}>
                        </Col>
                        <Col
                          sm={6} md={6} lg={6} xl={6}
                        >
                          <Badge style={{ color: '#222222', background: '#B65355' }}>{props.cardsData[1].data[2].alertMetrics.high}</Badge>{' '}
                          <Badge style={{ color: '#222222', background: '#C0792A' }}>{props.cardsData[1].data[2].alertMetrics.medium}</Badge>{' '}
                          <Badge style={{ color: '#222222', background: '#C2B12C' }}>{props.cardsData[1].data[2].alertMetrics.low}</Badge>{' '}
                        </Col>
                      </Row>
                    </Col>
                    <Col
                      sm={2} md={2} lg={2} xl={2}
                      className=" d-flex justify-content-end "
                    >
                      <FontAwesomeIcon
                        icon={faEllipsisV}
                        color={'#D8D8D8'}
                      >
                      </FontAwesomeIcon>
                    </Col>
                  </Row>

                </Col>
              </Card>
              <Card
                style={{ width: '30%', height: '', backgroundColor: '#232D3B', color: '#f5f5f5', borderRadius: '8px' }}
                className="h-100 row">
                <Col sm={12} md={12} lg={12} xl={12} className="d-flex flex-column">
                  <Row
                    className="pt-3"
                    style={{ minHeight: '2rem', maxHeight: '3rem', lineHeight: '1rem' }}
                  >
                    <Col
                      sm={8} md={8} lg={10} xl={10}
                      className=""
                      style={{ fontSize: '16px' }}
                    // style={{ fontSize: '15px', fontFamily: 'cursive' }}
                    >
                      Per Library Alert</Col>
                    <Col
                      sm={4} md={4} lg={2} xl={2}
                    >
                      <LibrarySvg />
                    </Col>
                  </Row>
                  <Row
                    className="text-center pb-3 justify-content-center"
                    style={{ fontWeight: 'bold', fontSize: '50px', lineHeight: '1.6' }}
                  >
                    <Col>{props.cardsData[2].data[2].alertMetrics.totalCount}</Col>
                  </Row>
                  <Row className="pr-3 pb-2">
                    <Col
                      sm={10} md={10} lg={10} xl={10}
                    >
                      <Row
                        className="justify-content-center"
                        style={{ lineHeight: '1rem', minHeight: '2rem', maxHeight: '3rem' }}
                      >
                        <Col sm={6} md={6} lg={6} xl={6}>
                        </Col>
                        <Col
                          sm={6} md={6} lg={6} xl={6}
                        >
                          <Badge style={{ color: '#222222', background: '#B65355' }}>{props.cardsData[1].data[2].alertMetrics.high}</Badge>{' '}
                          <Badge style={{ color: '#222222', background: '#C0792A' }}>{props.cardsData[1].data[2].alertMetrics.medium}</Badge>{' '}
                          <Badge style={{ color: '#222222', background: '#C2B12C' }}>{props.cardsData[1].data[2].alertMetrics.low}</Badge>{' '}
                        </Col>
                      </Row>
                    </Col>
                    <Col
                      sm={2} md={2} lg={2} xl={2}
                      className=" d-flex justify-content-end "
                    >
                      <FontAwesomeIcon
                        icon={faEllipsisV}
                        color={'#D8D8D8'}
                      >
                      </FontAwesomeIcon>
                    </Col>
                  </Row>
                </Col>
              </Card>
            </Row>
            <Row className="d-flex justify-content-around mt-4">
              <Col
                sm={6} md={6} lg={6} xl={6}
              >
                <Card
                  style={{ width: '100%', height: '', backgroundColor: '#232D3B', color: '#f5f5f5', borderRadius: '8px' }}
                >
                  <Card.Header>
                    Top Vulnerabilities
                </Card.Header>

                  <Card.Body>
                    <Table variant='dark' hover>
                      <thead
                        style={{ color: '#A6A8AC', backgroundColor: '#1D2632' }}
                      >
                        <tr
                          style={{ maxHeight: '2rem', minHeight: '2rem', lineHeight: '2rem' }}
                        >
                          <th>Name</th>
                          <th>Type</th>
                          <th>Severity</th>
                          <th>Score</th>
                          {/* <th>Library Id</th> */}
                        </tr>
                      </thead>

                      {
                        props.cardsData[4].data[2].map((item, index) => {
                          return (

                            <tbody
                              key={index}
                              className="font-metric-sub-text"
                              style={{ color: '#ffffff', background: '#334154', border: '#334154' }}
                            >
                              <tr>
                                <td>{item.name}</td>
                                <td> {item.type} </td>
                                <td>{item.severity}</td>
                                <td>{item.score}</td>
                                {/* <td>  {item.libraryId === null ? `null` : item.libraryId} </td> */}
                              </tr>
                            </tbody>

                          )
                        })
                      }


                    </Table>
                  </Card.Body>
                </Card>
              </Col>

              <Col
                sm={6} md={6} lg={6} xl={6}
              >
                <Card
                  style={{ width: '100%', height: '', backgroundColor: '#232D3B', color: '#f5f5f5', borderRadius: '8px' }}
                >
                  <Card.Header>
                    Top Libraries
                </Card.Header>

                  <Card.Body>
                    <Table variant='dark' hover>
                      <thead
                        style={{ color: '#A6A8AC', backgroundColor: '#1D2632' }}
                      >
                        <tr
                          style={{ maxHeight: '2rem', minHeight: '2rem', lineHeight: '2rem' }}
                        >
                          <th>Library Name</th>
                          <th>Vulnerable Library</th>
                          <th>License</th>
                        </tr>
                      </thead>

                      {
                        props.cardsData[5].data[2].map((item, index) => {
                          return (

                            <tbody
                              key={index}
                              className="font-metric-sub-text"
                              style={{ color: '#ffffff', background: '#334154', border: '#334154' }}
                            >
                              <tr style={{ maxHeight: '2rem', minHeight: '2rem', lineHeight: '2rem' }}>
                                <td>{item.name}</td>
                                <td>
                                  <ButtonGroup
                                    style={{ lineHeight: '1rem', minHeight: '2rem', maxHeight: '2rem' }}
                                  >
                                    <Button
                                      style={{ borderRadius: '30px 0px 0px 30px', backgroundColor: '#B65355', border: '0px', color: '#222222' }}
                                    >
                                      <span style={{ lineHeight: '' }}>
                                        <span style={{ fontSize: '' }}> High </span><span style={{ fontSize: '' }}>{item.vulnerabilities.high}</span>
                                      </span>
                                    </Button>
                                    <Button
                                      style={{ backgroundColor: '#C0792A', border: '0px', color: '#222222' }}
                                    >
                                      Medium {item.vulnerabilities.medium}
                                    </Button>
                                    <Button
                                      style={{ borderRadius: '0px 30px 30px 0px', backgroundColor: '#C2B12C', border: '0px', color: '#222222' }}
                                    >
                                      Low {item.vulnerabilities.low}
                                    </Button>
                                  </ButtonGroup>
                                </td>
                                <td>{item.licenseCount}</td>
                              </tr>
                            </tbody>

                          )
                        })
                      }


                    </Table>
                  </Card.Body>
                </Card>
              </Col>


            </Row>
          </Col>
          <Col sm={4} md={3} lg={3} xm={3}>
            <Card
              style={{ width: '100%', height: '', backgroundColor: '#232D3B', color: '#f5f5f5', borderRadius: '8px' }}
              className="h-100 row"
            >
              <Row
                className="pt-3 pl-3"
              // style={{ minHeight: '2rem', maxHeight: '3rem', lineHeight: '1rem' }}
              >
                <Col
                  style={{ fontSize: '16px' }}
                >
                  Vulnerabilities
</Col>
              </Row>
              <Col
                style={{}}
              >
                <HighchartsReact highcharts={Highcharts} options={options} />
              </Col>

              <Col className="pl-4 pr-4">
                <Col
                  className="pb-2 "
                  style={{ fontSize: '20px', lineHeight: '3rem', color: '#FFFFFF' }}
                >
                  Library Statistics
                  </Col>
                <Col
                  style={{ maxHeight: '5rem', minHeight: '5rem', lineHeight: '2rem' }}
                >
                  <Alert
                    className="pl-4"
                    style={{ borderRadius: '40px', backgroundColor: '#334154' }}
                  >
                    <span
                      className="pl-3"
                      style={{ fontSize: '25px', fontWeight: 'bold' }}
                    >
                      {props.cardsData[3].data[2].vulnerableCount}
                    </span> &nbsp; <span style={{ color: '#A7AEB7' }}>Vulnerable</span>
                  </Alert>
                </Col>
                <Col
                  style={{ maxHeight: '5rem', minHeight: '5rem', lineHeight: '2rem' }}
                >
                  <Alert
                    className="pl-4"
                    style={{ borderRadius: '40px', backgroundColor: '#334154' }}
                  >
                    <span
                      className="pl-3"
                      style={{ fontSize: '25px', fontWeight: 'bold' }}
                    >
                      {props.cardsData[3].data[2].vulnerableAndOutdatedCount}
                    </span> &nbsp; <span style={{ color: '#A7AEB7' }}>Vulnerable {'&'} Outdated</span>
                  </Alert>
                </Col>
                <Col
                  style={{ maxHeight: '5rem', minHeight: '5rem', lineHeight: '2rem' }}
                >
                  <Alert
                    className="pl-4"
                    style={{ borderRadius: '40px', backgroundColor: '#334154' }}
                  >
                    <span
                      className="pl-3"
                      style={{ fontSize: '25px', fontWeight: 'bold' }}
                    >
                      {props.cardsData[3].data[2].outdatedCount}
                    </span> &nbsp; <span style={{ color: '#A7AEB7' }}>Outdated</span>
                  </Alert>
                </Col>
              </Col>
            </Card>

          </Col>
        </Row>

      </div >
    </React.Fragment >
  )
}

export default SecurityOnProjectSelection;