import React from "react";
import { Row, Col, Container, Card, Badge, Form,DropdownButton,Dropdown,Button,ButtonGroup} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Alert.css";
import styled from "styled-components";
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
                    0
                  </Badge>{" "}
                  <Badge style={{ color: "#222222", background: "#C0792A" }}>
                    2
                  </Badge>{" "}
                </Col>
              </Row>
              <Card.Body className="vscroll">
                <Row className="tabhead">
                  <Col sm={1}>
                    <p>Severity</p>
                  </Col>
                  <Col sm={2}>
                    <p>Library</p>
                  </Col>
                  <Col sm={1}>
                    <p>Occurences</p>
                  </Col>
                  <Col sm={2}>
                    <p>Vulnerability id</p>
                  </Col>
                  <Col sm={1}>
                    <p>CVSS 3 Score</p>
                  </Col>
                  <Col sm={1}>
                    <p>CVSS 2 Score</p>
                  </Col>
                  <Col sm={1}>
                    <p>Published</p>
                  </Col>

                  <Col sm={1}>
                    <p>Top Fix type</p>
                  </Col>
                  <Col sm={2}>
                    <p>Top Fix Resolution</p>
                  </Col>
                </Row>
                {
                alertData.perVulnerabilityAlert.map((item, index) => {
                  return (
                <Row className="tabrow f-12" key={index}>
                 
                  <Col sm={1}>
                    
                      <Form.Check type="checkbox" style={{ float: "left" }} />
                      <Badge className="sevbadge"></Badge>{" "}
                  </Col>
                  <Col sm={2}>
                  <p>{item.libraryName}</p>
                  </Col>
                  <Col sm={1}>
                    <span>1 project</span>
                    <span className="font-10">details</span>
                  </Col>
                  <Col sm={2}>
                  <p>{item.vulnerabilityId}</p>
                  </Col>
                  <Col sm={1}>
                    <p>{item.cvss3score}</p>
                  </Col>
                  <Col sm={1}>
                    <p>{item.cvss2score}</p>
                  </Col>
                  <Col sm={1}>
                  <p>{item.publishedDate}</p>
                  </Col>
                  <Col sm={1}>
                    <p>{item.topFixType}</p>
                  </Col>

                  <Col sm={2}>
                    <p>{item.topFixResolution}</p>
                  </Col>
                </Row>
                )
              })
            }
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
              <Card.Body className="vscroll">
                <Row className="tabhead">
                  <Col sm={3}>
                  <Form.Check type="checkbox" style={{ float: "left" }} />
                    <p>Library</p>
                  </Col>
                  <Col sm={2}>
                    <p>Type</p>
                  </Col>
                  <Col sm={2}>
                    <p>Description</p>
                  </Col>
                  <Col sm={1}>
                    <p>Library Type</p>
                  </Col>
                  <Col sm={2}>
                    <p>Creation Date</p>
                  </Col>
                  <Col sm={2}>
                    <p>Modified Date</p>
                  </Col>
                </Row>
                {
                alertData.perLibraryAlert.map((item, index) => {
                  return (
                   
                <Row className="tabrow f-12" key={index} >
                  <Col sm={3}>
                    <div>
                    <Form.Check type="checkbox" style={{ float: "left" }} />
                      <Badge className="sevbadge1"></Badge>{" "}
                    </div>
                      <div className="margin-4">
                      <p>{item.libraryName}</p>
                      </div>
                      
                  </Col>
                                
                  <Col sm={2}>
                  <p>{item.vulnerabilityType}</p>
                  </Col>
                  <Col sm={2}>
                    {/* <p> */}
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
                    {/* </p> */}
                  </Col>
                  <Col sm={1}>
                  <p>{item.libraryType}</p>
                  </Col>
                  <Col sm={2}>
                  <p>{item.creationDate}</p>
                  </Col>
                  <Col sm={2}>
                  <p>{item.modifiedDate}</p>
                  </Col>

                </Row>
                
                 )
                })
              }
              </Card.Body>
            </Card.Body>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default App;
