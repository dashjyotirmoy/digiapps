// Dashboard Controller which parses through the Config json file and render components dynamically
//Author : Sujith Surendran
import React, { Suspense } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import DefinitionLoader from "../../libs/ProductDefinationBar/DefinitionLoader.js";
import ModalLoader from '../UI/modalLoader';
var dot = require("dot-object");
const configData = require("../ConfigurationManager/Config.json");

function LazyComponent(items) {
  let lazyComponents = {};
  items.map((widget, index) => {
    lazyComponents[widget.name] = React.lazy(() => {
      return import("../../libs/" + widget.path);
    });
  });
  return lazyComponents;
}

export default function Dashboard(props) {
  let items = dot.pick("widgets", configData);
  const widgetComponents = new LazyComponent(items);
  const componentArray = props.compList.map((item, index) => {
    const widgetData = dot.pick(
      "widgets[" + index + "]" + ".dimensions",
      configData
    );
    const Component = widgetComponents[item];
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <Component key={index} widData={widgetData} lazyFunc={LazyComponent} />
      </Suspense>
    );
  });

  return (
    <ModalLoader />
    // <BrowserRouter basename="/digitalops/execDashboard">
    //   {componentArray}
    //   <Switch>
    //     <Route path={"/:productSelected"} component={DefinitionLoader} />
    //     <Redirect exact from={"/"} to={`/velocity`} />
    //   </Switch>
    // </BrowserRouter>
  );
}
