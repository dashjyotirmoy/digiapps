//Wrapper class which contains logic for providing data to the analytical graph components

import Options from "./optionsModel";

class BuildReleaseGraph { 
  constructor(props) {
    this.res = props;
    this.options = this.generateOption(props.type);
  }

  generateOption = type => {
    const baseOptions = new Options();
    let updatedOptions = {};
    switch (type) {
      case "BuildResult":
        updatedOptions = this.generateBuildResultPie(baseOptions);
        return updatedOptions;
      case "MeanTimeMergePullRequest":
        updatedOptions = this.generateMeanMergePullLineHigh(baseOptions);
        return updatedOptions;
      case "ReleaseCadence":
        updatedOptions = this.generateReleaseCadence(baseOptions,type);
        return updatedOptions;
      case "OpenClosedPullRequests":
        updatedOptions = this.generatePullRequestsBarHigh(baseOptions);
        return updatedOptions;
      case "CommittedPrsWithAndWithoutRework":
        updatedOptions = this.generateComittedPrs(baseOptions);
        return updatedOptions;
      case "MeanTimeBrokenBuild":
        updatedOptions = this.generateMeanTimeBrokenBuild(baseOptions);
        return updatedOptions;
      default:
        return null;
    }
  };

  //function that Creates data for Bugs, vulnerabilities and codesmells chart

