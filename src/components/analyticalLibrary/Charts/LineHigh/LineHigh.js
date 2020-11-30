import React from "react";
import ChartHOC from "../ChartHOC/ChartHOC";
import QualityGraph from "../../../../utility/GraphOptions/qualityWrapper";
import Dimensions from "react-dimensions";

const LineHigh = React.forwardRef((props, ref) => {
  let options = {};
  let temp_options;
  temp_options = new QualityGraph(props, props.type);
  let containerHeight = props.containerHeight;
  options = temp_options.options;
  let bgTheme=props.bgTheme;
  return (
    <React.Fragment>
      <ChartHOC
        ref={ref}
        options={options}
        type={"area"}
        height={containerHeight}
        bgTheme={bgTheme}
      />
    </React.Fragment>
  );
});
export default Dimensions()(LineHigh);
