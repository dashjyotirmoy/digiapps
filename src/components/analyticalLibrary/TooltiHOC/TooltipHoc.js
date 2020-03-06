import * as React from "react";
import { OverlayTrigger, Tooltip, Popover } from "react-bootstrap";

export const TooltipHoc = props => {
  function createMarkup() {
    return { __html: props.info };
  }
  const popover = (
    <Popover id="popover-basic">
      <Popover.Title as="h3">{props.chartName}</Popover.Title>
      <Popover.Content>
        <div dangerouslySetInnerHTML={createMarkup()}></div>
      </Popover.Content>
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
