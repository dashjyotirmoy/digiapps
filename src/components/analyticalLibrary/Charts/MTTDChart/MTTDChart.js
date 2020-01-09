import React from 'react';
import ChartHOC from '../ChartHOC/ChartHOC';



const MTTDChart = (props) => {
    const options = {
        chart: {
            height: 0,
            backgroundColor: ""
        },
        legend: {
            enabled: false
        },

        series: [
            {
                type: 'spline',
                showInLegend: "false",
                data: [1, 5, 2, 6, 3, 7, 4, 8, 5, 9, 6, 10, 7, 11, 8, 12, 9, 13, 10, 14, 11, 15, 12, 16, 13, 17, 14, 18, 15, 19, 16, 20],
                data: [2, 4, 26, 7, 9, 30, 24, 12, 3, 45, 1, 5, 7, 9, 3, 9, 10, 7, 18, 15, 19, 16, 20],
                color: 'green',
                text: null
            },
            {
                type: 'spline',
                // name: 'data2',
                data: [5, 1, 6, 2, 7, 3, 8, 4, 9, 5, 10, 6, 11, 7, 12, 8, 13, 9, 14, 10, 15, 11, 16, 12, 17, 13, 18, 14, 19, 15, 20, 16],
                data: [4, 2, 1, 5, 10, 6, 7, 13, 32, 5, 4, 87, 45, 56, 23, 4, 10, 7, 14, 19, 15, 20, 16],
                "color": "#ab20fd",
            }
        ],

        xAxis: {
            minorTicks: false,
            tickLength: 0,
            minorTickLength: 0,
            minorGridLength: 0,
            tickInterval: 1,
            gridLineColor: "transparent",
            lablels: {
                enabled: false
            },
            lineColor: 'transparent',
            plotLines:
                [{
                    value: 0,
                    width: 0
                }]
        },

        yAxis: {
            title: 'null',
            tickInterval: 1,
            minorTicks: false,
            tickLength: 0,
            lablels: false,
            plotLines:
                [{
                    value: 0,
                    width: 0
                }],
            gridLineColor: "transparent"
        },
        credits: {
            enabled: false
        },
        title: {
            text: props.title,
            align: 'left',
            style: {
                color: '#f5f5f5',
                fontWeight: 'bold'
            }
        },
    };
    return (
        <div className="h-100 w-100">
            <ChartHOC options={options} />
        </div>)
}

export default MTTDChart;