import React, { Component } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Dimensions from 'react-dimensions';

class ChartHOC extends Component {
    render() {
        let containerHeight = this.props.containerHeight;
        this.props.options.chart.height = containerHeight;
        return (
            <HighchartsReact highcharts={Highcharts} options={this.props.options} />
        )
    }
}

export default Dimensions()(ChartHOC);