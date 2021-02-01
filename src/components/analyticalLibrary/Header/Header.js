//header component

import React, { Component } from "react";
import { Nav, Navbar } from "react-bootstrap";
import styled from "styled-components";
import john from "../../../content/img/user-default.png";
import {clientListDispatch,execAllDispatch } from "../../../store/actions/executiveInsights";
import Spinner from "../Spinner/Spinner";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import api from "../../../utility/Http/devOpsApis";

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
      navListItem: ["Red", "Black", "Blue"],
      labelConst: this.props.labelsConst,
      show: true,
      clientList: [{name: "aia", clientId: "AIA"},
        {name: "digitalops", clientId: "DOPS"},
        {name: "wpc", clientId: "WPC"}]
    }
getClientId = (clientDetails) => {
  let currentUrl = window.location.pathname.replace(/^\/([^\/]*).*$/, '$1');
  let currentId = clientDetails.filter((item,index) => item.name === currentUrl);
  return currentId;
};
fetchChartsData = (res) => {
  const clientId = this.getClientId(res.data.clientsList);
  this.props.clientListDispatch(clientId[0].clientId);
  this.props.execAllDispatch(clientId[0].clientId);
  this.setState({
    show: false,
  });
  // setTimeout(()=>this.getTotalCount(),3000);
};
componentDidMount() {
  api
      .getAllClientList()
      .then(this.fetchChartsData)
      .catch(error => {
        console.error(error);
      });
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
        <Navbar bg="light" expand="md" className="position-fixed">
          <Navbar.Brand href={'/' + this.state.labelConst.clientName +'/execDashboard/'+this.state.labelConst.mappings.navLogoUrl}>{this.state.labelConst.mappings.logoName}</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Item>
                {/* <div id="user-info" className="d-inline-block mr-2">
                  <p className="font-size-smaller m-0 text-left text-lg-right text-md-left text-sm-left text-xl-right">
                    <small>{this.state.userName}</small>
                  </p>
                  <p className="font-size-xs m-0 text-left text-lg-right text-md-right text-sm-left text-xl-right text-white-50 m-0">
                    {this.state.designation}
                  </p>
                </div>
                <div id="user-info-image" className="d-inline-block mr-2">
                  <div className="circle-placeholder overflow-hidden rounded-circle">
                    <img src={john} alt="" className="h-100 w-100" />
                  </div>
                </div>
                <div
                  id="user-info-icon"
                  className="vertical-super d-md-inline-block d-lg-inline-block d-xl-inline-block d-none "
                >
                  <Dropdown listData={this.state.navListItem}>
                    <FontAwesomeIcon icon={faChevronDown}></FontAwesomeIcon>
                  </Dropdown> 
                </div> */}
                <div id="user-info-image" className="d-flex mr-2">
                <p className="align-middle font-size-xs m-0 mr-2 mt-1 text-left text-lg-right text-md-right text-sm-left text-xl-right text-white-50" style={{fontWeight: 'bold'}}>
                    {this.state.designation}
                  </p>
                  <div className="circle-placeholder overflow-hidden rounded-circle">
                    <img src={john} alt="" className="h-100 w-100" />
                  </div>
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
    clientList: state.execData.clientlist,
    getAllExecInfo: state.execData.executiveInfo    
  };
};

//function to dispatch action to the reducer

const mapDispatchToProps = dispatch => {
  return bindActionCreators({clientListDispatch,execAllDispatch }, dispatch);
};

//Connect react component to redux

export default connect(mapStateToProps, mapDispatchToProps)(Header);
