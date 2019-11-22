import React from 'react';
import ChartHOC from '../ChartHOC/ChartHOC';
const options = {
  chart: {
    type: 'spline',
    backgroundColor: ""
  },

  title: {
    text: null
  },
  yAxis: [{
    labels: {
      enabled: false
    },
    title: {
      text: 'Start date',
      rotation: 0
    },
    plotBands: [{
      from: 0,
      to: 5,
      color: '#EEFCFC'
    }, {
      from: 5,
      to: 8,
      color: "#FAFAE5"
    }, {
      from: 8,
      to: 10,
      color: '#FBDED4'
    }]
  }, {
    title: {
      text: 'End date',
      rotation: 0
    },
    gridLineWidth: 0,
    opposite: true
  }],

  legend: {
    enabled: false
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

  credits: {
    enabled: false
  },

  series: [
    {
      data: [1, 4, 1, 9, 3, 2, 6, 7, 5, 3, 2, 4],
      marker: {
        enabled: false
      }
    }
  ]
};

function Spline() {
  return (
    <ChartHOC options={options} />
  );
}

export default Spline