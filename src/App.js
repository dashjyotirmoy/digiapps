import React from "react";
import DashboardController from "./components/dashboardController/dashboardController";
import Header from "./components/analyticalLibrary/Header/Header";
import { appComponentList } from "./utility/constants/componentLoaders";
import { labelConst } from "./utility/constants/labelsConstants";
import ErrorBoundaries from "./components/errorBoundaries";

class App extends React.Component {
  render() {
    const componentImports = appComponentList;
    const labelConstantImports = labelConst;
    return (
      <React.Fragment>
        <Header labelsConst={labelConstantImports}/>
        <ErrorBoundaries>
          <DashboardController compList={componentImports} labelsConst={labelConstantImports}/>
        </ErrorBoundaries>
      </React.Fragment>
    );
  }
}
export default App;
