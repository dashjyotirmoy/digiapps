import React, { Component } from "react";
import ChartHOC from "../ChartHOC/ChartHOC";
import VelocityGraph from "../../../../utility/GraphOptions/velocityWrapper";
import Dimensions from "react-dimensions";

const ProjectBurndownHigh = props => {
  var temp_options;
  let options = {};
  temp_options = new VelocityGraph(props, props.type);
  let containerHeight = props.containerHeight;
  options = temp_options.options;
  return (
    <React.Fragment>
      <ChartHOC options={options} height = {containerHeight}/>
    </React.Fragment>
  );
};
export default Dimensions()(ProjectBurndownHigh);
