import React from "react";
import Dashboard from "./Components/DashboardController/DashboardController";
import Header from "./Components/AnalyticalLibrary/Header/Header";
import { appComponentList } from "./Utility/Constants/componentLoaders";
const shortid = require("shortid");
class App extends React.Component {
  render() {
    console.log(process.env.NODE_ENV);
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
