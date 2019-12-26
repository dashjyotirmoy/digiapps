import React, { Component } from "react";
import Grid from "../../Grid-Layout/Grid";
import active from "../../../../content/img/activityStatus.png";
import coverage from "../../../../content/img/coverage.png";
import resultCount from "../../../../content/img/resultCount.png";
import mockApi from "../../../../utility/http/devOpsApisMock";
import LineHigh from "../../Charts/LineHigh/LineHigh";
import AreaHigh from "../../Charts/AreaHigh/AreaHigh";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

const initialData = [
  {
    name: "rct",
    type: "img",
    data: {},
    title: active,
    component: {}
  },
  {
    name: "dlt",
    type: "img",
    data: {},
    title: coverage,
    component: {}
  },
  {
    name: "tp",
    type: "img",
    data: {},
    title: resultCount,
    component: {}
  }
];

const chartComp = [
  {
    name: "Bugs, Vulnerabilities & Code Smells",
    type: "MultipleLineHigh",
    component: LineHigh
  },
  {
    name: "Coverage & Duplications",
    type: "AreaHigh",
    component: AreaHigh
  }
];

class Quality extends Component {
  state = {
    charts: [],
    layout: {
      lg: [
        { i: "0", x: 0, y: 0, w: 6, h: 2, isResizable: false },
        { i: "1", x: 6, y: 0, w: 6, h: 2, isResizable: false }
        // { i: "2", x: 0, y: 0, w: 6, h: 2, isResizable: false },
        // { i: "3", x: 6, y: 2, w: 6, h: 2, isResizable: false }
      ],
      md: [
        { i: "0", x: 0, y: 0, w: 5, h: 2, isResizable: false },
        { i: "1", x: 6, y: 0, w: 5, h: 2, isResizable: false }
        // { i: "2", x: 0, y: 2, w: 4, h: 2, isResizable: false },
        // { i: "3", x: 4, y: 2, w: 6, h: 2, isResizable: false }
      ]
    },
    gridCol: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
    gridBreakpoints: { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }
  };

  removeChartComponent = chartIndex => {
    const charts = [...this.state.charts];
    this.createCharts(charts, chartIndex);
    const layouts = {};
    Object.keys(this.state.layout).map(key => {
      const copy = [...this.state.layout[key]];
      copy.splice(chartIndex, 1);
      const indexUpdate = copy.map((ele, index) => {
        return {
          ...ele,
          i: index.toString()
        };
      });
      layouts[key] = indexUpdate;
    });
    this.setState({
      layout: layouts
    });
  };

  createCharts = (list, removed) => {
    let updatedList = list.filter((ele, index) => {
      if (index !== removed) return Object.assign({}, ele);
    });
    updatedList.map(ele => {
      ele.data = ele.data.splice(1);
      ele.component = this.setChart(ele.title, ele.data);
    });
    this.setState({
      charts: updatedList
    });
  };

  createChartObject = typeObj => {
    const processedData = typeObj[0].map((ele, index) => {
      return {
        name: "Repository A",
        data: ele,
        title: ele[0].name
      };
    });
    return processedData;
  };

  setChart = (title, data) => {
    const chartArry = chartComp.map(item => {
      if (item.name === title) {
        return <item.component type={item.type} title={title} data={data} />;
      }
    });
    return chartArry;
  };

  componentDidMount() {
    const qualityData = mockApi.getQualityMetricsData();
    qualityData.then(item => {
      const type = this.setType(
        item.data.repository,
        item.data.outstandingBugs
      );
      const splitArr = this.splitType(type);
      this.createCharts(this.createChartObject(splitArr));
    });
  }

  splitType = type => {
    const splitArr = type.map(Object.values);
    return splitArr;
  };

  setType = (rawData, outStandingBugs) => {
    let finalArray = [];
    let setType = [];
    const item = rawData.map((item, index) => {
      return {
        bugs_vulnerability_codeSmell: [
          { name: "Bugs, Vulnerabilities & Code Smells" },
          item.bugs,
          item.vulnerabilities,
          item.codeSmells
        ],
        coverage: [{ name: "Coverage & Duplications" }, item.coverage]
      };
    });

    return item;
  };

  render() {
    return (
      <React.Fragment>
        {this.state.charts.length ? (
          <Grid
            chartData={this.state.charts}
            layouts={this.state.layout}
            removeDelegate={this.removeChartComponent}
            breakpoint={this.state.gridBreakpoints}
            columnSize={this.state.gridCol}
          />
        ) : null}
      </React.Fragment>
    );
  }
}

export default Quality;
// const mapStateToProps = state => {
//   return {};
// };

// const mapDispatchToProps = dispatch => {
//   return bindActionCreators({}, dispatch);
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Quality);
