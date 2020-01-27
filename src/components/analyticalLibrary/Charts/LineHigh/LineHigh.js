import React, { Component } from "react";
import ChartHOC from "../ChartHOC/ChartHOC";
import QualityGraph from "../../../../utility/GraphOptions/qualityWrapper";

class LineHigh extends Component {
  state = {
    options: {},
    received: 0
  };

  componentDidMount() {
    let temp_options = new QualityGraph(this.props, this.props.type);
    this.setState({
      options: temp_options.options,
      received: 1
    });
  }

  componentWillReceiveProps(nextProps) {
    debugger;
    if (true) {
      this.setState({
        received: 0
      });
      let temp_options = new QualityGraph(nextProps, nextProps.type);
      this.setState({
        options: temp_options.options,
        received: 1
      });
    }
  }
  render() {
    return (
      <React.Fragment>
        {this.state.received ? (
          <ChartHOC options={this.state.options} type={"area"} />
        ) : null}
      </React.Fragment>
    );
  }
}
export default LineHigh;
