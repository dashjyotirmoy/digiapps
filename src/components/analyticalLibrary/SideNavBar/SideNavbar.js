import React, { Component } from "react";
import './SideNavbar.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faTimes } from"@fortawesome/free-solid-svg-icons";
import Button from 'react-bootstrap/Button'
class SideNavbar extends Component {
    state = {
        showBar: false,
        width: 0,
        display: 'none',
        float:'right',
        marginRight: 0
    }

    
    toggleBar=()=>{
        if(!this.state.showBar){
            this.setState({
                width: "318px",
                display: "block",
                marginRight: "20rem"
            })
        }
        else{
            this.setState({
                display: "none",
                width:'0px',
                float:'right',
                marginRight: 0
            }) 
        }
        this.setState({showBar:!this.state.showBar})

    
    }
    render() {
        return (
            <>
                <Button variant="outline-dark"  className="btnAlign" style={{float:this.state.float, marginRight: this.state.marginRight}} onClick={this.toggleBar} >
                    {this.state.showBar ? <span><FontAwesomeIcon className="high mr-2" icon={faTimes}/></span> : 
                    <span><FontAwesomeIcon className="high mr-2" icon={faEye} /></span>}
                     Insights</Button>
                <div id="mySidenav" className="sidenav" 
                style={{ width: this.state.width, display: this.state.display,marginTop:'154px',zIndex:102}}>
                {this.props.card}
                </div>
            </>
        )
    }
}

export default SideNavbar;
