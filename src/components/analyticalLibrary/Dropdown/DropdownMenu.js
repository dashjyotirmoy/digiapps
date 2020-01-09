import React, { Component, useState } from "react";
import DropdownMenu from "react-bootstrap/DropdownMenu";
import { FormControl } from "react-bootstrap";
// class CustomMenu extends Component {
//     constructor(props, context) {
//         super(props, context);

//         this.handleChange = this.handleChange.bind(this);

//         this.state = { value: '' };
//     }

//     handleChange(e) {
//         this.setState({ value: e.target.value.toLowerCase().trim() });
//     }

//     render() {
//         const {
//             children,
//             style,
//             className,
//             'aria-labelledby': labeledBy,
//         } = this.props;

//         const { value } = this.state;

//         return (
//             <div style={style} className={className} aria-labelledby={labeledBy}>
//                 <ul className="list-unstyled m-0 text-white-50">
//                     {React.Children.toArray(children).filter(
//                         child =>
//                             !value || child.props.children.toLowerCase().startsWith(value),
//                     )}
//                 </ul>
//             </div>
//         );
//     }
// }
const CustomMenu = React.forwardRef(
  ({ children, style, className, "aria-labelledby": labeledBy }, ref) => {
    const [value, setValue] = useState("");

    return (
      <div
        ref={ref}
        style={style}
        className={className}
        aria-labelledby={labeledBy}
      >
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
