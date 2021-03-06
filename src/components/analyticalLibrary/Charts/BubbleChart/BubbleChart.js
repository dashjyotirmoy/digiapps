import React, { Component } from "react";
import ChartHOC from "../ChartHOC/ChartHOC";
import { connect } from "react-redux";

var BubbleChartData = {};
// var fullBubbleChartData = [];
var bugsData, vulnearbilityData, codeSmellsData, complexityData, duplicationData;
var bd = {}, vd = {}, cd = {};
var veryLowBug = [], lowBug = [], mediumBug = [], highBug = [], criticalBug = [];
var veryLowVulnearbility = [], lowVulnearbility = [], mediumVulnearbility = [], highVulnearbility = [], criticalVulnearbility = [];
var veryLowCodeSmells = [], lowCodeSmells = [], mediumCodeSmells = [], highCodeSmells = [], criticalCodeSmells = [];
var type;
var a = 0, b = 0, c = 0, d = 0;
var option = {};
var name, url;
var nameUrl = [];
var maxMinBug = [], maxMinVulnerability = [], maxMinCodeSmells = [], maxMinCoverage = [], maxMinDuplication = [];


class BubbleHigh extends Component {
  state = {
    options: {
      chart: {
        type: "bubble",
        plotBorderWidth: 0,
        zoomType: "xy",
        backgroundColor: this.props.bgTheme ? "#232d3b" : "#ffffff"
      },
      credits: {
        enabled: false
      },
      legend: {
        symbolHeight: 11,
        symbolWidth: 11,
        symbolRadius: 0,
        align: "left",
        itemHoverStyle: {
          color: this.props.bgTheme ?"#ffffff":"#333333"
        },
        itemStyle: {
          color: this.props.bgTheme ?"#f5f5f5":"#333333",
          fontWeight: "normal"
        }
      },
      title: {
        text: "",
        align: "left",
        style: {
          color: this.props.bgTheme ?"#f5f5f5":"#333333",
          fontWeight: "bold"
        }
      },
      xAxis: {
        gridLineWidth: 0,
        tickLength: 0,
        lineWidth: 0,
        title: {
          text: " "
        },
        labels: {
          format: "{value}",
          style: {
            color: this.props.bgTheme ?"#f5f5f5":"#333333"
          }
        }
      },
      yAxis: {
        startOnTick: false,
        endOnTick: false,
        gridLineColor: "#535353",
        title: {
          text: "Reliability Remediation Effort",
          style: {
            color: "#f5f5f5"
          }
        },
        labels: {
          format: "{value} min",
          style: {
            color: this.props.bgTheme ?"#f5f5f5":"#333333"
          }
        },
        maxPadding: 0.2
      },
      tooltip: {
        enabled: false
      },
      plotOptions: {
        series: {
          dataLabels: {
            enabled: false,
            format: "{point.name}"
          }
        }
      },
      series: [
        {
          name: "",
          data: '',
          color: "#056642"
        },
        {
          name: "",
          data: '',
          color: "#90ee90"
        },
        {
          name: "",
          data: '',
          color: "#ffff00"
        },
        {
          name: "",
          data: '',
          color: "#ffa500"
        },
        {
          name: "",
          data: '',
          color: "#ff0000"
        }
      ]
    }
  };
  // compare function to pass to sort for decending sorting.

  compare = (a, b) => {
    var zVala = a.z;
    var zValb = b.z;
    var comparision = 0;
    if (zVala < zValb) {
      comparision = 0;
    }
    else if (zVala > zValb) {
      comparision = -1;
    }
    return comparision;
  }

  setBugsData = () => {
    bugsData = [];
    bugsData = BubbleChartData.map(item => {
      item.forEach(ele => {
        var keys = [...Object.keys(ele)];
        var val = [...Object.values(ele)];
        var key = keys.toString();

        if (key.toString() === "bugs") c = parseFloat(val)
        else if (key === "reliability_remediation_effort") b = parseFloat(val)
        else if (key === "reliability_rating") d = parseFloat(val)
        else if (key === "ncloc") a = parseFloat(val)
        else if (key === "name") name = val[0];
        else if (key === "url") url = val[0];
      })
      return {
        x: a,
        y: b,
        z: c,
        severity: d,
        rating: d === 1 ? 'A' : d === 2 ? 'B' : d === 3 ? 'C' : d === 4 ? 'D' : d === 5 ? 'E' : '',
        name: name,
        url: url
      }
    })
    this.setBugSeverity();
  };


