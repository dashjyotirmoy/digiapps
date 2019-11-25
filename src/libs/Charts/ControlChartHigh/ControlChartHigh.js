import React, { Component } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import ChartHOC from '../ChartHOC/ChartHOC';

class ControlChartHigh extends Component {

    state = {
        options: {
            chart: {
                //type: 'column',
                //height: this.props.containerHeight
                backgroundColor: ""
            },
            credits: {
                enabled: false
            },

            title: {
                text: this.props.title,
                align: 'left',
                style: {
                    color: '#f5f5f5',
                    fontWeight: 'bold'
                }
            },
            xAxis: {
                /*type: 'datetime',
                dateTimeLabelFormats: {
                    day: '%b %e'
                },
                minorTicks: false,
                lineWidth: 0,
                minorGridLineWidth: 0,
                lineColor: 'transparent',
                minorTickLength: 0,
                tickLength: 0*/
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'temp title'
                },
                plotLines: [{
                    value: 15,
                    color: 'green',
                    width: 2
                }]
            },
            legend: {
                enabled: false,
                align: 'right',
                verticalAlign: 'top',
                floating: true,
                // backgroundColor:
                //     Highcharts.defaultOptions.legend.backgroundColor || 'white',
                borderColor: '#CCC',
                borderWidth: 1,
                shadow: false
            },
            tooltip: {
                enabled: true,
                pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
            },
            series: [
                {
                    type: 'scatter',
                    color: 'grey',
                    data: [
                        [9, 21], [9, 16], [10, 9], [10, 13], [10, 15],
                        [11, 8], [11, 10], [11, 19], [12, 9], [12, 13], [12, 17], [12, 19],
                        [13, 3], [13, 7], [13, 14], [13, 15], [14, 4], [14, 6],
                        [15, 10], [16, 14], [17, 8], [17, 17], [18, 12], [18, 17], [18, 20],
                        [19, 10], [19, 18], [19, 26], [20, 12], [20, 15], [20, 18], [20, 22],
                        [21, 20], [21, 26], [22, 6], [22, 12], [22, 23], [23, 11]
                    ]
                },
                {
                    type: 'scatter',
                    color: '#A9CCE3',
                    data: [
                        [9, 13], [10, 17], [11, 16], [13, 5], [15, 13], [15, 17], [17, 13], [17, 22],
                        [18, 8], [19, 20], [20, 24], [22, 8], [22, 20], [23, 15]
                    ]
                },
                {
                    name: 'T1',
                    data: [[9, 13], [10, 13], [11, 13], [12, 13.5], [13, 10], [14, 12], [15, 15], [16, 15.75],
                    [17, 16.25], [18, 16.75], [19, 17], [20, 18], [21, 19], [22, 12], [23, 12]],
                    zIndex: 1,
                    marker: {
                        enabled: false
                    }
                },
            ]
        }
    };

    componentWillReceiveProps(nextprops) {
        debugger;
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
            <ChartHOC options={this.state.options} />
        );
    }
}

export default ControlChartHigh;

