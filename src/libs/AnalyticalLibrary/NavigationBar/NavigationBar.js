import React, { Component } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import CustDropdown from "../../../libs/AnalyticalLibrary/DropDown/Dropdown";
import styled from "styled-components";

const Styles = styled.div`
  .navbar {
    background-color: rgb(51, 51, 51) !important;
    // max-height:45px;
  }
  .navbar-brand {
    color: #fff !important;
  }
  // .navbar-nav .nav-link {
  //   color: #fff;

  //   &:hover {
  //     color: black;
  //   }
  // }
  .nav-item {
    color: #fff !important;
    padding: 0.1rem;
  }
  .circle-placeholder {
    height: 25px;
    width: 25px;
  }
`;
class NavigationBar extends Component {
  state = {
    userName: "John Smith",
    designation: "CEO",
    navListItem: ["Red", "Black", "Blue"]
  };
  render() {
    console.log("props", this.props);
    let listItem = [];
    // listItem = this.props.data.map((val, index) => {
    //   if (val.graph.type === "dropdown") {
    //     return (
    //       <CustDropdown key={index} listData={val.uri}>
    //         <FontAwesomeIcon icon={faChevronDown}></FontAwesomeIcon>
    //       </CustDropdown>
    //     );
    //   }
    // });
    console.log(listItem);
    return (
      <Styles>
        <Navbar bg="light" expand="md">
          <Navbar.Brand href="/">Digital Insights</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Item>
                <div id="user-info" className="d-inline-block mr-2">
                  <p className="font-size-smaller m-0 text-left text-lg-right text-md-left text-sm-left text-xl-right">
                    <small>{this.state.userName}</small>
                  </p>
                  <p className="font-size-xs m-0 text-left text-lg-right text-md-right text-sm-left text-xl-right text-white-50 m-0">
                    {this.state.designation}
                  </p>
                </div>
                <div id="user-info-image" className="d-inline-block mr-2">
                  <div className="circle-placeholder overflow-hidden rounded-circle">
                    <div className="h-100 bg-light"></div>
                  </div>
                </div>
              </Nav.Item>
              <Nav.Item>
                <div
                  id="user-info-icon"
                  className="vertical-super d-md-inline-block d-lg-inline-block d-xl-inline-block d-none "
                >
                  {listItem}
                </div>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Styles>
    );
  }
}

export default NavigationBar;
