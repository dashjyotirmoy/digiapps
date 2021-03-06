import React from 'react';
import ChartHOC from '../ChartHOC/ChartHOC';

const BuildSingleLineQual = (props) => {
  let bgTheme= props.bgTheme;
  let result =props.chartData.map(xaxisName => xaxisName.name);
  let ylabel=['Good','Average','Bad']
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
                color:  bgTheme ? "#ffffff": "#333333",
                fontWeight: "normal"
            },
            itemHoverStyle: {
                color:  bgTheme ? "#ffffff": "#333333"
            }
        },
    xAxis: {
      tickInterval: 1,
      gridLineWidth: 0,
      tickLength: 0,
      lineWidth: 0,
      categories: [...result],
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
      tickInterval: 1,
      min:0,
      max:2,
      startOnTick: true,
      endOnTick: false,
      lineWidth: 0,
      gridLineColor: "#535353",
      title: {
        text: "",
        style: {
          color:  bgTheme ? "#ffffff": "#333333"
        }
      },
    labels: {
      // enabled:false,
      formatter: function() {
        return ylabel[this.pos]
      },
      style: {
        color:  bgTheme ? "#ffffff": "#333333",
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
        events: {
          legendItemClick: function () {
              return false; 
          }
      }
      }
    },
    credits: {
      enabled: false
    },
    tooltip: {

      headerFormat: '<b>{point.x}</b><br/>',
      pointFormat: '<span>Bugs: {point.bugsCount}<span><br/><span>Vulnerabilities: {point.codeVulnerabilityCount}</span><br/><span>Code Coverage: {point.codeCoverageCount}%</span><br/><span>Duplications: {point.codeDuplicateCount}%</span><br/><span>Code Smells: {point.codeSmellCount}</span>'
    },
    series: [
      {
        name:'',
        showInLegend:false,
       data: props.chartData
     },
    {
      name : "Bad",
      color: '#ec5050',
      marker : {symbol : 'square',radius : 15 },
     // data:  bugsCount,
    //  visible:false
      
    },
    {
      name : "Average",
      color: '#ffc107',
      marker : {symbol : 'square',radius : 15 },
    //  data:  codeVulnerabilityCount,
    //  visible:false
      },
    {
      name : "Good",
      color: '#20c997',
      marker : {symbol : 'square',radius : 15 },
    //  data:  codeCoverageCount,
   //   visible:false
    }
]
  }
  

    return (
        <React.Fragment>
            <ChartHOC options={options} />
        </React.Fragment>
    )
}

export default BuildSingleLineQual;

