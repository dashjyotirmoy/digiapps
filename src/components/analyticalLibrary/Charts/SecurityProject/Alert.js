import React from "react";
import { Row, Col, Container, Card, Badge, Form,DropdownButton,Dropdown,Button} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Alert.css";

const App = props => {
  let alertData = props.cardsData;
  console.log('dddddddddddxx', alertData);
  return (
    <React.Fragment>
      <Container fluid>
        <Row className="mt-5">
          <Col>
            <Card.Body className="bg">
              <p>Per Vulnerability Alert</p>
              <Row className="pl-2"> 
                <Col sm={1}>
                  <p>Vulnerabilities</p>
                </Col>
                <Col sm={3}>
                  <Badge style={{ color: "#222222", background: "#B65355" }}>
                    0
                  </Badge>{" "}
                  <Badge style={{ color: "#222222", background: "#C0792A" }}>
                    2
                  </Badge>{" "}
                </Col>
              </Row>
              <Card.Body>
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
              <p>Per Library Alert</p>
              <Row className="basealign">
               <p>Alerts</p>
               <Col sm={1}>
                <DropdownButton id="dropdown-item-button" title="All Time" >
  <Dropdown.Item as="button">Action</Dropdown.Item>
 
</DropdownButton>
                </Col>
                <Button variant="secondary" className="btnstyle">Apply Preferences</Button>{' '}
                <Button variant="secondary"  className="ml-4 btnstyle">Ignore Selected</Button>{' '}
                
              </Row>
              <Card.Body>
                <Row className="tabhead">
                  <Col sm={2}>
                    <p>Library</p>
                  </Col>
                  <Col sm={2}>
                    <p>Type</p>
                  </Col>
                  <Col sm={1}>
                    <p>Description</p>
                  </Col>
                  <Col sm={1}>
                    <p>Library Type</p>
                  </Col>
                  <Col sm={1}>
                    <p>Creation Date</p>
                  </Col>
                  <Col sm={1}>
                    <p>Modified Date</p>
                  </Col>
                </Row>
                {
                alertData.perLibraryAlert.map((item, index) => {
                  return (
                <Row className="tabrow f-12" key={index}>
                  <Col sm={1}>
                      <Form.Check type="checkbox" style={{ float: "left" }} />
                      <Badge className="sevbadge"></Badge>{" "}
                  </Col>
                  <Col sm={1}>
                  <p>{item.libraryName}</p>
                  </Col>
                
                  <Col sm={2}>
                  <p>{item.vulnerabilityType}</p>
                  </Col>
                  <Col sm={1}>
                    <p>9.8</p>
                  </Col>
                  <Col sm={1}>
                  <p>{item.libraryType}</p>
                  </Col>
                  <Col sm={1}>
                  <p>{item.creationDate}</p>
                  </Col>
                  <Col sm={1}>
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
