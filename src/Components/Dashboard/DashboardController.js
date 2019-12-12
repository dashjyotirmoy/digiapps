// Dashboard Controller which parses through the Config json file and render components dynamically
//Author : Sujith Surendran
import React, { Suspense } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import DefinitionLoader from "../../libs/ProductDefinationBar/DefinitionLoader.js";
import ModalLoader from "../UI/ModalBackDrop.js/ModalBackDrop";

var dot = require("dot-object");
const configData = require("../ConfigurationManager/Config.json");

function lazyComponent(items) {
  let loadWidgets = {};
  items.map((widget, index) => {
    loadWidgets[widget.name] = React.lazy(() => {
      return import("../../libs/" + widget.path);
    });
  });
  return loadWidgets;
}

export default function Dashboard(props) {
  let items = dot.pick("widgets", configData);
  const widgetComponents = new lazyComponent(items);
  const componentArray = props.compList.map((item, index) => {
    const widgetData = dot.pick(
      "widgets[" + index + "]" + ".dimensions",
      configData
    );
    const Component = widgetComponents[item];
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <Component key={index} widData={widgetData} lazyFunc={lazyComponent} />
      </Suspense>
    );
  });

  return (
    // <ModalLoader show={true} />
    <BrowserRouter basename="/digitalops/execDashboard">
      {componentArray}
      <Switch>
        <Route path={"/:productSelected"} component={DefinitionLoader} />
        <Redirect exact from={"/"} to={`/velocity`} />
      </Switch>
    </BrowserRouter>
  );
}
