import React, { Component } from "react";
import HighchartsReact from "highcharts-react-official";
import ChartHOC from "../ChartHOC/ChartHOC";
import { connect } from "react-redux";
import { color } from "highcharts";
import { parse } from "@fortawesome/fontawesome-svg-core";

var BubbleChartData = {};
var fullBubbleChartData = [];
var bugsData, vulnearbilityData, codeSmellsData, complexityData, duplicationData;
var veryLowData = [], lowData = [], mediumData = [], highData = [], criticalData = [];
var bd = {}, vd = {}, cd = {};
var veryLowBug = [], lowBug = [], mediumBug = [], highBug = [], criticalBug = [];
var veryLowVulnearbility = [], lowVulnearbility = [], mediumVulnearbility = [], highVulnearbility = [], criticalVulnearbility = [];
var veryLowCodeSmells = [], lowCodeSmells = [], mediumCodeSmells = [], highCodeSmells = [], criticalCodeSmells = [];
var dataType, type, dt;
var a = 0, b = 0, c = 0, d = 0;
var option = {};

class BubbleHigh extends Component {
  state = {
    options: {
      chart: {
        type: "bubble",
        plotBorderWidth: 0,
        zoomType: "xy",
        backgroundColor: "#232d3b"
      },
      credits: {
        enabled: false
      },
      legend: {
        symbolHeight: 11,
        symbolWidth: 11,
        symbolRadius: 0,
        align: "left",
        itemStyle: {
          color: "#f5f5f5",
          fontWeight: "normal"
        }
      },
      title: {
        text: "",
        align: "left",
        style: {
          color: "#f5f5f5",
          fontWeight: "bold"
        }
      },
      xAxis: {
        min: 0,
        gridLineWidth: 0,
        tickLength: 0,
        lineWidth: 0,
        title: {
          text: " "
        },
        labels: {
          format: "{value}",
          style: {
            color: "#f5f5f5"
          }
        }
      },
      yAxis: {
        min: 0,
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
            color: "#f5f5f5"
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

  setBugsData = () => {

    bugsData = BubbleChartData.map(item => {
      item.map(ele => {
        var key = [...Object.keys(ele)];
        var val = [...Object.values(ele)];

        if (key == "bugs") c = parseFloat(val)
        else if (key == "reliability_remediation_effort") b = parseFloat(val)
        else if (key == "reliability_rating") d = parseFloat(val)
        else if (key == "ncloc") a = parseFloat(val)
      })
      return {
        x: a,
        y: b,
        z: c,
        severity: d
      }
    })
    console.log(bugsData);

  };

  setBugSeverity = () => {
    bugsData.map((item, index) => {
      if (item.severity == 1) {
        Object.assign(bd, item);
        veryLowBug.push(bd);
        bd = {};
      }
      else if (item.severity == 2) {
        Object.assign(bd, item);
        lowBug.push(bd);
        bd = {};
      }
      else if (item.severity == 3) {
        Object.assign(bd, item);
        mediumBug.push(bd);
        bd = {};
      }
      else if (item.severity == 4) {
        Object.assign(bd, item);
        highBug.push(bd);
        bd = {};
      }
      else if (item.severity == 5) {
        Object.assign(bd, item);
        criticalBug.push(bd);
        bd = {};
      }
    }
    )
  }

  setVulnerabilityData = () => {

    vulnearbilityData = BubbleChartData.map(item => {
      item.map(ele => {
        var key = [...Object.keys(ele)];
        var val = [...Object.values(ele)];

        if (key == "security_rating") d = parseFloat(val);
        else if (key == "vulnerabilities") c = parseFloat(val);
        else if (key == "ncloc") a = parseFloat(val);
        else if (key == "security_remediation_effort") b = parseFloat(val);
      })
      return {
        x: a,
        y: b,
        z: c,
        severity: d
      }
    })
    console.log(vulnearbilityData);
  };

  setVulnerabilitySeverity = () => {

    vulnearbilityData.map((item, index) => {

      if (item.severity == 1) {
        Object.assign(vd, item);
        veryLowVulnearbility.push(vd);
        vd = {};
      }
      else if (item.severity == 2) {
        Object.assign(vd, item);
        lowVulnearbility.push(vd);
        vd = {};
      }
      else if (item.severity == 3) {
        Object.assign(vd, item);
        mediumVulnearbility.push(vd);
        vd = {};
      }
      else if (item.severity == 4) {
        Object.assign(vd, item);
        highVulnearbility.push(vd);
        vd = {};
      }
      else if (item.severity == 5) {
        Object.assign(vd, item);
        criticalVulnearbility.push(vd);
        vd = {};
      }
    })
  }

  setCodeSmellsData = () => {

    codeSmellsData = BubbleChartData.map(item => {
      item.map(ele => {
        var key = [...Object.keys(ele)];
        var val = [...Object.values(ele)];

        if (key == "ncloc") a = parseFloat(val);
        else if (key == "code_smells") c = parseFloat(val);
        else if (key == "sqale_rating") d = parseFloat(val);
        else if (key == "sqale_index") b = parseFloat(val);
      })
      return {
        x: a,
        y: b,
        z: c,
        severity: d
      }
    })
  };

  setCodeSmellsSeverity = () => {

    codeSmellsData.map((item, index) => {
      if (item.severity == 1) {
        Object.assign(cd, item);
        veryLowCodeSmells.push(cd)
        cd = {};
      }
      else if (item.severity == 2) {
        Object.assign(cd, item);
        lowCodeSmells.push(cd);
        cd = {};
      }
      else if (item.severity == 3) {
        Object.assign(cd, item);
        mediumCodeSmells.push(cd);
        cd = {};
      }
      else if (item.severity == 4) {
        Object.assign(cd, item);
        highCodeSmells.push(cd);
        cd = {};
      }
      else if (item.severity == 5) {
        Object.assign(cd, item);
        criticalCodeSmells.push(cd);
        cd = {};
      }
    }
    )
  };

  setComplexityData = () => {

    complexityData = BubbleChartData.map(item => {
      item.map(ele => {
        var key = [...Object.keys(ele)];
        var val = [...Object.values(ele)];

        if (key == "uncovered_lines") c = parseFloat(val);
        else if (key == "complexity") a = parseFloat(val);
        else if (key == "coverage") b = parseFloat(val);
      })
      console.log(a, b, c);

      return {
        x: a,
        y: b,
        z: c
      }
    })
    console.log(complexityData);

  };

  setDuplicationData = () => {

    duplicationData = BubbleChartData.map(item => {
      item.map(ele => {
        var key = [...Object.keys(ele)];
        var val = [...Object.values(ele)];

        if (key == "duplicated_blocks") c = parseFloat(val);
        else if (key == "duplicated_lines") b = parseFloat(val);
        else if (key == "ncloc") a = parseFloat(val);
      })
      return {
        x: a,
        y: b,
        z: c
      }
    }
    )

  };

  render() {
    if (this.props.qualityDrilledDownData.components) {
      console.log(this.props.qualityDrilledDownData);

      console.log('ddddddddddddddddddwwwwwwwwwwwwssssssssssss', this.props.qualityDrilledDownData.components);
      fullBubbleChartData = this.props.qualityDrilledDownData.components;
      console.log(fullBubbleChartData);

      BubbleChartData = this.props.qualityDrilledDownData.components.map((item, index) => {
        return item.measures.map(ele => {
          var keyVal = Object.values(ele);
          var key = keyVal[0];
          var val = keyVal[1];
          var Obj = {};
          Obj[key] = val;

          return {
            ...Obj
          };
        });
      });

      console.log(BubbleChartData);
      var obj = {};

      BubbleChartData[0].map(item => {
        console.log(item);
        var dataType = Object.keys(item);
        // type = dataType[0];
        console.log(...dataType);


        if (dataType[0] == "bugs") {
          type = " ";
          type = dataType[0];
        }
        else if (dataType[0] == "vulnerabilities") {
          type = " ";
          type = dataType[0];
        }
        else if (dataType[0] == "code_smells") {
          type = " ";
          type = dataType[0];
        }
        else if (dataType[0] == "coverage") {
          type = " ";
          type = dataType[0];
        }
        else if (dataType[0] == "duplicated_lines") {
          type = " ";
          type = dataType[0];
        }
      })

      console.log(type);


      if (type == 'bugs') {
        console.log("type is bugs");

        this.setBugsData();

        this.setBugSeverity();


        option = {};

        option = {
          chart: {
            type: "bubble",
            plotBorderWidth: 0,
            zoomType: "xy",
            backgroundColor: "#232d3b"
          },
          credits: {
            enabled: false
          },
          legend: {
            symbolHeight: 11,
            symbolWidth: 11,
            symbolRadius: 0,
            align: "left",
            itemStyle: {
              color: "#f5f5f5",
              fontWeight: "normal"
            }
          },
          title: {
            text: "",
            align: "left",
            style: {
              color: "#f5f5f5",
              fontWeight: "bold"
            }
          },
          xAxis: {
            min: 0,
            gridLineWidth: 0,
            tickLength: 0,
            lineWidth: 0,
            title: {
              text: "Lines of Code",
              style: {
                color: '#f5f5f5'
              }
            },
            labels: {
              format: "{value}",
              style: {
                color: "#f5f5f5"
              }
            }
          },
          yAxis: {
            min: 0,
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
                color: "#f5f5f5"
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
              name: "Critical",
              data: criticalBug,
              color: '#ff0000'
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
              color: '#056642'
            }
          ]
        }


        this.state.options = option;


      }

      else if (type == "vulnerabilities") {
        this.setVulnerabilityData();

        this.setVulnerabilitySeverity();

        option = {};

        option = {
          chart: {
            type: "bubble",
            plotBorderWidth: 0,
            zoomType: "xy",
            backgroundColor: "#232d3b"
          },
          credits: {
            enabled: false
          },
          legend: {
            symbolHeight: 11,
            symbolWidth: 11,
            symbolRadius: 0,
            align: "left",
            itemStyle: {
              color: "#f5f5f5",
              fontWeight: "normal"
            }
          },
          title: {
            text: "",
            align: "left",
            style: {
              color: "#f5f5f5",
              fontWeight: "bold"
            }
          },
          xAxis: {
            min: 0,
            gridLineWidth: 0,
            tickLength: 0,
            lineWidth: 0,
            title: {
              text: " "
            },
            labels: {
              format: "{value}",
              style: {
                color: "#f5f5f5"
              }
            }
          },
          yAxis: {
            min: 0,
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
                color: "#f5f5f5"
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

      else if (type == 'code_smells') {
        this.setCodeSmellsData();
        this.setCodeSmellsSeverity();

        option = {};

        option = {
          chart: {
            type: "bubble",
            plotBorderWidth: 0,
            zoomType: "xy",
            backgroundColor: "#232d3b"
          },
          credits: {
            enabled: false
          },
          legend: {
            symbolHeight: 11,
            symbolWidth: 11,
            symbolRadius: 0,
            align: "left",
            itemStyle: {
              color: "#f5f5f5",
              fontWeight: "normal"
            }
          },
          title: {
            text: "",
            align: "left",
            style: {
              color: "#f5f5f5",
              fontWeight: "bold"
            }
          },
          xAxis: {
            min: 0,
            gridLineWidth: 0,
            tickLength: 0,
            lineWidth: 0,
            title: {
              text: " "
            },
            labels: {
              format: "{value}",
              style: {
                color: "#f5f5f5"
              }
            }
          },
          yAxis: {
            min: 0,
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
                color: "#f5f5f5"
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
              name: "VeryLow",
              data: veryLowCodeSmells,
              color: '#056642'
            },
            {
              name: "Low",
              data: lowCodeSmells,
              color: '#90ee90'
            },
            {
              name: "Medium",
              data: mediumCodeSmells,
              color: '#ffff00'
            },
            {
              name: "High",
              data: highCodeSmells,
              color: '#ffa500'
            },
            {
              name: "Critical",
              data: criticalCodeSmells,
              color: '#ff0000'
            }
          ]
        }



        this.state.options = option;

      }

      else if (type == 'coverage') {
        this.setComplexityData();


        option = {};
        option = {
          chart: {
            type: "bubble",
            plotBorderWidth: 0,
            zoomType: "xy",
            backgroundColor: "#232d3b"
          },
          credits: {
            enabled: false
          },
          legend: {
            symbolHeight: 11,
            symbolWidth: 11,
            symbolRadius: 0,
            align: "left",
            itemStyle: {
              color: "#f5f5f5",
              fontWeight: "normal"
            }
          },
          title: {
            text: "",
            align: "left",
            style: {
              color: "#f5f5f5",
              fontWeight: "bold"
            }
          },
          xAxis: {
            min: 0,
            gridLineWidth: 0,
            tickLength: 0,
            lineWidth: 0,
            title: {
              text: " "
            },
            labels: {
              format: "{value}",
              style: {
                color: "#f5f5f5"
              }
            }
          },
          yAxis: {
            min: 0,
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
                color: "#f5f5f5"
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
              name: "Coverage",
              data: complexityData,
              color: '#4b9fd5'
            }
          ]
        };

        this.state.options = option;

      }

      else if (type == 'duplicated_lines') {
        this.setDuplicationData();

        option = {};
        option = {
          chart: {
            type: "bubble",
            plotBorderWidth: 0,
            zoomType: "xy",
            backgroundColor: "#232d3b"
          },
          credits: {
            enabled: false
          },
          legend: {
            symbolHeight: 11,
            symbolWidth: 11,
            symbolRadius: 0,
            align: "left",
            itemStyle: {
              color: "#f5f5f5",
              fontWeight: "normal"
            }
          },
          title: {
            text: "",
            align: "left",
            style: {
              color: "#f5f5f5",
              fontWeight: "bold"
            }
          },
          xAxis: {
            min: 0,
            gridLineWidth: 0,
            tickLength: 0,
            lineWidth: 0,
            title: {
              text: " "
            },
            labels: {
              format: "{value}",
              style: {
                color: "#f5f5f5"
              }
            }
          },
          yAxis: {
            min: 0,
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
                color: "#f5f5f5"
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
              name: "Duplication",
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
        <ChartHOC options={this.state.options} type={"bubble"} />
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => {
  return {
    qualityDrilledDownData: state.qualityData.qualityDrilledDownDetails
  };
};
export default connect(mapStateToProps)(BubbleHigh);

