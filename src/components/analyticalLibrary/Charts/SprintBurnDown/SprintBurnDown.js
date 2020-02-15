import React from "react";
import { Component } from "react";
import ChartHOc from "../../Charts/ChartHOC/ChartHOC";
import VelocityGraph from "../../../../utility/GraphOptions/velocityWrapper";

const SprintBurndown = props => {
  var temp_options;
  let options = {};
  temp_options = new VelocityGraph(props, props.type);
  options = temp_options.options;
  return (
    <React.Fragment>
      <ChartHOc options={options} />
    </React.Fragment>
  );
};
export default SprintBurndown;
