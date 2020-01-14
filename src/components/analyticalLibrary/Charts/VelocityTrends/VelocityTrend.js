import React, { Component } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import ChartHOC from "../ChartHOC/ChartHOC";
import Graph from "../../../../utility/GraphOptions/graphWrapper";

var temp_options;
class VelocityTrend extends Component {
  state = {
    options: {},
    received: 0
  };

  generateOptions() {
    this.setState({
      options: temp_options.generateOption()
    });
  }

  componentDidMount() {
    setTimeout(() => {
      temp_options = new Graph(this.props, this.props.type);
      this.setState({
        options: temp_options.options,
        received: 1
      });
    }, 1000);
  }

  render() {
    return (
      <React.Fragment>
        <ChartHOC options={this.state.options} type={"column"} />
      </React.Fragment>
    );
  }
}

export default VelocityTrend;
