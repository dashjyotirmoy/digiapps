import React, { Component } from "react";
import ChartHOC from "../ChartHOC/ChartHOC";
import Graph from "../../../../Utility/GraphOptions/graphWrapper";
var temp_options;

class ColumnHigh extends Component {
  state = {
    options: {},
    received: 0
  };

  componentWillReceiveProps(nextprops) {
    if (this.props.title !== nextprops.title) {
      const updatedOptions = Object.assign({}, this.state.options);
      updatedOptions.title.text = nextprops.title;
      this.setState({
        ...this.state,
        options: updatedOptions
      });
    }
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

export default ColumnHigh;
