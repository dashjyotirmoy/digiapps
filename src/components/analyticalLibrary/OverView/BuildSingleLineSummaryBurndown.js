import React from 'react';
import ChartHOCSummary from '../Charts/ChartHOC/ChartHOCSummary';
const BuildSingleLineSummaryBurndown = (props) => {
  var options = {}
  let result = []
  let newSeries=[]
  var newTime=''
  var critical=''
  var high=''
  var medium=''
  var burndownList = props.summaryBurndown
  var bgTheme = props.bgTheme
  var height = props.type === 'securityTabPie' ? '289px':props.type === 'qualityLine' ? '240px'
              :props.type === 'velocity' ? '240px': '209px'


  // var width = props.type === 'securityTab'?'500px': props.type === 'securityTabPie' ? '500px': '700px'
  var titleText = props.type === 'security'? 'Average Time of Remediation (High & Medium Vulnerabilities)'
                  : props.type==='securityTab'?'New Vulnerabilities': props.type==='securityTabPie'?'Open Vulnerabilities in Production'
                  :props.type==='qualityLine'?'Defect Trend'
                  :props.type === 'sastVulnerabilities'?'SAST Vulnerabilities':props.type === 'dastVulnerabilities'?'DAST Vulnerabilities'
                  :'Product Backlog Burndown (Story Points)'


  var charttype = props.type === 'securityTab' ? 'bar':props.type==='qualityColumn'? 'column' 
                  :props.type === 'securityTabPie'? 'pie': props.type === 'sastVulnerabilities' || props.type === 'dastVulnerabilities' ? 'column': 'line'

  
  
  if(burndownList!== undefined){
  if(props.type === 'security'){
    burndownList.forEach((item, index,itemArray)=> {
      var dataDetails= item.vulnerabilityRemediationList;
      var data=[];
      var name='';
      name=item.projectName;
      dataDetails.forEach((dataEle,index)=>{
      data.push(parseInt(dataEle.remediationTime))
      result.push(new Date(dataEle.date).toString().split(" ").slice(1, 3).join(" "))
      })
      return [newSeries.push({
        "name": name,
        "data": data 
      }
      )] 
    })
  
}
else if(props.type === 'sastVulnerabilities' || props.type === 'dastVulnerabilities') {
  burndownList.forEach((item, index,itemArray)=> {
    var dataDetails= item.data;
    var data=[];
    dataDetails.forEach((dataEle,index)=>{
    var colorDyn = dataEle.severity === 'High' ? '#ec5050':dataEle.severity === 'Medium'? '#ffc107':'#20c997'
    data.push({name:dataEle.name,y: parseInt(dataEle.count),sev:dataEle.severity,color: colorDyn})
    result.push(dataEle.name)
    })
    return [newSeries.push({"data": data})] 
  })
}
else if(props.type === 'securityTab'){
    burndownList.forEach((item, index,itemArray)=> {
      var dataDetails= item.vulnerabilityRemediationList;
      var data=[];
      var name='';
      newTime=item.lastScanned.substring(0, 19);
      name=item.projectName;
      dataDetails.forEach((dataEle,index)=>{
      data.push({name:dataEle.name,y:parseInt(dataEle.data)})
      result.push(dataEle.name)
      })
      return [newSeries.push({
        "name": name,
        "data": data,
        colors:['#12d4e3','#be07b3','#9a76ba'],
        // "color": "#b3b8bd"
      }
      ),newTime] 
    })
}
else if(props.type === 'securityTabPie'){
  burndownList.forEach((item, index,itemArray)=> {
    var dataDetails= item.data;
    var data=[];
    var name='';
    name=item.name;
    dataDetails.forEach((dataEle,index)=>{
    data.push({"name":dataEle.name,"y":dataEle.y})
    //result.push(dataEle.name)
    })
    return [newSeries.push({
      "name": name,
      "data": data,
    }
    )] 
  })
}else if(props.type==='qualityLine'){
  burndownList.projectDefectsSummary.forEach((item, index,itemArray)=> {
    var dataDetails= item.defectTrendDetailDTO;
    var data=[];
    var name='';
    name=item.projectName;
    dataDetails.forEach((dataEle,index)=>{
    data.push({
      critical:parseInt(dataEle.criticalCount),
      high:parseInt(dataEle.highCount),
      medium:parseInt(dataEle.mediumCount),
      y:parseInt(dataEle.totalCount)})
    result.push(new Date(dataEle.date).toString().split(" ").slice(1, 3).join(" "))
    })
    return [newSeries.push({
      "name": name,
      "data": data 
    }
    )]
})
}

else{
  burndownList.forEach((item, index,itemArray)=> {
    var dataDetails= item.projectBurndownList;
    var data=[];
    var name='';
    name=item.projectName;
    dataDetails.forEach((dataEle,index)=>{
    data.push(parseInt(dataEle.remainingUserStoryPoints))
    result.push(new Date(dataEle.date).toString().split(" ").slice(1, 3).join(" "))
    })
    return [newSeries.push({
      "name": name,
      "data": data 
    }
    )]
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
    
    chart: {
      type: charttype,
      height: height,
      borderColor:bgTheme ? '#ffffff':'#999a9c',
      // width: width
      
    },
    legend: {
      enabled: (props.type === 'sastVulnerabilities' || props.type === 'dastVulnerabilities')? false:true,
      align: 'right',
      verticalAlign: 'middle',
      layout: 'vertical',
      symbolHeight: 12,
      symbolWidth: 12,
      symbolRadius: 0,
      itemStyle: {
        // width: "50px",
        color: bgTheme ? "#ffffff" : '#333333',
        fontWeight: "normal"
    },
    itemHoverStyle: {
        color: bgTheme ? "#ffffff" : '#333333'
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
        width:  '20px',
        enabled: true,
        style: {
          color: bgTheme ? "#ffffff" : '#333333'
        }
      }
    },
    yAxis: {
      tickInterval:10,
      lineWidth: 0,
      gridLineColor: "#535353",
      title: {
        text: "",
        style: {
          color: bgTheme ? "#ffffff" : '#333333',
        }
      },
      labels: {
        format: props.type==='security'?'{value}hr':'{value}',
        style: {
          color: bgTheme ? "#ffffff" : '#333333'
        }
      },

    },
    // colors:props.type==='securityTab'?['#12d4e3','#be07b3','#9a76ba']:'',
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        colors:['#B14891','#9C82D4','#87D3F2'],
        dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>',
            connectorWidth: 0,
            distance: '5%'
        },
    }
    },
    credits: {
      enabled: false
    },
    tooltip: {
      headerFormat: props.type==='qualityLine'?'<b>{series.name}</b><br/>':'<b>{point.x}</b><br/>',
      pointFormat: props.type==='sastVulnerabilities' || props.type==='dastVulnerabilities'? '{point.sev}: {point.y}'
                                :props.type==='qualityLine'?'<span>Critical: {point.critical}<span><br/><span>High: {point.high}</span><br/><span>Medium: {point.medium}</span><br/><span>Total: {point.y}</span>':'{series.name}: {point.y}'
  },
    series: newSeries
  };
  return (
    <React.Fragment>
      <ChartHOCSummary options={options} />
    </React.Fragment>
  )
}

export default BuildSingleLineSummaryBurndown;