  setBugSeverity = () => {
    lowBug = [];
    veryLowBug = [];
    mediumBug = [];
    highBug = [];
    criticalBug = [];
    bugsData.forEach((item, index) => {
      if (item.severity === 1) {
        Object.assign(bd, item);
        veryLowBug.push(bd);
        bd = {};
      }
      else if (item.severity === 2) {
        Object.assign(bd, item);
        lowBug.push(bd);
        bd = {};
      }
      else if (item.severity === 3) {
        Object.assign(bd, item);
        mediumBug.push(bd);
        bd = {};
      }
      else if (item.severity === 4) {
        Object.assign(bd, item);
        highBug.push(bd);
        bd = {};
      }
      else if (item.severity === 5) {
        Object.assign(bd, item);
        criticalBug.push(bd);
        bd = {};
      }
    }
    )
  }

  setVulnerabilityData = () => {

    vulnearbilityData = BubbleChartData.map(item => {
      item.forEach(ele => {
        var keys = [...Object.keys(ele)];
        var val = [...Object.values(ele)];
        var key = keys.toString();

        if (key === "security_rating") d = parseFloat(val);
        else if (key === "vulnerabilities") c = parseFloat(val);
        else if (key === "ncloc") a = parseFloat(val);
        else if (key === "security_remediation_effort") b = parseFloat(val);
        else if (key === "name") name = val[0];
        else if (key === "url") url = val[0];
      })
      return {
        x: a,
        y: b,
        z: c,
        severity: d,
        rating: d === 1 ? 'A' : d === 2 ? 'B' : d === 3 ? 'C' : d === 4 ? 'D' : d === 5 ? 'E' : '',
        name: name,
        url: url
      }
    })
  };

  setVulnerabilitySeverity = () => {
    veryLowVulnearbility = [];
    lowVulnearbility = [];
    mediumVulnearbility = [];
    highVulnearbility = [];
    criticalVulnearbility = [];
    vulnearbilityData.forEach((item, index) => {

      if (item.severity === 1) {
        Object.assign(vd, item);
        veryLowVulnearbility.push(vd);
        vd = {};
      }
      else if (item.severity === 2) {
        Object.assign(vd, item);
        lowVulnearbility.push(vd);
        vd = {};
      }
      else if (item.severity === 3) {
        Object.assign(vd, item);
        mediumVulnearbility.push(vd);
        vd = {};
      }
      else if (item.severity === 4) {
        Object.assign(vd, item);
        highVulnearbility.push(vd);
        vd = {};
      }
      else if (item.severity === 5) {
        Object.assign(vd, item);
        criticalVulnearbility.push(vd);
        vd = {};
      }
    })
  }

  setCodeSmellsData = () => {

    codeSmellsData = BubbleChartData.map(item => {
      item.forEach(ele => {
        var keys = [...Object.keys(ele)];
        var val = [...Object.values(ele)];
        var key = keys.toString();

        if (key === "ncloc") a = parseFloat(val);
        else if (key === "code_smells") c = parseFloat(val);
        else if (key === "sqale_rating") d = parseFloat(val);
        else if (key === "sqale_index") b = parseFloat(val);
        else if (key === "name") name = val[0];
        else if (key === "url") url = val[0];
      })
      return {
        x: a,
        y: b,
        z: c,
        severity: d,
        rating: d === 1 ? 'A' : d === 2 ? 'B' : d === 3 ? 'C' : d === 4 ? 'D' : d === 5 ? 'E' : '',
        name: name,
        url: url
      }
    })
  };

