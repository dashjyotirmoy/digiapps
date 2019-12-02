import React, { Component } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownMenu from "./DropdownMenu";
import DropdownToggle from "./DropdownToggle";

class CustDropdown extends Component {
  render() {
    const arr = this.props.listData;
    const dropdownItems = arr.map((ele, index) => {
      return (
        <Dropdown.Item key={index} eventKey={ele.id}>
          {ele.projectName}
        </Dropdown.Item>
      );
    });
    console.log(dropdownItems);
    return (
      <Dropdown
        onSelect={(evt, evtKey) => this.props.onSelectDelegate(evt, evtKey)}
        className="d-xl-block d-lg-block d-md-block d-sm-block d-sx-none d-none w-100"
      >
        <Dropdown.Toggle
          as={DropdownToggle}
          id="dropdown-custom-components"
          drop={this.props.direction}
        >
          {this.props.children}
        </Dropdown.Toggle>

        <Dropdown.Menu
          as={DropdownMenu}
          className="dropdown-menu width-fit-content dropdown-menu-right font-aggegate-sub-text mr-0"
        >
          {dropdownItems}
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}
export default CustDropdown;
