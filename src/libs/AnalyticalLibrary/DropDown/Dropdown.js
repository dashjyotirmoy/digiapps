import React, { Component } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownMenu from "./DropdownMenu";
import DropdownToggle from "./DropdownToggle";
import axios from "axios";
class CustDropdown extends Component {
  state = {
    dropName: []
  };
  componentDidMount() {
    this.loadData();
  }
  loadData() {
    axios.get(this.props.listData.uri).then(res => {});
  }
  render() {
    const arr = this.props.listData;
    const dropdownItems = this.state.dropName.map((val, index) => {
      return <Dropdown.Item key={index}>{val}</Dropdown.Item>;
    });
    return (
      <Dropdown className="d-xl-block d-lg-block d-md-block d-sm-none d-sx-none d-none w-100">
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
          {this.state.dropName}
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}
export default CustDropdown;
