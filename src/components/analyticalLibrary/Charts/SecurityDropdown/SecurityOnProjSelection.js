import React from "react";
// import 'react-circular-progressbar/dist/styles.css';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Row, Col, Container, Card, Badge, ButtonGroup, Button ,ProgressBar} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV,} from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import "../SecurityProject/Sec.css";
import DocumentCancelSvg from '../SecurityDropdown/DocumentCancelSvg';
import InsecureProtectionSvg from '../SecurityDropdown/InsecureProtectionSvg';
import LibrarySvg from '../SecurityDropdown/LibrarySvg';
import Alert from 'react-bootstrap/Alert';


// const Title = styled.h1`
// font-size: 2rem;
// color: palevioletred;
// `

// const SecurityOnProjectSelection = (props) => {

//   let policyData = props.cardsData;
//   console.log(policyData)

//   let options = {
//     chart: {
//       type: 'pie',
//       backgroundColor: '#232D3B'
//     },
//     title: {
//       text: 'Duplication'
//     },
//     credits: {
//       enabled: false
//     },
//     legend: {
//       enabled: true,
//       symbolRadius: 0,
//       reversed: true,
//       itemStyle: {
//         color: '#C8CED5',
//         fontWeight: 'normal'
//       }
//     },
//     title: {
//       useHTML: true,
//       // verticalAlign: "bottom",
//       x: -5,
//       y: 160,
//       text: `<col> <span style='color: #798EA8'>&nbsp;&nbsp; Total</span><br/><span style='font-size:34px'> &nbsp;&nbsp;${props.cardsData[2].data[2].alertMetrics.totalCount}</span></col>`,
//       floating: true,
//       style: {
//         fontSize: '14px',
//         color: '#ffffff'
//       }
//     },
//     pie: {
//       shadow: false
//     },
//     tooltip: {
//       formatter: function () {
//         return "<b>" + this.point.name + "</b>: " + this.y;
//       }
//     },
//     series: [
//       {
//         name: 'Browsers',
//         data: [
//           {
//             name: 'Low',
//             color: '#C2B12C',
//             y: parseInt(props.cardsData[2].data[2].alertMetrics.low),
//             borderColor: '#C2B12C'
//           },
//           {
//             name: 'Medium',
//             color: '#C0792A',
//             y: parseInt(props.cardsData[2].data[2].alertMetrics.medium),
//             borderColor: '#C0792A'
//           },
//           {
//             name: ' High',
//             color: '#E75555',
//             y: parseInt(props.cardsData[2].data[2].alertMetrics.high),
//             borderColor: '#E75555'
//           }
//         ],
//         size: "75%",
//         innerSize: "85%",
//         showInLegend: true,
//         dataLabels: {
//           enabled: false
//         }
//       }
//     ],


//   }

//   return (
//     <React.Fragment>
//       <div className="container-fluid">
//         <Row className=" d- flex align-item-center">
//           <Col
//             sm={8} md={9} lg={9} xl={9}>
//             <Row className="d-flex justify-content-around">
//               <Card
//                 style={{ width: '30%', height: '', backgroundColor: '#232D3B', color: '#f5f5f5', borderRadius: '8px' }}
//                 className="h-100 row">
//                 <Col sm={12} md={12} lg={12} xl={12} className="d-flex flex-column">
//                   <Row
//                     className="pt-3"
//                     style={{ minHeight: '2rem', maxHeight: '3rem', lineHeight: '1rem' }}
//                   >
//                     <Col
//                       sm={10} md={10} lg={10} xl={10}
//                       className=""
//                       style={{ fontSize: '16px' }}
//                     // style={{ fontSize: '15px', fontFamily: 'cursive' }}
//                     >
//                       Policy Violation</Col>
//                     <Col
//                       sm={2} md={2} lg={2} xl={2}
//                     >
//                       <DocumentCancelSvg />
//                     </Col>
//                   </Row>
//                   <Row
//                     className="text-center pb-3 justify-content-center"
//                     style={{ fontWeight: 'bold', fontSize: '50px', lineHeight: '1.6' }}
//                   >
//                     <Col>{props.cardsData[0].data[2]}</Col>
//                   </Row>
//                   <Row
//                     className="pr-3 pb-2"
//                     style={{ lineHeight: '1rem', minHeight: '2rem', maxHeight: '3rem' }}
//                   >
//                     <Col
//                       sm={10} md={10} lg={10} xl={10}
//                     >
//                     </Col>
//                     <Col
//                       sm={2} md={2} lg={2} xl={2}
//                       className=" d-flex justify-content-end"
//                     >
//                       <FontAwesomeIcon
//                         icon={faEllipsisV}
//                         color={'#D8D8D8'}
//                       >
//                       </FontAwesomeIcon>

