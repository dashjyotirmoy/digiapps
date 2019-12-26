import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faCircle,
  faArrowUp,
  faArrowDown,
  faTh
} from "@fortawesome/free-solid-svg-icons";

const colorClass = {
  red: "text-red",
  orange: "text-orange",
  green: "text-green"
};

//component that displays the metrics data such as Av Release cycle and Av Deployment Lead time

const ItemMetric = props => {
  const items = props.itemMetric.map((item, key) => {
    return (
      <div
        key={key}
        className="border border-dark d-flex d-inline-block flex-column h-100 justify-content-center max-w-18 mx-1 px-lg-2 px-md-1 px-xl-4 py-2 rounded w-auto"
      >
        <p className="font-aggregate-main-text m-0 text-left text-black m-0">
          <FontAwesomeIcon
            className={("font-size-small", "vertical-initial")}
            style={{ color: "red" }}
            icon={faArrowUp}
          />
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

export default ItemMetric;
