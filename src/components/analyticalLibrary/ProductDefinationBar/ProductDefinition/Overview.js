//Component to render velocity and efficienty reports

import React, { Component } from "react";
import { summaryChartDataDispatch,summarySecurityChartDataDispatch} from "../../../../store/actions/summaryChartData";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import BuildSingleLineSummaryBurndown from "../../OverView/BuildSingleLineSummaryBurndown";
import BuildColumnSummaryTrend from "../../OverView/BuildColumnSummaryTrend";
import Spinner from "../../Spinner/Spinner";
import { Row, Col,Card,} from "react-bootstrap";
import { labelConst } from "../../../../utility/constants/labelsConstants";
import { widgetListDispatch } from "../../../../store/actions/executiveInsights";

class Overview extends Component {
  constructor(props){
    super(props);
    this.state = {
      show: true,
      charts: [],
      velocityBuildData: [],
      codeActive: true,
      componentType: "summary",
      repoData: [],
      sortedTableData:'',
      totalCritical:'',
      totalHigh:'',
      totalMedium:'',
      totalLow:'',
      clientId:'',
      appSecurity: "Application Security",
      projectProd:  "Project Productivity",
      defectmgmt: "Defect Management",
      
        }
    }
  fetchChartsData = () => {
     if(this.props.currentExecId){
      this.props.widgetListDispatch(this.state.clientId ? this.state.clientId:this.props.currentClientId); 
      this.props.summaryChartDataDispatch(this.props.currentClientId,this.props.currentExecId);
      this.props.summarySecurityChartDataDispatch(this.props.currentClientId,this.props.currentExecId);
    }
    // this.state.secuityData.sort((a, b)=> b.count -a.count);
    this.setState({
      show: false,
      all_data: false
    });
  };
  componentDidMount() {
    this.setState({
      all_data: true
    });
  }
   componentDidUpdate() {
    if (this.state.all_data && this.props.currentExecId) {
      this.fetchChartsData();
    }
   }
  render() {
        const clientName = window.location.pathname.replace(/^\/([^\/]*).*$/, '$1');
        const labels = labelConst.filter((item)=> item.clientName === clientName );
        const bgTheme = (this.props.selectedTheme === "dark");
        const currentWidgetList = this.props.widgetList;
        const currentTabWidgets = currentWidgetList && currentWidgetList.filter(item=>item.name === "overview");
        if (this.state.show) {
          return <Spinner show="true"/>;
        } else {
          return (      
        <React.Fragment>
        <Row className={`px-3 py-4 mt-6 ${bgTheme ? 'bg-dark-theme' : 'bg-light'}`}>
        {currentTabWidgets[0] && currentTabWidgets[0].widgets && currentTabWidgets[0].widgets.includes(this.state.appSecurity) && <Col
                  sm={12}
                  md={12}
                  lg={5}
                  xl={5}
                  className="pr-0"
                >
                <Card.Body className={`p-0 ${bgTheme ? 'card-border-dark':'card-border-light'}`}>
                <h6 className={`m-0 font-weight-bold ${bgTheme ? 'bg-prodInfo-prod text-white' : 'cardHeader'}`}>Application Security</h6>
                <Row className={`no-gutters p-3 ${bgTheme ? 'bg-dark-theme' : 'bg-white'}`}>
                  <Col
                  sm={12}
                  md={12}
                  lg={5}
                  xl={5}
                ><div className={`${bgTheme ? 'bg-dark-theme' : 'bg-white'}`} style={{border:'1px solid #999a9c',borderRadius:'5px'}}>
                    <p className={`mb-2 font-weight-bold ${bgTheme ? 'bg-prodInfo-prod text-white' : 'cardHeader'}`} style={{fontSize:'14px',fontFamily:"Arial"}}>Top 10 Critical & High Vulnerabilities</p>

                    <Card.Body className="p-0">
                      <div className="wrap">
                        <table className={`table table-hover ${bgTheme ? 'table-dark' : 'table-light'}`} style={{fontSize:'10px'}}>
                            <thead className={`${bgTheme ? 'tabhead text-light' : 'cardHeader text-dark'}`}>
                              <tr>
                              <th scope="col">Vulnerabilities</th>
                              <th scope="col" className="text-right">Critical/High</th>
                              </tr>
                              </thead>
                          </table>
                    
                      <div className={`${bgTheme ? 'inner_table_overview' : 'inner_table_overview_light'}`}>    
                      <table className={`table table-hover ${bgTheme ? 'table-dark' : 'table-light'}`}>
                        <tbody className={`${bgTheme ? 'tabrow text-light' : 'text-dark'}`}>
                  {this.props.summarySecurityChart.securityOverview ?
                      
                      this.props.summarySecurityChart.securityOverview.topTenVulnerabilityList.map((item, index) => {
                          return (
                            <tr className="f-12" key={index}>
                              <td style={{"border": "1px solid gray","width":"8rem"}}>{item.name}</td>
                              <td style={{"border": "1px solid gray"}} className="text-center">{item.count}</td>
                            </tr>
                          )
                        }):  <tr><td style={{ textAlign: "center" }} colSpan="5">No data found</td></tr>
                      }
                    </tbody>
                    </table>
                      </div> 
                      </div>
                    </Card.Body>
                </div>
               </Col>
               <Col
                  sm={12}
                  md={12}
                  lg={7}
                  xl={7}
                  className="pl-3"                    
                >
               <div className="mb-3">
                  {this.props.summarySecurityChart.securityOverview && <BuildColumnSummaryTrend summaryTrend={this.props.summarySecurityChart.securityOverview.openVulnerabilitySummaryList} type="securityOpen" bgTheme={bgTheme}/>}
                 </div>
               
                </Col>
                <Col sm={12}>
                  {this.props.summarySecurityChart.securityOverview && <BuildSingleLineSummaryBurndown summaryBurndown={this.props.summarySecurityChart.securityOverview.averageTimeRemediationList} type="security" bgTheme={bgTheme}/>}
                </Col>
               </Row> 
               </Card.Body>
         </Col>} 
              <Col
                  className={`${currentTabWidgets[0] && currentTabWidgets[0].widgets && !currentTabWidgets[0].widgets.includes(this.state.appSecurity) ? 'col-md-12':'col-md-7'}`} 
                >
                  <Row className="no-gutters">
                  {currentTabWidgets[0] && currentTabWidgets[0].widgets && currentTabWidgets[0].widgets.includes(this.state.projectProd) &&
                  <Col
                  className={`${!currentTabWidgets[0].widgets.includes(this.state.appSecurity)? '':'col-12 mb-3'}`} 
                 >
                    <Card.Body className={`p-0 ${bgTheme ? 'card-border-dark':'card-border-light'}`}>
                        <h6 className={`m-0 font-weight-bold ${bgTheme ? 'bg-prodInfo-prod text-white' : 'cardHeader'}`}>Project Productivity</h6>

                        <Row className={`no-gutters p-3 ${bgTheme ? 'bg-dark-theme' : 'bg-white'}`}>
                          <Col className="pr-3">
                              <BuildColumnSummaryTrend summaryTrend={this.props.summaryCharts.velocityTrendsSummary} type='velocity' bgTheme={bgTheme}/>
                          </Col>
                          <Col>
                            <div><BuildSingleLineSummaryBurndown summaryBurndown={this.props.summaryCharts.projectBurndownSummary} type='velocity' bgTheme={bgTheme}/></div>
                          </Col>
                        </Row>
                    </Card.Body>
                </Col>}
                {currentTabWidgets[0] && currentTabWidgets[0].widgets && currentTabWidgets[0].widgets.includes(this.state.defectmgmt) &&<Col
                  className={`${!currentTabWidgets[0].widgets.includes(this.state.appSecurity)? '':'col-12'}`}                  >
                <Card.Body className={`p-0 ${bgTheme ? 'card-border-dark':'card-border-light'}`}>
                    <h6 className={`m-0 font-weight-bold ${bgTheme ? 'bg-prodInfo-prod text-white' : 'cardHeader'}`}>Defect Management</h6>
                    <Row className={`no-gutters p-3 ${bgTheme ? 'bg-dark-theme' : 'bg-white'}`}>
                <Col sm={12}
                  md={12}
                  lg={6}
                  xl={6}
                  className="pr-3">
                 <BuildColumnSummaryTrend summaryTrend={this.props.summaryCharts.defectOverview} type='qualityColumnReverse' bgTheme={bgTheme}/>
                  {/* <div style={{backgroundColor: '#E1E7F0',padding: '10px',fontSize:'12px'}} className='text-center border rounded'><span>Total Critical: </span><span style={{backgroundColor: '#a21220',fontSize:'14px',color:'#ffffff'}} className="mr-1 font-weight-bold p-1 rounded">{this.state.totalCritical}</span> 
                    <span>Total High: </span><span style={{backgroundColor: '#ec5050',fontSize:'14px',color:'#ffffff'}} className="mr-1 font-weight-bold p-1 rounded">{this.state.totalHigh}</span> 
                    <span>Total Medium: </span><span style={{backgroundColor: '#ffc107',fontSize:'14px',color:'#ffffff'}} className="mr-1 font-weight-bold p-1 rounded">{this.state.totalMedium}</span> 
                    <span>Total Low: </span><span style={{backgroundColor: '#20c997',fontSize:'14px',color:'#ffffff'}} className="font-weight-bold p-1 rounded">{this.state.totalLow}</span>
                    </div> */}
                 </Col>
                 <Col sm={12}
                  md={12}
                  lg={6}
                  xl={6}>
                  <Row>
                  <Col
                  sm={12}
                  md={12}
                  lg={12}
                  xl={12}
                  className="mb-3">
                    <BuildColumnSummaryTrend summaryTrend={this.props.summaryCharts.defectOverview} type='qualityColumn' bgTheme={bgTheme}/>
                    </Col>
                    <Col
                    sm={12}
                    md={12}
                    lg={12}
                    xl={12}>
                    <BuildSingleLineSummaryBurndown summaryBurndown={this.props.summaryCharts.defectOverview} type='qualityLine' bgTheme={bgTheme}/>
                    </Col>
                  </Row>
                
                </Col>
                </Row>
                </Card.Body>    
                </Col>}

                  </Row>
                  

         </Col>
        </Row>
      </React.Fragment>
      );
      }
    }
  }
//function to map the state received from reducer

const mapStateToProps = state => {
  return {  
    currentExecId: state.execData.executiveId,
    currentClientId: state.execData.currentClientId,
    widgetList: state.execData.widgetList,
    summaryCharts: state.summaryData.summaryChartData,
    summarySecurityChart:state.summaryData.summarySecurityChartData,
    selectedTheme: state.chartData.currentTheme,
  };
};

//function to dispatch action to the reducer

const mapDispatchToProps = dispatch => {
  return bindActionCreators({summaryChartDataDispatch,summarySecurityChartDataDispatch,widgetListDispatch }, dispatch);
};

//Connect react component to redux

export default connect(mapStateToProps, mapDispatchToProps)(Overview);
