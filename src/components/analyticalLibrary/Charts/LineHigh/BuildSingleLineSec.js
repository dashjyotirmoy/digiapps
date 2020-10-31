import React from 'react';
import ChartHOC from '../ChartHOC/ChartHOC';

const BuildSingleLineSec = (props) => {
  let result = props.chartData.map(xaxisName => xaxisName.name)
  let ylabel = ['None','Low','Medium','High']
  
 var options = {}
 
 options = {
    title: {
      text: 'Project > Repository > Branch > Releases',
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
          color: "#ffffff",
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
          color: "#ffffff"
        }
      },
    labels: {
      formatter: function() {
        return ylabel[this.pos]
      },
      style: {
        color: "#ffffff",
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
  color: '#ff0000',
  marker : {symbol : 'square',radius : 15 }
},
{
  name : "Medium ",
  color: '#ffa500',
  marker : {symbol : 'square',radius : 15 }
  },
{
  name : "Low ",
  color: '#ffff00',
  marker : {symbol : 'square',radius : 15 }
},
{
  name : "None ",
  color: '#00FF00',
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