import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { Responsive, WidthProvider } from "react-grid-layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { TooltipHoc } from "../TooltiHOC/TooltipHoc";
import { qualityGraphInfo } from "../Translations/qualityGraphInfo";
import { velocityGraphInfo } from "../Translations/velocityGraphInfo";
const ResponsiveGridLayout = WidthProvider(Responsive);

const Grid = props => {
  const gridItem = props.layouts["lg"].map((ele, index) => {
    return (
      <div className="border border-dark grid-graph-comp" key={ele.i}>
        <div
          className="position-absolute px-2 text-right text-white w-100"
          style={{ zIndex: "100" }}
        >
          <p
            className="d-inline px-1"
            data-toggle="tooltip"
            data-placement="top"
          >
            <TooltipHoc
              info={
                velocityGraphInfo[props.chartData[ele.i].name] ||
                qualityGraphInfo[props.chartData[ele.i].name]
              }
            >
              <span className="d-inline-block">
                <FontAwesomeIcon icon={faInfoCircle} />
              </span>
            </TooltipHoc>
          </p>
          <p
            className="show-cursor d-inline"
            onClick={() => props.removeDelegate(index)}
          >
            <TooltipHoc info="Remove">
              <span className="d-inline-block">X</span>
            </TooltipHoc>
          </p>
        </div>
        {props.chartData[ele.i].component}
      </div>
    );
  });

  return (
    <Container fluid className="">
      <ResponsiveGridLayout
        maxRows={2}
        className="layout"
        autoSize={false}
        layouts={props.layouts}
        compactType={"vertical"}
        breakpoints={props.breakpoint}
        cols={props.columnSize}
        preventCollision={false}
      >
        {gridItem}
      </ResponsiveGridLayout>
    </Container>
  );
};

export default Grid;
