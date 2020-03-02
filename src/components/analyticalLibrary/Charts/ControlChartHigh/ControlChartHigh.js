import React from "react";
import ChartHOC from "../ChartHOC/ChartHOC";
import Highcharts from "highcharts";
import HighchartsMore from "highcharts/highcharts-more";
import VelocityGraph from "../../../../utility/GraphOptions/velocityWrapper";
import Dimensions from "react-dimensions";

HighchartsMore(Highcharts);

const ControlChartHigh = props => {
  var temp_options;
  let options = {};
  temp_options = new VelocityGraph(props, props.type, props.data);
  let containerHeight = props.containerHeight;
  options = temp_options.options;
  return (
    <React.Fragment>
      <ChartHOC options={options} height = {containerHeight}/>
    </React.Fragment>
  );
};
export default Dimensions()(ControlChartHigh);
