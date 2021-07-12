import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import { Container, Row, Col, Tabs, Tab,ButtonGroup,ToggleButton } from "react-bootstrap";
import { currentTabDispatch,currentThemeSelected } from "../../../store/actions/chartData";
import styled from "styled-components";
import ErrorBoundaries from "../../../components/errorBoundaries";
import { labelConst } from "../../../utility/constants/labelsConstants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
import { faSun } from "@fortawesome/free-solid-svg-icons";
const StyleMainTabDark = styled.div`
  .nav-tabs { {
    border-bottom:0;
  }
  
  .nav-item{
    border:unset !important;
  }
  
  .nav-link.active{
    background-color: unset;
    border-bottom:2px solid yellow !important;
    font-weight:700 !important;
    color:#f5f5f5;
  }
  .nav-link.active>small{
    
  }
`;
const StyleMainTabLight = styled.div`
  .nav-tabs { {
    border-bottom:0;
  }
  
  .nav-item{
    border:unset !important;
    color:#155cb4;
  }
  
  .nav-link.active{
    background-color: #ffffff;
    border-bottom:2px solid #333333 !important;
    font-weight:700 !important;
    color:#155cb4;
  }
  .nav-link.active>small{
    
  }
`;
class ProductDefBar extends Component {
  constructor(props){
    super(props);
    this.state = {
      activeLink: "",
      radios:[{ name: 'faMoon', value: "dark",mode:'outline-secondary'},
        { name: 'faSun', value: "light",mode:'outline-secondary' }],
      radioValue: "dark",
      bgTheme:''
    };
  };
  
  updateView = type => {
    this.props.currentTabDispatch(type.toLowerCase());
    // this.props.currentTabWidgetListDispatch(type.toLowerCase());
    this.props.history.push(`/${type}`);
    this.props.selectedTheme ==='dark' ? document.body.style.background = '#1d2632': document.body.style.background = '#ffffff';
    this.setState({
      activeLink: type,
    })

  };
  componentDidMount() {
    const currentLink = this.getActiveLink().toLowerCase();
    const bgTheme = this.getCurrentTheme();
    this.props.currentThemeSelected(bgTheme);
    this.setState({
      activeLink: currentLink,
      radioValue: bgTheme
    });
  }
  getCurrentTheme = () => {
    const clientName = window.location.pathname.replace(/^\/([^\/]*).*$/, '$1');
    const labels = labelConst.filter((item)=> item.clientName === clientName );
    const bgTheme = labels[0].mappings.bgColor;
    return bgTheme;
  };
  getActiveLink = () => {
    const { location } = this.props;
    const activeLink = location.pathname.replace(/\//g, "");
    return activeLink;
  };
  handelChange= (e) => {
    e.preventDefault();
    this.props.currentThemeSelected(e.currentTarget.value);
    e.currentTarget.value === 'dark' ? document.body.style.background = '#1d2632': document.body.style.background = '#ffffff';
    this.setState({radioValue:e.currentTarget.value})
  };

  render() {
    const clientName = window.location.pathname.replace(/^\/([^\/]*).*$/, '$1');
    const labels = labelConst.filter((item)=> item.clientName === clientName );
    const bgTheme = (this.props.selectedTheme === "dark");
    return (
      <ErrorBoundaries>
        <Container fluid className={`position-fixed mt-5 py-2 ${bgTheme ? 'bg-dark' : 'bg-light'}`}>
          <Row className="d-flex w-100 p-0 m-0 text-white-50">
            <Col className="p-0">
              {bgTheme ? <StyleMainTabDark>
                {this.state.activeLink !== "" ? (
                  <Tabs
                    onSelect={e => this.updateView(e)}
                    defaultActiveKey={this.state.activeLink}
                    className="border-0"
                  >
                  {labels[0].mappings.tabItems.map(item=>
                    <Tab
                      key={item.id}
                      eventKey={item.eventKey}
                      title={
                        <span className="font-aggegate-sub-text">
                          {" "}
                          {item.name}
                        </span>
                      }
                    ></Tab>
                    )}
                  </Tabs>
                ) : null}
              </StyleMainTabDark>:<StyleMainTabLight>
              {this.state.activeLink !== "" ? (
                  <Tabs
                    onSelect={e => this.updateView(e)}
                    defaultActiveKey={this.state.activeLink}
                    className="border-0"
                  >
                  {labels[0].mappings.tabItems.map(item=>
                    <Tab 
                      key={item.id}
                      eventKey={item.eventKey}
                      title={
                        <span className="font-aggegate-sub-text">
                          {" "}
                          {item.name}
                        </span>
                      }
                    ></Tab>
                    )}
                  </Tabs>
                ) : null}
                </StyleMainTabLight>}
            </Col>
            <Col className="p-0 text-right">
              <div  className={`mb-1 pb-2`}>
                  <ButtonGroup toggle>
                      {this.state.radios.map((radio, idx) => (
                        <ToggleButton
                          key={idx}
                          type="radio"
                          variant={radio.mode}
                          name="radio"
                          value={radio.value}
                          checked={this.state.radioValue === radio.value}
                          onChange={this.handelChange}
                        >
                         {radio.name === 'faSun'? <FontAwesomeIcon icon={faSun} />:<FontAwesomeIcon icon={faMoon}/>} 
                        </ToggleButton>
                      ))}
                    </ButtonGroup>
                    </div>
              </Col>
          </Row>
        </Container>
      </ErrorBoundaries>
    );
  }
}

const mapStateToProps = state => {
  return {
    selectedTheme: state.chartData.currentTheme,
  };
};
const mapDispatchToProps = dispatch => {
  return bindActionCreators({ currentTabDispatch,currentThemeSelected }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ProductDefBar));
