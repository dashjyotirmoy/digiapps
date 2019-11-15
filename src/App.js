import React, { Component } from 'react';
import Header from './Components/Dashboard/Header/Header';
import SummaryView from './Components/Dashboard/SummaryView/SummaryView';
import ProductInfoBar from './Components/Dashboard/ProductInfoBar/ProductInfoBar';
import ProductDefBar from './Components/Dashboard/ProductDefinationBar/ProductDefBar';



class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <SummaryView />
        <ProductInfoBar />
        <ProductDefBar />
        {/* <Grid></Grid> */}
      </React.Fragment>
    );
  }
}

export default App;