  generateBuildResultPie(options) {

    const fail_build_count = parseInt(this.res.data.failedBuildCount);
    const success_build_count = parseInt(this.res.data.successfulBuildCount);
    const total_build_count = parseInt(this.res.data.totalBuildCount);

    options.tooltip = {
      pointFormat:
        `{point.name}: {point.y}<br>Total Build Count:${total_build_count}`
    };
    options.chart = {
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
        backgroundColor: this.res.bgTheme ? '#334154c7' :'#E1E7F0',
        color: this.res.bgTheme ? "#f5f5f5":"#333333",
        fontSize: '14px',
        fontWeight:'bold',
        'border-radius': '10px 10px 0 0',
        borderWidth:'2px',
        fontFamily: 'Arial'
      }
    };
    options.xAxis = {
      labels: {
        style: {
          color: this.res.bgTheme ? "#f5f5f5":"#333333",
        }
      },
    };
    options.yAxis = {
      maxPadding: 0.4,
      title: {
        text: ``
      },
      labels: {
        style: {
          color: this.res.bgTheme ? "#f5f5f5":"#333333",
        }
      },
      gridLineColor: ""
    };
    options.plotOptions= {
      pie: {
          shadow: false,
          center: ['50%', '50%'],
          colors: ['#B14891','#9C82D4'],
          borderColor: null,
          dataLabels: {
            connectorWidth: 0
        }
      }
    };
    options.series = [{
      data:[{
        y: fail_build_count,
        name: 'Build Failed'
      },
      {
        y: success_build_count,
        name: 'Build Success',

      }]}
    ];
    return options;
  }

  //function that generates metrics for bugs , vulnerabilites and codesmells
  generateData = rawData => {
    let points_array = [];
    rawData.map(bvc => {
      let point_data = {};
      let rawDate = bvc.date.split("T");
      point_data.x = new Date(rawDate[0]).getTime();
      point_data.y = parseInt(bvc.value);
      point_data.blocker = bvc.blocker;
      point_data.critical = bvc.critical;
      point_data.major = bvc.major;
      point_data.minor = bvc.minor;
      points_array.push(point_data);
    });
    return points_array;
  };
  generateMeanMergePullLineHigh(options,type) {
    let yAxis = [],
     repoName=[],
     meanData= this.res.data,
     averageMergeTime=meanData.averageMergeTime,
     totalPrCount=meanData.totalPRCount;
     meanData.pullRequestDetailDTOList && meanData.pullRequestDetailDTOList.map((item)=>{
      yAxis.push(parseInt(item.meanMergeTime));
      repoName.push(item.repoName);
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
        backgroundColor: this.res.bgTheme ? '#334154c7' :'#E1E7F0',
        color: this.res.bgTheme ? "#f5f5f5":"#333333",
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
      <span style="margin-right:10px"><span style="font-size: 16px"><b>${averageMergeTime}hrs</b></span><b style="margin-left:10px">Average time taken across repos</b></span>
      <span style="margin-right:10px"><span style="font-size: 16px"><b>${totalPrCount}</b></span><b style="margin-left:5px">Total no. of PRs</b></span>
      </div>`,
      style: {
        color: this.res.bgTheme ? "#f5f5f5":'#333333',
      }
    };
    options.xAxis = {
      type: "datetime",
      categories: repoName,
      labels: {
        style: {
          color: this.res.bgTheme ? "#f5f5f5":"#333333",
        }
      },
      dateTimeLabelFormats: {
        day: "%b %e"
      },
      lineWidth: 0,
      tickLength: 0,
      style: {
        color: this.res.bgTheme ? "#f5f5f5":"#333333",
      }
    };
    options.yAxis = {
      maxPadding: 0.4,
      gridLineColor: "",
      labels: {
        enabled: true,
        format: "{value}",
        style: {
          color: this.res.bgTheme ? "#f5f5f5":"#333333",
        }
      },
      title: {
        text: ``,
        rotation: 0
      }
    };
    options.legend = {
      enabled: true,
      itemStyle: {
        color: this.res.bgTheme ? "#f5f5f5":"#333333",
        fontWeight: "bold"
      },
      itemHoverStyle: {
        color: this.res.bgTheme ? "#D3D3D3":"#333333",
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
            return `${this.series.name}:${this.options.y}`;
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
  generateReleaseCadence(options,type) {
    let yAxis = [],
     repoName=[],
     hour=0,
     day=0,
     meanData= this.res.data;
     function dayHour(time){
          hour = time;
          day = 0;
      if (hour>24){
          day = parseInt(hour / 24);
          hour = parseInt(hour % 24);
          yAxis.push(parseFloat(day+'.'+hour));
      }else{
          hour = parseInt(hour);
          yAxis.push(hour);
      }
     };
     meanData && meanData.map((item)=>{
      dayHour(parseInt(item.timeTaken));
      repoName.push(item.releaseName);
    });
    options.chart = {
      type: "bar",
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
          color: this.res.bgTheme ? "#f5f5f5":"#333333",
        }
      },
      dateTimeLabelFormats: {
        day: "%b %e"
      },
      lineWidth: 0,
      tickLength: 0,
      style: {
        color: this.res.bgTheme ? "#f5f5f5":"#333333",
      }
    };
    options.yAxis = {
      maxPadding: 0.4,
      gridLineColor: "",
      labels: {
        enabled: true,
        format: "{value}",
        style: {
          color: this.res.bgTheme ? "#f5f5f5":"#333333",
        }
      },
      title: {
        text: ``,
        rotation: 0
      }
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
        backgroundColor: this.res.bgTheme ? '#334154c7' :'#E1E7F0',
        color: this.res.bgTheme ? "#f5f5f5":"#333333",
        fontSize: '14px',
        fontWeight:'bold',
        'border-radius': '10px 10px 0 0',
        borderWidth:'2px',
        fontFamily: 'Arial'
      }
    };
    options.plotOptions = {
      series:{
        cursor: "pointer",
        point: {
            events: {
              click: function () {
                if(this.y !== 0){ 
                  console.log(this)
                  // window.open(newURL, "_blank")
                };
              }
            }
          }
      },
    };
    options.legend = {
      enabled: true,
      itemStyle: {
        color: this.res.bgTheme ? "#f5f5f5":"#333333",
        fontWeight: "bold"
      },
      itemHoverStyle: {
        color: this.res.bgTheme ? "#D3D3D3":"#333333",
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
            return `${Math.floor(this.options.y)} days ${(Math.floor(this.options.y*100)%100)} hours<br/>`;
          }
    };
    options.series = [
      {
        name: "Time Taken",
        data: yAxis,
        color: "#5173CE",
      },
    ];
    return options;
  }

  // function that generates data for Average defect resolution time

  generateMeanTimeBrokenBuild(options) {debugger
    let xAxis = [],
        yAxis= [];
    this.res.data.brokenBuildList && this.res.data.brokenBuildList.map(data => {
      xAxis.push(parseFloat(data.buildNumber));
      yAxis.push(parseInt(data.meanFixTime));
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
        backgroundColor: this.res.bgTheme ? '#334154c7' :'#E1E7F0',
        color: this.res.bgTheme ? "#f5f5f5":"#333333",
        fontSize: '14px',
        fontWeight:'bold',
        'border-radius': '10px 10px 0 0',
        borderWidth:'2px',
        fontFamily: 'Arial'
      }    
    };
    options.xAxis = {
      categories: xAxis,
      // style: {
      //   color: this.res.bgTheme ? "#f5f5f5":"#333333",
      // },
      labels: {
        style: {
          color: this.res.bgTheme ? "#f5f5f5":"#333333",
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
        color: this.res.bgTheme ? "#f5f5f5":"#333333",
        fontWeight: "bold"
      },
      itemHoverStyle: {
        color: this.res.bgTheme ? "#D3D3D3":"#333333",
      },
    };
    options.yAxis = {
      min: 0,
      // max: 15,
      maxPadding: 0.4,
      tickInterval: 2,
      gridLineColor: "transparent",
      title: {
        text: ``,
        rotation: 0
      },
      labels: {
        format: "{value}",
        style: {
          color: this.res.bgTheme ? "#f5f5f5":"#333333"
        }
      },
      lineColor: "blue",
      stackLabels: {
        enabled: false
      }
    };
    options.tooltip = {
      pointFormatter: function (t) {debugger
        return `${this.series.name}:${this.point.y}`;
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
        name: "Broken Build",
        data: yAxis,
        color: "#7d12ff",
        borderWidth: 0
      }
    ];
    return options;
  }
  generateComittedPrs(options) {
  let reWorkedPrCount=[],
  prCount = [],
  xAxis_data=[];
  this.res.data.pullRequestDetailDTOList.map((data, index) => {
    xAxis_data.push(data.repoName);
    reWorkedPrCount.push(parseInt(data.reworkedPRCount));
    prCount.push(parseInt(data.prCount));
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
    backgroundColor: this.res.bgTheme ? '#334154c7' :'#E1E7F0',
    color: this.res.bgTheme ? '#ffffff':"#2E2E38",
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
      color: this.res.bgTheme ? "#f5f5f5":'#333333',
    }
    // format: "Sprint {value}"
  }
};

options.yAxis = {
  min: 0,
  // max: 160,
  maxPadding: 0.4,
  gridLineColor: "transparent",
  tickInterval: 20,
  title: {
    text: ``,
    style: {
      color: this.res.bgTheme ? "#f5f5f5":'#333333',
    }
  },
  labels: {
    style: {
      color: this.res.bgTheme ? "#f5f5f5":'#333333',
    },
    format: "{value}"
  },
  lineColor: "blue",
  stackLabels: {
    enabled: false
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
    color: this.res.bgTheme ? "#ffffff":'#333333',
    fontWeight: "normal"
  },
  itemHoverStyle: {
    color: this.res.bgTheme ? "#d3d3d3":'#333333',
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

  column: {
    pointPadding: 0.2,
    borderWidth: 0
  }
};

options.series = [
  {
    name: "ReWorked PR Count",
    data: reWorkedPrCount,
    color: "#3185ab",
  },
  {
    name: "PR Count",
    data: prCount,
    color: "#ad5a5d",
  },
];

return options;
}


  //function that creates data for Bar chart
  generatePullRequestsBarHigh(options) {
    let open_pr_details = [],
      close_pr_details = [],
      repoName = [],
      IDsData=this.res.data.pullRequestDetailDTOList;
      IDsData.map(item=> {
        open_pr_details.push(parseInt(item.openPRDetail.count));
        close_pr_details.push(parseInt(item.closedPRDetail.count));
        repoName.push(item.repoName);
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
        backgroundColor: this.res.bgTheme ? '#334154c7' :'#E1E7F0',
        color: this.res.bgTheme ? "#f5f5f5":"#333333",
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
        enabled: false
      },
      title: {
        text: ``,
        rotation: 0
      },
      gridLineWidth: 0
    };
    options.xAxis = {
      tickWidth: 0,
      tickLength: 0,
      categories: repoName,
      labels: {
        style: {
          color: this.res.bgTheme ? "#f5f5f5":"#333333",
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
        color: this.res.bgTheme ? "#f5f5f5":"#333333",
        fontWeight: "bold"
      },
      itemHoverStyle: {
        color: this.res.bgTheme ? "#d3d3d3":"#333333",
      },
    };
    options.plotOptions = {
      series: {
        stacking: "normal",
        pointWidth: 20,
        cursor: "pointer",        
      },
    };
    options.series = [
      {
        name: "Open PR",
        data: open_pr_details,
        color: "#20c997"
      },
      {
        name: "Closed PR",
        data:  close_pr_details,
        color: "#ffc107"
      }
    ];
    return options;
  }
}

export default BuildReleaseGraph;
