// Dashboard Controller which parses through the Config json file and render components dynamically
//Author : Sujith Surendran
import React, { Suspense } from "react";
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import DefinitionLoader from "../../libs/ProductDefinationBar/DefinitionLoader.js";
var dot = require("dot-object");
const configData = require("../ConfigurationManager/Config.json");

function LazyComponent(items) {
  let components = {};
  items.map((widget, index) => {
    components[widget.name] = React.lazy(() => {
      return import("../../libs/" + widget.path);
    });
  });
  return components;
}

export default function Dashboard(props) {
  let items = dot.pick("widgets", configData);
  const Components = new LazyComponent(items);
  const componentArray = props.data.map((item, index) => {
    const widgetData = dot.pick(
      "widgets[" + index + "]" + ".dimensions",
      configData
    );
    const Component = Components[item];
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <Component key={index} data={widgetData} func={LazyComponent} />
      </Suspense>
    );
  });

  return (
    <BrowserRouter basename='execDashboard'>
      {componentArray}
      <Switch>
        <Route path={'/:productSelected'} component={DefinitionLoader} />
        <Redirect exact from={'/'} to={`/velocity`} />
      </Switch>
    </BrowserRouter>
  );
}
