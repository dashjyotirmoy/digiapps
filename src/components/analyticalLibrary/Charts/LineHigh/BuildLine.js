import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";



const BuildLine = (props) => {

    console.log(props);


    var options = {}
    options = {
        title: {
            text: ''
        },
        credits: {
            enabled: false
        },
        chart: {
            backgroundColor: '#232D3B',
            type: 'line',
            height: '300px'
        },
        yAxis: {
            lineWidth: 0,
            min: 5,
            max: 25,
            gridLineColor: "#313B49",
            lineColor: "green",
            tickLength: 5,
            title: {
                text: '',
            },
            labels: {
                style: {
                    color: "#f5f5f5"
                },
            }
        },
        xAxis: {
            lineWidth: 0,
            title: {
                text: 'Builds',
                margin: 20,
                style: {
                    color: "#f5f5f5"
                }
            },
            accessibility: {
                rangeDescription: 'Range: 3 to 9'
            }, labels: {
                style: {
                    color: "#f5f5f5"
                }
            }
        },
        legend: {
            layout: 'horizontal',
            align: 'right',
            verticalAlign: 'top',
            itemStyle: {
                color: "#ffffff",
                fontWeight: "normal"
            },
            itemHoverStyle: {
                color: "#fff"
            },
        },
        plotOptions: {
            series: [{
                label: {
                    connectorAllowed: false
                },
                line: {
                    dashStyles: 'Solid'
                },
                pointStart: 3,
            }]
        },
        series: [{
            name: 'Passed',
            data: [25, 25, 0, 0, 0, 22, 25],
            color: "#4E8B15",
            borderWidth: 0,
            dashStyle: "Solid"
        }, {
            name: 'Failed',
            data: [5, 9, 20, 12, 8, 0, 5],
            color: "#B64A4E",
            borderWidth: 0,
            dashStyle: "Solid"
        }, {
            name: 'Skipped',
            // data: [10,20,15,12,10,17,5],
            color: "#BBCA0E",
            borderWidth: 0,
            dashStyle: "Solid"
        }, {
            name: 'Total Tests',
            // data: [2,4,10,14,17,23,15],
            color: "#3D60CD",
            borderWidth: 0,
            dashStyle: "Solid"
        }],
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        }
    };


    return (
        <HighchartsReact highcharts={Highcharts} options={options}></HighchartsReact>
    )
}

export default BuildLine;

