//Wrapper class which contains logic for providing data to the analytical graph components

import Options from "./optionsModel";
import store from '../../store/store';

class QualityGraph { 
  constructor(props) {
    this.res = props;
    this.options = this.generateOption(props.type);
  }

  generateOption = type => {
    const baseOptions = new Options();
    const bgTheme = store.getState().chartData.currentTheme==='dark';

    let updatedOptions = {};
    switch (type) {
      case "MultipleLineHigh":
        updatedOptions = this.generateMultipleLine(baseOptions,bgTheme);
        return updatedOptions;
      case "AreaHigh":
        updatedOptions = this.generateArea(baseOptions,bgTheme);
        return updatedOptions;
      case "BarHigh":
        updatedOptions = this.generateBar(baseOptions,bgTheme);
        return updatedOptions;
      case "DefectHigh":
        updatedOptions = this.generateDefect(baseOptions,bgTheme);
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

  generateMultipleLine(options,bgTheme) {
    let bugs_array,
      vulnerabilities_array,
      code_smells_array,
      bugs_metrics_data,
      vul_metrics_data,
      codeSmell_metrics_data;
    bugs_metrics_data = this.res.data.bugs.bugsMetricsList;
    vul_metrics_data = this.res.data.vulnerabilities.vulnerabilitiesMetricsList;
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
      useHTML: true,
      text: `<h6 style="display:block;font-weight:bold;margin-bottom:0px">${this.res.title}</h6>`,
      align: "left",
      x:-8,
      y:5,
      width: this.res.containerWidth-4,
      style: {
        width:'100%',
        padding: '17px 9px',
        backgroundColor: bgTheme ? '#334154c7' :'#E1E7F0',
        color: bgTheme ? "#f5f5f5":"#333333",
        fontSize: '14px',
        fontWeight:'bold',
        'border-radius': '10px 10px 0 0',
        borderWidth:'2px',
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
          color: bgTheme ? "#f5f5f5":"#333333",
        }
      },
      lineWidth: 1,
      tickLength: 0,
      style: {
        color: bgTheme ? "#f5f5f5":"#333333",
      }
    };
    options.yAxis = {
      title: {
        text: ``
      },
      labels: {
        style: {
          color: bgTheme ? "#f5f5f5":"#333333",
        }
      },
      gridLineColor: ""
    };
    options.legend = {
      enabled: true,
      itemStyle: {
        color: bgTheme ? "#f5f5f5":"#333333",
        fontWeight: "bold"
      },
      itemHoverStyle: {
        color: bgTheme ? "#D3D3D3":"#333333",
        fontWeight: ""
      },
      backgroundColor: "transparent",
      floating: true,
      verticalAlign: 'top',
      align: 'right',
      x: -30,
      y: 48,
    };
    options.series = [
      {
        data: bugs_array,
        name: "Bugs",
        type: "line",
        marker: {
          enabled: true,
          symbol: "circle"
        },
        pointInterval: 86400000
      },
      {
        data: vulnerabilities_array,
        type: "line",
        name: "Vulnerabilities",
        marker: {
          enabled: true,
          symbol: "circle"
        },
        pointInterval: 86400000
      },
      {
        data: code_smells_array,
        type: "line",
        name: "Code Smells",
        marker: {
          enabled: true,
          symbol: "circle"
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

  generateArea(options,bgTheme) {
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
          color: bgTheme ? "#f5f5f5":"#333333",
        }
      },
      dateTimeLabelFormats: {
        day: "%b %e"
      },
      lineWidth: 0,
      tickLength: 0,
      style: {
        color: bgTheme ? "#f5f5f5":"#333333",
      }
    };
    options.yAxis = {
      gridLineColor: "",
      labels: {
        enabled: true,
        format: "{value}K",
        style: {
          color: bgTheme ? "#f5f5f5":"#333333",
        }
      },
      title: {
        text: ``,
        rotation: 0
      }
    };
    options.title = {
      useHTML: true,
      text: `<div style="width: ${this.res.containerWidth-4}px;border-radius: 50px 20px;padding: 17px 9px"><h6 style="display:block;font-weight:bold;margin-bottom:0px">${this.res.title}</h6></div>`,
      align: "left",
      x:-8,
      y:5,
      style: {
        width:'100%',
        backgroundColor: bgTheme ? '#334154c7' :'#E1E7F0',
        color: bgTheme ? "#f5f5f5":"#333333",
        fontSize: '14px',
        fontWeight:'bold',
        fontFamily: 'Arial'
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
        color: bgTheme ? "#f5f5f5":"#333333",
        fontWeight: "bold"
      },
      itemHoverStyle: {
        color: bgTheme ? "#D3D3D3":"#333333",
        fontWeight: ""
      },
      backgroundColor: "transparent",
      floating: true,
      verticalAlign: 'top',
      align: 'right',
      x: -30,
      y: 48,
    };

    options.series = [
      {
        name: "Lines to cover",
        data: lines_to_cover,
        marker: {
          enabled: true,
          symbol: "circle"
        },
        color: "#5173CE",
        pointInterval: 86400000
      },
      {
        name: "Covered lines",
        data: covered_lines,
        marker: {
          enabled: true,
          symbol: "circle"
        },
        color: "#657DBD",
        pointInterval: 86400000
      }
    ];
    return options;
  }

  // function that generates data for Average defect resolution time

  generateDefect(options,bgTheme) {
    let final_data = [];
    this.res.data && this.res.data.map(data => {
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
      useHTML: true,
      text: `<h6 style="display:block;font-weight:bold;margin-bottom:0px">${this.res.title}</h6>`,
      align: "left",
      x:-8,
      y:5,
      width: this.res.containerWidth-4,
      style: {
        width:'100%',
        padding: '17px 9px',
        backgroundColor: bgTheme ? '#334154c7' :'#E1E7F0',
        color: bgTheme ? "#f5f5f5":"#333333",
        fontSize: '14px',
        fontWeight:'bold',
        'border-radius': '10px 10px 0 0',
        borderWidth:'2px',
        fontFamily: 'Arial'
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
        color: bgTheme ? "#f5f5f5":"#333333",
      },
      labels: {
        style: {
          color: bgTheme ? "#f5f5f5":"#333333",
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
        color: bgTheme ? "#f5f5f5":"#333333",
        fontWeight: "bold"
      },
      itemHoverStyle: {
        color: bgTheme ? "#D3D3D3":"#333333",
      },
    };
    options.yAxis = {
      min: 0,
      // max: 15,
      tickInterval: 2,
      gridLineColor: "transparent",
      title: {
        text: "Days",
        style: {
          color: bgTheme ? "#f5f5f5":"#333333"
        }
      },
      labels: {
        format: "{value}",
        style: {
          color: bgTheme ? "#f5f5f5":"#333333"
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
        // pointWidth: 10,
        pointInterval: 86400000
      }
    ];
    return options;
  }



  //function that creates data for Bar chart
  generateBar(options,bgTheme) {
    let critical_value = [],
    combinedURL,
    baseURL = "https://dev.azure.com/organization_name/project_id/_queries/query/?wiql=SELECT [System.Id]%2C[System.WorkItemType]%2C[System.Title] FROM WorkItems WHERE [System.Id] IN (work_item_ids)&name=Cycle time work items",
      high_value = [],
      medium_value = [],
      IDsData=this.res.data,
      //IDs = this.res.data.mediumBugs.ids,
      projID = this.res.projID,
      newURL,
      organization = this.res.organization,
      low_value = [];
      critical_value.push(parseInt(this.res.data.criticalBugs.totalCount));
      high_value.push(parseInt(this.res.data.highBugs.totalCount));
      medium_value.push(parseInt(this.res.data.mediumBugs.totalCount));
      low_value.push(parseInt(this.res.data.lowBugs.totalCount));
    options.chart = {
      type: "bar",
      height: 300,
      backgroundColor: ""
    };
    options.title = {
      useHTML: true,
      text: '<h6 style="display:block;font-weight:bold;margin-bottom:0px">Outstanding Defects</h6>',
      align: "left",
      x:-8,
      y:5,
      width: this.res.containerWidth-4,
      style: {
        width:'100%',
        padding: '17px 9px',
        backgroundColor: bgTheme ? '#334154c7' :'#E1E7F0',
        color: bgTheme ? "#f5f5f5":"#333333",
        fontSize: '14px',
        fontWeight:'bold',
        'border-radius': '10px 10px 0 0',
        borderWidth:'2px',
        fontFamily: 'Arial'
      }
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
      reversed: true,    
      backgroundColor: "transparent",
      floating: true,
      verticalAlign: 'top',
      align: 'right',
      x: -30,
      y: 48,
      itemStyle: {
        color: bgTheme ? "#f5f5f5":"#333333",
        fontWeight: "bold"
      },
      itemHoverStyle: {
        color: bgTheme ? "#d3d3d3":"#333333",
      },
    };

    options.tooltip = {
      headerFormat: '',
      pointFormatter: function (t) {
        combinedURL = baseURL;
        let x = this.x;
        let y = this.y;
        //let points = this.series.chart.series[2].points;
        
        // IDs.push(IDs.mediumBugs.ids);
        let IDs = this.series.name === 'Medium' ? IDsData.mediumBugs.ids: this.series.name=== 'Critical'? IDsData.criticalBugs.ids:this.series.name=== 'High'? IDsData.highBugs.ids:IDsData.lowBugs.ids;
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
    };
    options.plotOptions = {
      series: {
        stacking: "normal",
        pointWidth: 40,
        dataLabels: {
          enabled: true,
          formatter: function() {
            if(this.y){
              return this.y;
            }
          },
          y: -50,
          style: {
            textOutline: false,
            fontWeight: 'normal',
            color: bgTheme ? "#ffffff":"#333333",
            fontSize: '14px'
          }, 
        },
        cursor: "pointer",
        point: {
          events: {
            click: function () {
              if(this.y !== 0){ window.open(newURL, "_blank")};
            }
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
        color: "#20c997"
      },
      {
        name: "Medium",
        data: medium_value,
        color: "#ffc107"
      },
      {
        name: "High",
        data: high_value,
        color: "#ec5050"
      },
      {
        name: "Critical",
        data: critical_value,
        color: "#a21220"
      }
    ];
    return options;
  }
}

export default QualityGraph;
