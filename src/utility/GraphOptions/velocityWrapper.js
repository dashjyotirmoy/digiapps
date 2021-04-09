import Options from "./optionsModel";
import { faGreaterThanEqual } from "@fortawesome/free-solid-svg-icons";


let controlChartYAxisMaxLimit = 0;
let bugsYAxisMaxLimit = 0;
let userStoryYAxisMaxLimit = 0;
let sprintStartBand;
let sprintEndBand;

class VelocityGraph {
  constructor(props) {
    this.res = props;
    this.options = this.generateOption(props.type);
  }



  generateOption = type => {
    const baseOptions = new Options();
    let updatedOptions = {};
    switch (type) {
      case "ControlChartHigh":
        updatedOptions = this.generateControlChart(baseOptions);
        return updatedOptions;
      case "BuildResult":
        updatedOptions = this.generateBuildResults(baseOptions);
        return updatedOptions;
        case "VelocityTrends":
        updatedOptions = this.generateVelocityTrends(baseOptions);
        return updatedOptions;
      case "SprintBurndown":
        updatedOptions = this.generateSprintBurnDown(baseOptions);
        return updatedOptions;
      case "ProjectBurnDown":
        updatedOptions = this.generateProjectBurnDown(baseOptions);
        return updatedOptions;
      default:
        return null;
    }
  };

  formatDate(preFormatDate) {
    let splitDate, postFormatDate;
    let monthsArray = [
      "Jan",
      "Feb",
      "Mar",
      "April",
      "May",
      "June",
      "July",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec"
    ];
    splitDate = (preFormatDate!=="" && preFormatDate!==undefined)?preFormatDate.split("-"):"";
    postFormatDate = splitDate!=="" ?
      splitDate[2] + " " + monthsArray[splitDate[1] - 1] + " " + splitDate[0]:"";
    return postFormatDate;
  }

  rolling_average_output = rolling_average_temp => {
    let output_dynamic = [];

    rolling_average_temp.forEach(function (item) {
      let existing = output_dynamic.filter(function (ele, i) {
        return ele.date === item.date;
      });
      if (existing.length) {
        let existingIndex = output_dynamic.indexOf(existing[0]);
        output_dynamic[existingIndex].days = output_dynamic[
          existingIndex
        ].days.concat(item.days);
      } else {
        item.days = [item.days];
        output_dynamic.push(item);
      }
    });
    return output_dynamic;
  };

  //function that Creates data for Control charts


