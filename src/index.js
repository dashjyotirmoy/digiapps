import React from "react";
import ReactDOM from "react-dom";
import App from './App';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/react-grid-layout/css/styles.css";
import "../node_modules/react-resizable/css/styles.css";
import "./index.css";
// import reducers from './reducers';
ReactDOM.render(
    <App />,
    document.querySelector('#root')
); 