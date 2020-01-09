import React, { Component } from "react";

// class CustomToggle extends Component {
//     constructor(props, context) {
//         super(props, context);

//         this.handleClick = this.handleClick.bind(this);
//     }

//     handleClick(e) {
//         e.preventDefault();

//         this.props.onClick(e);
//     }

//     render() {
//         return (
//             <a href="" onClick={this.handleClick}>
//                 {this.props.children}
//             </a>
//         );
//     }
// }

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <a
    href=""
    ref={ref}
    onClick={e => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
  </a>
));
export default CustomToggle;
