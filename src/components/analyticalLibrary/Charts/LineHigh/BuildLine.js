import React, { useState,useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import ChartHOC from '../ChartHOC/ChartHOC';

var passedData = [], failedData = [], skippedData = [], totalTest = [];

function setPassedData(data) {
    passedData = data.map(item => {
        var buildId = parseInt(item.buildId);
        var passCount = parseInt(item.passCount);
        return (
            {
                x: buildId,
                y: passCount
            }
        )
    })
};

function setFailedData(data) {
    failedData = data.map(item => {
        var buildId = parseInt(item.buildId);
        var failCount = parseInt(item.failCount);
        return (
            {
                x: buildId,
                y: failCount
            }
        )
    })
};

function setSkippedData(data) {
    skippedData = data.map(item => {
        var buildId = parseInt(item.buildId);
        var skipCount = parseInt(item.skipCount);
        return (
            {
                x: buildId,
                y: skipCount
            }
        )
    })
};

function setTotalTestData(data) {
    totalTest = data.map(item => {
        var buildId = parseInt(item.buildId);
        var totalTest = parseInt(item.totalCount);
        return (
            {
                x: buildId,
                y: totalTest
            }
        )
    })
};

const BuildLine = (props) => {


    setPassedData(props.chartData.cardsData.buildStatusDTOList);

    setFailedData(props.chartData.cardsData.buildStatusDTOList);

    setSkippedData(props.chartData.cardsData.buildStatusDTOList);

    setTotalTestData(props.chartData.cardsData.buildStatusDTOList);
    console.log(props.chartData.cardsData.buildStatusDTOList);
    console.log(passedData);
    console.log(props);


    var options = {}
    options = {
        title: {
            text: ''
        },
        credits: {
            enabled: false
        },
        chart: {
            backgroundColor: '#232D3B',
            type: 'line',
            height: '300px'
        },
        yAxis: {
            lineWidth: 0,
            gridLineColor: "#313B49",
            lineColor: "green",
            tickLength: 5,
            title: {
                text: '',
            },
            labels: {
                style: {
                    color: "#f5f5f5"
                },
            }
        },
        xAxis: {
            lineWidth: 0,
            title: {
                text: 'Builds',
                margin: 20,
                style: {
                    color: "#f5f5f5"
                }
            },
            // accessibility: {
            //     rangeDescription: 'Range: 3 to 9'
            // },
            labels: {
                style: {
                    color: "#f5f5f5"
                }
            }
        },
        legend: {
            layout: 'horizontal',
            align: 'right',
            verticalAlign: 'top',
            itemStyle: {
                color: "#ffffff",
                fontWeight: "normal"
            },
            itemHoverStyle: {
                color: "#fff"
            },
        },
        series: [{
            name: 'Passed',
            data: passedData,
            color: "#4E8B15",
            // borderWidth: 0,
            dashStyle: "Solid",
        }, {
            name: 'Failed',
            data: failedData,
            color: "#B64A4E",
            // borderWidth: 0,
            dashStyle: "Solid"
        }, {
            name: 'Skipped',
            data: skippedData,
            color: "#BBCA0E",
            // borderWidth: 0,
            dashStyle: "Solid"
        }, {
            name: 'Total Tests',
            data: totalTest,
            color: "#3D60CD",
            // borderWidth: 0,
            dashStyle: "Solid"
        }],

    };
    console.log(options);

    return (
        <React.Fragment>
            <ChartHOC options={options} />
        </React.Fragment>
    )
}

export default BuildLine;

