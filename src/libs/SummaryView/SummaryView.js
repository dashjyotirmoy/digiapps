import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faCircle, faArrowUp, faArrowDown, faTh } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components';
import ItemMetric from './Metrics/ItemMetric';
import MainMetrics from './Metrics/MainMetrics';
import Translate from '../Translations/Translations';
import axios from 'axios';


const Styles = styled.div`
.data-header{
    height:100%;
    color:#fff;
}
`;
class SummaryView extends Component {
    state = {
        data: {},
        flag: false
    }

    componentDidMount() {
        axios.get("/JsonData/SummaryBarData.json")
            .then(res => {
                const data = res.data;
                this.setState({ data: data, flag: true });
            }
            )
    }

    render() {
        const nameArr = ["Total Product", "totalMembers", "totalHrs"];
        const NameVal = nameArr.map((item, key) => {
            return {
                name: Translate[item] || item,
                value: this.state.data[item] || 0
            }
        })

        const ItemArr = ["averageReleaseCycle", "averageDeploymentLeadTime", "Av MTTD", "Av MTTR", "Av Customer Rating"];

        const ItemNameVal = ItemArr.map((item, key) => {
            return {
                name: Translate[item] || item,
                value: this.state.data[item] || 0
            }


        })
        return (
            <div className="h-10">

                <Styles style={{ "height": "100%" }}>
                    <Container fluid className="data-header">
                        <main className="align-items-center d-flex h-100 w-100">
                            <Row className="h-75 m-0 p-0 row w-100">
                                <div className="h-100 d-none d-md-block d-lg-block d-xl-block">
                                    <Row className="d-flex p-0 m-0 w-100 h-100">
                                        <Col md={12} lg={12} xl={12} className="h-100 px-2 d-flex align-items-center justify-item-center">
                                            <FontAwesomeIcon className="font-size-smaller" icon={faArrowLeft} />
                                            <div className="w-100 px-1">
                                                <p className="font-size-smaller m-0 text-center text-black m-0">
                                                    {this.state.data.name}
                                                </p>
                                                <p className="font-aggegate-sub-text m-0 text-center text-white-50 m-0">
                                                    <small>{this.state.data.designation}</small>
                                                </p>
                                            </div>
                                            <FontAwesomeIcon icon={faTh} />
                                        </Col>
                                    </Row>
                                </div>
                                <div className="h-100 px-xl-2 px-lg-2 grid-graph-comp rounded w-auto d-inline-block">
                                    {this.state.flag ? <MainMetrics NameVal={NameVal} /> : "loading"}
                                </div>
                                <div className="h-100 px-xl-2 px-lg-2 d-inline-block d-flex flex-grow-1 d-inline-block">
                                    {this.state.flag ? <ItemMetric ItemNameVal={ItemNameVal} /> : "loading"}
                                </div>
                            </Row>
                        </main>

                    </Container>
                </Styles>
            </div>
        );
    }
}

export default SummaryView;