import React from "react";
import Dashboard from "../Components/Dashboard/Dashboard";

class App extends React.Component {
  render() {
    const componentImports = [
      "NavigationBar",
      "CompactDataBar",
      "ProductInfoBar",
      "VelocityTab",
      "Grid"
    ];
    return (
      <React.Fragment>
        <Dashboard data={componentImports} />
      </React.Fragment>
    );
  }
}
export default App;
