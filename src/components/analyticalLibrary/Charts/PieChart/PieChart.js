import React from "react";
import ChartHOC from "../ChartHOC/ChartHOC";
import BuildReleaseGraph from "../../../../utility/GraphOptions/buildReleaseWrapper";
import Dimensions from "react-dimensions";

const PieChart = React.forwardRef((props, ref) => {
  let options = {};
  let temp_options;
  temp_options = new BuildReleaseGraph(props, props.type);
  let containerHeight = props.containerHeight;
  options = temp_options.options;
  let bgTheme=props.bgTheme;
  return (
    <React.Fragment>
      <ChartHOC
        ref={ref}
        options={options}
        type={"pie"}
        height={containerHeight}
        bgTheme={bgTheme}
      />
    </React.Fragment>
  );
});
export default Dimensions()(PieChart);