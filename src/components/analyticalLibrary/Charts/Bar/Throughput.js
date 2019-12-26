import React, { Component } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import ChartHOC from '../ChartHOC/ChartHOC';


class Throughput extends Component {

  state = {
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
        text: "Throughput",
        align: 'left',
        style: {
          color: '#f5f5f5',
          fontWeight: 'bold'
        }
      },
      xAxis: {
        type: 'datetime',
        dateTimeLabelFormats: {
          day: '%b %e'
        },
        lineWidth: 0,
        tickLength: 1,
        labels: {
          style: {
            color: "#f5f5f5"
          }
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
        labels: {
          style: {
            color: "#f5f5f5"
          }
        },
        lineColor: 'blue',
        stackLabels: {
          enabled: true,
        }
      },
      legend: {
        enabled: true,
        backgroundColor: 'transparent',
        itemStyle: {
          color: '#ffffff',
          fontWeight: 'normal'
        },
        itemHoverStyle: {
          color: '#d3d3d3'
        }
      },
      tooltip: {
        headerFormat: '<b>{point.x}</b><br/>',
        pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
      },
      plotOptions: {
        series: {
          borderRadius: 6
        },
        column: {
        }
      },
      series: [
        {
          "name": "A",
          "data": [5, 3, 4, 7, 8, 5],
          "color": "#B09FF9",
          "borderWidth": 0,
          pointStart: Date.UTC(2019, 10, 15),
          pointInterval: 86400000,
          pointWidth: 10,
          pointPadding: 0
        },
        {
          "name": "B",
          "data": [2, 2, 3, 2, 6, 8],
          "color": "#4670FE",
          "borderWidth": 0,
          pointStart: Date.UTC(2019, 10, 15),
          pointInterval: 86400000,
          pointWidth: 10,
          pointPadding: 0.1
        },
        {
          "name": "C",
          "data": [3, 4, 4, 2, 5, 7],
          "color": "#84CBDD",
          "borderWidth": 0,
          pointStart: Date.UTC(2019, 10, 15),
          pointInterval: 86400000,
          pointWidth: 10,
          pointPadding: 0.2
        }
      ]
    }
  };
  render() {
    return (
      < React.Fragment >
        <ChartHOC options={this.state.options} type={'column'} />
      </React.Fragment >
    );
  }



}

export default Throughput;


