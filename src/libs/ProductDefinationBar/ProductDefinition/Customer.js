import React, { Component } from "react";
import Grid from '../../Grid-Layout/Grid';
import ControlChartHigh from '../../Charts/ControlChartHigh/ControlChartHigh';
import ColumnHigh from '../../Charts/ColumnHigh/ColumnHigh';

const initialData = [{
  name: "rct",
  type: "ColumnHigh",
  data: {},
  title: "Feature Usage Percentage",
  component: {}
},
{
  name: "dlt",
  type: "ColumnHigh",
  data: {},
  title: "User Adoption",
  component: {}
},
{
  name: "tp",
  type: "ColumnHigh",
  data: {},
  title: "Net Promoter Score",
  component: {}
},
{
  name: "dcp",
  type: "ColumnHigh",
  data: {},
  title: "User Satisfaction Surveys",
  component: {},
},
{
  name: "dtra",
  type: "ColumnHigh",
  data: {},
  title: "Release Cycle Time",
  component: {}
}]
class Customer extends Component {
  state = {
    charts: [],
    layout: {
      lg: [
        { i: "0", x: 0, y: 0, w: 4, h: 2, isResizable: false },
        { i: "1", x: 4, y: 0, w: 4, h: 2, isResizable: false },
        { i: "2", x: 8, y: 0, w: 4, h: 2, isResizable: false },
        { i: "3", x: 0, y: 2, w: 6, h: 2, isResizable: false },
        { i: "4", x: 8, y: 2, w: 6, h: 2, isResizable: false }
      ],
      md: [
        { i: "0", x: 0, y: 0, w: 4, h: 2, isResizable: false },
        { i: "1", x: 4, y: 0, w: 4, h: 2, isResizable: false },
        { i: "2", x: 8, y: 0, w: 4, h: 2, isResizable: false },
        { i: "3", x: 0, y: 2, w: 6, h: 2, isResizable: false },
        { i: "4", x: 8, y: 2, w: 6, h: 2, isResizable: false }
      ]
    },
    graphCount: 6,
    currentBreakpoint: "lg",
    currentColCount: 0,
    gridCol: { lg: 12, md: 12, sm: 6, xs: 4, xxs: 2 },
    gridBreakpoints: { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }
  };

  createCharts = (list, removed) => {
    const updatedList = list.filter((ele, index) => {
      if (index !== removed) return Object.assign({}, ele)
    })
    updatedList.map(ele => {
      ele.component = this.setChart(ele.type, ele.title)
    })
    this.setState({
      charts: updatedList
    })
  }

  setChart = (type, title) => {
    switch (type) {
      case "ControlChartHigh":
        return <ControlChartHigh title={title} />
      case "ColumnHigh":
        return <ColumnHigh title={title} />
    }
  }

  componentDidMount() {
    this.createCharts(initialData)
  }

  render() {
    return (
      <React.Fragment>
        {this.state.charts.length ? <Grid chartData={this.state.charts} layouts={this.state.layout} removeDelegate={this.removeChartComponent} breakpoint={this.state.gridBreakpoints} columnSize={this.state.gridCol} /> : null}
      </React.Fragment>
    );
  }
}

export default Customer;
