//Author : Sujith Surendran

import { lazy } from "react";

//Widget class which iterate configuration data , methods that return objects with widget attributes

class Widgets {
  //method which iterates through widgets and load the components dynamically

  loadWidgets = widgetItems => {
    let loadWidgets = {};
    widgetItems.map(widget => {
      loadWidgets[widget.name] = lazy(() => {
        return import("../analyticalLibrary/" + widget.compPath);
      });
    });

    return loadWidgets;
  };

  //method which iterates through dimensions and load the components

  loadDimensions = dimensionData => {
    return this.loadWidgets(dimensionData);
  };

  //method which iterates through metric data and return the metric object

  loadMetrics = metricsData => {
    const metricItem = metricsData.map(metricItem => {
      return { metricName: metricItem.name };
    });

    return metricItem;
  };

  //method which iterates through attributes data and return the attribute object

  loadAttributes = attrData => {
    const attrItem = attrData.map(item => {
      return {
        attrName: item.name,
        attrValue: item.value
      };
    });
    return attrItem;
  };
}

export default Widgets;
