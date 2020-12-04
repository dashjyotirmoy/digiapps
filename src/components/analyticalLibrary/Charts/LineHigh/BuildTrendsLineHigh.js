import React from 'react';
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
  let bgTheme = props.bgTheme
  if (Object.keys(props.buildTrendsData.cardsData).length > 0) {

    setAvgDurationData(props.buildTrendsData.cardsData.buildTrendDTOList);

    setTotalDuration(props.buildTrendsData.cardsData.buildTrendDTOList);

    setFailureData(props.buildTrendsData.cardsData.buildTrendDTOList);

    setNotBuiltData(props.buildTrendsData.cardsData.buildTrendDTOList);

    setSuccessData(props.buildTrendsData.cardsData.buildTrendDTOList);

    setAbortedData(props.buildTrendsData.cardsData.buildTrendDTOList);

    setUnstableData(props.buildTrendsData.cardsData.buildTrendDTOList);

    var options = {};
    options = {
      title: {
        text: 'Build Trend',
        align: 'left',
        style: {
          color: bgTheme ? "#f5f5f5" : '#333333',
        }
      },
      chart: {
        borderColor:bgTheme ? '#ffffff':'#999a9c',
        backgroundColor: bgTheme ? '#232D3B':'#ffffff',
      },
      xAxis: {
        type: "datetime",
        // crosshair: true,
        labels: {
          style: {
            color:  bgTheme ? "#f5f5f5" : '#333333',
          }
        },
        dateTimeLabelFormats: {
          day: "%b %e"
        },

        lineWidth: 0,
        tickLength: 0,
        style: {
          color:  bgTheme ? "#f5f5f5" : '#333333',
        },
      },
      yAxis: [
        {
          //Primary Axis
          gridLineWidth: 0.1,
          labels: {
            format: '{value}',
            style: {
              color:  bgTheme ? "#f5f5f5" : '#333333',
            }
          },
          title: {
            text: 'Average Duration Time (s)',
            style: {
              color:  bgTheme ? "#f5f5f5" : '#333333',
            }
          }
        },
        {
          // Secondary Axis
          gridLineWidth: 0,
          labels: {
            format: '{value}',
            style: {
              color:  bgTheme ? "#f5f5f5" : '#333333',
            }
          },
          title: {
            text: 'Total Duration Time (s)',
            style: {
              color:  bgTheme ? "#f5f5f5" : '#333333',
            }
          },
          opposite: true
        },
        {
          // Ternary Axis
          gridLineWidth: 0,
          labels: {
            format: '{value}',
            style: {
              color:  bgTheme ? "#f5f5f5" : '#333333',
            }
          },
          title: {
            text: 'Count',
            style: {
              color:  bgTheme ? "#f5f5f5" : '#333333',
            }
          },
          opposite: true,
          min: 0,
          tickInterval: 0.5
        },
      ],
      tooltip: {
        shared: true
      },
      legend: {
        align: 'right',
        verticalAlign: 'top',
        itemStyle: {
          color:  bgTheme ? "#f5f5f5" : '#333333',
          fontWeight: 'normal'
        },
        itemHoverStyle: {
          color:  bgTheme ? "#f5f5f5" : '#333333',
        }
      },
      series: [{
        name: 'Average Build Time (s)',
        type: 'line',
        color: '#fff',
        data: avgDurationData,
        tooltip: {
          valueSuffix: ''
        },
        //dashStyle: 'dash',
        pointStart: 1588032000000,
        pointInterval: 24 * 3600 * 1000
      },
      {
        name: 'Total Build Time (s)',
        type: 'line',
        data: totalDurationData,
        color: '#bcb000',
        yAxis: 1,
        tooltip: {
          valueSuffix: ''
        },
        // dashStyle: 'dash',
        pointStart: 1588032000000,
        pointInterval: 24 * 3600 * 1000
      },
      {
        name: 'Not Built',
        type: 'line',
        // data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6],
        data: notBuiltData,
        yAxis: 2,
        color: '#a142f4',
        tooltip: {
          valueSuffix: ''
        },
        dashStyle: 'dash',
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
        color: '#CC8A8A',
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
        color: 'green',
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
      <ChartHOC options={options} height={'300px'} width={'100%'} />
    </React.Fragment>
  )
}

export default BuildTreds;