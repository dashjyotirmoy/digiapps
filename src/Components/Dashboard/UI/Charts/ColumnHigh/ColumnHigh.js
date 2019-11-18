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
                text: null
            },
            xAxis: {
                //max: 8,
                type: 'datetime',
                dateTimeLabelFormats: {
                    day: '%b %e'
                },
                minorTicks: false,
                /*labels: {
                    format: 'date: '
                },*/
                lineWidth: 0,
                minorGridLineWidth: 0,
                lineColor: 'transparent',
                minorTickLength: 0,
                tickLength: 0
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'temp title'
                },
                stackLabels: {
                    enabled: true,
                    /*style: {
                        fontWeight: 'bold',
                        color: ( // theme
                            Highcharts.defaultOptions.title.style &&
                            Highcharts.defaultOptions.title.style.color
                        ) || 'gray'
                    }*/
                }
            },
            legend: {
                enabled: false,
                align: 'right',
                //x: -30,
                verticalAlign: 'top',
                //y: 25,
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
                    "color": "#E5E7E9",
                    pointStart: Date.UTC(2019, 10, 15),
                    pointInterval: 86400000
                },
                {
                    "name": "B",
                    "data": [2, 2, 3, 2, 6],
                    "color": "#BDC3C7",
                    pointStart: Date.UTC(2019, 10, 15),
                    pointInterval: 86400000
                },
                {
                    "name": "C",
                    "data": [3, 4, 4, 2, 5],
                    "color": "#797D7F",
                    pointStart: Date.UTC(2019, 10, 15),
                    pointInterval: 86400000
                }
            ]
        }
    };


    render() {
        return (
            <ChartHOC options={this.state.options} />
        );
    }


}

export default ColumnHigh;

