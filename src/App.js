import React from "react";
import DashboardController from "./components/dashboardController/dashboardController";
import Header from "./components/analyticalLibrary/Header/Header";
import { appComponentList } from "./utility/constants/componentLoaders";
import ErrorBoundaries from "./components/errorBoundaries";

class App extends React.Component {
  render() {
    const componentImports = appComponentList;
    return (
      <React.Fragment>
        <Header />
        <ErrorBoundaries>
          <DashboardController compList={componentImports} />
        </ErrorBoundaries>
      </React.Fragment>
    );
  }
}
export default App;
