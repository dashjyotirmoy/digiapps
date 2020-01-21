import React from "react";
import InsightsData from "../../../../utility/constants/insightsData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquare } from "@fortawesome/free-solid-svg-icons";
import { Container, Col, Row, Card, Media } from "react-bootstrap";
const Insights = props => {
  return (
    <Container fluid className="mt-3 Insights">
      <Row className="m-0 p-0">
        {InsightsData.map((card, index) => {
          return (
            <Col
              key={`card-${index}`}
              sm={12}
              md={3}
              lg={3}
              xl={3}
              className="bg-card"
            >
              <Card className="card-border h-100 rounded-50">
                <Card.Body>
                  <p className="main-card-header">{card.title} </p>
                  {card.list.map((item, index) => {
                    return (
                      <div key={`listItem-${index}`}>
                        <p className="sub-card-header">{item.head}</p>
                        {item.subItem.map((desc, index) => {
                          return (
                            <Media key={`desc-${index}`}>
                              <FontAwesomeIcon
                                icon={faSquare}
                                className="mt-1 bg-fSquare"
                                aria-hidden="true"
                              ></FontAwesomeIcon>
                              <Media.Body className="pl-2">
                                <p className="sub-card-text">{desc}</p>
                              </Media.Body>
                            </Media>
                          );
                        })}
                      </div>
                    );
                  })}
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};
export default Insights;