  setCodeSmellsSeverity = () => {
    veryLowCodeSmells = [];
    lowCodeSmells = [];
    mediumCodeSmells = [];
    highCodeSmells = [];
    criticalCodeSmells = [];
    codeSmellsData.forEach((item, index) => {
      if (item.severity === 5) {
        Object.assign(cd, item);
        criticalCodeSmells.push(cd)
        cd = {};
      }
      else if (item.severity === 4) {
        Object.assign(cd, item);
        highCodeSmells.push(cd);
        cd = {};
      }
      else if (item.severity === 3) {
        Object.assign(cd, item);
        mediumCodeSmells.push(cd);
        cd = {};
      }
      else if (item.severity === 2) {
        Object.assign(cd, item);
        lowCodeSmells.push(cd);
        cd = {};
      }
      else if (item.severity === 1) {
        Object.assign(cd, item);
        veryLowCodeSmells.push(cd);
        cd = {};
      }
    }
    )
  };

  setComplexityData = () => {

    complexityData = BubbleChartData.map(item => {
      item.forEach(ele => {
        var keys = [...Object.keys(ele)];
        var val = [...Object.values(ele)];
        var key = keys.toString();

        if (key === "uncovered_lines") c = parseFloat(val);
        else if (key === "complexity") a = parseFloat(val);
        else if (key === "coverage") b = parseFloat(val);
        else if (key === "name") name = val[0];
        else if (key === "url") url = val[0];
      })

      return {
        x: a,
        y: b,
        z: c,
        rating: c > 80 ? 'A' : c > 70 ? 'B' : c > 50 ? 'C' : c > 30 ? 'D' : 'E',
        name: name,
        url: url
      }
    })

  };


  setDuplicationData = () => {

    duplicationData = BubbleChartData.map(item => {
      item.forEach(ele => {
        var keys = [...Object.keys(ele)];
        var val = [...Object.values(ele)];
        var key = keys.toString();

        if (key === "duplicated_blocks") c = parseFloat(val);
        else if (key === "duplicated_lines") b = parseFloat(val);
        else if (key === "ncloc") a = parseFloat(val);
        else if (key === "name") name = val[0];
        else if (key === "url") url = val[0];
      })
      return {
        x: a,
        y: b,
        z: c,
        rating: c > 20 ? 'E' : c > 10 ? 'D' : c > 5 ? 'C' : c >= 3 ? 'B' : 'A',
        name: name,
        url: url
      }
    }
    )

  };

  setMaxMinXY = (data) => {
    var minX = 0, maxX = 0, minY = 0, maxY = 0;
    data.forEach(item => {
      if (item.x < minX) {
        minX = item.x;
      }
      if (item.x > maxX) {
        maxX = item.x;
      }
      if (item.y < minY) {
        minY = item.y;
      }
      if (item.y > maxY) {
        maxY = item.y;
      }
    })
    return [minX, maxX, minY, maxY];
  }

