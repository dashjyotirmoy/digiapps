import React, { Component } from "react";
import ChartHOC from "../ChartHOC/ChartHOC";
import Graph from "../../../../utility/GraphOptions/graphWrapper";

var temp_options;
class ColumnHigh extends Component {
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
        {this.state.received ? (
          <ChartHOC options={this.state.options} type={"column"} />
        ) : null}
      </React.Fragment>
    );
  }
}
export default ColumnHigh;