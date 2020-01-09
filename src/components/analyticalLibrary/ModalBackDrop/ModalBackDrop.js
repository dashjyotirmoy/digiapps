import React from "react";
import "./ModalBackDrop.css";

const modalBackDrop = props =>
  props.show ? (
    <div className="BackDrop d-flex justify-content-center align-items-center">
      {props.children}
    </div>
  ) : null;

export default modalBackDrop;
