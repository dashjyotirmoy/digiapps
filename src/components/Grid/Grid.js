import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

class Grid extends Component {
    render() {
        const gridVal = [5, 5, 2, 5, 5, 5, 2];
        const updated = {}
        return (
            <Container fluid>
                <Row className="p-0 w-100 m-0">
                    <Col xl={5} className="border border-dark" style={{ height: "200px" }}></Col>
                    <Col xl={5} className="border border-dark" style={{ height: "200px" }}></Col>
                    <Col xl={5} className="border border-dark" style={{ height: "200px" }}></Col>
                    <Col xl={2} className="border border-dark" style={{ height: "200px" }}></Col>
                </Row>
            </Container>
        );
    }
}

export default Grid;