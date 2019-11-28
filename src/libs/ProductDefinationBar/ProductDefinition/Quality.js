import React, { Component } from 'react';
import Grid from '../../Grid-Layout/Grid';
import ControlChartHigh from '../../Charts/ControlChartHigh/ControlChartHigh';
import ColumnHigh from '../../Charts/ColumnHigh/ColumnHigh';
import MTTDChart from '../../Charts/MTTDChart/MTTDChart';


const initialData = [{
  name: "rct",
  type: "MTTDChart",
  data: {},
  title: "Mean Time To Detect(MTTD)",
  component: {}
},
{
  name: "dlt",
  type: "MTTDChart",
  data: {},
  title: "Mean Time To Repair(MTTR)",
  component: {}
},
{
  name: "tp",
  type: "ColumnHigh",
  data: {},
  title: "No. of Errors",
  component: {}
},
{
  name: "dcp",
  type: "MTTDChart",
  data: {},
  title: "Average Incident Resolution Time",
  component: {},
},
{
  name: "dtra",
  type: "ColumnHigh",
  data: {},
  title: "Uptime %",
  component: {}
},
{
  name: "dtra",
  type: "ColumnHigh",
  data: {},
  title: "Defect Escape Rate",
  component: {}
},
{
  name: "dtra",
  type: "ColumnHigh",
  data: {},
  title: "Automated Test Pass %",
  component: {}
}]

class Quality extends Component {
  state = {
    charts: [],
    layout: {
      lg: [
        { i: '0', x: 0, y: 0, w: 5, h: 2, isResizable: false },
        { i: '1', x: 5, y: 0, w: 5, h: 2, isResizable: false },
        { i: '2', x: 10, y: 0, w: 2, h: 2, isResizable: false },
        { i: '3', x: 0, y: 2, w: 5, h: 2, isResizable: false },
        { i: '4', x: 5, y: 2, w: 2.5, h: 2, isResizable: false },
        { i: '5', x: 7.5, y: 2, w: 2.5, h: 2, isResizable: false },
        { i: '6', x: 10, y: 2, w: 2, h: 2, isResizable: false }],
      md: [
        { i: '0', x: 0, y: 0, w: 5, h: 2, isResizable: false },
        { i: '1', x: 6, y: 0, w: 5, h: 2, isResizable: false },
        { i: '2', x: 0, y: 2, w: 4, h: 2, isResizable: false },
        { i: '3', x: 4, y: 2, w: 6, h: 2, isResizable: false },
        { i: '4', x: 0, y: 4, w: 3, h: 2, isResizable: false },
        { i: '5', x: 3, y: 4, w: 4, h: 2, isResizable: false },
        { i: '6', x: 7, y: 4, w: 4, h: 2, isResizable: false }]
    },
    graphCount: 6,
    currentBreakpoint: "lg",
    currentColCount: 0,
    gridCol: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
    gridBreakpoints: { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }

  }
  removeChartComponent = (chartIndex) => {
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
      case "MTTDChart":
        return <MTTDChart title={title} />
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

export default Quality;