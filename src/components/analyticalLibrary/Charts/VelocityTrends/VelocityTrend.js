import React, { Component } from "react";
import ChartHOC from "../ChartHOC/ChartHOC";
import VelocityGraph from "../../../../utility/GraphOptions/velocityWrapper";

const VelocityTrend = props => {
  var temp_options;
  let options = {};
  temp_options = new VelocityGraph(props, props.type);
  options = temp_options.options;
  return (
    <React.Fragment>
      <ChartHOC options={options} type={"column"} />
    </React.Fragment>
  );
};

export default VelocityTrend;
