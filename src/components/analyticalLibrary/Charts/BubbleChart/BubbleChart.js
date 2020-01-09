import React, { Component } from "react";
import HighchartsReact from "highcharts-react-official";
import ChartHOC from "../ChartHOC/ChartHOC";
import { color } from "highcharts";
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
          name: "Low",
          data: [
            { x: 20, y: 20, z: 20 },
            { x: 10, y: 3, z: 10 }
          ],
          color: "#00AA00"
        },
        {
          name: "Medium",
          data: [
            { x: 30, y: 180, z: 760 },
            { x: 50, y: 145, z: 700 }
          ],
          color: "#F0D04D"
        },
        {
          name: "High",
          data: [
            { x: 50, y: 50, z: 400 },
            { x: 70, y: 80, z: 500 }
          ],
          color: "#F3413E"
        }
      ]
    }
  };
  render() {
    this.state.options.title.text = this.props.title;
    return (
      <React.Fragment>
        <ChartHOC options={this.state.options} type={"bubble"} />
      </React.Fragment>
    );
  }
}
export default BubbleHigh;
