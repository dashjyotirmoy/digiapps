import React from "react";
import ChartHOC from "../ChartHOC/ChartHOC";
import VelocityGraph from "../../../../utility/GraphOptions/velocityWrapper";
import BuildReleaseGraph from "../../../../utility/GraphOptions/buildReleaseWrapper";
import Dimensions from "react-dimensions";

const VelocityTrend = React.forwardRef((props, ref) => {debugger
  const activeLink = window.location.href.includes("/velocity");
  var temp_options;
  let options = {};
  temp_options = activeLink === true ? new VelocityGraph(props, props.type): new BuildReleaseGraph(props, props.type);
  let containerHeight = props.containerHeight;
  options = temp_options.options;
  let bgTheme=props.bgTheme;
  return (
    <React.Fragment>
      <ChartHOC
        ref={ref}
        options={options}
        type={"column"}
        height={containerHeight}
        bgTheme={bgTheme}
      />
    </React.Fragment>
  );
});

export default Dimensions()(VelocityTrend);
