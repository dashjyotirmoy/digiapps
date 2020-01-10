import React from "react";
import ModalBackDrop from "../ModalBackDrop/ModalBackDrop";
const Spinner = props => {
  return (
    <ModalBackDrop show={props.show}>
      <div className="d-flex justify-content-center">
        <div className="lds-dual-ring"></div>
      </div>
    </ModalBackDrop>
  );
};
export default Spinner;
