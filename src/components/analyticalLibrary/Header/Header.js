//header component

import React, { Component } from "react";
import { Nav, Navbar } from "react-bootstrap";
import Dropdown from "../Dropdown/Dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import john from "../../../content/img/johnSmith.png";
import { execAllDispatch } from "../../../store/actions/executiveInsights";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

const Styles = styled.div`
  .navbar {
    background-color: #1a222d !important;
    // max-height:45px;
  }
  .navbar-brand {
    color: #fff !important;
  }
  .nav-item {
    color: #fff !important;
    padding: 0.1rem;
  }
  .circle-placeholder {
    height: 25px;
    width: 25px;
  }
`;
class Header extends Component {
  state = {
    userName: "John Smith",
    designation: "Executive",
    navListItem: ["Red", "Black", "Blue"]
  };
  componentDidMount() {
    this.props.execAllDispatch();
  }
  render() {
    const listItem = this.state.navListItem.map((val, index) => {
      return (
        <Nav.Item
          className="d-xl-none d-lg-none d-md-none d-sm-block d-sx-none"
          key={index}
        >
          {val}
        </Nav.Item>
      );
    });
    return (
      <Styles>
        <Navbar bg="light" expand="md">
          <Navbar.Brand href="/">DevOps Dashboard</Navbar.Brand>
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
                    <img src={john} className="h-100 w-100" />
                  </div>
                </div>
                <div
                  id="user-info-icon"
                  className="vertical-super d-md-inline-block d-lg-inline-block d-xl-inline-block d-none "
                >
                  {/* <Dropdown listData={this.state.navListItem}>
                    <FontAwesomeIcon icon={faChevronDown}></FontAwesomeIcon>
                  </Dropdown> */}
                </div>
              </Nav.Item>

              <Nav.Item> {listItem}</Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Styles>
    );
  }
}

const mapStateToProps = state => {
  return {
    getAllExecInfo: state.execData.executiveInfo
  };
};

//function to dispatch action to the reducer

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ execAllDispatch }, dispatch);
};

//Connect react component to redux

export default connect(mapStateToProps, mapDispatchToProps)(Header);
