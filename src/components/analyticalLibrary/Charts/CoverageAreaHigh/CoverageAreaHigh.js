import React, { Component } from 'react';
import ChartHOC from '../ChartHOC/ChartHOC';

class CoverageAreaHigh extends Component {

  state = {
    options: {
      chart: {
        type: 'area',
      },

      title: {
        text: 'Coverage & Duplications',
        style: {
          color: '#f5f5f5',
          fontWeight: 'normal'
        },
        align: 'left'
      },
      yAxis: {
        gridLineColor: '',
        labels: {
          enabled: true,
          format: '{value}K',
          style: {
            color: '#f5f5f5'
          }
        },
        title: {
          text: ``,
          rotation: 0
        },
      },

      legend: {
        enabled: false
      },

      xAxis: {
        type: "datetime",
        labels: {
          style: {
            color: '#f5f5f5'
          }
        },
        dateTimeLabelFormats: {
          day: "%b %e"
        },
        lineWidth: 0,
        tickLength: 0,
        style: {
          color: "#f5f5f5"
        }
      },

      credits: {
        enabled: false
      },
      tooltip: {
        pointFormat: "{point.y}"
      },
      plotOpions: {
        area: {
          stacking: 'normal',
          lineColor: '#666666',
          lineWidth: 1,
          marker: {
            lineWidth: 1,
            lineColor: '#666666'
          }
        }
      },

      series: [{
        name: 'Failure',
        data: [10, 8, 11, 13, 16, 10, 14],
        marker: {
          enabled: false
        },
        color: "#5173CE",
        pointStart: Date.UTC(2019, 10, 10),
        pointInterval: 86400000,
      },
      {
        name: 'Success',
        data: [8, 5, 9, 10, 14, 7, 12],
        marker: {
          enabled: false
        },
        color: "#657DBD",
        pointStart: Date.UTC(2019, 10, 10),
        pointInterval: 86400000,
      }]
    }
  };

  render() {

    return (
      <React.Fragment>
        <ChartHOC options={this.state.options} type={'area'} />
      </React.Fragment>
    );
  }
}

export default CoverageAreaHigh;