//                     </Col>
//                   </Row>
//                 </Col>
//               </Card>
//               <Card
//                 style={{ width: '30%', height: '', backgroundColor: '#232D3B', color: '#f5f5f5', borderRadius: '8px' }}
//                 className="h-100 row">
//                 <Col sm={12} md={12} lg={12} xl={12} className="d-flex flex-column">
//                   <Row
//                     className="pt-3"
//                     style={{ minHeight: '2rem', maxHeight: '3rem', lineHeight: '1rem' }}
//                   >
//                     <Col
//                       sm={8} md={8} lg={10} xl={10}
//                       className=""
//                       style={{ fontSize: '16px' }}
//                     // style={{ fontSize: '15px', fontFamily: 'cursive' }}
//                     >
//                       Per Vulnerability Alert
//                       </Col>
//                     <Col
//                       sm={4} md={4} lg={2} xl={2}
//                     >
//                       <InsecureProtectionSvg />
//                     </Col>
//                   </Row>
//                   <Row
//                     className="text-center pb-3 justify-content-center"
//                     style={{ fontWeight: 'bold', fontSize: '50px', lineHeight: '1.6' }}
//                   >
//                     <Col>{props.cardsData[1].data[2].alertMetrics.totalCount}</Col>
//                   </Row>

//                   <Row className="pr-3 pb-2">
//                     <Col
//                       sm={10} md={10} lg={10} xl={10}
//                     >
//                       <Row
//                         className="justify-content-center"
//                         style={{ lineHeight: '1rem', minHeight: '2rem', maxHeight: '3rem' }}
//                       >
//                         <Col sm={6} md={6} lg={6} xl={6}>
//                         </Col>
//                         <Col
//                           sm={6} md={6} lg={6} xl={6}
//                         >
//                           <Badge style={{ color: '#222222', background: '#B65355' }}>{props.cardsData[1].data[2].alertMetrics.high}</Badge>{' '}
//                           <Badge style={{ color: '#222222', background: '#C0792A' }}>{props.cardsData[1].data[2].alertMetrics.medium}</Badge>{' '}
//                           <Badge style={{ color: '#222222', background: '#C2B12C' }}>{props.cardsData[1].data[2].alertMetrics.low}</Badge>{' '}
//                         </Col>
//                       </Row>
//                     </Col>
//                     <Col
//                       sm={2} md={2} lg={2} xl={2}
//                       className=" d-flex justify-content-end "
//                     >
//                       <FontAwesomeIcon
//                         icon={faEllipsisV}
//                         color={'#D8D8D8'}
//                       >
//                       </FontAwesomeIcon>
//                     </Col>
//                   </Row>

