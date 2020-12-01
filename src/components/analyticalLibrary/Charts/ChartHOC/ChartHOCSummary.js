import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { withSize } from 'react-sizeme';


const ChartHOCSummary = (props) => {
  let optionsData = { ...props.options };
  let containerHeight = props.options.chart.height;
  let borderColor = props.options.chart.borderColor;
  let backgroundColor = props.options.chart.backgroundColor;
  optionsData.chart = {
    backgroundColor: backgroundColor,
    borderColor: borderColor,
    borderWidth: 1,
    borderRadius: 5,
    height: containerHeight,
    //width: containerWidth,
    type: props.options.chart.type
  };
  return <HighchartsReact highcharts={Highcharts} options={optionsData} />
}

export default withSize()(ChartHOCSummary)
