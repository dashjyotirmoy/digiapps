import React, { Component } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import Dimensions from "react-dimensions";
import Proptype from "prop-types";

class ChartHOC extends Component {
  render() {
    let optionsData = { ...this.props.options };
    let containerHeight = this.props.containerHeight;
    optionsData.chart = {
      height: containerHeight,
      backgroundColor: "",
      type: this.props.type
    };
    return <HighchartsReact highcharts={Highcharts} options={optionsData} />;
  }
}

export default Dimensions()(ChartHOC);
