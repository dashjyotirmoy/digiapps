//Wrapper class which contains logic for providing data to the analytical graph components

import Options from "./optionsModel";

class QualityGraph {
  constructor(props) {
    this.res = props;
    this.options = this.generateOption(props.type);
  }

  generateOption = type => {
    const baseOptions = new Options();
    let updatedOptions = {};
    switch (type) {
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

  // preformatDate is in format DD/MM/YYYY postFormatDate will be in format DD MMM YYYY

  formatDateToDDMMMYYYY(preFormatDate) {
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
    splitDate = preFormatDate.split("/");
    postFormatDate =
      splitDate[0] + " " + monthsArray[splitDate[1] - 1] + " " + splitDate[2];
    return postFormatDate;
  }

  //function that Creates data for Bugs, vulnerabilities and codesmells chart

  generateMultipleLine(options) {
    let bugs_array,
      vulnerabilities_array,
      code_smells_array,
      bugs_metrics_data,
      vul_metrics_data,
      codeSmell_metrics_data;

      bugs_metrics_data = this.res.data.bugs.bugsMetricsList;
      vul_metrics_data = this.res.data.vulnerabilities
        .vulnerabilitiesMetricsList;
      codeSmell_metrics_data = this.res.data.codeSmells.codeSmellsMetricsList;

    bugs_array = this.generateData(bugs_metrics_data);
    vulnerabilities_array = this.generateData(vul_metrics_data);
    code_smells_array = this.generateData(codeSmell_metrics_data);
    bugs_array.sort((a, b) => a.x - b.x);
    vulnerabilities_array.sort((a, b) => a.x - b.x);
    code_smells_array.sort((a, b) => a.x - b.x);

    options.tooltip = {
      pointFormat:
        "{series.name}: {point.y}<br>blocker: {point.blocker}<br>critical: {point.critical}<br>major: {point.major}<br>minor: {point.minor}"
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

  //function that generated data fro coverage chart

  generateArea(options) {
    let lines_to_cover = [],
      covered_lines = [];
    this.res.data.coverageMetricsList.map(day_data => {
      let to_cover_point = [],
        covered_point = [];
      let rawDate = day_data.date.split("T");

      to_cover_point[0] = new Date(rawDate[0]).getTime();
      to_cover_point[1] = parseInt(day_data.linesToCover);

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

  // function that generates data for Average defect resolution time

  generateDefect(options) {
    let final_data = [];
    this.res.data.map(data => {
      let temp_data = {},
        rawDate;
      rawDate = data.date.split("T");
      temp_data.x = new Date(rawDate[0]).getTime();
      temp_data.y = parseInt(data.difference);
      temp_data.count = parseInt(data.bugs);
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
      // max: 15,
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

  //function that creates data for Bar chart
  generateBar(options) {
    let critical_value = [],
      high_value = [],
      medium_value = [],
      low_value = [];
    critical_value.push(parseInt(this.res.data.critical));
    high_value.push(parseInt(this.res.data.high));
    medium_value.push(parseInt(this.res.data.medium));
    low_value.push(parseInt(this.res.data.low));
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
}

export default QualityGraph;
