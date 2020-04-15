import React from "react";
import { Row, Col, Container, Card, Badge, Form,Dropdown,Button,ButtonGroup} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Alert.css";
import styled from "styled-components";
import moment from 'moment/moment';
// import { Left } from "react-bootstrap/lib/Media";

const Styles = styled.div`
  .btncolor {
    background-color: #2E3B4D!important;
    border-color: #3A485C!important;
    color: #fff!important;
  }
 
`;
const App = props => {
  let alertData = props.cardsData;

  let mediumCount = alertData.perVulnerabilityAlert.filter(data => data.severity === 'MEDIUM');
  let highCount = alertData.perVulnerabilityAlert.filter(data => data.severity === 'HIGH');
  let lowCount = alertData.perVulnerabilityAlert.filter(data => data.severity === 'LOW');

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
      <th scope="col">Severity</th>
      <th scope="col">Library</th>
      <th scope="col">Occurences</th>
      <th scope="col">Vulnerability id</th>
      <th scope="col">CVSS 3 Score</th>
      <th scope="col">CVSS 2 Score</th>
      <th scope="col">Published</th>
      <th scope="col">Top Fix type</th>
      <th scope="col">Top Fix Resolution</th>
    </tr>
  </thead>
  </table>

<div className="inner_table">
     <table className="table table-hover table-dark" >   
  <tbody >
   
  {
                alertData.perVulnerabilityAlert.map((item, index) => {
                  return (  
    <tr className="tabrow f-12" key={index}>
      <td scope="row">
      <Form.Check type="checkbox" style={{ float: "left" }} />
      {item.severity === 'MEDIUM' ? (
            <Badge className="sevbadge2"></Badge>
          ) : null}

      {item.severity === 'HIGH' ? (
            <Badge className="sevbadge"></Badge>
          ) : null}    
                      
      </td>
      <td>  <p>{item.libraryName}</p></td>
      <td>
      <span>1 project</span>
                    <span className="font-10">details</span>
      </td>
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
      {/* <p>{(new Date(item.publishedDate)).toString()}</p> */}
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
               <Dropdown>
  <Dropdown.Toggle variant="success" id="dropdown-basic" className="dropbutton">
    All Time
  </Dropdown.Toggle>

  <Dropdown.Menu>
    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>
                </Col>
                <Button variant="secondary" className="btnstyle">Apply Preferences</Button>{' '}
                <Button variant="secondary"  className="ml-4 btnstyle">Ignore Selected</Button>{' '}
                
              </Row>
              <Card.Body >
              <div className="wrap">
              <table className="table table-hover table-dark">
  <thead className="tabhead">
    <tr>
      <th scope="col">
      <Form.Check type="checkbox" style={{ float: "left" }} />
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
                alertData.perLibraryAlert.map((item, index) => {
                  return (  
    <tr className="tabrow f-12" key={index}>
     
      <td>  <div style={{ float: "left" }}>
                    <Form.Check type="checkbox" style={{ float: "left" }} />
                      <Badge className="sevbadge1"></Badge>{" "}
                    </div>
                      <div className="margin-4">
                      <p>{item.libraryName}</p>
                      </div></td>
      <td>
      <p>{item.vulnerabilityType}</p>
      </td>
          <td>
      <ButtonGroup
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
                            </ButtonGroup>
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

export default App;
