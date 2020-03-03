import React, { Component, useState } from "react";
import DropdownMenu from "react-bootstrap/DropdownMenu";
import { FormControl } from "react-bootstrap";

const CustomMenu = React.forwardRef(
  ({ children, className, "aria-labelledby": labeledBy }, ref) => {
    const [value, setValue] = useState("");

    return (
      <div
        ref={ref}
        className={className}
        aria-labelledby={labeledBy}
      >
        <FormControl
          autofocus
          className="mx-3 my-2 w-auto"
          placeholder="Type to filter..."
          onChange={e => setValue(e.target.value)}
          value={value}
        />
        <ul className="list-unstyled m-0 text-white-50">
          <li>
            {React.Children.toArray(children).filter(
              child =>
                !value || child.props.children.toLowerCase().startsWith(value) || child.props.children.startsWith(value)
            )}
          </li>
        </ul>
      </div>
    );
  }
);

export default CustomMenu;
