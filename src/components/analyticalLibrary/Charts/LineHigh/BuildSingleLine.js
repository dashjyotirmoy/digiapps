import React from 'react';
import ChartHOC from '../ChartHOC/ChartHOC';
const BuildSingleLine = (props) => {
  var options = {}
  let result = props.chartData.map(xaxisName => xaxisName.name)
  options = {
    title: {
      text: 'Project > Team > Sprints',
      align: "left",
      style: {
        color: "#ffffff",
        fontSize: '12px'
      }
    },
    chart: {
      type: 'line',
      height: 300
    },
    legend: {
      layout: 'horizontal',
      align: 'right',
      symbolHeight: 12,
      symbolWidth: 12,
      symbolRadius: 0,
      itemStyle: {
        color: "#ffffff",
        fontWeight: "normal"
      },
      itemHoverStyle: {
        color: "#ffffff"
      }
    },
    xAxis: {
      gridLineWidth: 0,
      tickLength: 0,
      lineWidth: 0,
      categories: [...result],
      title: {
        text: " "
      },
      labels: {
        rotation: -45,
        style: {
          color: "#ffffff",
          fontWeight: 'bold',
        }
      }
    },
    yAxis: {
      tickInterval: 0.5,
      plotLines: [{ value: '0.6', color: 'red', dashStyle: 'line', width: 1.5},
      { value: '1', color: 'green', dashStyle: 'line', width: 1.5  },
      { value: '0.8', color: 'yellow', dashStyle: 'line', width: 1.5 },
      { value: '1.2', color: 'yellow', dashStyle: 'line', width: 1.5},
      { value: '1.4', color: 'red', dashStyle: 'line', width: 1.5 }],
      startOnTick: true,
      endOnTick: false,
      lineWidth: 0,
      gridLineColor: "#535353",
      min: 0,
      max: null,
      offset: 0,
      title: {
        text: ""
      },
      labels: {
        format: '{value}',
        style: {
          color: "#ffffff",
          fontWeight: 'normal',
        }
      },

    },
    plotOptions: {
      series: {
        dataLabels: {
          enabled: false,
          format: "{point.name}"
        },
        events: {
          legendItemClick: function () {
            return false;
          }
        }
      },
      //pointStart: 100
    },
    credits: {
      enabled: false
    },
    tooltip: {
      shared: true,
      useHTML: true,
      enabled: true,
    },
    series: [{
      data: props.chartData,
      showInLegend: false,
      name: 'Velocity Variance',
    }, {
      name: "Warning",
      color: '#ec5050',
      marker: { symbol: 'square', radius: 15 }
    }, {
      name: "Below Optimal",
      color: '#ffc107',
      marker: { symbol: 'square', radius: 15 }
    },
    {
      name: "Ideal",
      color: '#20c997',
      marker: { symbol: 'square', radius: 15 }
    }],
  };
  return (
    <React.Fragment>
      <ChartHOC options={options} />
    </React.Fragment>
  )
}

export default BuildSingleLine;

