import React, { Component } from "react";
import NavigationBar from '../components/Navigation/NavigationBar';
import CompactDataBar from '../components/CompactDataBar/CompactDataBar';
import ProductInfoBar from '../components/ProductInfoBar/ProductBar';

class App extends Component {
  state = {
    value: "this was created without using create-react-app"
  };
  render() {
    return (
      <React.Fragment>
        <NavigationBar />
        <CompactDataBar />
        <ProductInfoBar></ProductInfoBar>
      </React.Fragment>
    );
  }
}
export default App;
