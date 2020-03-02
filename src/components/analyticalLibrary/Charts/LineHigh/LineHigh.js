import React from "react";
import ChartHOC from "../ChartHOC/ChartHOC";
import QualityGraph from "../../../../utility/GraphOptions/qualityWrapper";
import Dimensions from "react-dimensions";

const LineHigh = props => {
  let options = {};
  let temp_options;
  temp_options = new QualityGraph(props, props.type);
  let containerHeight = props.containerHeight;
  options = temp_options.options;
  return (
    <React.Fragment>
      <ChartHOC options={options} type={"area"} height = {containerHeight}/>
    </React.Fragment>
  );
};
export default Dimensions()(LineHigh);
