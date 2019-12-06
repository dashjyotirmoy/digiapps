import React from 'react';
import { Modal } from 'react-bootstrap'

const ModalLoader = (props) => {
    return (
        <Modal show={true} animation={false} aria-labelledby="contained-modal-title-vcenter"
            centered>
            <div className="d-flex justify-content-center">
                <div className="lds-dual-ring"></div>
            </div>
        </Modal>
    );
}

export default ModalLoader;