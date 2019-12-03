import React from "react";
import Dashboard from "./Components/Dashboard/DashboardController";
import Header from "./libs/Header/Header";
const shortid = require("shortid");
class App extends React.Component {
  render() {
    const componentImports = ["SummaryView", "ProductInfoBar", "ProductDefBar"];
    return (
      <React.Fragment>
        <Header />
        <Dashboard compList={componentImports} key={shortid.generate()} />
      </React.Fragment>
    );
  }
}
export default App;
