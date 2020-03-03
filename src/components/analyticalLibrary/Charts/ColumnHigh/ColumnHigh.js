import React from "react";
import ChartHOC from "../ChartHOC/ChartHOC";
import QualityGraph from "../../../../utility/GraphOptions/qualityWrapper";
import Dimensions from "react-dimensions";

const ColumnHigh = React.forwardRef((props, ref) => {
  var temp_options;
  let options = {};
  temp_options = new QualityGraph(props, props.type, props.data);
  options = temp_options.options;
  let containerHeight = props.containerHeight;
  return (
    <React.Fragment>
      <ChartHOC
        ref={ref}
        options={options}
        type={"column"}
        height={containerHeight}
      />
    </React.Fragment>
  );
});

export default Dimensions()(ColumnHigh);
