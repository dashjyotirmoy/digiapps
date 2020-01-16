import React from "react";
import { Component } from "react";
import ChartHOc from "../../Charts/ChartHOC/ChartHOC";

class SprintBurndown extends Component {
  state = {
    options: {
      chart: {},
      title: {
        text: "Sprint Burndown",
        align: "left",
        style: {
          color: "#f5f5f5"
        }
      },
      subtitle: {
        text: "7 Oct 2019 - 25 Oct 2019",
        align: "left",
        style: {
          color: "#C0C0C0"
        }
      },
      xAxis: {
        type: "datetime",
        dateTimeLabelFormats: {
          day: "%b %e"
        },
        gridLineWidth: 0,
        lineColor: "transparent",
        tickLength: 0,
        labels: {
          style: {
            color: "#f5f5f5"
          }
        }
      },
      yAxis: {
        min: 0,
        max: 100,
        tickInterval: 20,
        lineColor: "transparent",
        gridLineWidth: 0,
        labels: {
          style: {
            color: "#f5f5f5"
          }
        },
        title: {
          enabled: false
        }
      },
      credits: {
        enabled: false
      },
      legend: {
        enabled: true,
        itemStyle: {
          color: "#f5f5f5",
          fontWeight: "normal"
        }
      },
      plotOptions: {
        series: {
          pointStart: Date.UTC(2019, 9, 10),
          pointInterval: 86400000,
          marker: {
            enabled: false
          }
        }
      },
      series: [
        {
          name: "Remaining",
          data: [80, 78, 65, 60, 72, 40, 39, 20, 10],
          type: "area",
          color: "#4370FE"
        },
        {
          name: "Burndown",
          data: [80, 70, 60, 50, 40, 30, 20, 10, 0],
          type: "line",
          color: "#A35FC0"
        },
        {
          name: "Total Scape",
          data: [90, 90, 90, 90, 90, 90, 90, 90, 90],
          type: "line",
          color: "#BA8054"
        }
      ]
    }
  };
  render() {
    return (
      <React.Fragment>
        <ChartHOc options={this.state.options} />
      </React.Fragment>
    );
  }
}

export default SprintBurndown;
