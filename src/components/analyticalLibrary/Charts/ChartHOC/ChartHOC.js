import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { withSize } from 'react-sizeme';


const ChartHOC = (props) => {
  let optionsData = { ...props.options };
  let containerWidth = props.size.width;
  optionsData.chart = {
    height: props.height,
    width: containerWidth,
    backgroundColor: "",
    type: props.type
  };
  return <HighchartsReact highcharts={Highcharts} options={optionsData} />
}

export default withSize()(ChartHOC)