//                 </Col>
//               </Card>
//               <Card
//                 style={{ width: '30%', height: '', backgroundColor: '#232D3B', color: '#f5f5f5', borderRadius: '8px' }}
//                 className="h-100 row">
//                 <Col sm={12} md={12} lg={12} xl={12} className="d-flex flex-column">
//                   <Row
//                     className="pt-3"
//                     style={{ minHeight: '2rem', maxHeight: '3rem', lineHeight: '1rem' }}
//                   >
//                     <Col
//                       sm={8} md={8} lg={10} xl={10}
//                       className=""
//                       style={{ fontSize: '16px' }}
//                     // style={{ fontSize: '15px', fontFamily: 'cursive' }}
//                     >
//                       Per Library Alert</Col>
//                     <Col
//                       sm={4} md={4} lg={2} xl={2}
//                     >
//                       <LibrarySvg />
//                     </Col>
//                   </Row>
//                   <Row
//                     className="text-center pb-3 justify-content-center"
//                     style={{ fontWeight: 'bold', fontSize: '50px', lineHeight: '1.6' }}
//                   >
//                     <Col>{props.cardsData[2].data[2].alertMetrics.totalCount}</Col>
//                   </Row>
//                   <Row className="pr-3 pb-2">
//                     <Col
//                       sm={10} md={10} lg={10} xl={10}
//                     >
//                       <Row
//                         className="justify-content-center"
//                         style={{ lineHeight: '1rem', minHeight: '2rem', maxHeight: '3rem' }}
//                       >
//                         <Col sm={6} md={6} lg={6} xl={6}>
//                         </Col>
//                         <Col
//                           sm={6} md={6} lg={6} xl={6}
//                         >
//                           <Badge style={{ color: '#222222', background: '#B65355' }}>{props.cardsData[1].data[2].alertMetrics.high}</Badge>{' '}
//                           <Badge style={{ color: '#222222', background: '#C0792A' }}>{props.cardsData[1].data[2].alertMetrics.medium}</Badge>{' '}
//                           <Badge style={{ color: '#222222', background: '#C2B12C' }}>{props.cardsData[1].data[2].alertMetrics.low}</Badge>{' '}
//                         </Col>
//                       </Row>
//                     </Col>
//                     <Col
//                       sm={2} md={2} lg={2} xl={2}
//                       className=" d-flex justify-content-end "
//                     >
//                       <FontAwesomeIcon
//                         icon={faEllipsisV}
//                         color={'#D8D8D8'}
//                       >
//                       </FontAwesomeIcon>
//                     </Col>
//                   </Row>
//                 </Col>
//               </Card>
//             </Row>
//             <Row className="d-flex justify-content-around mt-4">
//               <Col
//                 sm={6} md={6} lg={6} xl={6}
//               >
//                 <Card
//                   style={{ width: '100%', height: '', backgroundColor: '#232D3B', color: '#f5f5f5', borderRadius: '8px' }}
//                 >
//                   <Card.Header>
//                     Top Vulnerabilities
//                 </Card.Header>

//                   <Card.Body>
//                     <Table variant='dark' hover
//                     >
//                       <thead
//                         style={{ color: '#A6A8AC', backgroundColor: '#1D2632' }}
//                       >
//                         <tr
//                           style={{ maxHeight: '2rem', minHeight: '2rem', lineHeight: '2rem' }}
//                         >
//                           <th>Name</th>
//                           <th>Type</th>
//                           <th>Severity</th>
//                           <th>Score</th>
//                           {/* <th>Library Id</th> */}
//                         </tr>
//                       </thead>
//                       <tbody

//                         className="font-metric-sub-text"
//                         style={{ color: '#ffffff', background: '#334154', border: '#334154', overflowY: 'scroll' }}
//                       >
//                         {
//                           props.cardsData[4].data[2].map((item, index) => {
//                             return (


//                               <tr
//                                 key={index}
//                               >
//                                 <td>{item.name}</td>
//                                 <td> {item.type} </td>
//                                 <td>{item.severity}</td>
//                                 <td>{item.score}</td>
//                                 {/* <td>  {item.libraryId === null ? `null` : item.libraryId} </td> */}
//                               </tr>

//                             )
//                           })
//                         }
//                       </tbody>

//                     </Table>
//                   </Card.Body>
//                 </Card>
//               </Col>

//               <Col
//                 sm={6} md={6} lg={6} xl={6}
//               >
//                 <Card
//                   style={{ width: '100%', height: '', backgroundColor: '#232D3B', color: '#f5f5f5', borderRadius: '8px' }}
//                 >
//                   <Card.Header>
//                     Top Libraries
//                 </Card.Header>

//                   <Card.Body>
//                     <Table variant='dark' hover>

//                       <div
//                         style={{ overflowY: 'scroll', width: '707px', height: '430px' }}
//                       >

//                         <thead
//                           style={{ color: '#A6A8AC', backgroundColor: '#1D2632' }}
//                         >
//                           <tr
//                             style={{ maxHeight: '2rem', minHeight: '2rem', lineHeight: '2rem' }}
//                           >
//                             <th>Library Name</th>
//                             <th>Vulnerable Library</th>
//                             <th>License Count</th>
//                           </tr>
//                         </thead>

//                         <tbody
//                           className="font-metric-sub-text"
//                           style={{ color: '#ffffff', background: '#334154', border: '#334154', overfouwY: '' }}
//                         >
//                           {
//                             props.cardsData[5].data[2].map((item, index) => {
//                               return (


