import React, { useState } from "react";
import Select from 'react-select';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Container} from "react-bootstrap";
import ModalBackDrop from "../ModalBackDrop/ModalBackDrop";
import { Responsive, WidthProvider } from "react-grid-layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { TooltipHoc } from "../TooltiHOC/TooltipHoc";

import { qualityGraphInfo } from "../Translations/qualityGraphInfo";
import { velocityGraphInfo } from "../Translations/velocityGraphInfo";
import { buildGraphInfo } from "../Translations/buildGraphInfo";

//

const ResponsiveGridLayout = WidthProvider(Responsive);

const Grid = props => {
  const bgTheme = props.bgTheme;
  const chartData = props.chartData;
  const defaultFilter= props.defaultFilter;
  const defaultDrop= props.defaultDrop;
  const gridItem = props.layouts["lg"].map((ele, index) => {
    return (
      <div key={index} className={`${bgTheme ? 'card-border-dark bg-dark-theme' : 'card-border-light'}`}>
        <div
          className={`position-absolute text-right bg-transparent ${bgTheme ? 'text-white border-dark' : 'bg-light text-muted'}`}
          style={{ zIndex: "1",right:'11px',top:'15px'}}
        >
           {chartData[index].showDrop && <select style={{ fontSize: 'smaller',width: '6rem'}} onChange={(event)=>props.onSelectDrop(chartData[index].type,event.target.value)} className={`border mr-2 font-weight-bold ${bgTheme ? 'bg-prodAgg-btn text-white border-secondary': 'bg-prodAgg-light-btn border-primary'} rounded border`}>
                     {props.dropData.map(function (data, key) {
                       return (
                         <option style={{ fontSize: 'medium'}} className={`${bgTheme ?'text-white':'text-dark'}`} key={key} value={data.value} selected={defaultDrop===data.value}>{data.label}</option>)
                     })}
          </select>}
          {chartData[index].showFilter && <select  style={{ fontSize: 'smaller',width: '5rem'}} onChange={(event)=>props.onSelectFilter(chartData[index].type,event.target.value)} className={`border font-weight-bold ${bgTheme ? 'bg-prodAgg-btn text-white border-secondary': 'bg-prodAgg-light-btn border-primary'} rounded border`}>
                    {props.dropFilter.map(function (data, key) {
                      return (
                        <option style={{ fontSize: 'medium'}} className={`${bgTheme ?'text-white':'text-dark'}`} key={key} value={data.value} selected={defaultFilter===data.value}>{data.label}</option>)
                    })}
                  </select>}
          <p
            className="d-inline px-1"
            data-toggle="tooltip"
            data-placement="top"
          >
            <TooltipHoc
              bgTheme={bgTheme}
              info={
                velocityGraphInfo[chartData[index].name] ||
                qualityGraphInfo[chartData[index].name] ||
                buildGraphInfo[chartData[index].name]
              }
              chartName={chartData[index].name}
            >
              <span className="d-inline-block">
                <FontAwesomeIcon icon={faInfoCircle} />
              </span>
            </TooltipHoc>
          </p>
          <span
            className="show-cursor d-inline"
            onClick={() => props.removeDelegate(index)}
          >
            <span className="d-inline-block">
              <FontAwesomeIcon icon={faTimes} />
            </span>
          </span>
        </div>
        {chartData[index].component}
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
