//Component which is the container for all the graphs

import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { Responsive, WidthProvider } from "react-grid-layout";

const ResponsiveGridLayout = WidthProvider(Responsive);

class Grid extends Component {
  render() {
    const gridItem = this.props.layouts["lg"].map((ele, index) => {
      return (
        <div
          className="border border-dark grid-graph-comp border-radius-10"
          key={ele.i}
        >
          <div
            className="position-absolute px-2 text-right text-white w-100"
            style={{ zIndex: "100" }}
          >
            <p
              className="show-cursor d-inline"
              onClick={() => this.props.removeDelegate(index)}
            >
              x
            </p>
          </div>
          {this.props.chartData[ele.i].component}
        </div>
      );
    });
    return (
      <Container fluid className="">
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
