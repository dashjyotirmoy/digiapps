import React from "react";
import Dashboard from "./components/dashboardController/dashboardController";
import Header from "./components/analyticalLibrary/Header/Header";
import { appComponentList } from "./utility/constants/componentLoaders";
const shortid = require("shortid");
class App extends React.Component {
  render() {
    const componentImports = appComponentList;
    return (
      <React.Fragment>
        <Header />
        <Dashboard compList={componentImports} key={shortid.generate()} />
      </React.Fragment>
    );
  }
}
export default App;
