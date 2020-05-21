import React from 'react';
import ChartHOC from '../ChartHOC/ChartHOC';


var options = {
  title: {
    text: '',
    align: 'left'
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
      color: '#f5f5f5'
    },
    data: [1590063894, 1590409494, 1590927894, 1591359894, 1592569494]
  },
  yAxis: [
    {
      gridLineWidth: 0.1,
      labels: {
        format: '{value}(s)',
        style: {
          color: '#f5f5f5'
        }
      },
      title: {
        text: 'Average Duration Time',
        style: {
          color: '#f5f5f5'
        }
      }
    },
    {
      gridLineWidth: 0,
      labels: {
        format: '{value}(s)',
        style: {
          color: '#f5f5f5'
        }
      },
      title: {
        text: 'Total Duration Time',
        style: {
          color: '#f5f5f5'
        }
      },
      opposite: true
    },
    {
      gridLineWidth: 0,
      labels: {
        format: '{value}',
        style: {
          color: '#f5f5f5'
        }
      },
      title: {
        text: 'Count',
        style: {
          color: '#f5f5f5'
        }
      },
      opposite: true
    },
  ],
  tooltip: {
    shared: true
  },
  legend: {
    align: 'right',
    verticalAlign: 'top',
    itemStyle: {
      color: '#f5f5f5',
      fontWeight: 'normal'
    }
  },
  series: [{
    name: 'Average Duration Time',
    type: 'line',
    yAxis: 1,
    data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
    tooltip: {
      valueSuffix: ''
    },
    dashStyle: 'dash',
    pointInterval: 24 * 3600 * 1000
  },
  {
    name: 'Total Duratopn Time',
    type: 'line',
    data: [1016, 1016, 1015.9, 1015.5, 1012.3, 1009.5, 1009.6, 1010.2, 1013.1, 1016.9, 1018.2, 1016.7],
    yAxis: 2,
    tooltip: {
      valueSuffix: ''
    },
    dashStyle: 'dash',
    pointInterval: 24 * 3600 * 1000
  },
  {
    name: 'Count',
    type: 'line',
    data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6],
    tooltip: {
      valueSuffix: ''
    },
    pointInterval: 24 * 3600 * 1000
  }],
  credits: {
    enabled: false
  },

}

function BuildTreds() {
  return (
    <React.Fragment>
      <ChartHOC options={options} height={'700px'} />
    </React.Fragment>
  )
}

export default BuildTreds;