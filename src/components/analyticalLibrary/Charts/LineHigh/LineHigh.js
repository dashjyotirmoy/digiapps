import React from "react";
import ChartHOC from "../ChartHOC/ChartHOC";
import QualityGraph from "../../../../utility/GraphOptions/qualityWrapper";
import BuildReleaseGraph from "../../../../utility/GraphOptions/buildReleaseWrapper";
import Dimensions from "react-dimensions";

const LineHigh = React.forwardRef((props, ref) => {
  const activeLink = window.location.href.includes("/quality");
  let options = {};
  let temp_options;
  temp_options = activeLink === true ? new QualityGraph(props, props.type): new BuildReleaseGraph(props, props.type);
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
