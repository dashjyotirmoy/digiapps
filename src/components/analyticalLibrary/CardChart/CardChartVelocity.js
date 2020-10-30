import React,{useState} from "react";
import { Card } from "react-bootstrap";
import BuildSingleLine from "../Charts/LineHigh/BuildSingleLine";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

import { TooltipHoc } from "../TooltiHOC/TooltipHoc";


const CardChart = props => {
    const [ open, setOpen ] = useState(false);
    let graphValue = [];
     let velocityVariance;
    props.insights.projects && props.insights.projects.map(data => {
        velocityVariance=data.velocityVariance;
        return graphValue.push({
            color: '#81b8ed',
            //y: Number(data.velocityVariance.toFixed(2)),
            y:Number(data.velocityVariance.toFixed(2)),
            name: data.sprintName
           // name: data.sprintName
        });
    });

    let newArray = props.insights.projects && props.insights.projects.filter((val) => {
        return val
    });


    let insightVal = {
        graphValue: graphValue,
        content: newArray && newArray[newArray.length - 1]

    };
    let chartDetails = () => setOpen(!open);
    function btnClass() {
        if(insightVal.content && insightVal.content.colorCode === "GREEN"){
            return 'btnmediumbg';
        }else if(insightVal.content && insightVal.content.colorCode === "RED"){
            return 'btnhighbg';
        }else if(insightVal.content && insightVal.content.colorCode === "YELLOW"){
            return 'btnlowbg';
        }       
        return 'btnnobg';
    }
    function btnLabel() {
        if (insightVal.content && insightVal.content.colorCode === "GREEN") {
          return "IDEAL";
        }else if(insightVal.content && insightVal.content.colorCode === "RED"){
            return 'WARNING';
        }else if(insightVal.content && insightVal.content.colorCode === "YELLOW"){
            return 'BELOW OPTIMAL';
        }
          return "";
        }

    return <React.Fragment>
        <Card className="card-border">
            <Card.Body className="p-0">
                <div className="d-flex cardHeader p-2 rounded">
                    <div className="mr-auto">
                        <p className="cardHeader m-0 p-0 font-weight-bold">{props.cardHeader}</p>
                    </div>
                    <TooltipHoc
                        info="Velocity & Efficiency Insight shows the velocity variance of the product across various sprints. <br /><br />                            
                        Velocity Variance is calculated as velocity of the current sprint divided by the velocity of the previous sprint.<br /><br />                            
                        Velocity is calculated as the number of story points delivered by the team in a sprint.<br/>"
                        >
                        <span className="d-inline-block">
                            <FontAwesomeIcon style={{color:'#a5a5a5'}} icon={faInfoCircle} />
                        </span>
                    </TooltipHoc>
                </div>
            </Card.Body>
             <div className="rounded mt-2 w-100 py-2 px-3">
                <div className="rounded p-2" style={{'border': '1px solid #535353'}}>
                <div className="d-flex mb-2">
                    <p className="mr-auto mb-0 pl-0 font-size-small font-weight-bold">{props.cardName} </p>
                    {insightVal.content && insightVal.content.recommendation!=="N/A" ?   <span style={{ color:"#ffffff",fontSize: "12px",fontWeight: "bold" }} className={`badge btnSize w-auto ${btnClass()}`}>{btnLabel()}</span>
                    :" "}
                </div>
                {props.showChart!=="true" ?   <BuildSingleLine chartData={insightVal.graphValue}/>:''}
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
                </div></>}
                {props.showChart==="true"  && insightVal.graphValue.length !== 0 ?
                <>
                 <div className="row"><button type="button" className="ml-auto btn btn-link" onClick={chartDetails}>{open ? "Hide":"Show"} Details</button></div>
                <div className={open ? "show" : "hide"}><BuildSingleLine chartData={insightVal.graphValue}/></div>
                </>
                :''
                 } 
            </div>
        </Card>
    </React.Fragment>;
};
export default CardChart;