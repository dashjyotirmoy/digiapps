import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faCircle,
  faArrowUp,
  faArrowDown,
  faTh
} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const Styles = styled.div`
  .data-header {
    height: 100%;
    background-color: rgb(242, 242, 242);
  }
`;
class CompactDataBar extends Component {
  state = {
    userName: "Executive",
    designation: "Business Lead",
    data1: [
      { name: "Total Products", value: "13" },
      { name: "Team Members", value: "222" },
      { name: "Total Hours", value: "1234" }
    ]
  };

  getDimensions = () => {
    let components = {};
    this.props.data.map((val, index) => {
      components[val.name] = React.lazy(() => {
        return import(val.path);
      });
    });
    console.log(components);
    return components;
  };

  render() {
    //this.getDimensions();
    return (
      <div className="h-10">
        <Styles style={{ height: "100%" }}>
          <Container fluid className="data-header">
            <main className="align-items-center d-flex h-100 w-100">
              <Row className="h-75 m-0 p-0 row w-100">
                <section className="h-100 d-none d-md-block d-lg-block d-xl-block">
                  <Row className="d-flex p-0 m-0 w-100 h-100">
                    <Col
                      md={12}
                      lg={12}
                      xl={12}
                      className="h-100 px-2 d-flex align-items-center justify-item-center"
                    >
                      <FontAwesomeIcon
                        className="font-size-smaller"
                        icon={faArrowLeft}
                      />
                      <div className="w-100 px-1">
                        <p className="font-size-smaller m-0 text-center text-black m-0">
                          {this.state.userName}
                        </p>
                        <p className="font-aggegate-sub-text m-0 text-center text-black-50 m-0">
                          <small>{this.state.designation}</small>
                        </p>
                      </div>
                      <FontAwesomeIcon icon={faTh} />
                    </Col>
                  </Row>
                </section>
                <section className="h-100 px-xl-2 px-lg-2 bg-white rounded w-auto d-inline-block">
                  <div className="p-2 d-inline-block">
                    <p className="font-aggegate-main-text m-0 text-left text-black m-0">
                      13
                    </p>
                    <p className="font-aggegate-sub-text m-0 text-left text-black-50 m-0">
                      <small>Total Products</small>
                    </p>
                  </div>
                  <div className="p-2 d-inline-block">
                    <p className="font-aggegate-main-text m-0 text-left text-black m-0">
                      222
                    </p>
                    <p className="font-aggegate-sub-text m-0 text-left text-black-50 m-0">
                      <small>Team Members</small>
                    </p>
                  </div>
                  <div className="p-2 d-inline-block">
                    <p className="font-aggegate-main-text m-0 text-left text-black m-0">
                      1233
                    </p>
                    <p className="font-aggegate-sub-text m-0 text-left text-black-50 m-0">
                      <small>Total Hours</small>
                    </p>
                  </div>
                  <article className="px-xl-2 px-lg-2 bg-white rounded w-auto d-inline-block"></article>
                </section>
                <section className="h-100 px-xl-2 px-lg-2 d-inline-block d-flex flex-grow-1 justify-content-space-around d-inline-block">
                  <div className="bg-white d-inline-block rounded mx-1 w-auto py-2 px-lg-2 px-md-1 px-xl-4 max-w-18">
                    <p className="font-aggegate-main-text m-0 text-left text-black m-0">
                      <FontAwesomeIcon
                        className="font-size-small vertical-initial text-red"
                        icon={faArrowUp}
                      />
                      25D
                    </p>
                    <p className="font-aggegate-sub-text m-0 text-left text-black-50 m-0">
                      <small>Av Released Cycle</small>
                    </p>
                  </div>
                  <div className="bg-white d-inline-block rounded mx-1 w-auto py-2 px-lg-2 px-md-1 px-xl-4 max-w-18">
                    <p className="font-aggegate-main-text m-0 text-left text-black m-0">
                      <FontAwesomeIcon
                        className="font-size-small vertical-initial text-orange"
                        icon={faCircle}
                      />{" "}
                      35D
                    </p>
                    <p className="font-aggegate-sub-text m-0 text-left text-black-50 m-0">
                      <small>Av Deployment Lead Time</small>
                    </p>
                  </div>
                  <div className="bg-white d-inline-block rounded mx-1 w-auto py-2 px-lg-2 px-md-1 px-xl-4 max-w-18">
                    <p className="font-aggegate-main-text m-0 text-left text-black m-0">
                      <FontAwesomeIcon
                        className="font-size-small vertical-initial text-green"
                        icon={faArrowDown}
                      />
                      2D
                    </p>
                    <p className="font-aggegate-sub-text m-0 text-left text-black-50 m-0">
                      <small>Av MTTD</small>
                    </p>
                  </div>
                  <div className="bg-white d-inline-block rounded mx-1 w-auto py-2 px-lg-2 px-md-1 px-xl-4 max-w-18">
                    <p className="font-aggegate-main-text m-0 text-left text-black m-0">
                      <FontAwesomeIcon
                        className="font-size-small vertical-initial text-red"
                        icon={faArrowDown}
                      />
                      6D
                    </p>
                    <p className="font-aggegate-sub-text m-0 text-left text-black-50 m-0">
                      <small>Av MTTR</small>
                    </p>
                  </div>
                  <div className="bg-white d-inline-block rounded mx-1 w-auto py-2 px-lg-2 px-md-1 px-xl-4 max-w-18">
                    <p className="font-aggegate-main-text m-0 text-left text-black m-0">
                      <FontAwesomeIcon
                        className="font-size-small vertical-initial text-orange"
                        icon={faCircle}
                      />{" "}
                      8
                    </p>
                    <p className="font-aggegate-sub-text m-0 text-left text-black-50 m-0">
                      <small>Av Customer Rating</small>
                    </p>
                  </div>
                </section>
              </Row>
            </main>
          </Container>
        </Styles>
      </div>
    );
  }
}

export default CompactDataBar;
