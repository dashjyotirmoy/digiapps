import React, { Component } from 'react';
import Highcharts from 'highcharts';
import ChartHOC from '../ChartHOC/ChartHOC';

class ColumnHigh extends Component {

    state = {
        //elementHeight: '',
        options: {
            chart: {
                type: 'column',
                height: 0,
                backgroundColor: ""
            },
            credits: {
                enabled: false
            },

            title: {
                text: "",
                align: 'left',
                style: {
                    color: '#f5f5f5',
                    fontWeight: 'bold'
                }
            },
            xAxis: {
                //max: 8,
                type: 'datetime',
                dateTimeLabelFormats: {
                    day: '%b %e'
                },
                minorTicks: false,
                lineWidth: 1,
                minorGridLineWidth: 0,
                // lineColor: 'transparent',
                minorTickLength: 0,
                tickLength: 0,
                style: {
                    color: '#f5f5f5'
                }

            },
            yAxis: {
                min: 0,
                gridLineColor: "transparent",
                title: {
                    text: 'y title',
                    style: {
                        color: '#f5f5f5'
                    }
                },
                lineColor: 'blue',
                stackLabels: {
                    enabled: true,
                }
            },
            legend: {
                enabled: false,
                align: 'right',
                verticalAlign: 'top',
                floating: true,
                backgroundColor:
                    Highcharts.defaultOptions.legend.backgroundColor || 'white',
                borderColor: '#CCC',
                borderWidth: 1,
                shadow: false
            },
            tooltip: {
                enabled: true,
                //headerFormat: '<b>{point.x}</b><br/>',
                pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
            },
            plotOptions: {
                column: {
                    stacking: 'normal',
                    dataLabels: {
                        enabled: true
                    }
                }
            },
            series: [
                {
                    "name": "A",
                    "data": [5, 3, 4, 7, 8],
                    "color": "#7d12ff", "borderWidth": 0,
                    pointStart: Date.UTC(2019, 10, 15),
                    pointInterval: 86400000,
                    pointWidth: 10
                },
                {
                    "name": "B",
                    "data": [2, 2, 3, 2, 6],
                    "color": "#ab20fd",
                    "borderWidth": 0,
                    pointStart: Date.UTC(2019, 10, 15),
                    pointInterval: 86400000,
                    pointWidth: 10
                },
                {
                    "name": "C",
                    "data": [3, 4, 4, 2, 5],
                    "color": "#200589",
                    "borderWidth": 0,
                    pointStart: Date.UTC(2019, 10, 15),
                    pointInterval: 86400000,
                    pointWidth: 10
                }
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
        this.state.options.title.text = this.props.title;
        return (
            <ChartHOC options={this.state.options} />
        );
    }


}

export default ColumnHigh;

