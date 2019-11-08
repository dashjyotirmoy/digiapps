import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function CircularProgress(props) {
  const percentage = props.percentage;
  const color = props.color;
  const text = props.text
  return (
    <div>
      <div style={{ width: "60px" }}>
        <CircularProgressbar value={percentage} text={`${percentage}%`} styles={buildStyles({
          textColor: color,
          pathColor: color
        })} />

      </div>
    </div >
  )
}

export default CircularProgress