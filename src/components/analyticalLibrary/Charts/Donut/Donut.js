//Component to paint donut charts

import React, { Component } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Dimensions from "react-dimensions";
var percentage, color, completed, total;

class Donut extends Component {
  render() {
    color = this.props.color || "#0582EC";
    completed = this.props.percentage && parseInt(this.props.percentage.completed);
    total = this.props.percentage && parseInt(this.props.percentage.total);
    percentage = completed / total;
    if (isNaN(percentage)) {
      percentage = 0;
    } else {
      percentage = percentage * 100;
      percentage = Math.round(percentage);
    }

    return (
      <div className="h-100 w-100 d-flex align-items-center justify-content-center">
        <div style={{ width: this.props.containerWidth }}>
          <CircularProgressbar
            value={percentage}
            text={`${percentage}%`}
            styles={buildStyles({
              textColor: this.props.bgTheme?"#f5f5f5":"#333333",
              pathColor: color,
              trailColor: "#828282",
              textSize: "1.5rem"
            })}
          />
        </div>
      </div>
    );
  }
}

export default Dimensions()(Donut);
