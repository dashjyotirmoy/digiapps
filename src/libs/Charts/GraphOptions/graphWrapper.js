class Options {
    chart = {}
    credits = {
        enabled: false
    }
    legend = {
        enabled: false
    }
    title = {}
    plotOptions = {}
    xAxis = {}
    yAxis = {}
    series = {}
}

class Graph {
    constructor(props) {
        this.res = props
        this.options = this.generateOption(props.type)
    }
    generateOption = (type) => {
        const baseOptions = new Options();
        let updatedOptions = {};
        switch (type) {
            case "line":
                updatedOptions = this.generateLine(baseOptions);
                return updatedOptions;
            case "ColumnHigh":
                updatedOptions = this.generateColumn(baseOptions);
                return updatedOptions;
            case "ControlChartHigh":
                updatedOptions = this.generateControlChart(baseOptions);
                return updatedOptions;
            default:
                return null;
        }
    }
    generateLine(options) {
        const start = this.res.burndown.startDate;
        const end = this.res.burndown.endDate;
        let startDate = start;
        let dateParts = startDate.split("/");
        startDate = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
        let endDate = end;
        dateParts = endDate.split("/");
        endDate = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
        let Difference_In_Time = endDate.getTime() - startDate.getTime();
        let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
        let hours = []; hours.push(parseInt(this.res.burndown.burndown.totalHours));
        hours = hours.concat(this.res.burndown.burndown.hoursSpent);
        options.chart = {
            type: "line",
            height: 0,
            backgroundColor: ""
        }
        options.xAxis = {
            max: Difference_In_Days,
            labels: {
                enabled: false
            },
            tickLength: 0
        }
        options.yAxis = [{
            labels: {
                enabled: false
            },
            title: {
                text: `Start date: ${start}`,
                rotation: 0
            },
        }, {
            title: {
                text: `End date: ${end}`,
                rotation: 0
            },
            opposite: true
        }]
        options.series = [
            {
                data: hours,
                marker: {
                    enabled: false
                }
            }
        ]
        options.title = {
            text: null
        }
        return options
    }
    generateColumn(options) {
        options.chart = {
            type: 'column',
            height: 0,
            backgroundColor: ""
        }
        options.title = {
            text: this.res.title,
            align: 'left',
            style: {
                color: '#f5f5f5',
                fontWeight: 'bold'
            }
        }
        options.xAxis = {
            type: 'datetime',
            dateTimeLabelFormats: {
                day: '%b %e'
            },
            lineWidth: 1,
            tickLength: 0,
            style: {
                color: '#f5f5f5'
            }
        }
        options.yAxis = {
            min: 0,
            gridLineColor: "transparent",
            title: {
                text: 'y title',
                style: {
                    color: '#f5f5f5'
                }
            },
            lineColor: 'blue',
            stackLabels: {
                enabled: true,
            }
        }
        options.plotOptions = {
            column: {
                stacking: 'normal',
                dataLabels: {
                    enabled: true
                }
            }
        }
        options.series = [
            {
                "name": "A",
                "data": [5, 3, 4, 7, 8],
                "color": "#7d12ff", "borderWidth": 0,
                pointStart: Date.UTC(2019, 10, 15),
                pointInterval: 86400000,
                pointWidth: 10
            },
            {
                "name": "B",
                "data": [2, 2, 3, 2, 6],
                "color": "#ab20fd",
                "borderWidth": 0,
                pointStart: Date.UTC(2019, 10, 15),
                pointInterval: 86400000,
                pointWidth: 10
            },
            {
                "name": "C",
                "data": [3, 4, 4, 2, 5],
                "color": "#200589",
                "borderWidth": 0,
                pointStart: Date.UTC(2019, 10, 15),
                pointInterval: 86400000,
                pointWidth: 10
            }
        ]
        return options;
    }
    generateControlChart(options) {
        options.chart = {
            height: 0,
            backgroundColor: ""
        }
        options.title = {
            text: this.res.title,
            align: 'left',
            style: {
                color: '#f5f5f5',
                fontWeight: 'bold'
            }
        }
        options.yAxis = {
            min: 0,
            title: {
                text: 'temp title'
            },
            plotLines: [{
                value: 15,
                color: 'green',
                width: 2
            }]
        }
        options.series = [
            {
                type: 'scatter',
                color: 'grey',
                data: [
                    [9, 21], [9, 16], [10, 9], [10, 13], [10, 15],
                    [11, 8], [11, 10], [11, 19], [12, 9], [12, 13], [12, 17], [12, 19],
                    [13, 3], [13, 7], [13, 14], [13, 15], [14, 4], [14, 6],
                    [15, 10], [16, 14], [17, 8], [17, 17], [18, 12], [18, 17], [18, 20],
                    [19, 10], [19, 18], [19, 26], [20, 12], [20, 15], [20, 18], [20, 22],
                    [21, 20], [21, 26], [22, 6], [22, 12], [22, 23], [23, 11]
                ]
            },
            {
                type: 'scatter',
                color: '#A9CCE3',
                data: [
                    [9, 13], [10, 17], [11, 16], [13, 5], [15, 13], [15, 17], [17, 13], [17, 22],
                    [18, 8], [19, 20], [20, 24], [22, 8], [22, 20], [23, 15]
                ]
            },
            {
                name: 'T1',
                data: [[9, 13], [10, 13], [11, 13], [12, 13.5], [13, 10], [14, 12], [15, 15], [16, 15.75],
                [17, 16.25], [18, 16.75], [19, 17], [20, 18], [21, 19], [22, 12], [23, 12]],
                zIndex: 1,
                marker: {
                    enabled: false
                }
            },
        ]
        return options;
    }
}

export default Graph;