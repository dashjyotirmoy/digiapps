import React, { Component } from "react";
import NavigationBar from '../components/Navigation/NavigationBar';
import CompactDataBar from '../components/CompactDataBar/CompactDataBar';
import ProductInfoBar from '../components/ProductInfoBar/ProductBar';
import ProductDefBar from '../components/ProductDefBar/ProductDefBar';
import Grid from "../components/Grid/Grid";
class App extends Component {
  state = {
    value: "this was created without using create-react-app"
  };
  render() {
    return (
      <React.Fragment>
        <NavigationBar />
        <CompactDataBar />
        <ProductInfoBar />
        <ProductDefBar />
        <Grid></Grid>
      </React.Fragment>
    );
  }
}
export default App;
