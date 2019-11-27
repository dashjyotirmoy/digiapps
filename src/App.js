import React from "react";
import Dashboard from "./Components/Dashboard/DashboardController";

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
        <Dashboard data={componentImports} />
      </React.Fragment>
    );
  }
}
export default App;