  render() {
    if (this.props.qualityDrilledDownData.components) {
      BubbleChartData = [];
      BubbleChartData = this.props.qualityDrilledDownData.components.map((item, index) => {

        nameUrl = item.measures.map(ele => {
          var keyVal = Object.values(ele);
          var key = keyVal[0];
          var val = keyVal[1];
          var Obj = {};
          Obj[key] = val;
          return {
            ...Obj
          };
        });
        var name = item.name;
        var url = item.url;
        nameUrl.push({ "name": name }, { "url": url })

        return nameUrl;

      });

      BubbleChartData[0].forEach(item => {

        var dataType = Object.keys(item);
        // type = dataType[0];



        if (dataType[0] === "bugs") {
          type = " ";
          type = dataType[0];
        }
        else if (dataType[0] === "vulnerabilities") {
          type = " ";
          type = dataType[0];
        }
        else if (dataType[0] === "code_smells") {
          type = " ";
          type = dataType[0];
        }
        else if (dataType[0] === "coverage") {
          type = " ";
          type = dataType[0];
        }
        else if (dataType[0] === "duplicated_lines") {
          type = " ";
          type = dataType[0];
        }
      })

      // External Function that is called inside bubble chart
      function callExternalFunction(url) {
        window.open(url, "_blank");
      }

      if (type === 'bugs') {

        this.setBugsData();
        bugsData.sort(this.compare);

        this.setBugSeverity();

        maxMinBug = this.setMaxMinXY(bugsData);

        option = {};

        option = {
          chart: {
            type: "bubble",
            plotBorderWidth: 0,
            zoomType: "xy",
            backgroundColor: this.props.bgTheme ?"#232d3b":"#ffffff"
          },
          credits: {
            enabled: false
          },
          legend: {
            symbolHeight: 11,
            symbolWidth: 11,
            symbolRadius: 0,
            align: "left",
            itemHoverStyle: {
              color: this.props.bgTheme ?"#ffffff":'#333333'
            },
            itemStyle: {
              color: this.props.bgTheme ?"#f5f5f5":"#333333",
              fontWeight: "normal"
            }
          },
          title: {
            text: "",
            align: "left",
            style: {
              color: this.props.bgTheme ?"#f5f5f5":"#333333",
              fontWeight: "bold"
            }
          },
          xAxis: {
            min: maxMinBug[0],
            max: maxMinBug[1] + 5,
            gridLineWidth: 0,
            tickLength: 0,
            lineWidth: 0,
            title: {
              text: "Lines of Code",
              style: {
                color: this.props.bgTheme ?"#f5f5f5":"#333333",
              }
            },
            labels: {
              format: "{value}",
              style: {
                color: this.props.bgTheme ?"#f5f5f5":"#333333",
              }
            }
          },
          yAxis: {
            min: maxMinBug[2],
            max: maxMinBug[3] + 5,
            startOnTick: false,
            endOnTick: false,
            gridLineColor: "#535353",
            title: {
              text: "Reliability Remediation Effort",
              style: {
                color: this.props.bgTheme ?"#f5f5f5":"#333333",
              }
            },
            labels: {
              format: "{value} min",
              style: {
                color: this.props.bgTheme ?"#f5f5f5":"#333333",
              }
            },
            maxPadding: 0.2
          },
          tooltip: {
            enabled: true,
            useHTML: true,
            headerFormat: '<table>',
            pointFormat: '<tr><th colspan="2"><h6>{point.name}</h6></th></tr>' +
              '<tr><td>Lines of Code:</td><td>{point.x}</td></tr>' +
              '<tr><td>Reliability Remediation Effort:</td><td>{point.y}min</td></tr>' +
              '<tr><td>Bugs:</td><td>{point.z}</td></tr>' +
              '<tr><td>Reliability Rating</td><td>{point.rating}</td></tr>',
            footerFormat: '</table>',
            followPointer: true,
          },

          plotOptions: {
            bubble: {
              point: {
                events: {
                  click: function (oEvent) {
                    callExternalFunction(oEvent.point.url);
                  }
                }
              }
            }
          },
          series: [
            {
              name: "Critical",
              data: criticalBug,
              color: '#ff0000',
            },
            {
              name: "High",
              data: highBug,
              color: '#ffa500'
            },
            {
              name: 'Medium',
              data: mediumBug,
              color: '#ffff00'
            },
            {
              name: 'Low',
              data: lowBug,
              color: '#90ee90'
            },
            {
              name: 'Very Low',
              data: veryLowBug,
              color: '#056642',
            }
          ]
        }


        this.state.options = option;


      }

      else if (type === "vulnerabilities") {
        this.setVulnerabilityData();
        vulnearbilityData.sort(this.compare);
        this.setVulnerabilitySeverity();

        maxMinVulnerability = this.setMaxMinXY(vulnearbilityData);
        option = {};

        option = {
          chart: {
            type: "bubble",
            plotBorderWidth: 0,
            zoomType: "xy",
            backgroundColor: this.props.bgTheme ?"#232d3b":"#ffffff",
          },
          credits: {
            enabled: false
          },
          legend: {
            symbolHeight: 11,
            symbolWidth: 11,
            symbolRadius: 0,
            align: "left",
            itemHoverStyle: {
              color: this.props.bgTheme ?"#ffffff":"#333333"
            },
            itemStyle: {
              color: this.props.bgTheme ?"#f5f5f5":"#333333",
              fontWeight: "normal"
            }
          },
          title: {
            text: "",
            align: "left",
            style: {
              color: this.props.bgTheme ?"#f5f5f5":"#333333",
              fontWeight: "bold"
            }
          },
          xAxis: {
            min: maxMinVulnerability[0],
            max: maxMinVulnerability[1] + 5,
            gridLineWidth: 0,
            tickLength: 0,
            lineWidth: 0,
            title: {
              text: "Lines of Code"
            },
            labels: {
              format: "{value}",
              style: {
                color: this.props.bgTheme ?"#f5f5f5":"#333333"
              }
            }
          },
          yAxis: {
            min: maxMinVulnerability[2],
            max: maxMinVulnerability[3] + 5,
            startOnTick: false,
            endOnTick: false,
            gridLineColor: "#535353",
            title: {
              text: "Security Remediation Effort",
              style: {
                color: this.props.bgTheme ?"#f5f5f5":"#333333"
              }
            },
            labels: {
              format: "{value} min",
              style: {
                color: this.props.bgTheme ?"#f5f5f5":"#333333"
              }
            },
            maxPadding: 0.2
          },
          tooltip: {
            enabled: true,
            useHTML: true,
            headerFormat: '<table>',
            pointFormat: '<tr><th colspan="2"><h6>{point.name}</h6></th></tr>' +
              '<tr><td>Lines of Code:</td><td>{point.x}</td></tr>' +
              '<tr><td>Security Remediation Effort:</td><td>{point.y}min</td></tr>' +
              '<tr><td>Vulnerabilities :</td><td>{point.z}</td></tr>' +
              '<tr><td>Security Rating</td><td>{point.rating}</td></tr>',
            footerFormat: '</table>',
            followPointer: true,
          },

          plotOptions: {
            bubble: {
              point: {
                events: {
                  click: function (oEvent) {
                    callExternalFunction(oEvent.point.url);
                  }
                }
              }
            }
          },
          series: [
            {
              name: "Critical",
              data: criticalVulnearbility,
              color: '#ff0000'
            },
            {
              name: "High",
              data: highVulnearbility,
              color: '#ffa500'
            },
            {
              name: "Medium",
              data: mediumVulnearbility,
              color: '#ffff00'
            },
            {
              name: 'Low',
              data: lowVulnearbility,
              color: '#90ee90'
            },
            {
              name: 'Very Low',
              data: veryLowVulnearbility,
              color: '#056642'
            }
          ]
        }

        this.state.options = option;
      }

      else if (type === 'code_smells') {
        this.setCodeSmellsData();
        this.setCodeSmellsSeverity();
        codeSmellsData.sort(this.compare);
        maxMinCodeSmells = this.setMaxMinXY(codeSmellsData);
        option = {};

        option = {
          chart: {
            type: "bubble",
            plotBorderWidth: 0,
            zoomType: "xy",
            backgroundColor: this.props.bgTheme ?"#232d3b":"#ffffff"
          },
          credits: {
            enabled: false
          },
          legend: {
            symbolHeight: 11,
            symbolWidth: 11,
            symbolRadius: 0,
            align: "left",
            itemHoverStyle: {
              color: this.props.bgTheme ?"#ffffff":"#333333"
            },
            itemStyle: {
              color: this.props.bgTheme ?"#f5f5f5":"#333333",
              fontWeight: "normal"
            }
          },
          title: {
            text: "",
            align: "left",
            style: {
              color: this.props.bgTheme ?"#f5f5f5":"#333333",
              fontWeight: "bold"
            }
          },
          xAxis: {
            min: maxMinCodeSmells[0],
            max: maxMinCodeSmells[1] + 5,
            gridLineWidth: 0,
            tickLength: 0,
            lineWidth: 0,
            title: {
              text: "Lines of Code",
              style: {
                color: this.props.bgTheme ?"#f5f5f5":"#333333"
              }
            },
            labels: {
              format: "{value}",
              style: {
                color: this.props.bgTheme ?"#f5f5f5":"#333333"
              }
            }
          },
          yAxis: {
            min: maxMinCodeSmells[2],
            max: maxMinCodeSmells[3] + 5,
            startOnTick: false,
            endOnTick: false,
            gridLineColor: "#535353",
            title: {
              text: "Technical Debt",
              style: {
                color: this.props.bgTheme ?"#f5f5f5":"#333333"
              }
            },
            labels: {
              format: "{value} min",
              style: {
                color: this.props.bgTheme ?"#f5f5f5":"#333333"
              }
            },
            maxPadding: 0.2
          },
          tooltip: {
            enabled: true,
            useHTML: true,
            headerFormat: '<table>',
            pointFormat: '<tr><th colspan="2"><h6>{point.name}</h6></th></tr>' +
              '<tr><td>Lines of Code:</td><td>{point.x}</td></tr>' +
              '<tr><td>Technical Debt:</td><td>{point.y}min</td></tr>' +
              '<tr><td>Code Semlls:</td><td>{point.z}</td></tr>' +
              '<tr><td>Maintainability Rating: </td><td>{point.rating}</td></tr>',
            footerFormat: '</table>',
            followPointer: true,
          },
          plotOptions: {
            bubble: {
              point: {
                events: {
                  click: function (oEvent) {
                    callExternalFunction(oEvent.point.url);
                  }
                }
              }
            }
          },
          series: [
            {
              name: "VeryLow",
              data: veryLowCodeSmells,
              color: '#056642'
            },
            {
              name: "Low",
              data: lowCodeSmells,
              color: '#20c997'
            },
            {
              name: "Medium",
              data: mediumCodeSmells,
              color: '#ffc107'
            },
            {
              name: "High",
              data: highCodeSmells,
              color: '#ec5050'
            },
            {
              name: "Critical",
              data: criticalCodeSmells,
              color: '#a21220'
            }
          ]
        }



        this.state.options = option;

      }

      else if (type === 'coverage') {
        this.setComplexityData();
        maxMinCoverage = this.setMaxMinXY(complexityData);
        complexityData.sort(this.compare);
        option = {};
        option = {
          chart: {
            type: "bubble",
            plotBorderWidth: 0,
            zoomType: "xy",
            backgroundColor: this.props.bgTheme ?"#232d3b":"#ffffff"
          },
          credits: {
            enabled: false
          },
          legend: {
            symbolHeight: 11,
            symbolWidth: 11,
            symbolRadius: 0,
            align: "left",
            itemHoverStyle: {
              color: this.props.bgTheme ?"#ffffff":"#333333"
            },
            itemStyle: {
              color: this.props.bgTheme ?"#f5f5f5":"#333333",
              fontWeight: "normal"
            }
          },
          title: {
            text: "",
            align: "left",
            style: {
              color: this.props.bgTheme ?"#f5f5f5":"#333333",
              fontWeight: "bold"
            }
          },
          xAxis: {
            min: maxMinCoverage[0],
            max: maxMinCoverage[1] + 5,
            gridLineWidth: 0,
            tickLength: 0,
            lineWidth: 0,
            title: {
              text: "Cyclomatic Complexity ",
              style: {
                color: this.props.bgTheme ?"#f5f5f5":"#333333",
              }
            },
            labels: {
              format: "{value}",
              style: {
                color: this.props.bgTheme ?"#f5f5f5":"#333333",
              }
            }
          },
          yAxis: {
            min: maxMinCoverage[2],
            max: maxMinCoverage[3] + 5,
            startOnTick: false,
            endOnTick: false,
            gridLineColor: "#535353",
            title: {
              text: "Coverage",
              style: {
                color: this.props.bgTheme ?"#f5f5f5":"#333333",
              }
            },
            labels: {
              format: "{value}%",
              style: {
                color: this.props.bgTheme ?"#f5f5f5":"#333333",
              }
            },
            maxPadding: 0.2
          },
          tooltip: {
            enabled: true,
            useHTML: true,
            headerFormat: '<table>',
            pointFormat: '<tr><th colspan="2"><h6>{point.name}</h6></th></tr>' +
              '<tr><td>Cyclomatic Complexity:</td><td>{point.x}</td></tr>' +
              '<tr><td>Coverage:</td><td>{point.y}%</td></tr>' +
              '<tr><td>Uncovered Lines:</td><td>{point.z}</td></tr>',
            footerFormat: '</table>',
            followPointer: true,
          },
          plotOptions: {
            bubble: {
              point: {
                events: {
                  click: function (oEvent) {
                    callExternalFunction(oEvent.point.url);
                  }
                }
              }
            }
          },
          series: [
            {
              name: "Coverage",
              data: complexityData,
              color: '#4b9fd5'
            }
          ]
        };

        this.state.options = option;

      }

      else if (type === 'duplicated_lines') {
        this.setDuplicationData();
        maxMinDuplication = this.setMaxMinXY(duplicationData);
        duplicationData.sort(this.compare);
        option = {};
        option = {
          chart: {
            type: "bubble",
            plotBorderWidth: 0,
            zoomType: "xy",
            backgroundColor: this.props.bgTheme ?"#232d3b":"#ffffff"
          },
          credits: {
            enabled: false
          },
          legend: {
            symbolHeight: 11,
            symbolWidth: 11,
            symbolRadius: 0,
            align: "left",
            itemHoverStyle: {
              color: this.props.bgTheme ?"#fff":"#333333",
            },
            itemStyle: {
              color: this.props.bgTheme ?"#f5f5f5":"#333333",
              fontWeight: "normal"
            }
          },
          title: {
            text: "",
            align: "left",
            style: {
              color: this.props.bgTheme ?"#f5f5f5":"#333333",
              fontWeight: "bold"
            }
          },
          xAxis: {
            min: maxMinDuplication[0],
            max: maxMinDuplication[1] + 5,
            gridLineWidth: 0,
            tickLength: 0,
            lineWidth: 0,
            title: {
              text: "Lines of Code",
              style: {
                color: this.props.bgTheme ?"#f5f5f5":"#333333",
              }
            },
            labels: {
              format: "{value}",
              style: {
                color: this.props.bgTheme ?"#f5f5f5":"#333333",
              }
            }
          },
          yAxis: {
            min: maxMinDuplication[2],
            max: maxMinDuplication[3] + 5,
            startOnTick: false,
            endOnTick: false,
            gridLineColor: "#535353",
            title: {
              text: "Duplicated Lines",
              style: {
                color: this.props.bgTheme ?"#f5f5f5":"#333333",
              }
            },
            labels: {
              format: "{value}",
              style: {
                color: this.props.bgTheme ?"#f5f5f5":"#333333",
              }
            },
            maxPadding: 0.2
          },
          tooltip: {
            enabled: true,
            useHTML: true,
            headerFormat: '<table>',
            pointFormat: '<tr><th colspan="2"><h6>{point.name}</h6></th></tr>' +
              '<tr><td>Lines of Code:</td><td>{point.x}</td></tr>' +
              '<tr><td>Duplicated Lines:</td><td>{point.y}</td></tr>' +
              '<tr><td>Duplicated Blocks:</td><td>{point.z}</td></tr>',
            footerFormat: '</table>',
            followPointer: true,
          },
          plotOptions: {
            bubble: {
              point: {
                events: {
                  click: function (oEvent) {
                    callExternalFunction(oEvent.point.url);
                  }
                }
              }
            }
          },
          series: [
            {
              name: "Duplications",
              data: duplicationData,
              color: '#4b9fd5'
            }
          ]
        };



        this.state.options = option;
      }

    }
    else {
      console.log('Not defines yet!!');

    }
    this.state.options.title.text = this.props.title;
    return (
      <React.Fragment>
        <ChartHOC options={this.state.options} type={"bubble"} bgTheme={this.props.bgTheme}/>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state,props) => {
  return {
    bgTheme: props.bgTheme,
    qualityDrilledDownData: state.qualityData.qualityDrilledDownDetails
  };
};
export default connect(mapStateToProps)(BubbleHigh);

