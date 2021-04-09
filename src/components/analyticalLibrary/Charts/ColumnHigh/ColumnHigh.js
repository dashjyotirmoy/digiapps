import React from "react";
import ChartHOC from "../ChartHOC/ChartHOC";
import QualityGraph from "../../../../utility/GraphOptions/qualityWrapper";
import BuildReleaseGraph from "../../../../utility/GraphOptions/buildReleaseWrapper";
import Dimensions from "react-dimensions";

const ColumnHigh = React.forwardRef((props, ref) => {
  const activeLink = window.location.href.includes("/quality");
  var temp_options;
  let options = {};
  temp_options = activeLink === true ? new QualityGraph(props, props.type, props.data): new BuildReleaseGraph(props, props.type);
  options = temp_options.options;
  let containerHeight = props.containerHeight;
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

export default Dimensions()(ColumnHigh);
