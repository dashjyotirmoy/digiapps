import React, { useState,useEffect,useRef } from 'react';
// import 'react-circular-progressbar/dist/styles.css';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Row, Col, Container, Card, Badge, ProgressBar, Button,ButtonGroup,ToggleButton  } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Sec.css";
import BuildSingleLineSummaryBurndown from "../../OverView/BuildSingleLineSummaryBurndown";
const SecSastDast = props => {
  const sastData = [...props.cardsSastDast.sastDastDTO.sastVulnerabilityList];
  const dastData =  [...props.cardsSastDast.sastDastDTO.dastVulnerabilityList];
  let sastHighData=[];
  let sastMediumData=[];
  let dastHighData=[];
  let dastMediumData=[];
  let dastValue = [];
  let sastValue = [];
  let bgTheme= props.bgTheme;
  const [status, setStatus] = useState("High");
  const [projectName, setProjectName] = useState("SAST");
  const [checked, setChecked] = useState(false);
  const [radioValue, setRadioValue] = useState('highSast');
  const [borderBottomSast, setBorderBottomSast] = useState("borderBottom");
  const [borderBottomDast, setBorderBottomDast] = useState("");
  const radios = [
    { name: 'High', value: 'highSast' },
    { name: 'Medium', value: 'mediumSast' },
  ];
  const radios2 = [
    { name: 'High', value: 'highDast' },
    { name: 'Medium', value: 'mediumDast' },
  ];
  sastData.map(item => {
    if(item.riskLevel !== "Low"){
     return sastValue.push({
      name: item.category,
      count: item.count,
      severity: item.riskLevel
     });
    }
 });
 let sastDataChart = [{"data": sastValue}];
 
  dastData.map(item => {
    if(item.riskDescription !== "Low"){
     return dastValue.push({
      name: item.alertName,
      count: item.count,
      severity: item.riskDescription
     });
    }
 });
 let dastDataChart = [{"data": dastValue}];
     

 if(sastData){
    sastHighData = sastData.filter((item)=> item.riskLevel === "High")
    sastMediumData = sastData.filter((item)=> item.riskLevel === "Medium")
  }
  if(dastData){
    dastHighData = dastData.filter((item)=> item.riskDescription === "High")
    dastMediumData = dastData.filter((item)=> item.riskDescription === "Medium")
  }
  const [sastDastDetails,setsastDast] = useState(sastHighData);
  function handelClick(e){
    if(e.target.value === 'highSast'){
      setStatus("High")
      setProjectName("SAST")
      setBorderBottomSast("borderBottom")
      setBorderBottomDast("")
      setsastDast(sastHighData)
    }else if(e.target.value === 'mediumSast'){
      setStatus("Medium")
      setProjectName("SAST")
      setBorderBottomDast("")
      setBorderBottomSast("borderBottom")
      setsastDast(sastMediumData)
    }else if(e.target.value === 'highDast'){
      setStatus("High")
      setProjectName("DAST")
      setBorderBottomSast("")
      setBorderBottomDast("borderBottom")
      setsastDast(dastHighData)
    }else{
        setBorderBottomSast("")
        setStatus("Medium")
        setProjectName("DAST")
        setBorderBottomDast("borderBottom")
        setsastDast(dastMediumData)
    }

  }

  return (
    <React.Fragment>
      <Container fluid>   
      <Row className={` mt-3 d-flex no-gutters ${bgTheme ? 'bg-dark-theme' :'bg-white'}`}>
                <Col sm={6} className="pr-3">
                 <><BuildSingleLineSummaryBurndown summaryBurndown={sastDataChart} type='sastVulnerabilities' bgTheme={bgTheme}/></>
                  <div  className={`mt-3 mb-1 pb-2 ${borderBottomSast}`}>
                  <ButtonGroup toggle>
                      {radios.map((radio, idx) => (
                        <ToggleButton
                          key={idx}
                          type="radio"
                          variant="outline-primary"
                          name="radio"
                          value={radio.value}
                          checked={radioValue === radio.value}
                          onChange={(e) => setRadioValue(e.currentTarget.value)}
                          onClick={handelClick}
                        >
                          {radio.name}
                        </ToggleButton>
                      ))}
                    </ButtonGroup>
                    </div>
                </Col>
                <Col sm={6}>
                  <><BuildSingleLineSummaryBurndown summaryBurndown={dastDataChart} type='dastVulnerabilities' bgTheme={bgTheme}/></>
                  <div className={`mt-3 mb-1 pb-2 ${borderBottomDast}`}>
                  <ButtonGroup toggle>
                      {radios2.map((radio, idx) => (
                        <ToggleButton
                          key={idx}
                          type="radio"
                          variant="outline-primary"
                          name="radio"
                          value={radio.value}
                          checked={radioValue === radio.value}
                          onChange={(e) => setRadioValue(e.currentTarget.value)}
                          onClick={handelClick}
                        >
                          {radio.name}
                        </ToggleButton>
                      ))}
                    </ButtonGroup>
                  </div>
                </Col>
              </Row>
              <Row className="mt-3">
              <Col className='mb-3'>
                
              <h6 className="m-0 font-weight-bold">{projectName} Vulnerabilities - {status}</h6>
                  <Card.Body className="p-0 mt-2">
                  <div className={`${bgTheme ? 'card-border-dark wrap2' : 'card-border-light wrap2_light'}`}>
                      {projectName === "SAST" ? 
                      
                        <table className={`table table-hover ${bgTheme ? 'table-dark' : 'table-light'}`}>
                        <thead className={`${bgTheme? "tabhead":'cardHeader'}`}>
                          <tr>
                            <th scope="col" className="w-20">Category</th>
                            <th scope="col" className="w-40">Package</th>
                            <th scope="col">Domain</th>
                            <th scope="col">Scan Engine</th>
                            <th scope="col">Risk Level</th>
                          </tr>
                        </thead>
                          <tbody className={`f-12 ${bgTheme ? 'tabrow' : 'text-dark'}`}>
                            {(sastDastDetails.length !== 0) ?
                            sastDastDetails.map((item, index) => {
                                    return (
                                      <tr key={index} className={`font-size-small ${bgTheme? "text-white":'text-dark'}`}>
                                        <td>{item.category}</td>
                                        <td style={{'wordWrap': 'break-word'}}>
                                          <ul style={{listStyleType: "none"}}>
                                        {item.package && item.package.map((item1, index) => <li>{item1}</li>
                                        )}</ul></td>
                                        <td >{item.kingdom}</td>
                                        <td >{item.scanEngine}</td>
                                        <td >{item.riskLevel}</td>
                                      </tr>
                                    )
                                  }):<tr><td style={{ textAlign: "center" }} colSpan="10">No data found</td></tr>}
                          </tbody>
                        </table>:<table className={`table table-hover ${bgTheme ? 'table-dark' : 'table-light'}`}>
                        <thead className={`${bgTheme? "tabhead":'cardHeader'}`}>
                          <tr>
                            <th >Alert Name</th>
                            <th >Plugin ID</th>
                            <th >Risk Code</th>
                            <th >Confidence</th>
                            <th >Risk Description</th>
                            <th >Instances</th>
                            <th>Count</th>
                            <th>CWE ID</th>
                            <th>WASC ID</th>
                            <th>Source ID</th>
                          </tr>
                        </thead>
                      {/* </table>

                      <div className="inner_table w-100" style={{'maxHeight': '18rem'}}>
                        <table className="table table-hover border" > */}
                          <tbody className={`f-12 ${bgTheme ? 'tabrow' : 'text-dark'}`}>
                            {sastDastDetails.map((item, index) => {
                                    return (
                                      <tr key={index} className="font-size-small">
                                        <td >{item.alertName}</td>
                                        <td>{item.pluginID}</td>
                                        <td className="text-center">{item.riskCode}</td>
                                        <td className="text-center">{item.confidence}</td>                                        
                                        <td>{item.riskDescription}</td>
                                        <td className="text-center">{item.instances}</td>
                                        <td className="text-center">{item.count}</td>
                                        <td className="text-center">{item.cweID}</td>
                                        <td className="text-center">{item.wascID}</td>
                                        <td className="text-center">{item.sourceID}</td>
                                      </tr>
                                    )
                                  })}
                          </tbody>
                        </table>
                      }</div>
                    
                  </Card.Body>

              </Col>
            </Row>
      </Container>
    </React.Fragment>
  );
};

export default SecSastDast;
