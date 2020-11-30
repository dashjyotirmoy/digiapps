import React from 'react';
import { Card, Badge, Form,Container,Row , Col} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import moment from 'moment/moment';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";

import "../SecurityProject/Alert.css";


let buttonColorScheme = {
	"REJECT": '#ec5050',
	"APPROVE": '#20c997',
	"REASSIGN": '#ffc107'
}
let results = [];
let checkedPolicy = [];


function update(actionData) {
	let tempActionData = actionData.map(item => item.action);
	results = [...new Set(tempActionData)];
}

const Policy = (props) => {
	const bgTheme = props.bgTheme;
	let dataItem = props.cardsData;
	let actionData = [...dataItem.policyAlerts];
	const [showResults, setShowResults] = React.useState(true)
	const [showPolicyData, setPolicyData] = React.useState(props.cardsData)

	const onClick = () => {
		setShowResults(!showResults);
		update(actionData);
	}

	const handleFilter = (e) => {
		if (e.target.checked) {
			let tempCheckPolicy = [];
			actionData.forEach((item) => {
				if (item.action === e.target.value) {
					checkedPolicy.push(item);
				}
			})
			checkedPolicy.forEach((policy) => {
				tempCheckPolicy.push(policy);
			})
			setPolicyData(tempCheckPolicy);
		} else {
			let tempCheckPolicy = [];
			checkedPolicy.forEach(item => {
				if (item.action !== e.target.value) {
					tempCheckPolicy.push(item);
				}
			})
			checkedPolicy = tempCheckPolicy;
			if (!tempCheckPolicy.length) {
				tempCheckPolicy = actionData;
			}
			setPolicyData(tempCheckPolicy);
		}
	}


	return (
		<React.Fragment>
			 <Container fluid>
			 <Row className={`${bgTheme ? '' : 'bg-light'}`}>
			<Col>
			<Card.Body className={`p-0 rounded ${bgTheme ? 'bg-dark-theme card-border-dark' : 'card-border-light bg-white'}`}>
                  <h6 className={`font-weight-bold ${bgTheme ? 'bg-prodInfo-prod' : 'cardHeader'}`}>Policy Violations</h6>
				  <Card.Body>
				  <div className="wrap">
                  <table className={`table table-hover ${bgTheme ? 'table-dark' : 'text-light'}`}>
                    <thead className={`${bgTheme ? 'tabhead' : 'cardHeader text-dark'}`}>
								<tr >
									<th className="pl-1">Library</th>
									<th>Description</th>
									<th className="text-center">Library Type</th>									
									<th>Creation Date</th>
									<th>Modified Date</th>
								</tr>
								</thead>
                  </table>

                  <div className={`${bgTheme ? 'inner_table' : 'inner_table_light'}`}>
                    <table className={`table table-hover ${bgTheme ? 'table-dark' : 'text-light'}`}>
                      <tbody >
											{(showPolicyData && showPolicyData.policyViolations.length > 0) ?
								showPolicyData && showPolicyData.policyViolations.map((item, index) => {
									return (
										<tr className={`f-12 ${bgTheme ? 'tabrow' : 'text-dark'}`} key={index}>
												<td className="w-2">
													{item.alertLevel === 'MAJOR' ? (
														<Badge className="sevbadge1"></Badge>
													) : <Badge className="sevbadge-minor"></Badge>}

												
												<span className="ml-2">{item.libraryName}</span></td>
												<td> {item.description} </td>
												<td className="text-center"> {item.libraryType}</td>
												<td>  {item.creationDate ? moment(item.creationDate).format("DD-MM-YYYY"): null} </td>
												<td>  {item.modifiedDate ? moment(item.modifiedDate).format("DD-MM-YYYY"): null} </td>

											</tr>
										

									)
								}) : <tr><td style={{ textAlign: "center" }} className={`${bgTheme ? 'text-light' : 'text-dark'}`} colSpan="6">No data found</td></tr>
							}
							</tbody>
							</table>
                  </div>
                </div>
</Card.Body></Card.Body>

			</Col></Row>
        <Row className={`py-3 ${bgTheme ? '' : 'bg-light'}`}>
			<Col>
			<Card.Body className={`rounded p-0 ${bgTheme ? 'bg-dark-theme card-border-dark' : 'card-border-light bg-white'}`}>
                  <h6 className={`font-weight-bold ${bgTheme ? 'bg-prodInfo-prod' : 'cardHeader'}`}>Policies</h6>
				  <Card.Body>
				  <div className="wrap">
                  <table className={`table table-hover ${bgTheme ? 'table-dark' : 'table-light'}`}>
                    <thead className={`${bgTheme ? 'tabhead' : 'cardHeader text-dark'}`}>
								<tr >
									<th>Policy ID</th>
									<th>Policy Name</th>
									<th>Match</th>
									<th>Action
                  <FontAwesomeIcon className="ml-2 pointer"
											icon={faFilter} onClick={onClick}
											color={"#D8D8D8"}
										></FontAwesomeIcon>
										<div className={showResults ? "dn" : "db"}  >
											<Card className="borderadius">
												<Card.Body className="pt-3 bg">

													{
														results.map((item, index) => {
															return (
																<div key={index}>  <Form.Check id={item} type="checkbox" style={{ float: 'left' }} value={item} onChange={handleFilter} /><span className="bold">{item}</span></div>
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
                  </table>

                  <div className={`${bgTheme ? 'inner_table' : 'inner_table_light'}`}>
                    <table className={`table table-hover ${bgTheme ? 'table-dark' : 'text-light'}`} >
                      <tbody >
											{(showPolicyData && showPolicyData.policyAlerts.length > 0) ?
								showPolicyData && showPolicyData.policyAlerts.map((item, index) => {
									return (
										<tr className={`f-12 ${bgTheme ? 'tabrow' : 'text-dark'}`} key={index}>
												<td>{item.policyId}</td>
												<td> {item.policyName} </td>
												<td style={{wordBreak:"break-all"}}>By {item.match} Group</td>
												<td>
													<span className="badge"
														style={{ minWidth: '6rem', lineHeight: '1rem', color: '#222222', background: buttonColorScheme[item.action], border: '#B65355' }}
													>
														{item.action}


													</span>

												</td>
												<td style={{wordBreak:"break-all"}}>{item.creator}</td>
												<td>  {moment(item.creationDate).format("DD-MM-YYYY")} </td>

											</tr>
										

									)
								}) : <tr><td style={{ textAlign: "center" }} className={`${bgTheme ? 'text-light' : 'text-dark'}`} colSpan="6">No data found</td></tr>
							}
							</tbody>
							</table>
                  </div>
                </div>
</Card.Body></Card.Body>

			</Col></Row></Container>
		</React.Fragment >
	)
}

export default Policy;