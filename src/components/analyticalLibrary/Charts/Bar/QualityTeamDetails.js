import React from 'react';
import ChartHOC from '../ChartHOC/ChartHOC';
const QualityTeamDetails = (props) => {
  var options = {}
  var critical=[]
  var high=[]
  var medium=[]
  var low=[]
  var trendList = props.summaryTrend
  var xAxisLabel= []
  let newURL
  let combinedURL
  let baseURL = "https://organization_name/project_id/_queries/query/?wiql=SELECT [System.Id]%2C[System.WorkItemType]%2C[System.Title] FROM WorkItems WHERE [System.Id] IN (work_item_ids)&name=Cycle time work items"
  let IDsData = props.summaryTrend
  let projID = props.projID
  let organization = props.organization
  let criticalIds=[]
  let highIds=[]
  let mediumIds=[]
  let lowIds=[]

  trendList.map((item) => {
    if(props.radioValue==='all'){
      item.allBugsList && item.allBugsList.map((data)=>{
        if(data.type==='critical'){
          critical.push(parseInt(data.totalCount))
          criticalIds.push(data.ids)
        }else if(data.type==='high'){
          high.push(parseInt(data.totalCount))
          highIds.push(data.ids)
        }else if(data.type==='medium'){
          medium.push(parseInt(data.totalCount))
          mediumIds.push(data.ids)
        }else{
          low.push(parseInt(data.totalCount))
          lowIds.push(data.ids)
        }
      })
  
    }else if(props.radioValue==='opened'){
      item.openBugsList && item.openBugsList.map((data)=>{
        if(data.type==='critical'){
        critical.push(parseInt(data.totalCount))
        criticalIds.push(data.ids)
        }else if(data.type==='high'){
        high.push(parseInt(data.totalCount))
        highIds.push(data.ids)
        }else if(data.type==='medium'){
        medium.push(parseInt(data.totalCount))
        mediumIds.push(data.ids)
        }else{
        low.push(parseInt(data.totalCount))
        lowIds.push(data.ids)
        }
      })
    }else{
      item.closedBugsList && item.closedBugsList.map((data)=>{
        if(data.type==='critical'){
        critical.push(parseInt(data.totalCount))
        criticalIds.push(data.ids)
        }else if(data.type==='high'){
        high.push(parseInt(data.totalCount))
        highIds.push(data.ids)
        }else if(data.type==='medium'){
        medium.push(parseInt(data.totalCount))
        mediumIds.push(data.ids)
        }else{
        low.push(parseInt(data.totalCount))
        lowIds.push(data.ids)
        }
      })
    }
    xAxisLabel.push(item.teamName)
  })
  
  options = {
    title: {
      text: "Defects Aggregated View",
      align: "left",
      style: {
        color: "#f5f5f5",
        fontSize: '18px',
        fontWeight:'Normal',
        //fontFamily:"Lucida Grande, Lucida Sans Unicode, Arial, Helvetica, sans-serif"
      }
    },
    chart: {
      type: 'column',
      height: '280',
    },
  xAxis: {
    categories: xAxisLabel,
    labels: {
      rotation: -45,
      style: {
        color: "#f5f5f5",
        width:  '100',
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
      gridLineWidth: 0,
      labels: {
        // format: props.type==='qualityColumn'?'{value}hr':'{value}',
        format: '{value}',
        style: {
          color: "#f5f5f5"
        }
      },
      stackLabels: {
        useHTML: true,
        enabled: false,
        align: 'right',
        style: {
            fontWeight: 'bold',
        }
    },
      title:{
        text: ""
        },
  },
  legend: {
      verticalAlign: 'top',
      enabled: true,
      layout: 'horizontal',
      align: 'right',
      // reversed: true,
      // itemWidth: 93,
      floating:true,
      y: 10,
      itemStyle: {
        color: "#f5f5f5",
        fontWeight: "normal"
      },
      itemHoverStyle: {
        color: "#D3D3D3",
        fontWeight: ""
      },
},
    
    credits: {
      enabled: false,
  },
  tooltip: {
      headerFormat: '<b>{point.x}</b><br/>',
      pointFormatter: function (t) {
        combinedURL = baseURL;
        let x = this.x;
        let y = this.y;
        let IDs = this.series.name === 'Medium' ? mediumIds[this.index]: this.series.name=== 'Critical'? criticalIds[this.index]:this.series.name=== 'High'? highIds[this.index]:lowIds[this.index];
        let newIDs = "(";
        let idCount = 0;
        IDs.map(ele => {
          let id = ele.toString();
          newIDs += id;
          idCount++;
          if (idCount > 0) {
            newIDs += ",";
          }
        });
        newIDs.slice(0, -1);
        newIDs = newIDs.substring(0, newIDs.length - 1);
        newIDs += ")";
        newURL = baseURL.replace("(work_item_ids)", newIDs);
        newURL = newURL.replace("project_id", projID);
        newURL = newURL.replace("organization_name", organization);
        return this.series.name + " " + this.y;
      }
  },
  plotOptions: {
  series: {
    groupPadding: 0.2,
    dataLabels: {
      formatter: function() {
        if(this.y){
          return this.y;
        }
      },
      enabled: true,
      style: {
        textOutline: false,
        fontWeight: 'bold',
        color: '#ffffff',
        fontSize: '12px'
    },       
    },
    stacking: 'normal',
    borderColor: null,
    cursor: "pointer",
        point: {
          events: {
            click: function () {
              if(this.y !== 0){ window.open(newURL, "_blank")};
            }
          }
        }
  }
},
  series: [
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
    
    }]
  };
  return (
    <React.Fragment>
      <ChartHOC options={options} type="column"/>
    </React.Fragment>
  )
}

export default QualityTeamDetails;

