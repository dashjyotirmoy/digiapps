//Component to paint donut charts

import React, { Component } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Dimensions from "react-dimensions";
var percentage, color, completed, total;

class Donut extends Component {
  render() {
    color = this.props.color;
    completed = parseInt(this.props.percentage.completed);
    total = parseInt(this.props.percentage.total);
    percentage = completed / total;
    if (isNaN(percentage)) {
      percentage = 0;
    } else {
      percentage = percentage * 100;
      percentage = Math.round(percentage);
    }

    return (
      <div style={{ width: this.props.containerWidth }}>
        <CircularProgressbar
          value={percentage}
          text={`${percentage}%`}
          styles={buildStyles({
            textColor: color,
            pathColor: color
          })}
        />
      </div>
    );
  }
}

export default Dimensions()(Donut);
