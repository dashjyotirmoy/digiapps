import React, { Component, useState } from "react";
import DropdownMenu from "react-bootstrap/DropdownMenu";
import { FormControl } from "react-bootstrap";

const CustomMenu = React.forwardRef(
  ({ children, className, "aria-labelledby": labeledBy }, ref) => {
    const [value, setValue] = useState("");

    return (
      <div ref={ref} className={className} aria-labelledby={labeledBy}>
        <ul className="list-unstyled m-0 text-white-50">
          {React.Children.toArray(children).filter(
            child =>
              !value || child.props.children.toLowerCase().startsWith(value)
          )}
        </ul>
      </div>
    );
  }
);

export default CustomMenu;
