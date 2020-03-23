import React from "react";
// import 'react-circular-progressbar/dist/styles.css';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Row, Col, Container, Card,Badge } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Sec.css";
import DocumentCancelSvg from './DocumentCancel';
import InsecureProtectionSvg from './InsecureProtection';
import LibrarySvg from './LibrarySvg'
const Sec = props => {
  console.log(props)
  let options = {
    chart: {
      type: "pie",
      backgroundColor:"#232D3B",
        },
    // title: {
    //     text: null
    // },
    title: {
      verticalAlign: "middle",
      text: `Total<br>${props.cardsData[2].data[2].alertMetrics.totalCount}`,
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
      formatter: function() {
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
            name: "Low",
            color: "#C2B12C",
            y: parseInt(props.cardsData[2].data[2].alertMetrics.low),
            borderColor: '#C2B12C'
          },
          {
            name: "Medium",
            color: "#C0792A",
            y: parseInt(props.cardsData[2].data[2].alertMetrics.medium),
            borderColor: '#C0792A'
          },
          {
            name: "High",
            color: "#E75555",
            y: parseInt(props.cardsData[2].data[2].alertMetrics.high),
            borderColor: '#E75555'
          }
        ],
        size: "60%",
        innerSize: "85%",
        showInLegend: true,
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
          <Col sm={9}>
            <Row>
          <Col sm={4}>
            <Card className="borderadius">
              <Card.Body className="pt-2 bg">
                <Row>
                  <Col sm={8} className="mb-3">
                    {" "}
                    <p>Policy Violations</p>
                  </Col>
                  <Col sm={4} className="iconend">
                    <DocumentCancelSvg/>
                  </Col>
                </Row>
                <Row className="justify-content-center mr-3 mb-3">
                <h3>{props.cardsData[0].data[2]}</h3>
                </Row>
                <Row className="text-center">
                  <Col sm={11}>
                  <Badge style={{ color: '#222222', background: '#B65355' }}>0</Badge>{' '}
                          <Badge style={{ color: '#222222', background: '#C0792A' }}>2</Badge>{' '}
                          <Badge style={{ color: '#222222', background: '#C2B12C' }}>10</Badge>{' '}
                  </Col>
                  <Col sm={1}>
                    <FontAwesomeIcon
                      icon={faEllipsisV}
                      color={"#D8D8D8"}
                    ></FontAwesomeIcon>
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
                  <Col sm={4} className="iconend"> <InsecureProtectionSvg/></Col>
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
                  <Col sm={1}>
                    <FontAwesomeIcon
                      icon={faEllipsisV}
                      color={"#D8D8D8"}
                    ></FontAwesomeIcon>
                  </Col>
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
                  <Col sm={4} className="iconend"><LibrarySvg/></Col>
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
                  <Col sm={1}>
                    <FontAwesomeIcon
                      icon={faEllipsisV}
                      color={"#D8D8D8"}
                    ></FontAwesomeIcon>
                  </Col>
                </Row>
              </Card.Body>
            </Card></Col>
            </Row>
 {/* code for table */}
  
 <Row className="mt-5">
           <Col >
           <Card.Body className="bg">
             <p>Top 5 Projects</p>
             
               <Card.Body>
                 <Row className="tabhead">
                   <Col sm={3}>
                     <p>Projects</p>
                   </Col>
                   <Col sm={3}>
                     <p>Libraries</p>
                   </Col>
                   <Col sm={3}>
                     <p>Vulnerabilities</p>
                   </Col>
                   <Col sm={3}>
                     <p>Licence</p>
                   </Col>
                 </Row>
                 <Row className="tabrow">
                   <Col sm={3}>
                     <p>Lorum Ipsum</p>
                   </Col>
                   <Col sm={3}>
                     <p>1</p>
                   </Col>
                   <Col sm={3}>
                     <p>135</p>
                   </Col>
                   <Col sm={3}>
                     <p>4</p>
                   </Col>
                 </Row>
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
    <p>Library Statistics</p>
  <p className="rounde">{props.cardsData[3].data[2].vulnerableCount} Vulnerable</p>
    <p className="rounde">{props.cardsData[3].data[2].vulnerableAndOutdatedCount} Vulnerable & Outdated</p>
    <p className="rounde">{props.cardsData[3].data[2].outdatedCount} Outdated</p>
  </Card.Body>
    </Row>
       </Col>
         </Row>

   
      </Container>
    </React.Fragment>
  );
};

export default Sec;
