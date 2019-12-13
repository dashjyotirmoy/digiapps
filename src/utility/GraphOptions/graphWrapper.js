class Options {
  chart = {};
  credits = {
    enabled: false
  };
  legend = {
    enabled: false
  };
  title = {};
  tootltip = {};
  plotOptions = {};
  xAxis = {};
  yAxis = {};
  series = {};
}

class Graph {
  constructor(props) {
    this.res = props;
    this.options = this.generateOption(props.type);
  }
  generateOption = type => {
    const baseOptions = new Options();
    let updatedOptions = {};
    switch (type) {
      case "line":
        updatedOptions = this.generateLine(baseOptions);
        return updatedOptions;
      case "ColumnHigh":
        updatedOptions = this.generateColumn(baseOptions);
        return updatedOptions;
      case "ControlChartHigh":
        updatedOptions = this.generateControlChart(baseOptions);
        return updatedOptions;
      default:
        return null;
    }
  };
  generateLine(options) {
    let start = new Date(this.res.burndown.startDate).toLocaleDateString();
    let end = new Date(this.res.burndown.endDate).toLocaleDateString();
    let startDate = start;
    let dateParts = startDate.split("/");
    start = dateParts[1] + "/" + dateParts[0] + "/" + dateParts[2];
    startDate = new Date(dateParts[2], dateParts[0] - 1, +dateParts[1]);
    let endDate = end;
    dateParts = endDate.split("/");
    end = dateParts[1] + "/" + dateParts[0] + "/" + dateParts[2];
    endDate = new Date(dateParts[2], dateParts[0] - 1, +dateParts[1]);
    let Difference_In_Time = endDate.getTime() - startDate.getTime();
    let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    let hours = this.res.burndown.burndown.remainingHours;
    options.chart = {
      type: "line",
      height: 0,
      backgroundColor: ""
    };
    options.tootltip = {
      pointFormat: "{series.name}: {point.y}"
    };
    options.xAxis = {
      max: Difference_In_Days,
      labels: {
        enabled: false
      },
      tickLength: 0
    };
    options.yAxis = [
      {
        max: parseInt(this.res.burndown.burndown.totalHours),
        labels: {
          enabled: false
        },
        title: {
          text: `Start date: ${start}`,
          rotation: 0
        }
      },
      {
        title: {
          text: `End date: ${end}`,
          rotation: 0
        },
        opposite: true
      }
    ];
    options.series = [
      {
        name: "Remaining hours",
        data: hours,
        marker: {
          enabled: false
        }
      }
    ];
    options.title = {
      text: null
    };
    return options;
  }
  generateColumn(options) {
    options.chart = {
      type: "column",
      height: 0,
      backgroundColor: ""
    };
    options.title = {
      text: this.res.title,
      align: "left",
      style: {
        color: "#f5f5f5",
        fontWeight: "bold"
      }
    };
    options.xAxis = {
      type: "datetime",
      dateTimeLabelFormats: {
        day: "%b %e"
      },
      lineWidth: 1,
      tickLength: 0,
      style: {
        color: "#f5f5f5"
      }
    };
    options.yAxis = {
      min: 0,
      gridLineColor: "transparent",
      title: {
        text: "y title",
        style: {
          color: "#f5f5f5"
        }
      },
      lineColor: "blue",
      stackLabels: {
        enabled: true
      }
    };
    options.plotOptions = {
      column: {
        stacking: "normal",
        dataLabels: {
          enabled: true
        }
      }
    };
    options.series = [
      {
        name: "A",
        data: [5, 3, 4, 7, 8],
        color: "#7d12ff",
        borderWidth: 0,
        pointStart: Date.UTC(2019, 10, 15),
        pointInterval: 86400000,
        pointWidth: 10
      },
      {
        name: "B",
        data: [2, 2, 3, 2, 6],
        color: "#ab20fd",
        borderWidth: 0,
        pointStart: Date.UTC(2019, 10, 15),
        pointInterval: 86400000,
        pointWidth: 10
      },
      {
        name: "C",
        data: [3, 4, 4, 2, 5],
        color: "#200589",
        borderWidth: 0,
        pointStart: Date.UTC(2019, 10, 15),
        pointInterval: 86400000,
        pointWidth: 10
      }
    ];
    return options;
  }
  generateControlChart(options) {
    let issues = [],
      bugs = [],
      rawDate,
      average = 0,
      total,
      rolling_average;
    this.res.data.map(series => {
      if (series.name === "User Story") {
        issues = series.values;
      } else {
        bugs = series.values;
      }
    });
    issues.map(issue => {
      rawDate = issue[0].split("T");
      issue[1] = parseInt(issue[1]);
      issue[0] = new Date(rawDate[0]).getTime();
      average += issue[1];
    });
    bugs.map(bug => {
      rawDate = bug[0].split("T");
      bug[1] = parseInt(bug[1]);
      bug[0] = new Date(rawDate[0]).getTime();
      average += bug[1];
    });
    let total_point_array = JSON.parse(JSON.stringify(issues));
    total_point_array = total_point_array.concat(bugs);
    total_point_array.sort((a, b) => a[0] - b[0]);

    rolling_average = total_point_array.map(roll => {
      return {
        date: roll[0],
        days: roll[1]
      };
    });
    //Same date data in a single object
    var output = [];
    rolling_average.forEach(function(item) {
      var existing = output.filter(function(v, i) {
        return v.date === item.date;
      });
      if (existing.length) {
        var existingIndex = output.indexOf(existing[0]);
        output[existingIndex].days = output[existingIndex].days.concat(
          item.days
        );
      } else {
        item.days = [item.days];
        output.push(item);
      }
    });
    let output_temp = JSON.parse(JSON.stringify(output));
    let start_data = output_temp[0];
    total = issues.length + bugs.length;
    average = average / total;
    average = average * 100;
    average = Math.round(average);
    average = average / 100;

    //Calculation of rolling av and std. dev for a window
    let roll_average = [],
      std_dev_final_temp = [];
    for (let i = 1; i < output_temp.length; i++) {
      let present_data = output_temp[i],
        past_data = output_temp[i - 1],
        std_dev_temp = [];

      let present_days_data = present_data.days;
      let present_days_data_length = present_days_data.length;
      let present_days_arraySum = present_days_data.reduce((a, b) => a + b, 0);
      let present_mean = present_days_arraySum / present_days_data_length;

      let past_days_data = past_data.days;
      let past_days_data_length = past_days_data.length;
      let past_days_arraySum = past_days_data.reduce((a, b) => a + b, 0);
      let past_mean = past_days_arraySum / past_days_data_length;

      let date_difference = present_data.date - past_data.date;

      //adjustment for missing date data
      if (date_difference > 86400000) {
        let j = date_difference / 86400000;
        for (let k = 1; k <= j; k++) {
          roll_average.push(0);
          std_dev_temp[0] = past_data.date + k * 86400000;
          std_dev_temp[1] = 0;
          std_dev_temp[2] = 0;
          std_dev_final_temp.push(std_dev_temp);
        }
      } else {
        roll_average.push((present_mean + past_mean) / 2);
        let sum = 0;
        let days_data = present_data.days;
        days_data.concat(past_data.days);
        days_data.map(day_data => {
          sum += day_data;
        });
        let mean_temp = sum / days_data.length;
        sum = 0;
        days_data.map(day_data => {
          day_data = (day_data - mean_temp) * (day_data - mean_temp);
          sum += day_data;
        });
        let variance_temp = sum / days_data.length;
        variance_temp = Math.sqrt(variance_temp);
        std_dev_temp[0] = present_data.date;
        std_dev_temp[1] = (present_mean + past_mean) / 2 - variance_temp;
        std_dev_temp[2] = (present_mean + past_mean) / 2 + variance_temp;
        std_dev_final_temp.push(std_dev_temp);
      }
    }
    //For fixing date issue in area chart
    if (std_dev_final_temp.length > 1) {
      std_dev_final_temp[0][0] = start_data.date + 86400000;
    }
    let std_dev_final = JSON.parse(JSON.stringify(std_dev_final_temp));
    for (let i = 1; i < std_dev_final.length; i++) {
      let present_object = std_dev_final[i];
      let past_object = std_dev_final[i - 1];
      present_object[0] = past_object[0] + 86400000;
      std_dev_final[i] = present_object;
    }

    let final_min;
    if (std_dev_final.length > 1) {
      final_min = std_dev_final[0][0];
    }

    options.chart = {
      height: 0,
      backgroundColor: ""
    };
    options.title = {
      text: this.res.title,
      align: "left",
      style: {
        color: "#f5f5f5",
        fontWeight: "bold"
      }
    };
    options.xAxis = {
      type: "datetime",
      dateTimeLabelFormats: {
        day: "%b %e"
      },
      labels: {
        style: {
          color: "#f5f5f5"
        }
      },
      lineWidth: 0,
      tickLength: 0,
      style: {
        color: "#f5f5f5"
      }
    };
    options.yAxis = {
      min: -0.5,
      gridLineColor: "",
      title: {
        text: "Days",
        style: {
          color: "#f5f5f5"
        }
      },
      labels: {
        style: {
          color: "#f5f5f5"
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
      pointFormat: "{point.y}"
    };
    options.series = [
      {
        name: "User Story",
        type: "scatter",
        color: "grey",
        data: issues,
        pointInterval: 86400000,
        marker: {
          symbol: "circle",
          fillColor: "#6DEB9C"
        }
      },
      {
        name: "Bug",
        type: "scatter",
        color: "#A9CCE3",
        data: bugs,
        pointInterval: 86400000,
        marker: {
          symbol: "circle",
          fillColor: "#0582EC"
        }
      },
      {
        name: "Rolling Av.",
        type: "line",
        data: roll_average,
        pointStart: final_min,
        pointInterval: 86400000,
        marker: {
          enabled: false
        }
      },
      {
        name: "Std. Dev.",
        type: "arearange",
        data: std_dev_final,
        pointInterval: 86400000,
        fillOpacity: 0.2,
        marker: {
          enabled: false
        }
      }
    ];
    return options;
  }
}

export default Graph;
