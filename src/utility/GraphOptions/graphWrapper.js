//Wrapper class which contains logic for providing data to the analytical graph components

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
var sd = "Start date";

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
      case "MultipleLineHigh":
        updatedOptions = this.generateMultipleLine(baseOptions);
        return updatedOptions;
      case "AreaHigh":
        updatedOptions = this.generateArea(baseOptions);
        return updatedOptions;
      case "BarHigh":
        updatedOptions = this.generateBar(baseOptions);
        return updatedOptions;
      case "DefectHigh":
        updatedOptions = this.generateDefect(baseOptions);
        return updatedOptions;
      default:
        return null;
    }
  };

  //function that Creates data for Line chart

  generateLine(options) {
    let start = new Date(this.res.burndown.startDate).toLocaleDateString();
    let end = new Date(this.res.burndown.endDate).toLocaleDateString();
    let startDate = start;

    let splitDate, preFormatDate, postFormatDate;
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

    // preformatDate is in format DD/MM/YYYY postFormatDate will be in format DD MMM YYYY

    function formatDateToDDMMMYYYY(preFormatDate) {
      splitDate = preFormatDate.split("/");
      postFormatDate =
        splitDate[0] + " " + monthsArray[splitDate[1] - 1] + " " + splitDate[2];
      return postFormatDate;
    }

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
    let final_data = [];
    for (let i = 0; i < hours.length; i++) {
      let temp_data = [];
      temp_data[0] = startDate.getTime() + i * 86400000 + 19800000;
      temp_data[1] = hours[i];
      final_data.push(temp_data);
    }
    // setting Start date and End date to format DD MMM YYYY

    start = formatDateToDDMMMYYYY(start);
    end = formatDateToDDMMMYYYY(end);

    options.chart = {
      type: "line",
      height: 0,
      backgroundColor: ""
    };
    options.tootltip = {
      enabled: true,
      pointFormat: "{series.name}: {point.y}"
    };
    options.xAxis = {
      type: "datetime",
      dateTimeLabelFormats: {
        day: "%b %e"
      },
      gridLineWidth: 0.5,
      gridLineColor: "#3B4350",
      tickInterval: 10,
      // max: Difference_In_Days,
      labels: {
        enabled: false
      },
      tickLength: 0,
      lineWidth: 0
    };
    options.yAxis = [
      {
        max: parseInt(this.res.burndown.burndown.totalHours),
        labels: {
          enabled: false
        },
        title: {
          text: `Start date`,
          rotation: 0,
          x: -25,
          y: -10,
          style: {
            color: "#f5f5f5",
            width: "500px"
          }
        },
        gridLineColor: "null"
      },
      {
        title: {
          text: `${start}`,
          rotation: 0,
          alaign: "right",
          x: 40,
          y: 20,
          style: {
            color: "#a6a6a6",
            width: `500px`,
            fontSize: "0.75em"
          }
        }
      },

      {
        title: {
          text: `End date`,
          rotation: 0,
          x: 35,
          y: -10,
          style: {
            color: "#f5f5f5",
            width: `500px`
          }
        },
        opposite: true
      },
      {
        title: {
          text: `${end}`,
          rotation: 0,
          x: -20,
          y: 20,
          style: {
            color: "#a6a6a6",
            width: `500px`,
            fontSize: "0.75em"
          }
        },
        opposite: true
      }
    ];
    options.series = [
      {
        name: "Remaining hours",
        data: final_data,
        color: "",
        lineColor: "#C0C063",
        fillOpacity: 0.1,
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

  generateMultipleLine(options) {
    let bugs_array,
      vulnerabilities_array,
      code_smells_array,
      bugs_metrics_data,
      vul_metrics_data,
      codeSmell_metrics_data;

    bugs_metrics_data = this.res.data[0].bugs.bugsMetricsList;
    vul_metrics_data = this.res.data[1].vulberablities
      .vulnerabilitiesMetricsList;
    codeSmell_metrics_data = this.res.data[2].codesmells.codeSmellsMetricsList;

    bugs_array = this.generateData(bugs_metrics_data);
    vulnerabilities_array = this.generateData(vul_metrics_data);
    code_smells_array = this.generateData(codeSmell_metrics_data);
    bugs_array.sort((a, b) => a.x - b.x);
    vulnerabilities_array.sort((a, b) => a.x - b.x);
    code_smells_array.sort((a, b) => a.x - b.x);

    options.tooltip = {
      pointFormat:
        "{series.name}: {point.y}<br>blocked: {point.blocked}<br>critical: {point.critical}<br>major: {point.major}<br>minor: {point.minor}"
    };
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
      lineWidth: 1,
      tickLength: 0,
      style: {
        color: "#f5f5f5"
      }
    };
    options.yAxis = {
      title: {
        text: ``
      },
      labels: {
        style: {
          color: "#f5f5f5"
        }
      },
      gridLineColor: ""
    };
    options.legend = {
      enabled: true,
      itemStyle: {
        color: "#f5f5f5",
        fontWeight: "normal"
      },
      itemHoverStyle: {
        color: "#D3D3D3",
        fontWeight: ""
      },
      align: "right",
      verticalAlign: "top",
      y: -30
    };
    options.series = [
      {
        data: bugs_array,
        name: "Bugs",
        type: "line",
        marker: {
          enabled: false
        },
        pointInterval: 86400000
      },
      {
        data: vulnerabilities_array,
        type: "line",
        name: "Vulnerabilities",
        marker: {
          enabled: false
        },
        pointInterval: 86400000
      },
      {
        data: code_smells_array,
        type: "line",
        name: "Code Smells",
        marker: {
          enabled: false
        },
        pointInterval: 86400000
      }
    ];
    return options;
  }

  generateData = rawData => {
    let points_array = [];
    rawData.map(bvc => {
      let point_data = {};
      let rawDate = bvc.date.split("T");
      point_data.x = new Date(rawDate[0]).getTime();
      point_data.y = parseInt(bvc.value);
      point_data.blocked = bvc.blocked;
      point_data.critical = bvc.critical;
      point_data.major = bvc.major;
      point_data.minor = bvc.minor;
      points_array.push(point_data);
    });
    return points_array;
  };

  generateArea(options) {
    let lines_to_cover = [],
      covered_lines = [];
    this.res.data[0].coverageMetricsList.map(day_data => {
      let to_cover_point = [],
        covered_point = [];
      let rawDate = day_data.date.split("T");
      // to_cover_point[0] = new Date(rawDate[0]).getTime() + 19800000;
      to_cover_point[0] = new Date(rawDate[0]).getTime();
      to_cover_point[1] = parseInt(day_data.linesToCover);
      // covered_point[0] = new Date(rawDate[0]).getTime() + 19800000;
      covered_point[0] = new Date(rawDate[0]).getTime();
      covered_point[1] = parseInt(day_data.coveredLines);
      lines_to_cover.push(to_cover_point);
      covered_lines.push(covered_point);
    });
    lines_to_cover.sort((a, b) => a[0] - b[0]);
    covered_lines.sort((a, b) => a[0] - b[0]);
    options.chart = {
      type: "area"
    };
    options.xAxis = {
      type: "datetime",
      labels: {
        style: {
          color: "#f5f5f5"
        }
      },
      dateTimeLabelFormats: {
        day: "%b %e"
      },
      lineWidth: 0,
      tickLength: 0,
      style: {
        color: "#f5f5f5"
      }
    };
    options.yAxis = {
      gridLineColor: "",
      labels: {
        enabled: true,
        format: "{value}K",
        style: {
          color: "#f5f5f5"
        }
      },
      title: {
        text: ``,
        rotation: 0
      }
    };
    options.title = {
      text: this.res.title,
      align: "left",
      style: {
        color: "#f5f5f5",
        fontWeight: "bold"
      }
    };
    options.plotOpions = {
      area: {
        stacking: "normal",
        lineColor: "#666666",
        lineWidth: 1,
        marker: {
          lineWidth: 1,
          lineColor: "#666666"
        }
      }
    };
    options.legend = {
      enabled: true,
      itemStyle: {
        color: "#f5f5f5",
        fontWeight: "normal"
      },
      itemHoverStyle: {
        color: "#D3D3D3",
        fontWeight: ""
      },
      align: "right",
      verticalAlign: "top",
      y: -30
    };
    options.series = [
      {
        name: "Lines to cover",
        data: lines_to_cover,
        marker: {
          enabled: true
        },
        color: "#5173CE",
        pointInterval: 86400000
      },
      {
        name: "Covered lines",
        data: covered_lines,
        marker: {
          enabled: true
        },
        color: "#657DBD",
        pointInterval: 86400000
      }
    ];
    return options;
  }
  //function that Creates data for Column chart

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
    options.legend = {
      enabled: true,
      itemStyle: {
        color: "#f5f5f5",
        fontWeight: "normal"
      },
      itemHoverStyle: {
        color: "#D3D3D3",
        fontWeight: ""
      },
      align: "right",
      verticalAlign: "top",
      y: -30
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
  generateDefect(options) {
    let final_data = [];
    this.res.data[0].map(data => {
      let temp_data = {},
        rawDate;
      rawDate = data[0].split("T");
      temp_data.x = new Date(rawDate[0]).getTime();
      temp_data.y = parseInt(data[1]);
      temp_data.count = parseInt(data[2]);
      final_data.push(temp_data);
    });
    final_data.sort((a, b) => a.x - b.x);

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
      lineWidth: 0,
      tickLength: 0,
      style: {
        color: "#f5f5f5"
      },
      labels: {
        style: {
          color: "#f5f5f5"
        }
      }
    };
    options.legend = {
      enabled: true,
      itemStyle: {
        color: "#f5f5f5",
        fontWeight: "normal"
      },
      itemHoverStyle: {
        color: "#D3D3D3",
        fontWeight: ""
      },
      align: "right",
      verticalAlign: "top",
      y: -30
    };
    options.yAxis = {
      min: 0,
      max: 15,
      tickInterval: 2,
      gridLineColor: "transparent",
      title: {
        text: "Days",
        style: {
          color: "#f5f5f5"
        }
      },
      labels: {
        format: "{value}",
        style: {
          color: "#f5f5f5"
        }
      },
      lineColor: "blue",
      stackLabels: {
        enabled: false
      }
    };
    options.tooltip = {
      pointFormat: `{point.y} days <br>Defect count: {point.count}`
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
        name: "Average Defect Resolution Time",
        data: final_data,
        color: "#7d12ff",
        borderWidth: 0,
        pointWidth: 10,
        pointInterval: 86400000
      }
    ];
    return options;
  }
  //function that Creates data for Control charts

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
      let roll_average_window_data = [...present_days_data, ...past_days_data];
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
        // roll_average.push((present_mean + past_mean) / 2);
        let sum = 0;
        let days_data = present_data.days;
        days_data.concat(past_data.days);
        roll_average_window_data.map(day_data => {
          sum += day_data;
        });
        let mean_temp = sum / roll_average_window_data.length;
        roll_average.push(mean_temp);
        sum = 0;
        roll_average_window_data.map(day_data => {
          day_data = (day_data - mean_temp) * (day_data - mean_temp);
          sum += day_data;
        });
        let variance_temp = sum / days_data.length;
        variance_temp = Math.sqrt(variance_temp);
        std_dev_temp[0] = present_data.date;
        std_dev_temp[1] = mean_temp - variance_temp;
        std_dev_temp[2] = mean_temp + variance_temp;
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
    options.subtitle = {
      text: `${average || 0} <br>Days on average`,
      align: "left",
      floating: true,
      x: 70,
      y: 50,
      style: {
        color: "#f5f5f5",
        fontWeight: "",
        fontSize: "18px"
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
    options.legend = {
      enabled: true,
      backgroundColor: "transparent",
      align: "right",
      verticalAlign: "top",
      y: -30,
      x: -30,
      itemStyle: {
        color: "#ffffff",
        fontWeight: "normal"
      },
      itemHoverStyle: {
        color: "#D3D3D3"
      },
      labelFormatter: function() {
        if (this.name === "Bug" || this.name === "User Story") {
          return this.userOptions.data.length + " " + this.name;
        } else {
          return this.name;
        }
      }
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
        },
        tooltip: {
          pointFormat: "{point.x:%d/%m/%Y}<br>{point.y} days"
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
        },
        tooltip: {
          pointFormat: "{point.x:%d/%m/%Y}<br>{point.y} days"
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

  //function that creates data for Bar chart
  generateBar(options) {
    let critical_value = [],
      high_value = [],
      medium_value = [],
      low_value = [];
    critical_value.push(parseInt(this.res.data[0].critical));
    high_value.push(parseInt(this.res.data[0].high));
    medium_value.push(parseInt(this.res.data[0].medium));
    low_value.push(parseInt(this.res.data[0].low));
    options.chart = {
      type: "bar",
      height: 0,
      backgroundColor: ""
    };
    options.title = {
      text: "Outstanding defects",
      style: {
        color: "#f5f5f5"
      },
      align: "left"
    };
    options.yAxis = {
      min: -1,
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
      visible: false,
      tickWidth: 0
    };

    options.legend = {
      enabled: true,
      itemStyle: {
        color: "#f5f5f5",
        fontWeight: "normal"
      },
      itemHoverStyle: {
        color: "#D3D3D3",
        fontWeight: ""
      },
      align: "right",
      verticalAlign: "top",
      y: -30
    };
    // options.tooltip = {
    //   pointFormat: "{series.name}: {point.y}"
    // };
    options.tooltip = {
      formatter: function() {
        return this.series.name + " " + this.y;
      }
    };
    options.plotOptions = {
      series: {
        stacking: "normal",
        pointWidth: 40,
        dataLabels: {
          enabled: true,
          y: -50,
          style: {
            fontWeight: "normal",
            fontSize: "1rem"
          }
        }
      },
      bar: {
        // pointStart: "",
        borderColor: "",
        borderRadiusTopLeft: 4
      }
    };
    options.series = [
      {
        name: "Low",
        data: low_value,
        color: "#2BA67E"
      },
      {
        name: "Medium",
        data: medium_value,
        color: "#c0792a"
      },
      {
        name: "High",
        data: high_value,
        color: "#B65354"
      },
      {
        name: "Critical",
        data: critical_value,
        color: "#A42829"
      }
    ];
    return options;
  }

  generateDefectColumn(options) {
    let final_data = [];
    this.res.data[0].map(data => {
      let temp_data = [],
        rawDate;
      rawDate = data[0].split("T");
      temp_data[0] = new Date(rawDate[0]).getTime();
      temp_data[1] = parseInt(data[1]);
      final_data.push(temp_data);
    });
    final_data.sort((a, b) => a[0] - b[0]);

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
    options.series.data = final_data;
    return options;
  }
}

export default Graph;