  generateControlChart(options) {

    let userStory = [],
      combinedURL,
      baseURL =
        "https://dev.azure.com/organization_name/project_id/_queries/query/?wiql=SELECT [System.Id]%2C[System.WorkItemType]%2C[System.Title] FROM WorkItems WHERE [System.Id] IN (work_item_ids)&name=Cycle time work items",
      bugs = [],
      IDs = [],
      projID = this.res.projID,
      organization = this.res.organization,
      newURL,
      userStoryPoints = [],
      bugsPoints = [],
      rawDate,
      average = 0,
      total,
      total_point_array = [],
      total_point_array_temp = [],
      rolling_average_temp = [],
      rollingAvgData = [],
      rolling_period,
      rollingAvgData_copy = [];


    //block to separate user story and bug data from the response
    this.res.data.map(series => {
      if (series.name === "userStory") {
        if (series.values.length > 0) {
          series.values.map(data => {
            userStory.push([data.endDate, data.difference]);
          });
        }


      } else {
        if (series.values.length > 0) {
          series.values.map(data => {
            bugs.push([data.endDate, data.difference]);
          });
        }
      }
    });
    if (userStory.length > 0) {
      userStory = userStory.map(issue => {
        rawDate = issue[0].split("T");
        issue[1] = parseInt(issue[1]);
        issue[0] = new Date(rawDate[0]).getTime();
        average += issue[1];
        return issue;
      });
    }

    if (bugs.length > 0) {
      bugs = bugs.map(bug => {
        rawDate = bug[0].split("T");
        bug[1] = parseInt(bug[1]);
        bug[0] = new Date(rawDate[0]).getTime();
        average += bug[1];
        return bug;
      });
    }

    total_point_array = [...userStory];
    total_point_array = total_point_array.concat(bugs);
    total_point_array.sort((a, b) => a[0] - b[0]);

    total_point_array_temp = [...total_point_array];
    rolling_average_temp = total_point_array_temp.map(item => {
      return {
        date: item[0],
        days: item[1]
      };
    });

    const output_dynamic = this.rolling_average_output(rolling_average_temp);

    output_dynamic.map(data => {
      let local_data = [];
      local_data[0] = data.date;
      local_data = [...local_data, ...data.days];
      rollingAvgData.push(local_data);
    });

    for (let i = 1; i < rollingAvgData.length; i++) {
      let present_date = rollingAvgData[i],
        past_date = rollingAvgData[i - 1];
      let date_difference_temp = (present_date[0] - past_date[0]) / 86400000;
      if (date_difference_temp > 1) {
        let missing_date_index = i;
        for (let j = 1; j < date_difference_temp; j++) {
          rollingAvgData.splice(missing_date_index, 0, [
            past_date[0] + 86400000 * j,
            0
          ]);
          missing_date_index++;
        }
      }
    }

    let rollingAvgData_length = rollingAvgData.length;

    if (rollingAvgData_length >= 1) {
      rolling_period = Math.round(rollingAvgData_length / 5);
    }

    rollingAvgData_copy = [...rollingAvgData];
    //temp roll average and std. dev. Calculation
    let roll_average_temp = [],
      std_temp = [];

    for (let i = 0; i < rollingAvgData_copy.length; i++) {
      let totalSum = 0,
        local_index = i,
        total_points = 0,
        roll_mean;
      // roll. average calculation
      for (let j = 0; j < rolling_period && local_index - j >= 0; j++) {
        let rollingItem = JSON.parse(
          JSON.stringify(rollingAvgData_copy[local_index - j])
        );
        for (let k = 1; k < rollingItem.length; k++) {
          totalSum = totalSum + rollingItem[k];
          total_points++;
        }
      }
      roll_average_temp.push([
        rollingAvgData_copy[i][0],
        totalSum / total_points
      ]);
      roll_mean = totalSum / total_points;
      totalSum = 0;
      total_points = 0;
      let variance;
      // std. dev. calculation for the same rolling period
      for (let l = 0; l < rolling_period && local_index - l >= 0; l++) {
        let rollingItem_2 = JSON.parse(
          JSON.stringify(rollingAvgData_copy[local_index - l])
        );
        for (let m = 1; m < rollingItem_2.length; m++) {
          totalSum =
            totalSum +
            (rollingItem_2[m] - roll_mean) * (rollingItem_2[m] - roll_mean);
          total_points++;
        }
        variance = totalSum / total_points;
        variance = Math.sqrt(variance);
      }
      if (roll_mean - variance < 0) {
        std_temp.push([rollingAvgData_copy[i][0], 0, roll_mean + variance]);
      } else {
        std_temp.push([
          rollingAvgData_copy[i][0],
          roll_mean - variance,
          roll_mean + variance
        ]);
      }
    }

    total = userStory.length + bugs.length;
    average = average / total;
    average = average * 100;
    average = Math.round(average);
    average = average / 100;

    this.res.data.map(series => {
      if (series.name === "userStory") {
        if (series.values.length > 0) {
          series.values.map(data => {
            let pointData = {};
            let rawDate = data.endDate.split("T");
            pointData.x = new Date(rawDate[0]).getTime();
            pointData.y = parseInt(data.difference);
            pointData.url = data.url;
            pointData.id = data.id;
            userStoryPoints.push(pointData);
            if (userStoryYAxisMaxLimit < pointData.y) userStoryYAxisMaxLimit = pointData.y
          });
        }
      } else {
        if (series.values.length > 0) {
          series.values.map(data => {
            let pointData = {};
            let rawDate = data.endDate.split("T");
            pointData.x = new Date(rawDate[0]).getTime();
            pointData.y = parseInt(data.difference);
            pointData.url = data.url;
            pointData.id = data.id;
            bugsPoints.push(pointData);
            if (bugsYAxisMaxLimit < pointData.y) bugsYAxisMaxLimit = pointData.y
            if (userStoryYAxisMaxLimit || bugsYAxisMaxLimit) {
              userStoryYAxisMaxLimit > bugsYAxisMaxLimit ? controlChartYAxisMaxLimit = userStoryYAxisMaxLimit : controlChartYAxisMaxLimit = bugs
            }
          });
        }
      }
    });

    options.chart = {
      height: 0,
    };
    options.title = {
      useHTML: true,
      text: `<h6 style="display:block;font-weight:bold;margin-bottom:0px">${this.res.title}</h6><span style=";font-weight:normal;font-size:10px">${average || 0} Days on average</span>`,
      align: "left",
      x:-8,
      y:5,
      width: this.res.containerWidth+4,
      style: {
        width:'100%',
        padding: '9px',
        backgroundColor: this.res.bgTheme ? '#334154c7' :'#E1E7F0',
        color: this.res.bgTheme ? '#ffffff':"#2E2E38",
        fontSize: '14px',
        fontWeight:'bold',
        'border-radius': '10px 10px 0 0',
        fontFamily: 'Arial'
      }
    };
    options.xAxis = {
      type: "datetime",
      dateTimeLabelFormats: {
        day: "%b %e"
      },
      labels: {
        style: {
          color: this.res.bgTheme ? "#f5f5f5":'#333333',
        }
      },
      plotBands: [{
        color: this.res.bgTheme ? '#363E48':'#cfd2d7',
        from: sprintStartBand,
        to: sprintEndBand
      }],
      plotLines: [{
        color: '#fff27f',
        width: 5,
        value: sprintStartBand
      },
      {
        color: '#fff27f',
        width: 5,
        value: sprintEndBand
      }],
      lineWidth: 0,
      tickLength: 0,
      style: {
        color: this.res.bgTheme ? "#f5f5f5":'#333333',
      }
    };
    options.yAxis = {
      min: -0.5,
      max: controlChartYAxisMaxLimit + 80,
      gridLineColor: "",
      title: {
        text: "Days",
        style: {
          color: this.res.bgTheme ? "#f5f5f5":'#333333',
        }
      },
      labels: {
        style: {
          color: this.res.bgTheme ? "#f5f5f5":'#333333',
        }
      },
      plotLines: [
        {
          value: average,
          color: "#9057ED",
          width: 2,
          label: {
            text: average,
            align: "left",
            style: {
              color: "white"
            }
          }
        }
      ]
    };
    options.tooltip = {
      xDateFormat: "%Y-%m-%d",
      shared: false,
      useHTML: true,
      style: {
        pointerEvents: "auto",
      },
      pointFormatter: function (t) {
        combinedURL = baseURL;
        IDs = [];
        let x = this.x;
        let y = this.y;
        let d = new Date(x);
        let date = d.getDate();
        let month = d.getMonth() + 1;
        let year = d.getFullYear();
        let dateStr = date + "/" + month + "/" + year;
        var ret = `${dateStr}<br>`;
        let name = this.series.chart.series[2].name;
        let points = this.series.chart.series[2].points;
        let name1 = this.series.chart.series[3].name;
        let points1 = this.series.chart.series[3].points;
        points.map(ele => {
          if (ele.x === x && ele.y === y) {
            ret += `${name} ${ele.id}: ${ele.y} days<br>`;
            IDs.push(ele.id);
          }
        });
        points1.map(ele => {
          if (ele.x === x && ele.y === y) {
            ret += `${name1} ${ele.id}: ${ele.y} days<br>`;
            IDs.push(ele.id);
          }
        });
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
        return ret;
      }
    };

    options.plotOptions = {
      series: {
        cursor: "pointer",
        point: {
          events: {
            click: function () {
              window.open(newURL, "_blank");
            }
          }
        }
      }
    };
    options.legend = {
      enabled: true,
      backgroundColor: "transparent",
      align: "right",
      verticalAlign: "top",
      y: -30,
      x: -30,
      itemStyle: {
        color: this.res.bgTheme ? "#ffffff":'#333333',
        fontWeight: "normal"
      },
      itemHoverStyle: {
        color: this.res.bgTheme ? "#D3D3D3":'#333333',
      },
      labelFormatter: function () {
        if (this.name === "Bug" || this.name === "User Story") {
          return this.userOptions.data.length + " " + this.name;
        } else {
          return this.name;
        }
      }
    };

    options.series = [
      {
        name: "Rolling Av.",
        type: "line",
        data: roll_average_temp,
        pointInterval: 86400000,
        marker: {
          enabled: false
        },
        enableMouseTracking: false
      },
      {
        name: "Std. Dev.",
        type: "arearange",
        color:"#002060",
        data: std_temp,
        pointInterval: 86400000,
        fillOpacity: 0.3,
        marker: {
          enabled: false
        },
        events: {
          mouseOver: function() {
            this.update({
              color: '#002060'
            });
          },
          mouseOut: function() {
            this.update({
              color: '#002060'
            });
          }
        },
        // enableMouseTracking: false
      },
      {
        name: "User Story",
        type: "scatter",
        color: "grey",
        data: userStoryPoints,
        pointInterval: 86400000,
        marker: {
          symbol: "circle",
          fillColor: "#6DEB9C"
        },
        tooltip: {
          pointFormat: "{point.x:%d/%m/%Y}<br>{point.y} days"
        }
      },
      {
        name: "Bug",
        type: "scatter",
        color: "#A9CCE3",
        data: bugsPoints,
        pointInterval: 86400000,
        marker: {
          symbol: "circle",
          fillColor: "#0582EC"
        },
        tooltip: {
          pointFormat: "{point.x:%d/%m/%Y}<br>{point.y} days"
        }
      }
    ];
    return options;
  }

