import React from 'react';
import ChartHOCSummary from '../Charts/ChartHOC/ChartHOCSummary';
const BuildColumnSummaryTrend = (props) => {
  var options = {}
  var planned=[]
  var actual=[]
  var critical=[]
  var high=[]
  var medium=[]
  var low=[]
  var xAxisLabel=[]
  var totalCritical=''
  var totalHigh=''
  var totalMedium=''
  var totalLow=''
  var newTime=''
  var fontWeight = props.type === 'securityTab'?'bold':''
  var height = props.type === 'securityOpen' ? '498px' : props.type === 'security' ? '300px':(props.type === 'securityTabSCA' || props.type === 'securityTabSAST' || props.type === 'securityTabDAST') ? '239px': props.type === 'qualityColumnReverse' ? '500px':props.type==='qualityColumn'?'240px': props.type==='qualityLine'?'240px':props.type==='securityTabReverse'?'289px':'240px'
  var titleText = props.type === 'securityOpen'? 'Open Vulnerabilities per project in production':props.type === 'securityTab'?'Vulnerabilities by SCA, SAST & DAST':props.type==='qualityColumnReverse'?'Open Defects Count':props.type==='qualityColumn'?'Average Resolution Time for Defects':props.type==='securityTabReverse'?'New Vulnerabilities':props.type==='velocity'?'Velocity - Projects that need attention':''
  var chartType = props.type === 'qualityColumnReverse'? 'bar': props.type === 'securityTabReverse'?'bar': 'column'
  var trendList = props.summaryTrend
  var bgTheme = props.bgTheme
  var DURATION_IN_SECONDS = {
    epochs: ['year', 'month', 'day', 'hour', 'minute'],
    year: 31536000,
    month: 2592000,
    day: 86400,
    hour: 3600,
    minute: 60
  }
  function getDuration(seconds) {
    var epoch, interval;
  
    for (var i = 0; i < DURATION_IN_SECONDS.epochs.length; i++) {
      epoch = DURATION_IN_SECONDS.epochs[i];
      interval = Math.floor(seconds / DURATION_IN_SECONDS[epoch]);
      if (interval >= 1) {
        return {
          interval: interval,
          epoch: epoch
        };
      }
    }
  
  };
  
  function timeSince(date) {
    var seconds = Math.floor((new Date() - new Date(date)) / 1000);
    var duration = getDuration(seconds);
    var suffix = (duration.interval > 1 || duration.interval === 0) ? 's' : '';
    return duration.interval + ' ' + duration.epoch + suffix;
  };
  if(trendList!== undefined){
    if(props.type === 'velocity'){
    trendList.forEach((item, index,itemArray)=> {
      actual.push(parseInt(item.actualStoryPoints))
      planned.push(parseInt(item.plannedStoryPoints))
      xAxisLabel.push(item.projectName)
  })
  } 
  else if(props.type === 'securityTabReverse'){
    newTime=trendList.scannedDate.substring(0, 19)
    trendList.toolVulnerabilityList.forEach((item, index,itemArray)=> {
      high.push(parseInt(item.high))
      medium.push(parseInt(item.medium))
      low.push(parseInt(item.low))
      xAxisLabel.push(item.toolName)
      })
  }
  else if(props.type === 'securityTabSCA'){
      high.push(parseInt(trendList.alertMetrics.high))
      medium.push(parseInt(trendList.alertMetrics.medium))
      low.push(parseInt(trendList.alertMetrics.low))
      xAxisLabel.push("SCA")
  }
  else if(props.type === 'securityTabSAST' || props.type === 'securityTabDAST'){
      high.push(parseInt(trendList.high))
      medium.push(parseInt(trendList.medium))
      low.push(parseInt(trendList.low))
      xAxisLabel.push(trendList.toolName)
  }
  else if(props.type === 'qualityColumn'){
    trendList.projectDefectsSummary.forEach((item, index,itemArray)=> {
      critical.push(parseInt(item.criticalBugResolutionTime))
      high.push(parseInt(item.highBugResolutionTime))
      medium.push(parseInt(item.mediumBugResolutionTime))
      xAxisLabel.push(item.projectName)
      })
  } 
  else if(props.type === 'qualityColumnReverse'){
    trendList.projectDefectsSummary.forEach((item, index,itemArray)=> {
      critical.push(parseInt(item.criticalBugCount))
      high.push(parseInt(item.highBugCount))
      medium.push(parseInt(item.mediumBugCount))
      low.push(parseInt(item.lowBugCount))
      totalCritical=trendList.totalCriticalBugCount
      totalHigh=trendList.totalHighBugCount
      totalMedium=trendList.totalMediumBugCount
      totalLow=trendList.totalLowBugCount
      xAxisLabel.push(item.projectName)
      })
  } 
   
  else{
    trendList.forEach((item, index,itemArray)=> {
      high.push(parseInt(item.high))
      medium.push(parseInt(item.medium))
      low.push(parseInt(item.low))
      xAxisLabel.push(item.projectName)
      //return [high,medium,low,xAxisLabel]
      })
    }
  }
  options = {
    title: {
      text: titleText,
      align: "left",
      style: {
        color: bgTheme ? "#ffffff" : '#333333',
        fontSize: '14px',
        fontWeight:'bold',
        fontFamily:"Arial"
      }
    },

    subtitle: {
      useHTML: props.type === 'securityTabReverse' || props.type==='qualityColumnReverse' ? true: false,
      text: props.type === 'securityTabReverse'? `Scanned ${timeSince(newTime)} ago`:props.type==='qualityColumnReverse'?`<div style='font-size: 11px;width: 385px;display: inline-block;padding: 10px'>
      <span style='margin-right: 5px'>Total Critical:<span style="color: #ffffff; font-weight:700;padding: 2px 3px; background-color:#a21220;border-radius: 5px">${totalCritical}</span></span>
      <span style='margin-right: 5px'>Total High:<span style="color: #ffffff; font-weight:700;padding: 2px 3px; background-color:#ec5050;border-radius: 5px">${totalHigh}</span> </span>
      <span style='margin-right: 5px'>Total Medium:<span style="color: #ffffff; font-weight:700;padding: 2px 3px; background-color:#ffc107;border-radius: 5px">${totalMedium}</span> </span>
      <span>Total Low:<span style="color: #ffffff; font-weight:700;padding: 2px 3px; background-color:#20c997;border-radius: 5px">${totalLow}</span></span>
      </div>`:'',
      verticalAlign: props.type==='qualityColumnReverse' ? 'bottom': 'top',
      x: props.type==='qualityColumnReverse' ? -8:props.type==='securityTabReverse'? -15: 0,
      y: props.type==='qualityColumnReverse' ? 24:props.type==='securityTabReverse'? 10:0,
      align: props.type === 'securityTabReverse'?'right':'left',
      // width: 100 '%',
      style: {
        fontSize: '14px',
        color: bgTheme ? "#ffffff" : '#333333',
      }
  },
    chart: {
      type: chartType,
      height: height,
      borderColor: (props.type === 'securityTabSCA' || props.type === 'securityTabSAST' || props.type === 'securityTabDAST')?'transparent':'#999a9c',
    },
  xAxis: {
    categories: xAxisLabel,
    labels: {
      //rotation: props.type !=='securityTab'? -45: 0,
      // enabled: true,
       enabled: props.type ==='securityTabReverse'? false: true,
      style: {
        color: bgTheme ? "#ffffff" : '#333333',
        //width:  '45px',
        fontWeight: 'bold',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis'
    }
    },
    title: {
      text: " "
    },
  },
  yAxis: {
      min: 0,
      tickInterval: 10,
      gridLineColor: "#535353",
      labels: {
        // format: props.type==='qualityColumn'?'{value}hr':'{value}',
        format: props.type==='qualityColumn'?'{value}hr':'{value}',
        style: {
          color: bgTheme ? "#ffffff" : '#333333'
        }
      },
      stackLabels: {
        useHTML: true,
        enabled: props.type==='securityTabReverse'?true:false,
        align: 'right',
        formatter: function () {
          return '<center><span style="margin-left: 10px">' + xAxisLabel[this.x] + '</span></center>';
      },
        style: {
            fontWeight: 'bold',
            color: bgTheme ? "#ffffff" : '#333333',
        }
    },
      title:{
        text: ""
        },
  },
  legend: {
      verticalAlign: 'top',
      enabled: props.type==='securityTabReverse' || props.type==='securityTabSAST'||props.type==='securityTabSCA'|| props.type==='securityTabDAST'?false:true,
      layout: props.type==='securityTab'?'vertical':'horizontal',
      align: 'right',
      reversed: props.type === 'qualityColumn'? false : true,
      itemWidth: 93,
      itemStyle: {
        color: bgTheme ? "#ffffff" : '#333333',
        fontWeight: "normal"
      },
      itemHoverStyle: {
        color: bgTheme ? "#ffffff" : '#333333'
      }
},
    
    credits: {
      enabled: false,
  },
  tooltip: {
      headerFormat: '<b>{point.x}</b><br/>',
      pointFormat: '{series.name}: {point.y}'
  },
  plotOptions: {
      column: {
          stacking: props.type !== 'qualityColumn' ? 'normal':'',
      },
      bar: {
        dataLabels: {
          enabled: true,
        }
      },
      series: {
        groupPadding: 0.1,
        pointWidth: 40,
        stacking: props.type !== 'qualityColumnReverse'?'normal':'',
        dataLabels: {
          formatter: function() {
            if(props.type === 'securityTabReverse' && this.y){
              return this.y;
            }
          },
          enabled: true,
          style: {
            textOutline: false,
            fontWeight: 'bold',
            color: bgTheme ? "#ffffff" : '#333333',
            fontSize: '12px'
        },       
        },
        stacking: 'normal',
        borderColor: null,
      }
      
  },
  series: props.type === 'velocity'?[
    {
      name: 'Actual',
      data: actual,
      color: "#2fc5eb",
  
    },
  {
      name: 'Planned',
      data: planned,
      color: "#734ba5",
  
  }]:props.type === 'qualityColumn'? [
    {
      name: 'Critical',
      data: critical,
      color: "#a21220",
    
    },
    {
      name: 'High',
      data: high,
      color: "#ec5050",
    
    },
    {
      name: 'Medium',
      data: medium,
      color: "#ffc107",
    
    }
    
    ]:props.type === 'qualityColumnReverse'? [
      {
        name: 'Low',
        data: low,
        color: "#20c997",
      
      },
      {
        name: 'Medium',
        data: medium,
        color: "#ffc107",
      
      },
      {
        name: 'High',
        data: high,
        color: "#ec5050",
      
      },
      {
        name: 'Critical',
        data: critical,
        color: "#a21220",
      
      }]:[
{
  name: 'Low',
  data: low,
  color: "#20c997",

},
{
  name: 'Medium',
  data: medium,
  color: "#ffc107",

},
{
  name: 'High',
  data: high,
  color: "#ec5050",

}]
  };
  return (
    <React.Fragment>
      <ChartHOCSummary options={options} />
    </React.Fragment>
  )
}

export default BuildColumnSummaryTrend;

