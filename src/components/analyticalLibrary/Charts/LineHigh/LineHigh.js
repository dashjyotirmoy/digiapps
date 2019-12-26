import React, { Component } from "react";
import ChartHOC from "../ChartHOC/ChartHOC";
import Graph from "../../../../utility/GraphOptions/graphWrapper";
var temp_options;
class LineHigh extends Component {
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
    temp_options = new Graph(this.props, this.props.type);
    this.setState({
      options: temp_options.options,
      received: 1
    });
  }

  render() {
    return (
      <React.Fragment>
        {this.state.received ? <ChartHOC options={this.state.options} /> : null}
      </React.Fragment>
    );
  }
}
export default LineHigh;
