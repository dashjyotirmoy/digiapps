// Dashboard Controller which dynamically renders the components
//Author : Sujith Surendran
import React, { Suspense } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import DefinitionLoader from "../analyticalLibrary/ProductDefinationBar/DefinitionLoader.js";
import Widgets from "../dashboardController/widgetParser";
import dashConstants from "../../utility/constants/dashboardConstants";

const dotObject = require("dot-object"); // requiring the dotObject dependency
const configurationData = require("../../Config.json"); // requiring config.json to get configurationd ata

//function which use dotObject to retrieve metrics, dimensions and attributes data

const dataFromDot = index => {
  let dimensionItems = [];
  dashConstants.dotProps.map(item => {
    dimensionItems.push(
      dotObject.pick(
        "widgets[" + index + "]" + item.dimension,
        configurationData
      )
    );
  });

  return dimensionItems;
};

//Functional component which dynamically imports the widgets and renders

const DashboardController = props => {
  let widgetsMain = dotObject.pick("widgets", configurationData);
  let widget_item = new Widgets();
  const baseUrl = dashConstants.baseName.name;
  const clientName = window.location.pathname.replace(/^\/([^\/]*).*$/, '$1');
  const baseUrlName = clientName !== "digitalops" ? "/"+clientName+baseUrl : baseUrl; 
  const widgetComponents = widget_item.loadWidgets(widgetsMain);
  const componentArray = props.compList.map((item, index) => {
    const widgetProperties = dataFromDot(index);
    const Component = widgetComponents[item];

    return (
      <Suspense fallback={<div>Loading...</div>} key={index}>
        <Component
          key={index}
          widgetProps={widgetProperties[0]}
          metrics={widgetProperties[1]}
          attributes={widgetProperties[2]}
        />
      </Suspense>
    );
  });

  return (
    //Router configuration which sets the basename and base component

    <BrowserRouter basename={baseUrlName}>
      {componentArray}
      <Switch>
        <Route path={"/:productSelected"} component={DefinitionLoader} />
        {/* <Redirect exact from={"/"} to={`/security`} /> */}
        <Route  path="*" render={()=>(<Redirect to="/overview"/>)} /> 
      </Switch>
    </BrowserRouter>
  );
};
export default DashboardController;
