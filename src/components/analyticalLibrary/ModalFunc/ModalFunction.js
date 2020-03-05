import React from 'react';
import {Modal,Button} from 'react-bootstrap';
import Velocitycontent from "../ModalFunc/VelocityModalContent";


function CenteredModal(props) {

    // console.log(props)
    
    
    // console.log(props.chartName)
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
         
        <Modal.Header closeButton>
          <h3 id="contained-modal-title-vcenter">
          Velocity Trends
          {/* {props} */}
         
          </h3>
        </Modal.Header>
        <Modal.Body>
                
       
        </Modal.Body>
       
      </Modal>
    );
  }

  export default CenteredModal;