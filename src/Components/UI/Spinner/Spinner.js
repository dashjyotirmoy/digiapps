import React from 'react';
import { Modal } from 'react-bootstrap'

const spinner = (props) => {
    return (
        <div className="d-flex justify-content-center">
            <div className="lds-dual-ring"></div>
        </div>
    );
}

export default spinner;
