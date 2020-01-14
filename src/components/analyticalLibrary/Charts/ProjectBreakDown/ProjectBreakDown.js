import React, { Component } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import ChartHOC from "../ChartHOC/ChartHOC";

class BreakdownHigh extends Component {
  state = {
    options: {
      chart: {
        // type: 'column',
      },

      title: {
        text: "Project Breakdown",
        align: "left",
        style: {
          color: "#f5f5f5"
        }
      },

      subtitle: {
        text: "7 Mar 2019 - 22 Dec 2019",
        align: "left",
        style: {
          color: "#C0C0C0"
        }
      },
      yAxis: {
        gridLineWidth: 0,
        labels: {
          enabled: true,
          style: {
            color: "#f5f5f5"
          }
        },
        title: {
          text: ``,
          rotation: 0
        }
      },

      xAxis: {
        gridLineWidth: 0,
        tickWidth: 0,
        labels: {
          format: "Sprint {value}",
          style: {
            color: "#f5f5f5"
          }
        },
        lineColor: "transparent"
      },
      credits: {
        enabled: false
      },

      plotOptions: {
        column: {
          stacking: "normal",
          dataLabels: {
            enabled: false
          }
        },
        series: {
          borderRadius: 6
        }
      },

      legend: {
        enabled: true,
        backgroundColor: "transparent",
        align: "right",
        verticalAlign: "top",
        y: -50,
        x: -30,
        itemStyle: {
          color: "#ffffff",
          fontWeight: "normal"
        },
        itemHoverStyle: {
          color: "#D3D3D3"
        }
      },

      series: [
        {
          name: "Remaining",
          type: "column",
          data: [
            [1, 400],
            [2, 350],
            [3, 300],
            [4, 300],
            [5, 200],
            [6, 150]
          ],
          color: "#4370FE",
          borderWidth: 0,
          pointWidth: 10
        },
        {
          name: "Burndown",
          type: "line",
          data: [
            [1, 400],
            [2, 350],
            [3, 300],
            [4, 300],
            [5, 200],
            [6, 150]
          ],
          color: "#A35FC0",
          marker: {
            enabled: false
          }
        },
        {
          name: "Total Scope",
          type: "line",
          data: [
            [1, 400],
            [2, 400],
            [3, 400],
            [4, 400],
            [5, 400],
            [6, 400]
          ],
          color: "#BA8054",
          marker: {
            enabled: false
          }
        }
      ]
    }
  };
  render() {
    return (
      <React.Fragment>
        <ChartHOC options={this.state.options} />
        {/* <HighchartsReact highcharts={Highcharts} options={this.state.options} /> */}
      </React.Fragment>
    );
  }
}

export default BreakdownHigh;
