import React from "react";
import ChartHOc from "../../Charts/ChartHOC/ChartHOC";
import VelocityGraph from "../../../../utility/GraphOptions/velocityWrapper";
import Dimensions from "react-dimensions";

const SprintBurndown = React.forwardRef((props, ref) => {
  var temp_options;
  let options = {};
  temp_options = new VelocityGraph(props, props.type);
  let containerHeight = props.containerHeight;
  options = temp_options.options;
  return (
    <React.Fragment>
      <ChartHOc ref={ref} options={options} height={containerHeight} />
    </React.Fragment>
  );
});
export default Dimensions()(SprintBurndown);