//                                 <tr
//                                   key={index}
//                                 // style={{ maxHeight: '2rem', minHeight: '2rem', lineHeight: '2rem' }}
//                                 >
//                                   <td>{item.name}</td>
//                                   <td>
//                                     <ButtonGroup
//                                     // style={{ lineHeight: '1rem', minHeight: '2rem', maxHeight: '2rem' }}
//                                     >
//                                       <Button
//                                         style={{ borderRadius: '30px 0px 0px 30px', backgroundRowor: '#B65355', border: '0px', color: '#222222' }}
//                                       >
//                                         <span style={{ lineHeight: '' }}>
//                                           <span style={{ fontSize: '' }}> High </span><span style={{ fontSize: '' }}>{item.vulnerabilities.high}</span>
//                                         </span>
//                                       </Button>
//                                       <Button
//                                         style={{ backgroundColor: '#C0792A', border: '0px', color: '#222222' }}
//                                       >
//                                         Medium {item.vulnerabilities.medium}
//                                       </Button>
//                                       <Button
//                                         style={{ borderRadius: '0px 30px 30px 0px', backgroundColor: '#C2B12C', border: '0px', color: '#222222' }}
//                                       >
//                                         Low {item.vulnerabilities.low}
//                                       </Button>
//                                     </ButtonGroup>
//                                   </td>
//                                   <td>{item.licenseCount}</td>
//                                 </tr>

//                               )
//                             })
//                           }
//                         </tbody>
//                       </div>
//                     </Table>
//                   </Card.Body>
//                 </Card>
//               </Col>


//             </Row>
//           </Col>
//           <Col sm={4} md={3} lg={3} xm={3}>
//             <Card
//               style={{ width: '100%', height: '', backgroundColor: '#232D3B', color: '#f5f5f5', borderRadius: '8px' }}
//               className="h-100 row"
//             >
//               <Row
//                 className="pt-3 pl-3"
//               // style={{ minHeight: '2rem', maxHeight: '3rem', lineHeight: '1rem' }}
//               >
//                 <Col
//                   style={{ fontSize: '16px' }}
//                 >
//                   Vulnerabilities
// </Col>
//               </Row>
//               <Col
//                 style={{}}
//               >
//                 <HighchartsReact highcharts={Highcharts} options={options} />
//               </Col>

//               <Col className="pl-4 pr-4">
//                 <Col
//                   className="pb-2 "
//                   style={{ fontSize: '20px', lineHeight: '3rem', color: '#FFFFFF' }}
//                 >
//                   Library Statistics
//                   </Col>
//                 <Col
//                   style={{ maxHeight: '5rem', minHeight: '5rem', lineHeight: '2rem' }}
//                 >
//                   <Alert
//                     className="pl-4"
//                     style={{ borderRadius: '40px', backgroundColor: '#334154' }}
//                   >
//                     <span
//                       className="pl-3"
//                       style={{ fontSize: '25px', fontWeight: 'bold' }}
//                     >
//                       {props.cardsData[3].data[2].vulnerableCount}
//                     </span> &nbsp; <span style={{ color: '#A7AEB7' }}>Vulnerable</span>
//                   </Alert>
//                 </Col>
//                 <Col
//                   style={{ maxHeight: '5rem', minHeight: '5rem', lineHeight: '2rem' }}
//                 >
//                   <Alert
//                     className="pl-4"
//                     style={{ borderRadius: '40px', backgroundColor: '#334154' }}
//                   >
//                     <span
//                       className="pl-3"
//                       style={{ fontSize: '25px', fontWeight: 'bold' }}
//                     >
//                       {props.cardsData[3].data[2].vulnerableAndOutdatedCount}
//                     </span> &nbsp; <span style={{ color: '#A7AEB7' }}>Vulnerable {'&'} Outdated</span>
//                   </Alert>
//                 </Col>
//                 <Col
//                   style={{ maxHeight: '5rem', minHeight: '5rem', lineHeight: '2rem' }}
//                 >
//                   <Alert
//                     className="pl-4"
//                     style={{ borderRadius: '40px', backgroundColor: '#334154' }}
//                   >
//                     <span
//                       className="pl-3"
//                       style={{ fontSize: '25px', fontWeight: 'bold' }}
//                     >
//                       {props.cardsData[3].data[2].outdatedCount}
//                     </span> &nbsp; <span style={{ color: '#A7AEB7' }}>Outdated</span>
//                   </Alert>
//                 </Col>
//               </Col>
//             </Card>

