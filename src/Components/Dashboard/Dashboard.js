import React, { Suspense } from "react";
var dot = require("dot-object");
const configData = require("../ConfigurationManager/Config.json");

function LazyComponent() {
  let components = {};
  configData.widgets.map((widget, index) => {
    components[widget.name] = React.lazy(() => {
      return import("../../libs/" + widget.path);
    });
  });
  return components;
}

export default function Dashboard(props) {
  const Components = new LazyComponent();
  return props.data.map((item, index) => {
    const widgetData = dot.pick(
      "widgets[" + index + "]" + ".dimensions",
      configData
    );
    const Component = Components[item];
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <Component data={widgetData} />
      </Suspense>
    );
  });
}
