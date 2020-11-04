import React , { useState } from "react";
import { Card } from "react-bootstrap";
import BuildSingleLineQual from "../Charts/LineHigh/BuildSingleLineQual";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

import { TooltipHoc } from "../TooltiHOC/TooltipHoc";


const CardChart = props => {
    const [ open, setOpen ] = useState(false)
    let graphValue = [];
    let chatDescrp = [];
    let chatDetails = null;
    let qualityData = props.insights.releaseReportMap;
      if(qualityData!== undefined){
          
          Object.keys(qualityData).forEach(function(key) {
           if(qualityData[key]!=null){
            graphValue.push({
                color: qualityData[key].value === "HIGH"? '#ff0000': qualityData[key].value==="MEDIUM" ? '#ffa500' : qualityData[key].value==="LOW" ? '#ffff00' : '#00FF00',
                //y: qualityData[key].yaxisValue,
                y: qualityData[key].yaxisValue === 4 ? 2 : qualityData[key].yaxisValue === 2 ? 1 : 0 ,
                name: qualityData[key].releaseName,
                bugsCount:Number(qualityData[key].bugsCount),
                codeSmellCount:Number(qualityData[key].codeSmellCount),
                codeVulnerabilityCount:Number(qualityData[key].codeVulnerabilityCount),
                codeCoverageCount:Number(qualityData[key].codeCoverageCount),
                codeDuplicateCount:Number(qualityData[key].codeDuplicateCount)
              
            });
            
           }
              
          });
      }
      for (var key2 in qualityData) {
        chatDescrp.push(qualityData[key2])
        chatDetails = chatDescrp && chatDescrp.filter(val => val);
    }
      let insightVal = {
        graphValue: graphValue,
        content: chatDetails && chatDetails[chatDetails.length-1]
    };
    let chartDetails = () => setOpen(!open);
    function btnClass() {
        if(insightVal.content && insightVal.content.colorCode === "AMBER"){
            return 'btnmediumbg';
        }else if(insightVal.content && insightVal.content.colorCode === "RED"){
            return 'btnhighbg';
        }     
        return 'btnlowbg';
    }
    function btnLabel() {
        if (insightVal.content && insightVal.content.colorCode === "AMBER") {
          return "AVERAGE";
        }else if(insightVal.content && insightVal.content.colorCode === "RED"){
            return 'BAD';
        }
          return "GOOD";
        }

    return <React.Fragment>
        <Card className="card-border grid-graph-comp" style={{color:'#ffffff'}}>
            <Card.Body className="p-0">
                <div className="d-flex cardHeader p-2 rounded">
                    <div className="mr-auto">
                        <p className="cardHeader m-0 p-0 font-weight-bold">{props.cardHeader}</p>
                    </div>
                    <TooltipHoc
                        info="Quality Insight shows the quality of the code for the selected repository by considering the quality flaws in last 3 releases.<br /><br /> 
                         It also presents the count of Bugs, Vulnerabilities & Code Smells along with the % of Code Coverage and % of Duplications for each release of the selected repository.<br /><br />
                        At a time, only 10 releases are displayed.<br/>"
                        >
                        <span className="d-inline-block">
                            <FontAwesomeIcon style={{color:'#a5a5a5'}} icon={faInfoCircle} />
                        </span>
                    </TooltipHoc>
                </div>
            </Card.Body>
             <div className="rounded mt-2 w-100 py-2 px-3">
             <div className="rounded p-2" style={{border: '1px solid #535353'}}>
                <div className="d-flex mb-2">
                    <p className="mr-auto mb-0 pl-0 font-size-small font-weight-bold">{props.cardName} </p>
                    {insightVal.content && insightVal.content.recommendation!=="N/A"  ?
                       <span style={{ color:"#ffffff",fontSize: "12px",fontWeight: "bold" }} 
                       className={`badge btnSize w-auto ${btnClass()}`}>{btnLabel()}</span> : ''}
                </div>
            {insightVal.graphValue.length !== 0 && props.showChart!=="true" ? 
            <BuildSingleLineQual chartData={insightVal.graphValue}/> :insightVal.graphValue.length === 0 && props.showChart!=="true" ? 
            'No Data Found':'' } 
            </div>
               {insightVal.content &&
                 <>
                <div>
                    <span style={{ fontSize: "small",fontWeight: "bold" }}>Description</span>
                    <p style={{ fontSize: "small" }} className="m-0 ">{insightVal.content.description}</p>
                </div>
                <div className="mt-1">
                    <span style={{ fontSize: "small",fontWeight: "bold" }}>Recommendation</span>
                    <p style={{ fontSize: "small" }} className="m-0 ">{insightVal.content.recommendation}</p>
                </div>
                </>
                }
                {props.showChart==="true"  && insightVal.graphValue.length !== 0 ?
                <>
                 <div className="row"><button type="button" className="ml-auto btn btn-link" onClick={chartDetails}>{open ? "Hide":"Show"} Details</button></div>
                <div className={open ? "show" : "hide"}><BuildSingleLineQual chartData={insightVal.graphValue}/></div>
                </>
                :props.showChart==="true"  && insightVal.graphValue.length === 0 ? 'No Data Found' :''
                 } 
                 
            </div>
        </Card>
    </React.Fragment>;
};
export default CardChart;