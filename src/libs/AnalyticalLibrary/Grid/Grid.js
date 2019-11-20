import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { GridLayout, Responsive, WidthProvider } from 'react-grid-layout';
import CircularProgress from '../../../libs/AnalyticalLibrary/CircularProgress/circularProgress';
import ColumnHigh from '../../../libs/AnalyticalLibrary/Charts/bar';
const ResponsiveGridLayout = WidthProvider(Responsive);
class Grid extends Component {
    render() {
        const gridVal = [5, 5, 2, 5, 5, 5, 2];
        const updated = {}
        var layout = {
            lg: [
                { i: '0', x: 0, y: 0, w: 5, h: 2 },
                { i: '1', x: 5, y: 0, w: 5, h: 2, minW: 4, maxW: 6 },
                { i: '2', x: 11, y: 0, w: 2, h: 2 },
                { i: '3', x: 0, y: 2, w: 5, h: 2 },
                { i: '4', x: 5, y: 2, w: 5, h: 2, minW: 4, maxW: 6 },
                { i: '5', x: 11, y: 2, w: 2, h: 2 }],
            md: [
                { i: '0', x: 0, y: 0, w: 5, h: 2 },
                { i: '1', x: 6, y: 0, w: 5, h: 2, minW: 4, maxW: 6 },
                { i: '2', x: 0, y: 2, w: 4, h: 2 },
                { i: '3', x: 4, y: 2, w: 6, h: 2 },
                { i: '4', x: 0, y: 4, w: 6, h: 2, minW: 4, maxW: 6 },
                { i: '5', x: 6, y: 4, w: 4, h: 2 }]
        }

        const onLayoutChangeHandler = (a, b) => {
            console.log(a, b);
        }
        const onDropHanndler = (a, b) => {
            console.log(a, b);
        }
        return (
            <Container fluid>
                <ResponsiveGridLayout className="layout" onDragStop={(ele) => onDropHanndler(ele)}
                    autoSize={true} layouts={layout}
                    onLayoutChange={(currentLayout, allLayouts) => onLayoutChangeHandler(currentLayout, allLayouts)}
                    compactType={"horizontal"} verticalCompact={true} breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
                    cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }} preventCollision={false}>
                    <div className="border border-dark" key="0">1 </div>
                    <div className="border border-dark" key="1">2</div>
                    <div className="border border-dark" key="2">3</div>
                    <div className="border border-dark" key="3">4 </div>
                    <div className="border border-dark" key="4">5</div>
                    <div className="border border-dark" key="5">6</div>
                </ResponsiveGridLayout>
                {/* <Row className="p-0 w-100 m-0">
                    <Col xl={5} className="border border-dark" style={{ height: "200px" }}></Col>
                    <Col xl={5} className="border border-dark" style={{ height: "200px" }}></Col>
                    <Col xl={5} className="border border-dark" style={{ height: "200px" }}></Col>
                    <Col xl={2} className="border border-dark" style={{ height: "200px" }}></Col>
                </Row> */}
            </Container>
        );
    }
}

export default Grid;