  generateVelocityTrends(options) {
    let planned_Velocity_Percentage = [],
      actual_Velocity_Percentage = [],
      limit_Percentage,
      upper_Limit,
      xAxis_data = [],
      lower_limit;

    let av_Velocity = this.res.data.averageVelocity;

    limit_Percentage = (av_Velocity * 10) / 100;

    upper_Limit =
      ((parseFloat(av_Velocity) + limit_Percentage) / av_Velocity) * 100;
    lower_limit =
      ((parseFloat(av_Velocity) - limit_Percentage) / av_Velocity) * 100;

    this.res.data.metrics.map((data, index) => {
      let planned_Velocity = {},
        actual_velocity = {};

      let charLength = data.name.length;

      xAxis_data.push(data.name);

      // planned_Velocity.x = parseInt(data.name.charAt(charLength - 1));
      planned_Velocity.xAxis = data.name;
      planned_Velocity.y = (data.storyPointsPlanned / av_Velocity) * 100;

      // actual_velocity.x = parseInt(data.name.charAt(charLength - 1));
      actual_velocity.xAxis = data.name;
      actual_velocity.y = (data.storyPointsDelivered / av_Velocity) * 100;

      planned_Velocity.actual_value = parseInt(data.storyPointsPlanned);
      actual_velocity.actual_value = parseInt(data.storyPointsDelivered);

      actual_velocity.diff =
        data.storyPointsDelivered - data.storyPointsPlanned;

      planned_Velocity_Percentage.push(planned_Velocity);
      actual_Velocity_Percentage.push(actual_velocity);
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
      width: this.res.containerWidth+4,
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
        text: " ",
        style: {
          color: this.res.bgTheme ? "#f5f5f5":'#333333',
        }
      },
      labels: {
        style: {
          color: this.res.bgTheme ? "#f5f5f5":'#333333',
        },
        format: "{value} %"
      },
      lineColor: "blue",
      stackLabels: {
        enabled: false
      },

      plotLines: [
        {
          value: upper_Limit,
          color: "#9EF988",
          dashStyle: "shortdash",
          width: 2,
          label: {
            text: '+10%',
            align: 'right',
            style: {
              color: '#333333',
              fontSize:'10px'
          }
        }
        },
        {
          value: lower_limit,
          color: "#DAC131",
          dashStyle: "shortdash",
          width: 2,
          label: {
            text: '-10%',
            align: 'right',
            style: {
              color: '#333333',
              fontSize:'10px'
          }
        }
        }
      ]
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
        return `${this.point.xAxis_data}<br>${this.series.name}: ${this.point.actual_value}`;
      }
    };
    options.plotOptions = {
      series: {
        borderRadius: 6
      },

      column: {
        pointPadding: 0.5,
        borderWidth: 0
      }
    };

