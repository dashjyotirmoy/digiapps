import React from "react";
import { Component } from "react";
import ChartHOc from "../../Charts/ChartHOC/ChartHOC";
import Graph from "../../../../utility/GraphOptions/graphWrapper";

var temp_options;
class SprintBurndown extends Component {
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
        <ChartHOc options={this.state.options} />
      </React.Fragment>
    );
  }
}

export default SprintBurndown;
