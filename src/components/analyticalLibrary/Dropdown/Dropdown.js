//Component which is made for reusing dropdown

import React, { Component } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownMenu from "./DropdownMenu";
import DropdownToggle from "./DropdownToggle";
import './Dropdown.css';

class CustDropdown extends Component {
  render() {
    const arr = this.props.listData;
    const dropdownItems = arr.map((ele, index) => {
      return (
        <Dropdown.Item key={index} eventKey={ele.id} className="text-white">
          {ele.projectName}
        </Dropdown.Item>
      );
    });
    return (
      <>
      <div className="font-size-small w-100 m-0 text-white">{this.props.dropsLable}</div>
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
          className="w-inherit width-fit-content dropdown-menu-right font-aggegate-sub-text mr-0 bg-secondary1 dropdown-h100-scroll"
        >
          {dropdownItems}
        </Dropdown.Menu>

      </Dropdown >
      </>
    );
  }
}
export default CustDropdown;
