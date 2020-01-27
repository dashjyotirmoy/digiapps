import React, { Component } from "react";
import ChartHOC from "../ChartHOC/ChartHOC";
import QualityGraph from "../../../../utility/GraphOptions/qualityWrapper";

var temp_options;
class BarHigh extends Component {
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
    temp_options = new QualityGraph(this.props, this.props.type);
    this.setState({
      options: temp_options.options,
      received: 1
    });
  }

  render() {
    return (
      <React.Fragment>
        {this.state.received ? (
          <ChartHOC options={this.state.options} type={"bar"} />
        ) : null}
      </React.Fragment>
    );
  }
}
export default BarHigh;
