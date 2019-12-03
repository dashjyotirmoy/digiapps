class Options {
    chart = {}
    credits = {
        enabled: false
    }
    legend = {
        enabled: false
    }
    title = {}
    tootltip = {}
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
        let start = new Date(this.res.burndown.startDate).toLocaleDateString();
        let end = new Date(this.res.burndown.endDate).toLocaleDateString();
        let startDate = start;
        let dateParts = startDate.split("/");
        start = dateParts[1] + "/" + dateParts[0] + "/" + dateParts[2];
        startDate = new Date(dateParts[2], dateParts[0] - 1, +dateParts[1]);
        let endDate = end;
        dateParts = endDate.split("/");
        end = dateParts[1] + "/" + dateParts[0] + "/" + dateParts[2];
        endDate = new Date(dateParts[2], dateParts[0] - 1, +dateParts[1]);
        let Difference_In_Time = endDate.getTime() - startDate.getTime();
        let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
        let hours = this.res.burndown.burndown.remainingHours
        options.chart = {
            type: "line",
            height: 0,
            backgroundColor: ""
        }
        options.tootltip = {
            pointFormat: '{series.name}: {point.y}'
        }
        options.xAxis = {
            max: Difference_In_Days,
            labels: {
                enabled: false
            },
            tickLength: 0
        }
        options.yAxis = [{
            max: this.res.burndown.burndown.totalHours,
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
                name: 'Remaining hours',
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
        // console.log(this.res.data)
        let issues = [], bugs = [], rawDate, average = 0, total, rolling_average, rolling_average_issues, rolling_average_bugs, min1, min2, min
        this.res.data.map(series => {
            if (series.name == "Issues") {
                issues = series.values
            }
            else {
                bugs = series.values
            }
        })
        // console.log(issues)
        // console.log(bugs)
        issues.map(issue => {
            rawDate = issue[0].split("T")
            issue[1] = parseInt(issue[1])
            issue[0] = (new Date(rawDate[0])).getTime()
            min1 = issue[0]
            average += issue[1]
        })
        issues.sort((a, b) => a[0] - b[0]);
        // console.log(issues)
        bugs.map(bug => {
            rawDate = bug[0].split("T")
            bug[1] = parseInt(bug[1])
            bug[0] = (new Date(rawDate[0])).getTime()
            min2 = bug[0]
            average += bug[1]
        })
        bugs.sort((a, b) => a[0] - b[0]);
        // console.log(issues)
        // console.log(bugs)
        rolling_average_issues = issues.map(x => {
            return {
                "date": x[0],
                "days": x[1]
            }
        })
        rolling_average_bugs = bugs.map(x => {
            return {
                "date": x[0],
                "days": x[1]
            }
        })
        rolling_average = rolling_average_issues.concat(rolling_average_bugs)
        // console.log(rolling_average)
        let rolling_average_array = []
        rolling_average.map(roll => {
            let roll_temp = []
            roll_temp[0] = roll.date
            roll_temp[1] = roll.days
            rolling_average_array.push(roll_temp)
        })
        rolling_average_array.sort((a, b) => a[0] - b[0]);
        let std_dev_all = JSON.parse(JSON.stringify(rolling_average_array))
        // console.log(std_dev_all)
        let temp_mean = 0
        for (let i = 0; i < std_dev_all.length; i++) {
            temp_mean += std_dev_all[i][1]
        }
        temp_mean = temp_mean / std_dev_all.length
        let diff = 0
        for (let i = 0; i < std_dev_all.length; i++) {
            diff += (temp_mean - std_dev_all[i][1]) * (temp_mean - std_dev_all[i][1])
        }
        diff = diff / std_dev_all.length
        let av_std_dev = Math.sqrt(diff)
        // console.log(diff)
        temp_mean = temp_mean / std_dev_all.length
        // console.log(temp_mean)
        rolling_average = rolling_average_array.map(roll => {
            return {
                "date": roll[0],
                "days": roll[1]
            }
        })
        // console.log(rolling_average_array)
        var output = [];
        rolling_average.forEach(function (item) {
            var existing = output.filter(function (v, i) {
                return v.date == item.date;
            });
            if (existing.length) {
                var existingIndex = output.indexOf(existing[0]);
                output[existingIndex].days = output[existingIndex].days.concat(item.days);
            } else {
                item.days = [item.days];
                output.push(item);
            }
        });
        // console.log(output)
        let std_dev_array = JSON.parse(JSON.stringify(output))
        let area_range = []
        // console.log(std_dev_array)
        std_dev_array.map(one_day => {
            let area_range_day = [], sum = 0, mean, variance, std_dev
            one_day.days.map(day_data => {
                sum += day_data
            })
            mean = sum / one_day.days.length
            sum = 0
            one_day.days.map(day_data => {
                day_data = (day_data - mean) * (day_data - mean)
                sum += day_data
            })
            variance = sum / one_day.days.length
            std_dev = Math.sqrt(variance)
            // console.log(std_dev);

            area_range_day[0] = one_day.date
            if (std_dev === 0) {
                area_range_day[1] = mean - av_std_dev
                area_range_day[2] = mean + av_std_dev
            }
            else {
                area_range_day[1] = mean - std_dev
                area_range_day[2] = mean + std_dev
            }
            area_range.push(area_range_day)
        })
        area_range.sort((a, b) => a[0] - b[0]);
        let final_min = area_range[0][0]
        // console.log(final_min)
        // console.log(area_range)
        // console.log(output)
        output.map(roll => {
            if (min > roll.date)
                min = roll.date
            let arr = roll.days
            let arr_len = roll.days.length
            let arrSum = arr.reduce((a, b) => a + b, 0)
            roll.days = arrSum / arr_len
        })
        let rolling_average_data = [], rolling_average_final = [], startData

        // output.map(today => {

        //     rolling_average_data.push(today.days)
        // })
        rolling_average_data.push(output[0].days)
        for (let i = 1; i < output.length; i++) {
            let temp_object, before_object
            temp_object = output[i];
            before_object = output[i - 1]
            let days_difference = temp_object.date - before_object.date
            if (days_difference > 86400000) {
                let j = days_difference / 86400000
                // console.log(j)
                for (let k = 0; k < j - 1; k++) {
                    rolling_average_data.push(before_object.days)
                }
            }
            rolling_average_data.push(temp_object.days)
            // console.log(rolling_average_data)
        }
        // console.log(rolling_average_data)

        //rolling av calc
        for (let i = 1; i < rolling_average_data.length; i++) {
            let temp = (rolling_average_data[i] + rolling_average_data[i - 1]) / 2
            rolling_average_final.push(temp)
        }
        startData = rolling_average_final[0]
        rolling_average_final.unshift(startData)
        // rolling_average_final.unshift(startData)
        total = issues.length + bugs.length
        average = average / total
        average = average * 100
        average = Math.round(average)
        average = average / 100
        // console.log(rolling_average_final);

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
            title: {
                text: 'Days',
                style: {
                    color: '#f5f5f5'
                }
            },
            plotLines: [{
                value: average,
                color: 'green',
                width: 2,
                label: {
                    text: average,
                    align: 'left',
                    style: {
                        color: 'white'
                    }
                }
            }]
        }
        options.tooltip = {
            pointFormat: '{series.name}: {point.y}'
        }
        options.series = [
            {
                name: 'Issues',
                type: 'scatter',
                color: 'grey',
                data: issues,
                pointInterval: 86400000,
            },
            {
                name: 'Bugs',
                type: 'scatter',
                color: '#A9CCE3',
                data: bugs,
                pointInterval: 86400000,
            },
            {
                name: 'Rolling Av',
                type: 'line',
                data: rolling_average_final,
                pointStart: final_min,
                pointInterval: 86400000,
                marker: {
                    enabled: false
                }
            },
            {
                type: 'arearange',
                data: area_range,
                pointInterval: 86400000,
                fillOpacity: 0.2,
                marker: {
                    enabled: false
                }
            }
        ]
        return options;
    }
}

export default Graph;