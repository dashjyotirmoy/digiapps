import React, { useState } from 'react';
import ChartHOC from '../ChartHOC/ChartHOC';

let avgDurationData = [], totalDurationData = [], notBuiltData = [], failureData = [], abortedData = [], successData = [], unstableData = [];

function setAbortedData(data) {
  abortedData = [];
  abortedData = data.map(item => {
    var d = new Date(item.date);
    var date = d.getTime();
    return (
      {
        x: date,
        y: parseInt(item.aborted)
      }
    )
  })
};

function setAvgDurationData(data) {
  avgDurationData = [];
  avgDurationData = data.map(item => {
    var d = new Date(item.date);
    var date = d.getTime();
    return (
      {
        x: date,
        y: parseInt(item.avgBuildTime)
      }
    )
  })

};

function setTotalDuration(data) {
  totalDurationData = [];
  totalDurationData = data.map(item => {
    var d = new Date(item.date);
    var date = d.getTime();
    return (
      {
        x: date,
        y: parseInt(item.totalBuildTime)
      }
    )
  })
};

function setFailureData(data) {
  failureData = data.map(item => {
    var d = new Date(item.date);
    var date = d.getTime();
    return (
      {
        x: date,
        y: parseInt(item.failure)
      }
    )
  })
};

function setNotBuiltData(data) {
  notBuiltData = data.map(item => {
    var d = new Date(item.date);
    var date = d.getTime();
    return (
      {
        x: date,
        y: parseInt(item.notBuilt)
      }
    )
  })
};

function setSuccessData(data) {
  successData = data.map(item => {
    var d = new Date(item.date);
    var date = d.getTime();
    return (
      {
        x: date,
        y: parseInt(item.success)
      }
    )
  })
};

function setUnstableData(data) {
  unstableData = data.map(item => {
    var d = new Date(item.date);
    var date = d.getTime();
    return (
      {
        x: date,
        y: parseInt(item.unstable)
      }
    )
  })
};



const BuildTreds = props => {

  if (Object.keys(props.buildTrendsData.cardsData).length > 0) {

    setAvgDurationData(props.buildTrendsData.cardsData.buildTrendDTOList);
    // below line number failureData, notBuildData, totalDurationData, successData, abortedData, and unstableData shoul be array of objects
    setTotalDuration(props.buildTrendsData.cardsData.buildTrendDTOList);

    setFailureData(props.buildTrendsData.cardsData.buildTrendDTOList);

    setNotBuiltData(props.buildTrendsData.cardsData.buildTrendDTOList);

    setSuccessData(props.buildTrendsData.cardsData.buildTrendDTOList);

    setAbortedData(props.buildTrendsData.cardsData.buildTrendDTOList);

    setUnstableData(props.buildTrendsData.cardsData.buildTrendDTOList);

    var options = {};
    options = {
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
        //data: [1591436474, 1592300474, 1590927894, 1591359894, 1592569494]
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
        color: '#fff',
        yAxis: 1,
        data: avgDurationData,
        tooltip: {
          valueSuffix: ''
        },
        dashStyle: 'dash',
        pointStart: 1588032000000,
        pointInterval: 24 * 3600 * 1000
      },
      {
        name: 'Total Duration Time',
        type: 'line',
        data: totalDurationData,
        color: '#bcb000',
        yAxis: 2,
        tooltip: {
          valueSuffix: ''
        },
        dashStyle: 'dash',
        pointStart: 1588032000000,
        pointInterval: 24 * 3600 * 1000
      },
      {
        name: 'Not Built',
        type: 'line',
        // data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6],
        data: notBuiltData,
        color: '#a142f4',
        tooltip: {
          valueSuffix: ''
        },
        pointStart: 1588032000000,
        pointInterval: 24 * 3600 * 1000
      },
      {
        name: 'Failure',
        type: 'line',
        data: failureData,
        yAxis: 2,
        color: '#ff6e6e',
        tooltip: {
          valueSuffix: ''
        },
        dashStyle: 'dash',
        pointStart: 1588032000000,
        pointInterval: 24 * 3600 * 1000
      },
      {
        name: 'Aborted',
        type: 'line',
        data: abortedData,
        yAxis: 2,
        color: '#429ef4',
        tooltip: {
          valueSuffix: ''
        },
        dashStyle: 'dash',
        pointStart: 1588032000000,
        pointInterval: 24 * 3600 * 1000
      },
      {
        name: 'Unstable',
        type: 'line',
        data: unstableData,
        yAxis: 2,
        tooltip: {
          valueSuffix: ''
        },
        dashStyle: 'dash',
        pointStart: 1588032000000,
        pointInterval: 24 * 3600 * 1000
      },
      {
        name: 'Success',
        type: 'line',
        data: successData,
        yAxis: 2,
        tooltip: {
          valueSuffix: ''
        },
        dashStyle: 'dash',
        pointStart: 1588032000000,
        pointInterval: 24 * 3600 * 1000
      }
      ],
      credits: {
        enabled: false
      },

    }

  }
  return (
    <React.Fragment>
      <ChartHOC options={options} height={'700px'} />
    </React.Fragment>
  )
}

export default BuildTreds;