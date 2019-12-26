import React, { Component } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import ChartHOC from '../ChartHOC/ChartHOC';


class TestingReleaseAutomation extends Component {

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
        text: "Testing Release Automation",
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
        max: 15,
        tickInterval: 2,
        gridLineColor: "transparent",
        title: {
          text: ''
        },
        labels: {
          format: '{value}%',
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
        enabled: false
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
          "data": [12, 10, 8, 12, 6, 8],
          "color": "#4670FE",
          "borderWidth": 0,
          pointStart: Date.UTC(2019, 10, 15),
          pointInterval: 86400000,
          pointWidth: 10,
          pointPadding: 0.1
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

export default TestingReleaseAutomation;


