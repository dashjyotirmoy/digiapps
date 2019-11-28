import React, { Component } from 'react';
import ChartHOC from '../ChartHOC/ChartHOC';
import Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import Graph from '../GraphOptions/graphWrapper';
HighchartsMore(Highcharts)
var temp_options;

class ControlChartHigh extends Component {

    state = {
        options: {},
        received: 0
    }

    componentDidMount() {
        temp_options = new Graph(this.props, this.props.type, this.props.data)
        this.setState({
            options: temp_options.options,
            received: 1
        })
    }

    componentWillReceiveProps(nextprops) {
        if (this.props.title !== nextprops.title) {
            const updatedOptions = Object.assign({}, this.state.options);
            updatedOptions.title.text = nextprops.title;
            console.log(updatedOptions)
            this.setState({
                ...this.state,
                options: updatedOptions
            })
        }
    }
    render() {
        return (
            <React.Fragment>
                {this.state.received ? <ChartHOC options={this.state.options} /> : null}
            </React.Fragment>
        )
    }
}


export default ControlChartHigh