    options.series = [
      {
        name: "Planned Velocity",
        type: "column",
        data: planned_Velocity_Percentage,
        color: "#3185ab",
        borderWidth: 0,

        // pointWidth: 15,
        pointPadding: 0.1,
        dataLabels: {
          enabled: false
        }
      },
      {
        type: "column",
        name: "Actual Velocity",
        data: actual_Velocity_Percentage,
        color: "#ad5a5d",
        borderWidth: 0,

        // pointWidth: 15,
        pointPadding: 0.1,
        dataLabels: {
          enabled: true,
          inside: false,

          crop: true,
          shape: "callout",
          backgroundColor: "#5cbef2",
          borderColor: "#ECEDEE",
          color: this.res.bgTheme ? "#f5f5f5":'#333333',
          borderWidth: 0,
          borderRadius: 5,
          y: -10,
          style: {
            fontFamily: "Helvetica, sans-serif",
            fontSize: "10px",
            fontWeight: "normal",
            textShadow: "none"
          },
          formatter: function (e) {
            return "<strong>" + this.point.diff + "</strong>";
          }
        }
      },
      {
        // Series that mimics the plot line
        type: "line",
        color: "#9EF988",
        name: "Upper Limit",
        dashStyle: "ShortDash"
      },
      {
        // Series that mimics the plot line
        type: "line",
        color: "#DAC131",
        name: "Lower Limit",
        dashStyle: "ShortDash"
      }
    ];