//           </Col>
//         </Row>

//       </div >
//     </React.Fragment >
//   )
// }





const SecurityOnProjectSelection = (props) => {
 props.cardsData[4].data[2].sort((a, b) => b.score.localeCompare(a.score));
 props.cardsData[5].data[2].sort((a, b) => b.vulnerabilities.totalCount.localeCompare(a.vulnerabilities.totalCount));

  let options = {
    chart: {
      type: 'pie',
      height: 60 + '%',
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
      align: 'center',
      verticalAlign: "middle",
      y: 2,
      text: `<span style='color: #798EA8; font-size: 14px'>Total</span><br><span style='color: #FFFFFF; font-size: 30px'>${props.cardsData[2].data[2].alertMetrics.totalCount}</span>`,
      floating: true,
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
            // name: 'Low',
            color: '#C2B12C',
            y: parseInt(props.cardsData[2].data[2].alertMetrics.low),
            borderColor: '#C2B12C'
          },
          {
            // name: 'Medium',
            color: '#C0792A',
            y: parseInt(props.cardsData[2].data[2].alertMetrics.medium),
            borderColor: '#C0792A'
          },
          {
            // name: ' High',
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
      <Container fluid style={{ paddingTop: "10px" }}>
        <Row>
          <Col sm={9}>
            <Row>
              <Col sm={4}>
                <Card className="borderadius" style={{ height: "180px" }}>
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
                      {/* <Col sm={1}>
                        <FontAwesomeIcon
                          icon={faEllipsisV}
                          color={"#D8D8D8"}
                        ></FontAwesomeIcon>
                      </Col> */}
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
            <Row className="mt-4">
              <Col sm={6}>
                <Row>
                  <Col>
                    <Card.Body className="bg">
                      <h5 className="mb-3">Vulnerabilities</h5>

                      <Card.Body className="pb-0">
                        <div className="wrap">
                          <table className="table table-hover table-dark">
                            <thead className="tabhead">
                              <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Type</th>
                                <th scope="col">Severity</th>
                                <th scope="col">Score</th>
                              </tr>
                            </thead>
                          </table>

                          <div className="inner_table">
                            <table className="table table-hover table-dark" >
                              <tbody >
                                {
                                  props.cardsData[4].data[2].map((item, index) => {
                                    return (
                                      <tr className="tabrow f-12" key={index}>
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
                    <Card.Body className="bg">
                      <h5 className="mb-3">Libraries</h5>

                      <Card.Body className="pb-0">
                        <div className="wrap">
                          <table className="table table-hover table-dark ">
                            <thead className="tabhead">
                            <tr>
                                <th className="w-45">Library Name</th>
                                <th  >Vulnerable Library</th>
                                <th className="w-23">License Count</th>

                              </tr>
                            </thead>
                          </table>
                          <div className="inner_table">
                            <table className="table table-hover table-dark" >

                              <tbody >
                                {
                                  props.cardsData[5].data[2].map((item, index) => {
                                    return (
                                      <tr className="tabrow f-12" key={index}>
                                        <td className="w-45"><p>{item.name}</p></td>
                                        <td className="tabpadding w-40">
                                        {item.vulnerabilities.totalCount == 0 ? (
                                    <p className="ml-3">No Vulnerabilities</p>
                                  ) : 
                                        <ProgressBar className="w-200">
  <ProgressBar style={{backgroundColor: '#B65355'}} now={item.vulnerabilities.high}label={`${item.vulnerabilities.high}`} key={1} max={item.vulnerabilities.totalCount}/>
  <ProgressBar style={{backgroundColor: '#C0792A'}} now={item.vulnerabilities.medium} label={`${item.vulnerabilities.medium}`}key={2}max={item.vulnerabilities.totalCount} />
  <ProgressBar style={{backgroundColor: '#C2B12C'}} now={item.vulnerabilities.low} label={`${item.vulnerabilities.low}`}key={3} max={item.vulnerabilities.totalCount}/>
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
  )
}
export default SecurityOnProjectSelection;