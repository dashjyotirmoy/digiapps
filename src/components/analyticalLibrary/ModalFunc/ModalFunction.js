import React from "react";
import { Modal, Button } from "react-bootstrap";
import Velocitycontent from "../ModalFunc/VelocityModalContent";

const CenteredModal = props => {
  console.log(props);
  return (
    <React.Fragment>
      {Velocitycontent.map(item => {
        if (item.title === props.chartName) {
          console.log(item);
          return (
            <Modal
              {...props}
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >
              <Modal.Header closeButton>
                <h3 id="contained-modal-title-vcenter">
                  {item.title}
                  {/* {props} */}
                </h3>
              </Modal.Header>
              <Modal.Body>{item.list}</Modal.Body>
            </Modal>
          );
        }
      })}
    </React.Fragment>
  );
};

export default CenteredModal;
