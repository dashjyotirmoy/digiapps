import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Responsive, WidthProvider } from "react-grid-layout";
import ColumnHigh from "../Charts/ColumnHigh/ColumnHigh";
const ResponsiveGridLayout = WidthProvider(Responsive);
class Grid extends Component {
  render() {
    const gridItem = this.props.layouts["lg"].map(ele => {
      return (
        <div className="border border-dark grid-graph-comp" key={ele.i}>
          <ColumnHigh />{" "}
        </div>
      );
    });
    //onDragStop={(updatedArray, oldEle, newEle, placeHolde) => this.onDropHanndler(updatedArray, oldEle, newEle, placeHolde)}
    return (
      <Container fluid>
        <ResponsiveGridLayout
          maxRows={2}
          className="layout"
          autoSize={false}
          layouts={this.props.layouts}
          compactType={"vertical"}
          breakpoints={this.props.breakpoint}
          cols={this.props.columnSize}
          preventCollision={false}
        >
          {gridItem}
        </ResponsiveGridLayout>
      </Container>
    );
  }
}

export default Grid;
