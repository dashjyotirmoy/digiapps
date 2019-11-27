import React, { Component } from 'react';
import Grid from '../../Grid-Layout/Grid';
import ControlChartHigh from '../../Charts/ControlChartHigh/ControlChartHigh';
import ColumnHigh from '../../Charts/ColumnHigh/ColumnHigh';
import axios from 'axios'
var rct = {}, dlt = {};

var initialData = [{
  name: "rct",
  type: "ControlChartHigh",
  data: "",
  title: "Release Cycle Time",
  component: {}
},
{
  name: "dlt",
  type: "ControlChartHigh",
  data: dlt,
  title: "Deployment Lead Time",
  component: {}
},
{
  name: "tp",
  type: "ColumnHigh",
  data: {},
  title: "Throughput",
  component: {}
},
{
  name: "dcp",
  type: "ColumnHigh",
  data: {},
  title: "Deployment/Change Frequency",
  component: {},
},
{
  name: "dtra",
  type: "ColumnHigh",
  data: {},
  title: "Degree of Testing and Release Automation",
  component: {}
}]


class Velocity extends Component {
  state = {
    charts: [],
    layout: {
      lg: [
        { i: '0', x: 0, y: 0, w: 6, h: 2, isResizable: false },
        { i: '1', x: 6, y: 0, w: 6, h: 2, isResizable: false }
        // { i: '2', x: 0, y: 2, w: 4, h: 2, isResizable: false },
        // { i: '3', x: 4, y: 2, w: 4, h: 2, isResizable: false },
        // { i: '4', x: 8, y: 2, w: 4, h: 2, isResizable: false }
      ],
      md: [
        { i: '0', x: 0, y: 0, w: 5, h: 2, isResizable: false },
        { i: '1', x: 5, y: 0, w: 5, h: 2, isResizable: false }
        // { i: '2', x: 0, y: 2, w: 4, h: 2, isResizable: false },
        // { i: '3', x: 4, y: 2, w: 3, h: 2, isResizable: false },
        // { i: '4', x: 7, y: 2, w: 3, h: 2, isResizable: false }
      ]
    },
    graphCount: 6,
    currentBreakpoint: "lg",
    currentColCount: 0,
    gridCol: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
    gridBreakpoints: { lg: 1200, md: 768, sm: 576, xs: 480, xxs: 0 },
    response: {},
    received: false
  }

  removeChartComponent = (chartIndex) => {
    debugger
    const charts = [...this.state.charts];
    this.createCharts(charts, chartIndex)
    //charts.splice(chartIndex, 1);
    const layouts = {}
    Object.keys(this.state.layout).map(key => {
      const copy = [...this.state.layout[key]]
      copy.splice(chartIndex, 1)
      const indexUpdate = copy.map((ele, index) => {
        return {
          ...ele,
          i: index.toString()
        };
      })
      layouts[key] = indexUpdate
    })
    this.setState({
      layout: layouts
    })

  }

  createCharts = (list, removed) => {
    const updatedList = list.filter((ele, index) => {
      if (index !== removed) return Object.assign({}, ele)
    })
    updatedList.map(ele => {
      ele.component = this.setChart(ele.type, ele.title, ele.data)
    })
    this.setState({
      charts: updatedList
    })
  }

  setChart = (type, title, data) => {
    switch (type) {
      case "ControlChartHigh":
        return <ControlChartHigh title={title} type={type} data={data} />
      case "ColumnHigh":
        return <ColumnHigh title={title} type={type} data={data} />
    }
  }

  setData = () => {
    if (this.state.received) {
      this.state.response.map(metric => {
        if (metric.name == "Release Cycle Time") {
          rct = metric.metrics
          // console.log(rct)
        }
        // else if(metric.name == "Deployment Lead Time")
        else {
          dlt = metric.metrics
          // console.log(dlt)
        }
      })
    }
  }

  createChartObject = (rawData) => {
    const processedData = rawData.map(ele => {
      return {
        name: ele.name,
        type: "ControlChartHigh",
        data: ele.metrics,
        title: ele.name,
        component: {}
      }
    })
    return processedData
  }
  componentDidMount() {
    axios.get("/JsonData/velocity.json")
      .then(res => {
        this.createCharts(this.createChartObject(res.data))
        this.setState({
          response: res.data,
          received: true
        })
      })

  }

  render() {
    if (this.state.received) {
      this.setData()
    }
    return (
      <React.Fragment>
        {this.state.charts.length > 0 ? <Grid chartData={this.state.charts} layouts={this.state.layout} removeDelegate={this.removeChartComponent} breakpoint={this.state.gridBreakpoints} columnSize={this.state.gridCol} /> : null}
      </React.Fragment>
    );
  }
}

export default Velocity;