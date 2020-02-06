import React, { Component } from "react";
import ChartHOC from "../ChartHOC/ChartHOC";
import Highcharts from "highcharts";
import HighchartsMore from "highcharts/highcharts-more";
import QualityGraph from "../../../../utility/GraphOptions/qualityWrapper";

HighchartsMore(Highcharts);
var temp_options;

const ControlChartHigh = props => {
  var temp_options;
  let options = {};
  temp_options = new QualityGraph(props, props.type, props.data);
  options = temp_options.options;
  return (
    <React.Fragment>
      <ChartHOC options={options} type={"column"} />
    </React.Fragment>
  );
};

export default ControlChartHigh;
