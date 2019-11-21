import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faCircle, faArrowUp, faArrowDown, faTh } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components';
import ItemMetric from './Metrics/ItemMetric';
import MainMetrics from './Metrics/MainMetrics';

const Styles = styled.div`
.data-header{
    height:100%;
    color:#fff;
}
`;
class SummaryView extends Component {
    state = {
        userName: "Executive",
        designation: "Business Lead",
        data1: [
            { name: "Total Products", value: "13" },
            { name: "Team Members", value: "222" },
            { name: "Total Hours", value: "1234" }
        ]
    }
    render() {

        return (
            <div className="h-10">
                <Styles style={{ "height": "100%" }}>
                    <Container fluid className="data-header">
                        <main className="align-items-center d-flex h-100 w-100">
                            <Row className="h-75 m-0 p-0 row w-100">
                                <div className="h-100 d-none d-md-block d-lg-block d-xl-block">
                                    <Row className="d-flex p-0 m-0 w-100 h-100">
                                        <Col md={12} lg={12} xl={12} className="h-100 px-2 d-flex align-items-center justify-item-center">
                                            <FontAwesomeIcon className="font-size-smaller" icon={faArrowLeft} />
                                            <div className="w-100 px-1">
                                                <p className="font-size-smaller m-0 text-center text-black m-0">
                                                    {this.state.userName}
                                                </p>
                                                <p className="font-aggegate-sub-text m-0 text-center text-white-50 m-0">
                                                    <small>{this.state.designation}</small>
                                                </p>
                                            </div>
                                            <FontAwesomeIcon icon={faTh} />
                                        </Col>
                                    </Row>
                                </div>
                                <div className="h-100 px-xl-2 px-lg-2 grid-graph-comp rounded w-auto d-inline-block">
                                    <MainMetrics />
                                </div>
                                <div className="h-100 px-xl-2 px-lg-2 d-inline-block d-flex flex-grow-1 justify-content-space-around d-inline-block">
                                    <ItemMetric />
                                </div>
                            </Row>
                        </main>

                    </Container>
                </Styles>
            </div>
        );
    }
}

export default SummaryView;