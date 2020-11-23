import React from "react";
import DashboardController from "./components/dashboardController/dashboardController";
import Header from "./components/analyticalLibrary/Header/Header";
import { appComponentList } from "./utility/constants/componentLoaders";
import { labelConst } from "./utility/constants/labelsConstants";
import ErrorBoundaries from "./components/errorBoundaries";

class App extends React.Component {
  render() {
    const componentImports = appComponentList;
    const labelConstant = labelConst;
    const clientName = window.location.pathname.replace(/^\/([^\/]*).*$/, '$1');
    const labelConstantImports = labelConstant.filter((item)=> item.clientName === clientName );
    return (
      <React.Fragment>
        <Header labelsConst={labelConstantImports[0]}/>
        <ErrorBoundaries>
          <DashboardController compList={componentImports} labelsConst={labelConstantImports}/>
        </ErrorBoundaries>
      </React.Fragment>
    );
  }
}
export default App;
