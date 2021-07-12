//Wrapper class which contains logic for providing data to the analytical graph components

import Options from "./optionsModel";
import store from '../../store/store';
class BuildReleaseGraph {
  
  constructor(props) {
    this.res = props;
    this.options = this.generateOption(props.type);
  }
  
  generateOption = type => {
    const baseOptions = new Options();
    const bgTheme = store.getState().chartData.currentTheme;
    let updatedOptions = {};
    switch (type) {
      case "BuildResult":
        updatedOptions = this.generateBuildResultPie(baseOptions,bgTheme);
        return updatedOptions;
      case "MeanTimeMergePullRequest":
        updatedOptions = this.generateMeanMergePullLineHigh(baseOptions,bgTheme);
        return updatedOptions;
      case "ReleaseCadence":
        updatedOptions = this.generateReleaseCadence(baseOptions,bgTheme);
        return updatedOptions;
      case "OpenClosedPullRequests":
        updatedOptions = this.generatePullRequestsBarHigh(baseOptions,bgTheme);
        return updatedOptions;
      case "CommittedPrsWithAndWithoutRework":
        updatedOptions = this.generateComittedPrs(baseOptions,bgTheme);
        return updatedOptions;
      case "MeanTimeBrokenBuild":
        updatedOptions = this.generateMeanTimeBrokenBuild(baseOptions,bgTheme);
        return updatedOptions;
      default:
        return null;
    }
  };

  //function that Creates data for Bugs, vulnerabilities and codesmells chart

