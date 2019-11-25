import React, { Component } from 'react';
import Highcharts from 'highcharts';
import ChartHOC from '../ChartHOC/ChartHOC';
var start, end;
var startDate, endDate;
var hours = [];
class LineHigh extends Component {

    state = {
        options: {
            chart: {
                type: 'line',
                height: this.props.containerHeight,
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
                minorTicks: false,
                labels: {
                    enabled: false
                },
                lineWidth: 0,
                minorGridLineWidth: 0,
                lineColor: 'transparent',

                minorTickLength: 0,
                tickLength: 0
            },
            yAxis: [{
                labels: {
                    enabled: false
                },
                title: {
                    text: ``,
                    rotation: 0
                },
            }, {
                title: {
                    text: '',
                    rotation: 0
                },
                gridLineWidth: 0,
                opposite: true
            }],
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
                    data: [],
                    marker: {
                        enabled: false
                    }
                }
            ]
        }
    };

    componentDidMount() {
        start = this.props.burndown.startDate;
        end = this.props.burndown.endDate;
        startDate = start;
        var dateParts = startDate.split("/");
        startDate = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
        endDate = end;
        dateParts = endDate.split("/");
        endDate = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
        var Difference_In_Time = endDate.getTime() - startDate.getTime();
        var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
        hours.push(parseInt(this.props.burndown.burndown.totalHours));
        hours = hours.concat(this.props.burndown.burndown.hoursSpent);
        this.setState(prevState => ({
            options: {
                ...prevState.options,
                yAxis: [{
                    labels: {
                        enabled: false
                    },
                    title: {
                        text: `Start date: ${start}`,
                        rotation: 0
                    },
                }, {
                    title: {
                        text: `End date: ${end}`,
                        rotation: 0
                    },
                    gridLineWidth: 0,
                    opposite: true
                }],
                xAxis: {
                    max: Difference_In_Days,
                    minorTicks: false,
                    labels: {
                        enabled: false
                    },
                    lineWidth: 0,
                    minorGridLineWidth: 0,
                    lineColor: 'transparent',

                    minorTickLength: 0,
                    tickLength: 0
                },
                series: [
                    {
                        data: hours,
                        marker: {
                            enabled: false
                        }
                    }
                ]
            }
        }))
    }

    render() {
        return (
            <ChartHOC options={this.state.options} />
        );
    }


}

export default LineHigh

