
import * as React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

export const TooltipHoc = (props) => {
    return (
        <OverlayTrigger overlay={<Tooltip>{props.info || ""}</Tooltip>}>
            {props.children}
        </OverlayTrigger>
    );
}; 