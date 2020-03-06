import * as React from "react";
import { OverlayTrigger, Tooltip, Popover } from "react-bootstrap";
import "../TooltiHOC/Tooltip.css";

export const TooltipHoc = props => {

  function createMarkup() {
    return { __html: props.info };
  }
  const popover = (
    <Popover id="popover-basic">
      <h5 className="bg-color">{props.chartName}</h5>
              <div className="body-col" dangerouslySetInnerHTML={createMarkup()}></div>
        </Popover>
  );
  return (
    // <OverlayTrigger overlay={<Tooltip>{props.info || ""}</Tooltip>}>
    //     {props.children}
    // </OverlayTrigger>

    <OverlayTrigger trigger="click" placement="bottom"overlay={popover}>
      {props.children}
   
    </OverlayTrigger>
  );
};
