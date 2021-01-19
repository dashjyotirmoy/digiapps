import React from 'react';
import ChartHOCSummary from '../Charts/ChartHOC/ChartHOCSummary';
import { color } from 'highcharts';
const BuildPieKpi = (props) => {
  var options = {}
  var data = []
  var categories = ['SCA','SAST','DAST']
var colors= ['#ec5050','#ffc107','#20c997']
var pieData=props.openVulnerability
var bgTheme = props.bgTheme
var dataArray = [...pieData]

var dataArrayValue=dataArray.map(item=>[...Object.values(item).slice(1, 4)])
pieData.forEach((item,index) => data.push({
                                    y : parseInt(item.total),
                                    drilldown: {
                                        categories: ['High','Medium','Low'],
                                        data: dataArrayValue[index]
                                    }}))

var browserData = []
var versionsData = []
var i
var j
var dataLen = data.length
var drillDataLen
var brightness


// Build the data arrays
for (i = 0; i < dataLen; i += 1) {

// add browser data
browserData.push({
    name: categories[i],
    y: data[i].y,
    color: data[i].color
})
// add version data
drillDataLen = data[i].drilldown.data.length;
for (j = 0; j < drillDataLen; j += 1) {
    brightness = 0.2 - (j / drillDataLen) / 5;
    versionsData.push({
        name: data[i].drilldown.categories[j],
        y: parseInt(data[i].drilldown.data[j]),
        color: colors[j],
    });
}
}  


  options = {
    chart: {
      type: 'pie',
      borderColor:'#999a9c',
      shadow: true,
      height: 289,
  },
  title: {
      text: 'Open Vulnerabilities in Production',
      align: "left",
      style: {
        color: bgTheme ? "#ffffff" : '#333333',
        fontSize: '13px',
        fontWeight:'bold'
      }
  },
  plotOptions: {

      pie: {
          shadow: false,
          center: ['50%', '50%'],
          colors: ['#B14891','#9C82D4','#87D3F2'],
          borderColor: null,
      }
  },
  
  credits: {
    enabled: false
  },
  series: [{
      name: 'Total',
      data: browserData,
      size: '80%',
      dataLabels: {
          formatter: function () {
              return  '<b>'+this.point.name+'</b><br/>' + this.y;
          },
          distance: -48,
          style: {
            textOutline: false,
            fontWeight: 'bold',
            color: bgTheme?'#ffffff':'#333333'
        },
      }
  }, {
      name: 'Total',
      data: versionsData,
      size: '90%',
      innerSize: '70%',
      dataLabels: {
        connectorWidth: 0,
          distance: 10,
          formatter: function () {
              return '<b>'+this.y+'</b>';
          },
          style: {
            textOutline: false,
            fontWeight: 'bold',
            color: bgTheme?'#ffffff':'#333333'
        },
      },
      id: 'versions'
  }],
  // responsive: {
  //     rules: [{
  //         condition: {
  //             maxWidth: 400
  //         },
  //         chartOptions: {
  //             series: [{
  //             }, {
  //                 id: 'versions',
  //                 dataLabels: {
  //                     enabled: false
  //                 }
  //             }]
  //         }
  //     }]
  // }
  };
  return (
    <React.Fragment>
      <ChartHOCSummary options={options} />
    </React.Fragment>
  )
}

export default BuildPieKpi;

