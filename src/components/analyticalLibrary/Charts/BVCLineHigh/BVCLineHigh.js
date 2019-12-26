import React, { Component } from 'react'
import ChartHOC from '../ChartHOC/ChartHOC';

class BVCLineHigh extends Component {
  state = {
    options: {
      chart: {
      },

      title: {
        text: 'Bugs, Vulnerabilities & Code Smells',
        align: "left",
        style: {
          color: "#f5f5f5",
          fontWeight: 'normal'
        }
      },
      yAxis: [
        {
          title: {
            text: ''
          },
          gridLineColor: '',
          labels: {
            style: {
              color: '#f5f5f5'
            }
          }
        },
        {
          title: {
            text: ''
          },
          labels: {
            style: {
              color: '#f5f5f5'
            }
          },
          opposite: true
        }
      ],

      xAxis: {
        labels: {
          style: {
            color: '#f5f5f5'
          }
        },
        type: "datetime",
        dateTimeLabelFormats: {
          day: "%b %e"
        },
        lineWidth: 1,
        tickLength: 0,
        style: {
          color: "#f5f5f5"
        }
      },

      credits: {
        enabled: false
      },
      legend: {
        enabled: true,
        itemStyle: {
          color: '#f5f5f5',
          fontWeight: 'normal'
        },
        itemHoverStyle: {
          color: '#D3D3D3',
          fontWeight: ''
        },
        align: 'right',
        verticalAlign: 'top',
        y: - 30
      },
      series: [
        {
          data: [16, 22, 17, 19, 20, 21, 19, 17, 19, 19.5, 20, 21],
          name: "Bugs",
          type: "line",
          color: '#B09FF9',
          marker: {
            enabled: false
          },
          pointStart: Date.UTC(2019, 10, 10),
          pointInterval: 86400000,
        },
        {
          data: [11, 12, 13, 14, 12, 11, 10, 9, 10, 11, 10, 9],
          type: "line",
          name: "Vulnerabilities",
          color: '#4670FE',
          marker: {
            enabled: false
          }, pointStart: Date.UTC(2019, 10, 10),
          pointInterval: 86400000,
        }, {
          data: [2, 4, 8, 6, 5, 3, 6, 5, 4, 5, 6, 7],
          type: "line",
          name: "Code Smells",
          color: '#84CBDD',
          marker: {
            enabled: false
          }, pointStart: Date.UTC(2019, 10, 10),
          pointInterval: 86400000,
        }
      ]
    }
  };

  render() {
    return (
      <React.Fragment>
        <ChartHOC options={this.state.options} />
      </React.Fragment>
    );
  }
}

export default BVCLineHigh