import React from "react";
import App from "../../App";
let configData = require('./config.json');

const displayView = ()=>{

}
const dashboard = () => {
  return (
    <React.Fragment>
      <App>{displayView()}
      {/* 1. Iterate the configData
    
          2. if widget.position === value show widgets*
          3. Pass the dimesnsion array into each widgets
          4. Inside the widget components , dimesion array will be recieved as props and will iterate it
          5. Based on the priority or type call the respective analytical components based on priority
          6. */}
      
      
      </App>
      
    </React.Fragment>
  );
};
