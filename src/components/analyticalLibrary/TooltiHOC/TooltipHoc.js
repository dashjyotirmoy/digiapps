import * as React from "react";
import { OverlayTrigger, Tooltip, Popover } from "react-bootstrap";
import "../TooltiHOC/Tooltip.css";

export const TooltipHoc = props => {
  const bgTheme = props.bgTheme;
  function createMarkup() {
    return { __html: props.info };
  }
  const popover = (
    <Popover className={`popover-basic ${bgTheme?'popover-basic-dark':'popover-basic-light'}`}>
      <h5 className={`${bgTheme?'bg-color':'bg-white'}`}>{props.head}</h5>
      <div className={`${bgTheme?'body-col':'bg-white'}`} dangerouslySetInnerHTML={createMarkup()}></div>
    </Popover>
  );
  return (
    // <OverlayTrigger overlay={<Tooltip>{props.info || ""}</Tooltip>}>
    //     {props.children}
    // </OverlayTrigger>

    <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
      {props.children}

    </OverlayTrigger>
  );
};
