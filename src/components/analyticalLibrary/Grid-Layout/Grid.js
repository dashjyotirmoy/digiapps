import React, { Component } from "react";
import { Container, Button, ButtonToolbar } from "react-bootstrap";
import ModalBackDrop from "../ModalBackDrop/ModalBackDrop";
import { Responsive, WidthProvider } from "react-grid-layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { TooltipHoc } from "../TooltiHOC/TooltipHoc";

import { qualityGraphInfo } from "../Translations/qualityGraphInfo";
import { velocityGraphInfo } from "../Translations/velocityGraphInfo";
// import { VelocityModalContent } from '../ModalFunc/VelocityModalContent';

//

const ResponsiveGridLayout = WidthProvider(Responsive);

const Grid = props => {
  const bgTheme = props.bgTheme;
  const gridItem = props.layouts["lg"].map((ele, index) => {
    return (
      <div key={ele.i} className={`${bgTheme ? 'card-border-dark' : 'card-border-light'}`}>
        <div
          className={`position-absolute text-right bg-transparent ${bgTheme ? 'text-white border-dark' : 'bg-light text-muted'}`}
          style={{ zIndex: "100",right:'11px',top:'15px'}}
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
              chartName={props.chartData[ele.i].name}
            >
              <span className="d-inline-block">
                <FontAwesomeIcon icon={faInfoCircle} />
              </span>
            </TooltipHoc>
          </p>
          {/* <p className="d-inline px-1">
            <span className="d-inline-block" onClick={() => setModalShow(true)}>
              <FontAwesomeIcon icon={faInfoCircle} />
            </span>

            <CenteredModal
              chartName={props.chartData[ele.i].name}
              show={modalShow}
              onHide={() => setModalShow(false)}
            />
          </p> */}

          <span
            className="show-cursor d-inline"
            onClick={() => props.removeDelegate(index)}
          >
            <span className="d-inline-block">
              <FontAwesomeIcon icon={faTimes} />
            </span>
          </span>
        </div>
        {props.chartData[ele.i].component}
      </div>
    );
  });

  return (
    <Container fluid className="">
      <ResponsiveGridLayout
        // maxRows={2}
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
