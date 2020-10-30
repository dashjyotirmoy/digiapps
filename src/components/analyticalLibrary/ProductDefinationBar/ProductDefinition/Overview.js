//Component to render velocity and efficienty reports

import React, { Component } from "react";
import { summaryChartDataDispatch} from "../../../../store/actions/summaryChartData";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import BuildSingleLineSummaryBurndown from "../../OverView/BuildSingleLineSummaryBurndown";
import BuildColumnSummaryTrend from "../../OverView/BuildColumnSummaryTrend";
import Spinner from "../../Spinner/Spinner";
import { Row, Col,Card,} from "react-bootstrap";

class Overview extends Component {
  state = {
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
    "secuityData": [
      {
          "name": "Cross Site Scripting (Reflected)",
          "count": "704"
      },
      {
          "name": "SQL Injection",
          "count": "59"
      },
      {
          "name": "Path Traversal",
          "count": "99"
      },
      {
          "name": "SQL Injection - Hypersonic SQL",
          "count": "456"
      },
      {
          "name": "Remote OS Command Injection",
          "count": "52"
      },
      {
          "name": "Open Source Vulnerabilities",
          "count": "10"
      },
      {
          "name": "Cross-Site Scripting: DOM",
          "count": "5"
      },
      {
          "name": "Key Management: Hardcoded Encryption Key",
          "count": "44"
      },
      {
          "name": "Dynamic Code Evaluation: Code Injection",
          "count": "14"
      },
      {
          "name": "Password Management: Empty Password",
          "count": "7"
      }
  ],
  "openVulnerability": [
      {
          "projectName": "Digital Insights",
          "high": "15",
          "medium": "15",
          "low": "18"
      },
      {
          "projectName": "DevSecOps Project",
          "high": "17",
          "medium": "15",
          "low": "17"
      }
  ],
  "averageTimeRemediation": [
      {
          "projectName": "Digital Insights",
          "remediationList": [
              {
                  "date": "Fri Jun 10 14:11:09 GMT 2020",
                  "remediationTime": "10.0"
              },
              {
                  "date": "Fri Jul 24 14:11:09 GMT 2020",
                  "remediationTime": "15.0"
              },
              {
                  "date": "Fri Aug 07 14:11:09 GMT 2020",
                  "remediationTime": "3.0"
              },
              {
                  "date": "Fri Aug 21 14:11:09 GMT 2020",
                  "remediationTime": "2.0"
              },
              {
                  "date": "Fri Sept 04 14:11:09 GMT 2020",
                  "remediationTime": "6.0"
              },
              {
                  "date": "Fri Sept 18 14:11:09 GMT 2020",
                  "remediationTime": "4.0"
              },
              {
                  "date": "Fri Oct 02 14:11:09 GMT 2020",
                  "remediationTime": "4.0"
              }
          ]
      },
      {
          "projectName": "DevSecOps Project",
          "remediationList": [
              {
                  "date": "Sun Jul 10 14:11:09 GMT 2020",
                  "remediationTime": "2.0"
              },
              {
                  "date": "Fri Jul 24 14:11:09 GMT 2020",
                  "remediationTime": "12.0"
              },
              {
                  "date": "Fri Aug 07 14:11:09 GMT 2020",
                  "remediationTime": "10.0"
              },
              {
                  "date": "Fri Aug 21 14:11:09 GMT 2020",
                  "remediationTime": "3.0"
              },
              {
                  "date": "Fri Sept 04 14:11:09 GMT 2020",
                  "remediationTime": "3.0"
              },
              {
                  "date": "Fri Sept 18 14:11:09 GMT 2020",
                  "remediationTime": "8.0"
              },
              {
                  "date": "Fri Oct 02 14:11:09 GMT 2020",
                  "remediationTime": "4.0"
              },
    
          ]
      }
  ]
  }
  // getTotalCount=()=>{
  //   var items = this.props.summaryCharts.defectOverview
  //     this.setState({
  //       totalCritical: items.totalCriticalBugCount,
  //       totalHigh: items.totalHighBugCount,
  //       totalMedium: items.totalMediumBugCount,
  //       totalLow: items.totalLowBugCount
  //     })    
  // };
  fetchChartsData = () => {
    this.props.summaryChartDataDispatch(this.props.currentExecId);
    this.state.secuityData.sort((a, b)=> b.count -a.count);
    // setTimeout(()=>this.getTotalCount(),3000);
  };
  componentDidMount() {
    this.fetchChartsData();
  };

  render() {
      return (
        
        <React.Fragment>
          <Row className="p-0 px-3 m-0 mt-4 no-gutters">
           <Col
                    sm={12}
                    md={12}
                    lg={5}
                    xl={5}
                    className="pr-3"
                  >
                    
                   <Card.Body className="p-0 rounded" style={{ 'border' :'1px solid #535353'}}>
                  <h6 className="cardHeader m-0 font-weight-bold text-white px-3 pt-3">Project Productivity</h6>

                    <Row className="no-gutters p-3">
                    <Col md={12} className="mb-3">
                   <BuildColumnSummaryTrend summaryTrend={this.props.summaryCharts.velocityTrendsSummary} type='velocity'/>
                   </Col>
                   <Col md={12}>
                   <div><BuildSingleLineSummaryBurndown summaryBurndown={this.props.summaryCharts.projectBurndownSummary} type='velocity'/></div>
                  </Col></Row>
                  </Card.Body>
              </Col>
              <Col
                    sm={12}
                    md={12}
                    lg={7}
                    xl={7}>
                  <Card.Body className="p-0 rounded" style={{ 'border' :'1px solid #535353'}}>
                  <h6 className="cardHeader m-0 font-weight-bold text-white px-3 pt-3">Defect Management</h6>
                  <Row className="no-gutters p-3">
                  <Col sm={12}
                    md={12}
                    lg={6}
                    xl={6}
                    className="pr-3">
                   <BuildColumnSummaryTrend summaryTrend={this.props.summaryCharts.defectOverview} type='qualityColumnReverse'/>
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
                      <BuildColumnSummaryTrend summaryTrend={this.props.summaryCharts.defectOverview} type='qualityColumn'/>
                      </Col>
                      <Col
                      sm={12}
                      md={12}
                      lg={12}
                      xl={12}>
                      <BuildSingleLineSummaryBurndown summaryBurndown={this.props.summaryCharts.defectOverview} type='qualityLine'/>
                      </Col>
                    </Row>
                  
                  </Col>
                  </Row>
                  </Card.Body>    
              </Col>
          </Row>
        </React.Fragment>
      );
    }
  }
//function to map the state received from reducer

const mapStateToProps = state => {
  return {    
    currentExecId: state.execData.executiveId,
    summaryCharts: state.summaryData.summaryChartData,
  };
};

//function to dispatch action to the reducer

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ summaryChartDataDispatch }, dispatch);
};

//Connect react component to redux

export default connect(mapStateToProps, mapDispatchToProps)(Overview);
