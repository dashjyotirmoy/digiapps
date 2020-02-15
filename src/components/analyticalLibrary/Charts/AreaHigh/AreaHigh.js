import React from "react";
import ChartHOC from "../ChartHOC/ChartHOC";
import QualityGraph from "../../../../utility/GraphOptions/qualityWrapper";
const AreaHigh = props => {
  let options = {};
  let temp_options;
  temp_options = new QualityGraph(props, props.type);
  options = temp_options.options;
  return (
    <React.Fragment>
      <ChartHOC options={options} type={"area"} />
    </React.Fragment>
  );
};
export default AreaHigh;
