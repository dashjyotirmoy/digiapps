import React from 'react';
import ChartHOC from '../ChartHOC/ChartHOC';

const BuildSingleLineSec = (props) => {
  let bgTheme= props.bgTheme;
  let result = props.chartData.map(xaxisName => xaxisName.name)
  let ylabel = ['None','Low','Medium','High']
  
 var options = {}
 
 options = {
    title: {
      text: 'Project > Repository > Branch > Releases',
      align: "left",
      style: {
        color: bgTheme ? "#ffffff": "#333333",
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
                color: bgTheme ? "#ffffff": "#333333",
                fontWeight: "normal"
            },
            itemHoverStyle: {
                color: bgTheme ? "#ffffff": "#333333"
            }
         },
    xAxis: {
      tickInterval: 1,
      gridLineWidth: 0,
      tickLength: 0,
      lineWidth: 0,
      categories: [...result],
      lineColor: 'transparent',
      title: {
        text: " "
      },
      labels: {
        rotation: -45,
        format: "{value}",
        style: {
          color: bgTheme ? "#ffffff": "#333333",
          fontWeight: 'bold',
        }
      }
    },
    yAxis: {
      gridLineColor: "#535353",
      tickInterval: 1,
       min:0,
       max:3,
      startOnTick: true,
      endOnTick: false,
      lineWidth: 0,
      title: {
        text: "",
        style: {
          color: bgTheme ? "#ffffff": "#333333"
        }
      },
    labels: {
      formatter: function() {
        return ylabel[this.pos]
      },
      style: {
        color: bgTheme ? "#ffffff": "#333333",
        fontWeight: 'normal',
      }
      },
     maxPadding: 0.2
    },
    plotOptions: {
      series: {
        color:'#81b8ed',
        dataLabels: {
          enabled: false,
          format: "{point.name}"
        },
      }
    },
    credits: {
      enabled: false
    },
    tooltip: {
      headerFormat: '<b>{point.x}</b><br/>',
      pointFormat: '<span>High: {point.high}<span><br/><span>Medium: {point.medium}</span><br/><span>Low: {point.low}</span>'
  },
  series: [
   {
     name:'',
     showInLegend:false,
		data: props.chartData
	},
{
  name : "High ",
  color: '#ec5050',
  marker : {symbol : 'square',radius : 15 }
},
{
  name : "Medium ",
  color: '#ffc107',
  marker : {symbol : 'square',radius : 15 }
  },
{
  name : "Low ",
  color: '#20c997',
  marker : {symbol : 'square',radius : 15 }
},
{
  name : "None ",
  color: '#056642',
  marker : {symbol : 'square',radius : 15 }
}

 
  ]
}

  

    return (
        <React.Fragment>
            <ChartHOC options={options}/>
        </React.Fragment>
    )
}

export default BuildSingleLineSec;