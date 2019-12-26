import React from "react";

//component that displays the metrics data such as Total projects, Total Members and Total hours

const MainMetrics = props => {
  const items = props.mainMetric.map((item, key) => {
    return (
      <div key={key} className="p-2 d-inline-block">
        <p className="font-aggregate-main-text m-0 text-left text-white m-0">
          {item.value}
        </p>
        <p className="font-aggegate-sub-text m-0 text-left text-white-50 m-0">
          <small>{item.name}</small>
        </p>
      </div>
    );
  });

  return <React.Fragment>{items}</React.Fragment>;
};
export default MainMetrics;
