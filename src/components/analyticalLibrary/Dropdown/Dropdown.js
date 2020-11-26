//Component which is made for reusing dropdown

import React, { Component } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownMenu from "./DropdownMenu";
import DropdownToggle from "./DropdownToggle";
import './Dropdown.css';
import { labelConst } from "../../../utility/constants/labelsConstants";

class CustDropdown extends Component {
  render() {
    const clientName = window.location.pathname.replace(/^\/([^\/]*).*$/, '$1');
    const labels = labelConst.filter((item)=> item.clientName === clientName );
    const bgTheme = labels[0].mappings.bgColor;
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
      <div className={`font-size-small w-100 m-0 ${bgTheme ? 'text-white': 'text-dark'}`}>{this.props.dropsLable}</div>
      <Dropdown
        onSelect={(evt, evtKey) => this.props.onSelectDelegate(evt, evtKey)}
        className={`w-100 ${bgTheme ? 'text-white': 'rounded border border-primary'}`}
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
