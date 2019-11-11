import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const options = {
  chart: {
    type: 'spline',
    height: '69x',
    backgroundColor: "#F0F0F0"
  },

  title: {
    text: null
  },

  yAxis: {
    labels: {
      enabled: false
    },
    title: {
      text: '',
      rotation: 0
    }
  },

  legend: {
    enabled: false
  },

  xAxis: {
    max: 8,
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
      data: [1, 4, 1, 9, 3, 2],
      marker: {
        enabled: false
      }
    }
  ]
};

function Spline() {
  return (

    <HighchartsReact highcharts={Highcharts} options={options} />

  );
}

export default Spline