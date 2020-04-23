import React from 'react';
import { Card, Table,Row,Col,Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import moment from 'moment/moment';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter} from "@fortawesome/free-solid-svg-icons";


let buttonColorScheme = {
  "REJECT": '#B65355',
  "APPROVE": '#5DAB07',
  "REASSIGN": '#C6BC38'
}
let results=[];

function update(actionData){
  let tempActionData = actionData.map(item => item.action);
 results = [...new Set(tempActionData)];
console.log(results);
}


const Policy = (props) => {
  let actionData = [...props.cardsData];
     
    let policyData = props.cardsData;
    const [showResults, setShowResults] = React.useState(true)
  
    const onClick = () =>  {
      setShowResults(!showResults);
      update(actionData);
          }

   
     return (
    <React.Fragment>
      <Card
        style={{ color: '#f5f5f5', background: '#232D3B' }}
      >
        <Card.Header
          style={{ color: '#E6E6E6' }} 
        >
          Policy Violation
        </Card.Header>
        <Card.Body>
          <Card.Title>
            Policies
          </Card.Title>
          <Card
            style={{ color: '', background: '#232D3B', border: '#232D3B' }}
          >
            <Table variant="dark"
              style={{ borderColor: 'red' }}
            >
              <thead
                style={{ color: '#A6A8AC', background: '#1D2632', border: '#1D2632', minHeight: '1rem', maxHeight: '2rem', lineHeight: '2rem' }}
              >
                <tr>
                  <th>Policy ID</th>
                  <th>Policy Name</th>
                  <th>Match</th>
                  <th>Action
                  <FontAwesomeIcon className="ml-2 pointer" 
                          icon={faFilter} onClick={onClick}
                          color={"#D8D8D8"}
                      ></FontAwesomeIcon>
                        <div className= {showResults?"dn":"db"}  >
                          <Card className="borderadius">
                            <Card.Body className="pt-3 bg">
                             
                             {
                              results.map((item, index) =>{
                               return(
                                 
                               <div key={index}>  <Form.Check type="checkbox" style={{float:'left'}} onClick={update}/><span className="bold">{item}</span></div>
                               )
                              })
                            }
                            
                             {/* <div><Form.Check type="checkbox" style={{float:'left'}} /> <span className="bold">APPROVE</span></div> */}
                            </Card.Body>
                          </Card>
                        </div>
                    {/* <span className="pl-5">
                      <input
                        className="pl-2"
                        style={{ minHeight: '1rem', maxHeight: '2rem', lineHeight: '2rem', minWidth: '5rem', maxWidth: '8rem', borderRadius: '4px' }}
                        type="text"
                        placeholder="Filter Actions..."
                        onChange={updateFunction}
                      >
                      </input>
                    </span> */}
                  </th>
                  <th>Creator</th>
                  <th>Creation Date</th>
                </tr>
              </thead>


              {
                policyData.map((item, index) => {
                  return (

                    <tbody
                      key={index}
                      className="font-metric-sub-text"
                      style={{ color: '#ffffff', background: '#334154', border: '#334154' }}
                    >
                      <tr>
                        <th>{item.policyId}</th>
                        <th> {item.policyName} </th>
                        <th>By {item.match} Group</th>
                        <th>
                          <Button
                            style={{ minWidth: '6rem', lineHeight: '1rem', color: '#222222', background: buttonColorScheme[item.action], border: '#B65355' }}
                          >
                            {item.action}


                          </Button>

                        </th>
                        <th>{item.creator}</th>
                        <th>  { moment(item.creationDate).format("DD-MM-YYYY") } </th>
                        
                      </tr>
                    </tbody>

                  )
                })
              }

            </Table>

          </Card>
        </Card.Body>

      </Card>
    </React.Fragment >
  )
}

export default Policy;