import React from "react";
import Dashboard from "./Components/Dashboard/DashboardController";
const shortid = require("shortid");
class App extends React.Component {
  render() {
    const componentImports = [
      "Header",
      "SummaryView",
      "ProductInfoBar",
      "ProductDefBar",
    ];
    return (
      <React.Fragment>
        <Dashboard data={componentImports} key={shortid.generate()} />
      </React.Fragment>
    );
  }
}
export default App;
