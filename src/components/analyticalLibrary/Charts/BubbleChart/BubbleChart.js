import React, { Component } from "react";
import HighchartsReact from "highcharts-react-official";
import ChartHOC from "../ChartHOC/ChartHOC";
import { connect } from "react-redux";
import { color } from "highcharts";

var BubbleChartData;
var bugsData, vulnearbilityData, codeSmellsData, complexityData, duplicationData, veryLowData = [], lowData = [], mediumData = [], highData = [], criticalData = [];

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
          name: "VeryLow",
          data: veryLowData,
          color: "#90ee90"
        },
        {
          name: "Low",
          data: lowData,
          color: "#056642"
        },
        {
          name: "Medium",
          data: mediumData,
          color: "#ffff00"
        },
        {
          name: "High",
          data: highData,
          color: "#ffa500"
        },
        {
          name: "Critical",
          data: criticalData,
          color: "#ff0000"
        }
      ]
    }
  };

  setBugsData = () => {
    console.log("Bugs Data");

    bugsData = BubbleChartData.map((item, index) => {
      return {
        x: parseInt(item[3].value),
        y: parseInt(item[2].value),
        z: parseInt(item[0].value)
      }
    }
    )
  };

  setVulnerabilityData = () => {
    console.log("security_rating");

    vulnearbilityData = BubbleChartData.map((item, index) => {
      return {
        x: parseInt(item[3].value),
        y: parseInt(item[2].value),
        z: parseInt(item[1].value)
      }
    }
    )
  };

  setCodeSmellsData = () => {
    console.log("code_smells");

    codeSmellsData = BubbleChartData.map((item, index) => {
      return {
        x: parseInt(item[0].value),
        y: parseInt(item[2].value),
        z: parseInt(item[1].value)
      }
    }
    )
  };

  setComplexityData = () => {
    console.log("complexity");

    complexityData = BubbleChartData.map((item, index) => {
      return {
        x: parseInt(item[1].value),
        y: parseInt(item[2].value),
        z: parseInt(item[0].value)
      }

    }
    )
  };

  setDuplicationData = () => {
    console.log("duplication_lines");

    duplicationData = BubbleChartData.map((item, index) => {
      return {
        x: parseInt(item[2].value),
        y: parseInt(item[1].value),
        z: parseInt(item[0].value)
      }
    }
    )
  };

  setColorIndication = (data) => {

    var coloredBugData = data.map((item, index) => {
      return {
        ...item,
        color: 'red'
      }
    }

    )
    console.log(coloredBugData);

  };

  filterBugData = (data) => {
    data.map((item, index) => {
      if (item.z == 0) {
        console.log(item);
        veryLowData.push(item);
        console.log(veryLowData);
      }
      else if (item.z == 1) {
        lowData.push(item)
        console.log(lowData);

      }
      else if (item.z == 2) {
        // mediumData.push(item)
      }
      else if (item.z == 3) {
        // highData.push(item)
      }
      else {
        // criticalData.push(item)
      }

    }
    )
  }

  render() {
    if (this.props.qualityDrilledDownData.components) {
      console.log('ddddddddddddddddddwwwwwwwwwwwwssssssssssss', this.props.qualityDrilledDownData.components);
      BubbleChartData = this.props.qualityDrilledDownData.components.map((item, index) => {
        return item.measures.map(ele => {
          return {
            id: ele.metric,
            value: ele.value
          };
        });
        // x: item.measures[3].value,
        // y: item.measures[2].value,
        // z: item.measures[0].value



      });
      console.log(BubbleChartData);

      if (BubbleChartData[0][0].id == 'bugs') {
        this.setBugsData();
        this.filterBugData(bugsData);


      }
      else if (BubbleChartData[0][0].id == 'security_rating') {
        this.setVulnerabilityData();
        this.filterBugData(vulnearbilityData);


      }
      else if (BubbleChartData[0][1].id == 'code_smells') {
        this.setCodeSmellsData();
        this.filterBugData(codeSmellsData)
      }
      else if (BubbleChartData[0][1].id == 'complexity') {
        // this.setComplexityData();
        // this.filterBugData(complexityData);
        console.log(BubbleChartData);

      }
      else if (BubbleChartData[0][1].id == 'duplicated_lines') {
        this.setDuplicationData();
        this.filterBugData(duplicationData);
      }
      // this.setColorIndication(bugsData);

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

