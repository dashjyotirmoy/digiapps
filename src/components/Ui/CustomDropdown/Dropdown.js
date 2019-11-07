import React, { Component } from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownMenu from './DropdownMenu';
import DropdownToggle from './DropdownToggle';


class CustDropdown extends Component {
    render() {
        const arr = this.props.listData;
        const dropdownItems = arr.map((val, index) => {
            return <Dropdown.Item key={index}>{val}</Dropdown.Item>
        })
        return (
            <Dropdown className="d-xl-block d-lg-block d-md-block d-sm-none d-sx-none d-none">
                <Dropdown.Toggle as={DropdownToggle} id="dropdown-custom-components" >
                    {this.props.children}
                </Dropdown.Toggle>

                <Dropdown.Menu as={DropdownMenu} className="dropdown-menu dropdown-menu-right mt-2 mr-0">
                    {dropdownItems}
                </Dropdown.Menu>
            </Dropdown>
        )
    }
}
export default CustDropdown;