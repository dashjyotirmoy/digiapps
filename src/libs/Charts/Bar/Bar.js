import React, { Component } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const options = {
    chart: {
        type: 'column'
    },
    credits: {
        enabled: false
    },

    title: {
        text: 'Throughput',
        align: 'left'
    },
    xAxis: {
        max: 8,
        minorTicks: false,
        //labels: {
        //    enabled: false
        //},
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
            style: {
                fontWeight: 'bold',
                color: ( // theme
                    Highcharts.defaultOptions.title.style &&
                    Highcharts.defaultOptions.title.style.color
                ) || 'gray'
            }
        }
    },
    legend: {
        align: 'right',
        x: -30,
        verticalAlign: 'top',
        y: 25,
        floating: true,
        backgroundColor:
            Highcharts.defaultOptions.legend.backgroundColor || 'white',
        borderColor: '#CCC',
        borderWidth: 1,
        shadow: false
    },
    tooltip: {
        headerFormat: '<b>{point.x}</b><br/>',
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
    series: [{
        name: 'A',
        data: [5, 3, 4, 7, 2],
        color: '#E5E7E9'
    }, {
        name: 'B',
        data: [2, 2, 3, 2, 1],
        color: '#BDC3C7'
    }, {
        name: 'C',
        data: [3, 4, 4, 2, 5],
        color: '#797D7F'
    }]
};

class ColumnHigh extends Component {

    render() {
        return (
            <HighchartsReact highchart={Highcharts} options={options} />
        )
    }

}

export default ColumnHigh;