  generateBuildResultPie(options,bgTheme) {
    const fail_build_count = parseInt(this.res.data.failedBuildCount);
    const success_build_count = parseInt(this.res.data.successfulBuildCount);
    const total_build_count = parseInt(this.res.data.totalBuildCount);
    options.chart = {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
    };
    options.title = {
      useHTML: true,
      text: `<h6 style="display:block;font-weight:bold;margin-bottom:0px">${this.res.title}</h6>`,
      align: "left",
      x:-8,
      y:5,
      width: this.res.containerWidth,
      style: {
        width:'100%',
        padding: '17px 9px',
        backgroundColor: bgTheme === 'dark' ? '#334154c7' :'#E1E7F0',
        color: bgTheme === 'dark' ? "#f5f5f5":"#333333",
        fontSize: '14px',
        fontWeight:'bold',
        'border-radius': '10px 10px 0 0',
        borderWidth:'2px',
        fontFamily: 'Arial'
      }
    };
    options.legend = {
      enabled: true,
      itemStyle: {
        color: bgTheme === 'dark' ? "#f5f5f5":"#333333",
        fontWeight: "bold"
      },
      itemHoverStyle: {
        color: bgTheme === 'dark' ? "#D3D3D3":"#333333",
        fontWeight: ""
      },
      backgroundColor: "transparent",
      floating: true,
      verticalAlign: 'top',
      align: 'right',
      x: -30,
      y: 48,
    };
    options.tooltip = {
      pointFormat:
        `{series.name}: {point.y}<br>Total Build Count:${total_build_count}`
    };
    options.plotOptions= {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        size: 150,
        dataLabels: {
            enabled: false
        },
        showInLegend: true
      }
    };
    options.series = 
    [{
      name: 'Count',
      colorByPoint: true,
      data:[
        {
          name: 'Build Success',
          y: success_build_count,
          color:'#20c997',
          sliced: true,
          selected: true
        },{
        name: 'Build Failed',
        y: fail_build_count,
        color:'#ec5050'
      },
      ]}
    ];
    return options;
  }

  //function that generates metrics for bugs , vulnerabilites and codesmells
  generateMeanMergePullLineHigh(options,bgTheme) {
    let yAxis = [],
     repoName=[],
     hour=0,
     day=0,
     meanData= this.res.data,
     averageMergeTime=parseFloat(meanData.averageMergeTime).toFixed(2),
     totalPrCount=meanData.totalPRCount;
     function dayHour(time){
      hour = time;
      day = 0;
        if (hour>24){
            day = parseInt(hour / 24) +' '+'days';
            hour = parseInt(hour % 24)+' '+'hours';
            return (day +" "+ hour);
        }else{
            day='';
            hour = parseFloat(hour).toFixed(2)+' '+'hours';
            return (day +" "+ hour);
        }
      };
     meanData.pullRequestDetailDTOList && meanData.pullRequestDetailDTOList.map((item)=>{
      if(parseFloat(item.meanMergeTime) !== 0.0){
        yAxis.push(parseFloat(item.meanMergeTime));
        repoName.push(item.repoName);
      }
    });
    options.chart = {
      height: 0,
      backgroundColor: ""
    };
    options.title = {
      useHTML: true,
      text: `<h6 style="display:block;font-weight:bold;margin-bottom:0px">${this.res.title}</h6>`,
      align: "left",
      x:-8,
      y:5,
      width: this.res.containerWidth-4,
      style: {
        width:'100%',
        padding: '17px 9px',
        backgroundColor: bgTheme === 'dark' ? '#334154c7' :'#E1E7F0',
        color: bgTheme === 'dark' ? "#f5f5f5":"#333333",
        fontSize: '14px',
        fontWeight:'bold',
        'border-radius': '10px 10px 0 0',
        borderWidth:'2px',
        fontFamily: 'Arial'
      }
    };
    options.subtitle = {
      verticalAlign: 'bottom',
      align: 'left',
      x:-8,
      y:26,
      width: this.res.containerWidth,
      useHTML: true,
      text: `
      <div>
      <span style="margin-right:10px"><span style="font-size: 16px"><b>${dayHour(averageMergeTime)}</b></span><b style="margin-left:10px;color:#ffa500">Average Time</b></span>
      <span style="margin-right:10px"><span style="font-size: 16px"><b>${totalPrCount}</b></span><b style="margin-left:5px">Total PRs</b></span>
      </div>`,
      style: {
        color: bgTheme === 'dark' ? "#f5f5f5":'#333333',
      }
    };
    options.xAxis = {
      type: "datetime",
      categories: repoName,
      labels: {
        style: {
          width:'50px',
          color: bgTheme === 'dark' ? "#f5f5f5":"#333333",
        }
      },
      title: {
        text: `Repository Name`,
        rotation: 0,
        style: {
          color: bgTheme === 'dark' ? "#f5f5f5":'#333333',
        }
      },
      lineWidth: 0,
      tickLength: 0,
      style: {
        color: bgTheme === 'dark' ? "#f5f5f5":"#333333",
      }
    };
    options.yAxis = {
      maxPadding: 0.4,
      gridLineColor: "",
      labels: {
        enabled: true,
        format: "{value}",
        style: {
          color: bgTheme === 'dark' ? "#f5f5f5":"#333333",
        }
      },
      title: {
        text: `Average Merge Time`,
        rotation: -90,
        style: {
          color: bgTheme === 'dark' ? "#f5f5f5":'#333333',
        }
      },
      plotLines: [{
        color: '#ffa500',
        value: averageMergeTime,
        width: '1',
        zIndex: 4,
        dashStyle: 'dash',
        label: {
          text: averageMergeTime+'hrs',
          style: {
            color: bgTheme === 'dark' ? "#f5f5f5":'#333333',
          }
        },
    }]
    };
    options.legend = {
      enabled: true,
      itemStyle: {
        color: bgTheme === 'dark' ? "#f5f5f5":"#333333",
        fontWeight: "bold"
      },
      itemHoverStyle: {
        color: bgTheme === 'dark' ? "#D3D3D3":"#333333",
        fontWeight: ""
      },
      backgroundColor: "transparent",
      floating: true,
      verticalAlign: 'top',
      align: 'right',
      x: -30,
      y: 48,
    };
    options.tooltip= {
      pointFormatter: function (t) {
        dayHour(this.y);
            return `${this.series.name}: ${day} ${hour}`;
          }
    };
    options.series = [
      {
        name: "Mean Merge Time",
        data: yAxis,
        type: "line",
        marker: {
          enabled: true
        },
        color: "#9EF988",
      },
    ];
    return options;
  }
  generateReleaseCadence(options,bgTheme) {
    let yAxis = [],
     repoName=[],
     hour=0,
     day=0,
     releaseCadence=[],
     userStory=[],
     pullRequest=[],
     averageTime=parseFloat(this.res.data.averageTimeTaken).toFixed(2),
     meanData= this.res.data.releaseCadenceDTOList;
     function dayHour(time){
          hour = time;
          day = 0;
      if (hour>24){
          day = parseInt(hour / 24) +' '+'days';
          hour = parseInt(hour % 24)+' '+'hours';
          return (day +" "+ hour);
      }else{
          day='';
          hour = parseFloat(hour).toFixed(2)+' '+'hours';
          return (day+" "+hour);
      }
     };
     meanData && meanData.map((item)=>{
      releaseCadence.push({'y':parseInt(item.timeTaken),'url':item.url});
      userStory.push(parseInt(item.linkedUserStoryCount));
      pullRequest.push(parseInt(item.linkedPullRequestCount));
      repoName.push(item.releaseName);
    });
    options.chart = {
      scrollablePlotArea: {
        minWidth: 300,
        scrollPositionX: 2,
        opacity: 1
    }
    };
    options.xAxis = {
      type: "datetime",
      categories: repoName,
      labels: {
        style: {
          color: bgTheme === 'dark' ? "#f5f5f5":"#333333",
        }
      },
      lineWidth: 0,
      tickLength: 0,
      style: {
        color: bgTheme === 'dark' ? "#f5f5f5":"#333333",
      },
      title: {
        text: `Release Name`,
        rotation: 0,
        style: {
          color: bgTheme === 'dark' ? "#f5f5f5":'#333333',
        }
      },
    };
    options.yAxis = {
      maxPadding: 0.4,
      gridLineColor: "",
      labels: {
        enabled: true,
        format: "{value}",
        style: {
          color: bgTheme === 'dark' ? "#f5f5f5":"#333333",
        }
      },
      title: {
        text: `Time Taken`,
        rotation: -90,
        style: {
          color: bgTheme === 'dark' ? "#f5f5f5":"#333333",
        }
      },
      plotLines: [{
        color: '#ffa500',
        value: averageTime,
        width: '1',
        zIndex: 4,
        dashStyle: 'dash',
        label: {
          text: averageTime,
          style: {
            color: bgTheme === 'dark' ? "#f5f5f5":'#333333',
          }
        },
        line: {
          dataLabels: {
            enabled: true
          },
        }
      }],
    };
    options.title = {
      useHTML: true,
      text: `<h6 style="display:block;font-weight:bold;margin-bottom:0px">${this.res.title}</h6>`,
      align: "left",
      x:-8,
      y:5,
      width: this.res.containerWidth,
      style: {
        width:'100%',
        padding: '17px 9px',
        backgroundColor: bgTheme === 'dark' ? '#334154c7' :'#E1E7F0',
        color: bgTheme === 'dark' ? "#f5f5f5":"#333333",
        fontSize: '14px',
        fontWeight:'bold',
        'border-radius': '10px 10px 0 0',
        borderWidth:'2px',
        fontFamily: 'Arial'
      }
    };
    options.plotOptions= {
  };
  options.subtitle = {
    verticalAlign: 'bottom',
    align: 'left',
    x:-8,
    y:26,
    width: this.res.containerWidth,
    useHTML: true,
    text: `
    <div>
    <span style="margin-right:10px"><span style="font-size: 16px"><b>${dayHour(averageTime)}</b></span><b style="margin-left:10px;color:#ffa500">Average Time</b></span>
    </div>`,
    style: {
      color: bgTheme === 'dark' ? "#f5f5f5":'#333333',
    }
  };
    options.legend = {
      enabled: true,
      itemStyle: {
        color: bgTheme === 'dark' ? "#f5f5f5":"#333333",
        fontWeight: "bold"
      },
      itemHoverStyle: {
        color: bgTheme === 'dark' ? "#D3D3D3":"#333333",
        fontWeight: ""
      },
      backgroundColor: "transparent",
      floating: true,
      verticalAlign: 'top',
      align: 'right',
      x: -30,
      y: 48,
    };
    options.tooltip= {
      enabled: true,
      formatter: function (t) {
            dayHour(this.y);
            return `${this.x}<br>${this.series.name}: ${day} ${hour}
            <br>Linked User Story: ${userStory[this.point.index]}<br>
            Linked Pull Request: ${pullRequest[this.point.index]}`;
          },
    };
    options.series = [
      {
        type: "column",
        name: "Time Taken",
        data: releaseCadence,
        color: "#5173CE",
        cursor: 'pointer',
            point: {
                events: {
                    click: function () {
                        window.open(this.options.url, '_blank');
                    }
                }
            }
      },
      {
        name: "",
        data: userStory,
        visible: false,
        showInLegend: false,
        
      },
      {
        name: "",
        data: pullRequest,
        showInLegend: false,
        visible: false,
      },
    ];
    return options;
  }

  // function that generates data for Average defect resolution time

  generateMeanTimeBrokenBuild(options,bgTheme) {
    let xAxis = [],
        yAxis= [],
        buildData=[],
        recoveryAttemptCount=[],
        hour=0,
        day=0,
        numberOfAttempts = this.res.data.numberOfAttempts===null ? 0:parseInt(this.res.data.numberOfAttempts),
        timeTaken = this.res.data.averageFixTime===null ? 0:parseInt(this.res.data.averageFixTime),
        recoveryAttempt = this.res.data.brokenBuildList;
        function dayHour(time){
          hour = time;
          day = 0;
          if (hour>24){
            day = parseInt(hour / 24) +' '+'days';
            hour = parseInt(hour % 24)+' '+'hours';
            return (day +" "+ hour);
        }else{
            day='';
            hour = parseInt(hour)+' '+'hours';
            return (day +" "+ hour);
        }
        };
        recoveryAttempt && recoveryAttempt.map(data => {
          xAxis.push(parseFloat(data.buildNumber));
          buildData.push(parseInt(data.meanFixTime));
          recoveryAttemptCount.push(parseInt(data.recoveryAttemptCount));
        });
    options.chart = {
      type: "column",
      height: 0,
      //backgroundColor: ""
    };
    options.title = {
      useHTML: true,
      text: `<h6 style="display:block;font-weight:bold;margin-bottom:0px">${this.res.title}</h6>`,
      align: "left",
      x:-8,
      y:5,
      width: this.res.containerWidth,
      style: {
        width:'100%',
        padding: '17px 9px',
        backgroundColor: bgTheme === 'dark' ? '#334154c7' :'#E1E7F0',
        color: bgTheme === 'dark' ? "#f5f5f5":"#333333",
        fontSize: '14px',
        fontWeight:'bold',
        'border-radius': '10px 10px 0 0',
        borderWidth:'2px',
        fontFamily: 'Arial'
      }    
    };
    options.subtitle = {
      verticalAlign: 'bottom',
      align: 'left',
      x:-8,
      y:26,
      width: this.res.containerWidth,
      useHTML: true,
      text: `
      <div>
      <span style="margin-right:10px"><span style="font-size: 16px"><b>${numberOfAttempts}</b></span><b style="margin-left:10px">Total Attempts</b></span>
      <span style="margin-right:10px"><span style="font-size: 16px"><b>${dayHour(timeTaken)}</b></span><b style="margin-left:10px;color:#ffa500">Average Time</b></span>
      </div>`,
      style: {
        color: bgTheme === 'dark' ? "#f5f5f5":'#333333',
      }
    };
    options.xAxis = {
      categories: xAxis,
      title: {
        text: `Build Number`,
        style: {
          color: bgTheme === 'dark' ? "#f5f5f5":'#333333',
        }
      },
      labels: {
        style: {
          color: bgTheme === 'dark' ? "#f5f5f5":"#333333",
        }
      }
    };
    options.legend = {
      enabled: true,      
      backgroundColor: "transparent",
      floating: true,
      verticalAlign: 'top',
      align: 'right',
      x: -30,
      y: 48,
      itemStyle: {
        color: bgTheme === 'dark' ? "#f5f5f5":"#333333",
        fontWeight: "bold"
      },
      itemHoverStyle: {
        color: bgTheme === 'dark' ? "#D3D3D3":"#333333",
      },
    };
    options.yAxis = {
      maxPadding: 0.4,
      gridLineColor: "transparent",
      plotLines: [{
        color: '#ffa500',
        value: timeTaken,
        width: '1',
        zIndex: 4,
        dashStyle: 'dash',
        label: {
          text: timeTaken,
          style: {
            color: bgTheme === 'dark' ? "#f5f5f5":'#333333',
          }
        },
        line: {
          dataLabels: {
            enabled: true
          },
        }
      }],
      title: {
        text: `Average Time`,
        rotation: -90,
        style: {
          color: bgTheme === 'dark' ? "#f5f5f5":'#333333',
        }
      },
      labels: {
        format: "{value}",
        style: {
          color: bgTheme === 'dark' ? "#f5f5f5":"#333333"
        }
      },
      lineColor: "blue",
      stackLabels: {
        enabled: false
      }
    };
    options.tooltip = {
      pointFormatter: function () {
        dayHour(this.y);
        return `${this.series.name}: ${day} ${hour}<br>Recovery Attempts: ${recoveryAttemptCount[this.index]}`;
      }
    };
    options.plotOptions = {
      column: {
        stacking: "normal",
        dataLabels: {
          enabled: false
        }
      },
      series: {
        borderRadius: 6
      }
    };

    options.series = [
      {
        name: "Mean Time",
        data: buildData,
        color: "#7d12ff",
        borderWidth: 0
      },     
    ];
    return options;
  }
  generateComittedPrs(options,bgTheme) {
  let reWorkedPrCount=[],
  prCount = [],
  xAxis_data=[],
  comittedData= this.res.data.pullRequestDetailDTOList;
  comittedData && comittedData.map((data) => {
    if(data.prCount!=="0" || data.reworkedPRCount!=="0"){
      xAxis_data.push(data.repoName);
      prCount.push(parseInt(data.prCount));
      reWorkedPrCount.push(parseInt(data.reworkedPRCount));
    }
  });
options.chart = {
  height: 0,
  backgroundColor: ""
};

options.credits = {
  enabled: false
};

options.title = {
  useHTML: true,
  text: `<h6 style="display:block;font-weight:bold;margin-bottom:0px">${this.res.title}</h6>`,
  align: "left",
  x:-8,
  y:5,
  width: this.res.containerWidth,
  style: {
    width:'100%',
    padding: '17px 9px',
    backgroundColor: bgTheme === 'dark' ? '#334154c7' :'#E1E7F0',
    color: bgTheme === 'dark' ? '#ffffff':"#2E2E38",
    fontSize: '14px',
    fontWeight:'bold',
    'border-radius': '10px 10px 0 0',
    borderWidth:'2px',
    fontFamily: 'Arial'
  }
};

options.xAxis = {
  lineWidth: 0,
  tickLength: 0,
  categories: xAxis_data,
  labels: {
    style: {
      color: bgTheme === 'dark' ? "#f5f5f5":'#333333',
    }
  },
  title: {
    text: `Repository Name`,
    rotation: 0,
    style: {
      color: bgTheme === 'dark' ? "#f5f5f5":'#333333',
    }
  },
};

options.yAxis = {
  maxPadding: 0.4,
  gridLineColor: "transparent",
  title: {
    text: `PR Count`,
    rotation: -90,
    style: {
      color: bgTheme === 'dark' ? "#f5f5f5":'#333333',
    }
  },
  labels: {
    style: {
      color: bgTheme === 'dark' ? "#f5f5f5":'#333333',
    },
    format: "{value}"
  },
};

options.legend = {
  enabled: true,
  backgroundColor: "transparent",
  floating: true,
  verticalAlign: 'top',
  align: 'right',
  x: 0,
  y: 40,
  itemStyle: {
    color: bgTheme === 'dark' ? "#ffffff":'#333333',
    fontWeight: "normal"
  },
  itemHoverStyle: {
    color: bgTheme === 'dark' ? "#d3d3d3":'#333333',
  },
  
};

options.tooltip = {
  formatter: function () {
    return `${this.x}<br>${this.series.name}: ${this.point.y}`;
  }
};
options.plotOptions = {
  series: {
    borderRadius: 6,
    pointWidth: 10
  },
};

options.series = [
  {
    name: "PR without rework",
    data: prCount,
    color: '#20c997',
  },
  {
    name: "PR with Rework",
    data: reWorkedPrCount,
    color: '#ec5050',
  }  
];

return options;
}


  //function that creates data for Bar chart
  generatePullRequestsBarHigh(options,bgTheme) {
    let open_pr_details = [],
      close_pr_details = [],
      repoName = [],
      IDsData=this.res.data.pullRequestDetailDTOList;
      IDsData.map(item=> {
        if(item.closedPRDetail.count !== "0" || item.openPRDetail.count !== "0"){
        repoName.push(item.repoName);
        close_pr_details.push({'y':parseInt(item.closedPRDetail.count),'url':item.closedPRDetail.url});
        open_pr_details.push({'y': parseInt(item.openPRDetail.count),'url':item.openPRDetail.url});
      }
    });
    options.chart = {
      type: "column",
      //backgroundColor: ""
    };
    options.title = {
      useHTML: true,
      text: `<h6 style="display:block;font-weight:bold;margin-bottom:0px">${this.res.title}</h6>`,
      align: "left",
      x:-8,
      y:5,
      width: this.res.containerWidth,
      style: {
        width:'100%',
        padding: '17px 9px',
        backgroundColor: bgTheme === 'dark' ? '#334154c7' :'#E1E7F0',
        color: bgTheme === 'dark' ? "#f5f5f5":"#333333",
        fontSize: '14px',
        fontWeight:'bold',
        'border-radius': '10px 10px 0 0',
        borderWidth:'2px',
        fontFamily: 'Arial'
      }
    };
    options.yAxis = {
      maxPadding: 0.4,
      labels: {
        enabled: true,
        style: {
          color: bgTheme === 'dark' ? "#f5f5f5":"#333333",
        }
      },
      title: {
        text: `PR Count`,
        rotation: 0,
        style: {
          color: bgTheme === 'dark' ? "#f5f5f5":"#333333",
        }
      },
      gridLineWidth: 0
    };
    options.xAxis = {
      tickWidth: 0,
      tickLength: 0,
      categories: repoName,
      title: {
        text: `Repository Name`,
        rotation: -90,
        style: {
          color: bgTheme === 'dark' ? "#f5f5f5":"#333333",
        }
      },
      labels: {
        style: {
          color: bgTheme === 'dark' ? "#f5f5f5":"#333333",
        }
      },
    };

    options.legend = {
      enabled: true,
      reversed: true,    
      backgroundColor: "transparent",
      floating: true,
      verticalAlign: 'top',
      align: 'right',
      x: -30,
      y: 48,
      itemStyle: {
        color: bgTheme === 'dark' ? "#f5f5f5":"#333333",
        fontWeight: "bold"
      },
      itemHoverStyle: {
        color: bgTheme === 'dark' ? "#d3d3d3":"#333333",
      },
    };
    options.plotOptions = {
      series: {
        stickyTracking: true,
        stacking: "normal",
        pointWidth: 20,
        cursor: "pointer",        
      },
    };
    options.series = [
      {
        name: "Open PR",
        data: open_pr_details,
        color: "#ffc107",
        tooltip: {
          pointFormat: `{point.name}<br>{point.series.name}:<b>{point.y}{point.data}`,
       },
       cursor: 'pointer',
            point: {
                events: {
                    click: function () {
                        window.open(this.options.url, '_blank');
                    }
                }
            }
      },
      {
        name: "Closed PR",
        data:  close_pr_details,
        color: "#20c997",
        tooltip: {
          pointFormat: `{point.name}<br>{point.series.name}:<b>{point.y}`,
       },
       cursor: 'pointer',
            point: {
                events: {
                    click: function () {
                        window.open(this.options.url, '_blank');
                    }
                }
            }
      }     
    ];
    return options;
  }
}

export default BuildReleaseGraph;
