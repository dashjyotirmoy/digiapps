import React from "react";

const MainMetrics = props => {
  const NameValArr = Object.values(props.NameVal);

  const items = props.NameVal.map((item, key) => {
    return (
      <div key={key} className="p-2 d-inline-block">
        <p className="font-aggegate-main-text m-0 text-left text-white m-0">
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
