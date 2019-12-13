import React from "react";
import Dashboard from "./components/dashboardController/dashboardController";
import Header from "./components/analyticalLibrary/Header/Header";
import { appComponentList } from "./utility/constants/componentLoaders";
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
