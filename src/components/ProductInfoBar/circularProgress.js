import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function CircularProgress(props) {
  const percentage = props.percentage;
  const text = props.text
  return (
    <div>
      <div style={{ width: "60px" }}>
        <CircularProgressbar value={percentage} text={`${percentage}%`} />

      </div>
    </div >
  )
}

export default CircularProgress