    return options;
  }

  generateSprintBurnDown(options) {
    let remainingHours = [];
    let totalScope = [];
    let sprintBurndown = [];
    let start_burnDownObj = {};
    let end_burnDownObj = {};
    let start_scopeObj = {};
    let end_scopeObj = {};
    let averegeBurnDown;
    let totalScopeIncrease;
    let hoursRemaining;
    let percentageCompleted;
    let sprintStartDate = this.res.data.startDate!==null?this.res.data.startDate.split("T"):"";
    let sprintEndDate = this.res.data.startDate!==null?this.res.data.endDate.split("T"):"";

    start_scopeObj.x = sprintStartDate!=="" ? new Date(sprintStartDate[0]).getTime():0;
    start_scopeObj.y = parseInt(this.res.data.originalScope);

    end_scopeObj.x = sprintEndDate!==""? new Date(sprintEndDate[0]).getTime():0;
    end_scopeObj.y =
      parseInt(this.res.data.originalScope) +
      parseInt(this.res.data.totalScopeIncrease);
    totalScope.push(start_scopeObj, end_scopeObj);

    start_burnDownObj.x = sprintStartDate!==""?new Date(sprintStartDate[0]).getTime():0;
    start_burnDownObj.y = this.res.data.burndown.length!==0?parseInt(this.res.data.burndown[0].remainingHours):0;

    end_burnDownObj.x = sprintEndDate!==""?new Date(sprintEndDate[0]).getTime():0;
    end_burnDownObj.y = 0;
    sprintBurndown.push(start_burnDownObj, end_burnDownObj);

    averegeBurnDown = this.res.data.averageBurndown!==null?parseFloat(this.res.data.averageBurndown).toFixed(2):'';
    totalScopeIncrease = this.res.data.totalScopeIncrease;
    hoursRemaining = this.res.data.hoursRemaining!==null?this.res.data.hoursRemaining:'';
    percentageCompleted = this.res.data.percentageCompleted!==null?this.res.data.percentageCompleted:'';
    this.res.data.burndown.map(data => {
      let remaining_hours_object = {};
      let rawDate = data.date.split("T");
      remaining_hours_object.x = new Date(rawDate[0]).getTime();
      remaining_hours_object.y = parseInt(data.remainingHours);
      remainingHours.push(remaining_hours_object);
    });

    //  function to set sprintStartBand and sprintEndBand values
    (
      function () {
        sprintStartBand = sprintBurndown[0].x;
        sprintEndBand = sprintBurndown[1].x;
      }()
    )


    options.title = {
      useHTML: true,      
      text: `<h6 style="display:block;font-weight:bold;margin-bottom:0px">${this.res.title}</h6><span style=";font-weight:normal;font-size:10px">${this.formatDate(sprintStartDate[0])} - ${this.formatDate(sprintEndDate[0])}</span>`,
      align: "left",
      x:-8,
      y:5,
      width: this.res.containerWidth+4,
      style: {
        width:'100%',
        padding: '9px',
        backgroundColor: this.res.bgTheme ?'#334154c7':'#E1E7F0',
        color: this.res.bgTheme ? "#f5f5f5":'#2E2E38',
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
      <span style="margin-right:10px"><span style="font-size: 16px"><b>${parseFloat(percentageCompleted).toFixed(1)} %</b></span><b style="margin-left:10px">Completed</b></span>
      <span style="margin-right:10px"><span style="font-size: 16px"><b>${averegeBurnDown}</b></span><b style="margin-left:5px">Average Burndown</b></span>
      <span style="margin-right:10px"><span style="font-size: 16px"><b>${totalScopeIncrease}</b></span><b style="margin-left:5px">Total scope increase</b></span>
      <span style="margin-right:10px"><span style="font-size: 16px"><b>${hoursRemaining}</b></span><b style="margin-left:5px">Hours remaining</b></span> </div>`,
      style: {
        color: this.res.bgTheme ? "#f5f5f5":'#333333',
      }
    };

    options.xAxis = {
      type: "datetime",
      dateTimeLabelFormats: {
        day: "%b %e"
      },
      gridLineWidth: 0,
      lineColor: "transparent",
      tickLength: 0,
      labels: {
        style: {
          color: this.res.bgTheme ? "#f5f5f5":'#333333',
        }
      }
    };
    options.yAxis = {
      min: 0,
      // tickInterval: 100,
      maxPadding: 0.4,
      lineColor: "transparent",
      gridLineWidth: 0,
      labels: {
        style: {
          color: this.res.bgTheme ? "#f5f5f5":'#333333',
        }
      },
      title: {
        enabled: false
      }
    };

    options.credits = {
      enabled: false
    };

    options.legend = {
      enabled: true,
      floating: true,
      verticalAlign: 'top',
      align: 'right',
      x: -30,
      y: 47,
      itemStyle: {
        color: this.res.bgTheme ? "#f5f5f5":'#333333',
        fontWeight: "normal"
      }
    };
    options.plotOptions = {
      series: {
        pointInterval: 86400000,
        marker: {
          enabled: false
        }
      }
    };

    options.series = [
      {
        name: "Remaining",
        data: remainingHours,
        type: "area",
        color: "#4370FE"
      },
      {
        name: "Total Scope",
        data: totalScope,
        type: "line",
        color: "#A35FC0"
      },
      {
        name: "Burndown",
        data: sprintBurndown,
        type: "line",
        color: "#BA8054"
      }
    ];
    return options;

  }

  generateProjectBurnDown(options) {
    let remaining = [],
      completed = [],
      burndown = [],
      totalScope = [],
      xAxis_data = [],
      startDate = [],
      endDate = [],
      rawDate = [],
      av_burndown,
      percentageCompleted;

    av_burndown =
      Math.round(parseInt(this.res.data.averageBurndown) * 100) / 100;

    startDate = this.res.data.startDate!==null?this.res.data.startDate.split("T")[0]:"";
    endDate = this.res.data.startDate!==null?this.res.data.endDate.split("T")[0]:"";
    rawDate = this.res.data.startDate!==null?this.res.data.startDate.split("T"):"";
    xAxis_data.push(rawDate!==""?this.formatDate(rawDate[0]):this.formatDate(rawDate));
    remaining.push(parseInt(this.res.data.originalScope));
    completed.push(0);
    burndown.push(parseInt(this.res.data.originalScope));
    totalScope.push(parseInt(this.res.data.originalScope));
    percentageCompleted = this.res.data.percentageCompleted;

    this.res.data.metrics.map(data => {
      let remaining_object = {},
        completed_object = {},
        sprint_name,
        remaining_temp,
        burndown_object = {},
        totalScope_object = {};
      sprint_name = data.name;
      xAxis_data.push(data.name);
      completed_object.y = parseInt(data.completedStoryPoints);
      remaining_temp =
        parseInt(data.totalstoryPoints) - parseInt(data.completedStoryPoints);
      remaining_object.y = remaining_temp;
      burndown_object.y = remaining_temp;
      totalScope_object.y = parseInt(data.totalstoryPoints);
      burndown.push(burndown_object);
      totalScope.push(totalScope_object);
      remaining.push(remaining_object);
      completed.push(completed_object);
    });
    options.chart = {
      height: 0,
      backgroundColor: this.res.bgTheme ? "#232d3b":"#ffffff" 
    };

    options.title = {
      useHTML:true,
      align: "left",
      text: `<h6 style="display:block;font-weight:bold;margin-bottom:0px">${this.res.title}</h6><span style="font-size:10px;font-weight:normal">${this.formatDate(startDate)} - ${this.formatDate(endDate)}</span>`,
      x:-9,
      y:5,
      width: this.res.containerWidth+4,
      style: {
        width:'100%',
        padding: '9px',
        backgroundColor: this.res.bgTheme ?'#334154c7':'#E1E7F0',
        color: this.res.bgTheme ? "#f5f5f5":'#2E2E38',
        fontSize: '14px',
        fontWeight:'bold',
        'border-radius': '10px 10px 0 0',
        borderWidth:'2px',
        fontFamily: 'Arial'
      }
    };
    options.subtitle = {
      verticalAlign: 'bottom',
      align: 'bottom',
      x:-8,
      y:25,
      width: this.res.containerWidth-2,
      useHTML: true,
      text: `<div>
      <span style="margin-right:10px"><span style="font-size: 16px"><b>${parseFloat(percentageCompleted).toFixed(1)} %</b></span><b style="margin-left:10px">Completed</b></span>
      <span style="margin-right:10px"><span style="font-size: 16px"><b>${av_burndown}</b></span><b style="margin-left:5px">Average Burndown</b></span>
      <span style="margin-right:10px"><span style="font-size: 16px"><b>${this.res.data.itemsNotEstimated}</b></span><b style="margin-left:5px">Items not estimated</b></span>
      <span style="margin-right:10px"><span style="font-size: 16px"><b>${this.res.data.totalScopeIncrease}</b></span><b style="margin-left:5px">Total Scope increase</b></span>
      <span style="margin-right:10px"><span style="font-size: 16px"><b>${this.res.data.remainingStoryPoints}</b></span><b style="margin-left:5px">Story points remaining</b></span> </div>`,
      style: {
        width:'100%',
        color: this.res.bgTheme ? "#f5f5f5":'#333333',
        padding: '8px',
        fontFamily: 'Arial',
      }
    };
    options.yAxis = {
      gridLineWidth: 0,
      labels: {
        enabled: true,
        style: {
          color: this.res.bgTheme ? "#f5f5f5":'#333333',
        }
      },
      title: {
        text: ``,
        rotation: 0
      }
    };
    options.legend = {
      enabled: true,
      floating: true,
      verticalAlign: 'top',
      align: 'right',
      x: -30,
      y: 48,
      backgroundColor: "transparent",
      itemStyle: {
        color: this.res.bgTheme ? "#ffffff":'#333333',
        fontWeight: "normal"
      },
      itemHoverStyle: {
        color: this.res.bgTheme ? "#d3d3d3":'#333333',
      }
    };
    options.xAxis = {
      gridLineWidth: 0,
      tickWidth: 0,
      categories: xAxis_data,
      labels: {
        style: {
          color: this.res.bgTheme ? "#f5f5f5":'#333333',
        }
      },
      lineColor: "transparent"
    };
    options.plotOptions = {
      column: {
        stacking: "normal",
        dataLabels: {
          enabled: false
        }
      },
      series: {
        borderRadius: 1
      }
    };
    options.tooltip = {
      shared: true,
      useHTML: true,
      positioner: function (labelWidth, labelHeight, point) {
        var chart = this.chart,
                posX = (chart.plotLeft + point.plotX - (labelWidth / 2)),
                posY = chart.plotHeight;
  
        return { x: posX , y: posY };
              
          }
    };
    options.series = [
      {
        name: "Completed",
        type: "column",
        data: completed,
        color: "#0582EC",
        borderColor: "#3185ab"
      },
      {
        name: "Remaining",
        type: "column",
        data: remaining,
        color: "#7d12ff",
        borderColor: "#7d12ff"
      },
      {
        name: "Burndown",
        type: "line",
        marker: {
          enabled: false
        },
        color: "#9EF988",
        data: burndown
      },
      {
        name: "Total Scope",
        type: "line",
        marker: {
          enabled: false
        },
        color: "#DAC131",
        data: totalScope
      }
    ];

    return options;
  }
}
export default VelocityGraph;
