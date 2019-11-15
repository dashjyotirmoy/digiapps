import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Responsive, WidthProvider } from 'react-grid-layout';
const ResponsiveGridLayout = WidthProvider(Responsive);
class Grid extends Component {
    state = {
        layout: {
            lg: [
                { i: '0', x: 0, y: 0, w: 4, h: 2, isDraggable: true },
                { i: '1', x: 4, y: 0, w: 4, h: 2, minW: 4, maxW: 6 },
                { i: '2', x: 8, y: 0, w: 2, h: 2 },
                { i: '3', x: 0, y: 2, w: 4, h: 2 },
                { i: '4', x: 4, y: 2, w: 4, h: 2, minW: 4, maxW: 6 },
                { i: '5', x: 8, y: 2, w: 2, h: 2 }],
            md: [
                { i: '0', x: 0, y: 0, w: 5, h: 2 },
                { i: '1', x: 6, y: 0, w: 5, h: 2, minW: 4, maxW: 6 },
                { i: '2', x: 0, y: 2, w: 4, h: 2 },
                { i: '3', x: 4, y: 2, w: 6, h: 2 },
                { i: '4', x: 0, y: 4, w: 6, h: 2, minW: 4, maxW: 6 },
                { i: '5', x: 6, y: 4, w: 4, h: 2 }]
        },
        graphCount: 6,
        currentBreakpoint: "lg",
        currentColCount: 0,
        gridCol: { lg: 10, md: 10, sm: 6, xs: 4, xxs: 2 },
        gridBreakpoints: { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }

    }
    onLayoutChangeHandler = (a, b) => {
        console.log(a, b);
    }
    onDropHanndler = (updatedArray, oldEle, newEle, placeHolde) => {
        const listCopy = [...this.state.layout[this.state.currentBreakpoint]];
        const layout = listCopy.map(ele => Object.assign({}, ele));
        this.updateRowItems(newEle.y, newEle.x, newEle.i, layout)
    }

    updateRowItems = (row, col, pos, layout) => {
        const availableRows = this.getRowCount();
        const rowData = {};
        layout.map(ele => {
            if (rowData[ele.y] === undefined) {
                rowData[ele.y] = [];
                rowData[ele.y].push(ele)
            } else {
                rowData[ele.y].push(ele)
            }
        })
        const activeRow = rowData[row].sort(function (a, b) {
            return a.x - b.x;
        });
        let sum = 0;
        let start = 0;
        let lastW = 0;
        activeRow.map((ele, index) => {
            if (index == 0 && ele.x === start) {
                sum += ele.w;
                lastW = sum;
                return ele;
            }
            if (sum <= this.state.gridCol[this.state.currentBreakpoint]) {
                if (ele.w === 4) {
                    ele.x = sum;
                    sum += ele.w;
                    lastW = sum;
                    return ele;
                }
                if (ele.w === 2) {
                    ele.x = sum;
                    sum += ele.w;
                    lastW = sum;
                    return ele;
                }
            }
        })
    }

    getRowCount = () => {
        return 20 / this.state.gridCol[this.state.currentBreakpoint];
    }

    setBreakPoints = (newBreakpoint, newCols) => {
        this.setState({
            currentBreakpoint: newBreakpoint,
            currentColCount: newCols
        })
    }

    render() {
        const gridItem = this.props.layouts[this.state.currentBreakpoint].map(ele => {
            return (<div className="border border-dark grid-graph-comp" key={ele.i}>{ele.i} </div>)
        })
        //onDragStop={(updatedArray, oldEle, newEle, placeHolde) => this.onDropHanndler(updatedArray, oldEle, newEle, placeHolde)}
        return (
            <Container fluid>
                <ResponsiveGridLayout maxRows={2} className="layout"
                    autoSize={false} layouts={this.props.layouts}
                    onLayoutChange={(currentLayout, allLayouts) => this.onLayoutChangeHandler(currentLayout, allLayouts)}
                    compactType={"vertical"} breakpoints={this.props.breakpoint}
                    cols={this.props.columnSize} preventCollision={false} onBreakpointChange={(newBreakpoint, newCols) => this.setBreakPoints(newBreakpoint, newCols)}>
                    {gridItem}
                </ResponsiveGridLayout>
            </Container>
        );
    }
}

export default Grid;