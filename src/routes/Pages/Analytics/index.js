import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {allDaily, monthOverview, testUrl2} from "../../../util/APIUtils";
import {Line, Pie, Bar, Doughnut} from 'react-chartjs-2'
import PageContainer from "../../../@jumbo/components/PageComponents/layouts/PageContainer";
import GridContainer from "../../../@jumbo/components/GridContainer";
import Card from "@material-ui/core/Card";
import {CardContent, CardHeader} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import {MoreVert} from "@material-ui/icons";
import CmtDropdownMenu from "../../../@coremat/CmtDropdownMenu";
import Tooltip from "@material-ui/core/Tooltip";

const breadcrumbs = [{ label: 'Home', link: '/' }];

export default class Analytics extends Component {
    constructor(props) {
        super(props);
        this.state = { data: null , dataday: null, groupdata: null};
    }


    copy(mainObj) {
        let objCopy = {}; // objCopy will store a copy of the mainObj
        let key;

        for (key in mainObj) {
            objCopy[key] = mainObj[key]; // copies each property to the objCopy object
        }
        return objCopy;
    }


    componentDidMount() {
        monthOverview().then(response => this.setState({data: response}));
        allDaily().then(response => this.setState({dataday: response}));
        testUrl2().then(response => this.setState({groupdata: response}));
        let monthdata = [];
    }

    render() {


        this.state.donutOptions = {
            maintainAspectRatio: false,
            responsive: true,
        }

        this.state.pieOptions = {
            maintainAspectRatio: false,
            responsive: true,
        }




        this.state.barChartOptions = {
            responsive: true,
            maintainAspectRatio: false,
            datasetFill: false,
            scales: {
                xAxes: [{
                    stacked: false,
                }],
                yAxes: [{
                    stacked: false,
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }


        this.state.areaChartOptions = {
            maintainAspectRatio: false,
            responsive: true,
            legend: {
                display: true
            },
            scales: {
                xAxes: [{
                    gridLines: {
                        display: false,
                    }
                }],
                yAxes: [{
                    gridLines: {
                        display: false,
                    },
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }

        this.state.lineChartOptions = {
            options: {
                hover: {
                    mode: 'point'
                }
            },
            maintainAspectRatio: false,
            responsive: true,
            legend: {
                display: true
            },
            scales: {
                xAxes: [{
                    gridLines: {
                        display: false,
                    }
                }],
                yAxes: [{
                    gridLines: {
                        display: false,
                    },
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }

        this.state.stackedBarChartOptions = {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                xAxes: [{
                    stacked: true,
                }],
                yAxes: [{
                    stacked: false,
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }


        this.state.lineChartOptions.datasetFill = false;
        if(this.state.monthChartOptions == null){
            this.state.monthChartOptions = this.state.barChartOptions;
        }
        return (
            <PageContainer heading="Analyse" breadcrumbs={breadcrumbs}>
                <GridContainer>

                    <Grid item xs={6}>
                        <Card>
                            <CardHeader title ="Monatsverlauf"/>
                            <CardContent className="card-body">

                                <div className="chart">
                                    {(this.state.data != null) ?
                                        this.getAreaChart(this.state.data)
                                        : (<div>Still loading...</div>)
                                    }

                                </div>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={6}>
                        <Card>
                            <CardHeader title ="Wochenverlauf"/>
                            <CardContent className="card-body">
                                {(this.state.dataday != null) ?
                                    this.getLineChart(this.state.dataday)
                                    : (<div>Still loading...</div>)
                                }
                            </CardContent>
                        </Card>
                    </Grid>

                     <Grid item xs={6}>
                         <Card>
                            <CardHeader title ="Erreichbarkeit: Aktueller Monat"/>
                            <CardContent className="card-body">
                                            {(this.state.data != null) ?
                                                this.getDonutChart(this.state.data)
                                                : (<div>Still loading...</div>)
                                            }
                            </CardContent>
                         </Card>
                     </Grid>

                     <Grid item xs={6}>
                         <Card>
                            <CardHeader title ="Erreichbarkeit: Gesamt (Auswertungszeitraum)"/>
                            <CardContent className="card-body">
                                {(this.state.data != null) ?
                                    this.getPieChart(this.state.data)
                                    : (<div>Still loading...</div>)
                                }
                            </CardContent>
                         </Card>
                    </Grid>
                    <Grid item xs={12}>
                        <Card>
                            <CardHeader title="Anrufe nach Abteilung" action={
                                <CmtDropdownMenu data-card-widget="collapse"
                                    TriggerComponent={
                                        <Tooltip title="More">
                                            <IconButton size="small">
                                                <MoreVert />
                                            </IconButton>
                                        </Tooltip>
                                    }
                                    items={[{
                                        icon: '',
                                        label: 'Stacked',
                                        onClick: this.getStackedOptions.bind(this),
                                    },
                                    {
                                        icon: '',
                                        label: 'Non-Stacked',
                                        onClick: this.getNonStackedOptions.bind(this),
                                    }]}
                                />
                            }>
                            </CardHeader>
                            <CardContent className="card-body">
                                    {(this.state.groupdata != null) ?
                                        this.getBarChart(this.state.groupdata, this.state.monthChartOptions)
                                        : (<div>Still loading...</div>)
                                    }
                            </CardContent>
                        </Card>
                    </Grid>
                </GridContainer>
            </PageContainer>

        );
    }

    getAreaChart(data) {
        let labels = [];
        let dataStorage1 = [];
        let dataStorage2 = [];
        let dataStorage3 = [];
        data.map(e => labels.push(e.id))
        data.map(e => dataStorage1.push(e.direct))
        data.map(e => dataStorage2.push(e.direct + e.redirected + e.wqSuccess + e.wqAbort + e.callbacks + e.voicebox + e.unanswered))
        data.map(e => dataStorage3.push(e.direct + e.redirected + e.wqSuccess))


        this.state.areaChartData = {
            labels: labels,
            datasets: [
                {
                    label: 'Direkt angenommen',
                    backgroundColor: 'rgba(60,141,188,0.9)',
                    borderColor: 'rgba(60,141,188,0.8)',
                    pointRadius: false,
                    pointColor: '#3b8bba',
                    pointStrokeColor: 'rgba(60,141,188,1)',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: 'rgba(60,141,188,1)',
                    data: dataStorage1
                },
                {
                    label: 'Q2',
                    backgroundColor: 'rgba(135, 178, 205, 1)',
                    borderColor: 'rgba(135, 178, 205, 1)',
                    pointRadius: false,
                    pointColor: 'rgba(135, 178, 205, 1)',
                    pointStrokeColor: '#c1c7d1',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: 'rgba(155, 188, 200, 1)',
                    data: dataStorage3
                },
                {
                    label: 'Gesamt',
                    backgroundColor: 'rgba(210, 214, 222, 1)',
                    borderColor: 'rgba(210, 214, 222, 1)',
                    pointRadius: false,
                    pointColor: 'rgba(210, 214, 222, 1)',
                    pointStrokeColor: '#c1c7d1',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: 'rgba(220,220,220,1)',
                    data: dataStorage2
                },
            ]
        }

        return <Line data={this.state.areaChartData}
                     height={260}
                     options={this.state.areaChartOptions}/> ;
    }

    getDonutChart(data) {

        let dataStorage1 = data[data.length-1]
        this.state.donutData = {
            labels: [
                'Direkt angenommen',
                'Umgeleitet/Gepickt',
                'Wartefeld erfolgreich',
                'Zurückgerufen',
                'Besetzt',
                'Unbeantwortet',
                'Wartefeld-Abbruch'
            ],
            datasets: [
                {
                    data: [dataStorage1.direct, dataStorage1.redirected, dataStorage1.wqSuccess, dataStorage1.callbacks, dataStorage1.busy, dataStorage1.unanswered, dataStorage1.wqAbort],
                    backgroundColor: ['#00a65a', '#166e09', '#086d59', '#00c0ef', '#f39c12', '#d9534f', '#95230b'],
                }
            ]
        }

        return <Doughnut data={this.state.donutData}
                         height={260}
                         options={this.state.donutOptions}/> ;
    }

    getPieChart(data) {

        let dataStorage1 = {direct: 0, redirected: 0, wqSuccess: 0, callbacks: 0, wqAbort: 0, unanswered: 0, busy: 0};
        data.map(e => (dataStorage1.direct += e.direct));
        data.map(e => (dataStorage1.redirected += e.redirected));
        data.map(e => (dataStorage1.wqSuccess += e.wqSuccess));
        data.map(e => (dataStorage1.callbacks += e.callbacks));
        data.map(e => (dataStorage1.busy += e.busy));
        data.map(e => (dataStorage1.unanswered += e.unanswered));
        data.map(e => (dataStorage1.wqAbort += e.wqAbort));
        this.state.pieData = {
            labels: [
                'Direkt angenommen',
                'Umgeleitet/Gepickt',
                'Wartefeld erfolgreich',
                'Zurückgerufen',
                'Besetzt',
                'Unbeantwortet',
                'Wartefeld-Abbruch'
            ],
            datasets: [
                {
                    data: [dataStorage1.direct, dataStorage1.redirected, dataStorage1.wqSuccess, dataStorage1.callbacks, dataStorage1.busy, dataStorage1.unanswered, dataStorage1.wqAbort],
                    backgroundColor: ['#00a65a', '#166e09', '#086d59', '#00c0ef', '#f39c12', '#d9534f', '#95230b'],
                }
            ]
        }

        return <Doughnut data={this.state.pieData}
                         height={260}
                         options={this.state.pieOptions}/> ;
    }

    datediff(first, second) {
        // Take the difference between the dates and divide by milliseconds per day.
        // Round to nearest whole number to deal with DST.
        return Math.round((second-first)/(1000*60*60*24));
    }

    getLineChart(daydata){
        let weekdata = [];
        let weekstart = null;
        let weekcount = -1;
        let c = 0;
        for (var i = 0; i < daydata.length; i++) {
            let date = new Date((Date).parse(daydata[i].id))
            c++;
            if(weekstart == null) {
                if (weekcount >= 0) {
                    weekdata[weekcount].direct = weekdata[weekcount].direct / c
                    weekdata[weekcount].redirected = weekdata[weekcount].redirected / c
                    weekdata[weekcount].wqSuccess = weekdata[weekcount].wqSuccess / c
                    weekdata[weekcount].callbacksOutgoing = weekdata[weekcount].callbacksOutgoing / c
                    weekdata[weekcount].callbacksIncoming = weekdata[weekcount].callbacksIncoming / c
                }
                c = 0;
                weekstart = date;
                weekcount += 1;
                weekdata[weekcount] = {id: daydata[i].id, direct: 0, redirected: 0, wqSuccess: 0, callbacksOutgoing: 0, callbacksIncoming: 0};
            }else{
                if(this.datediff(weekstart, date) > 5){
                    weekstart = null;
                }

            }


            weekdata[weekcount].direct += daydata[i].direct
            weekdata[weekcount].redirected += daydata[i].redirected
            weekdata[weekcount].wqSuccess += daydata[i].wqSuccess
            weekdata[weekcount].callbacksOutgoing += daydata[i].callbacksOutgoing
            weekdata[weekcount].callbacksIncoming += daydata[i].callbacksIncoming

        }
        c++;
        if (weekcount >= 0) {
            weekdata[weekcount].direct = weekdata[weekcount].direct / c
            weekdata[weekcount].redirected = weekdata[weekcount].redirected / c
            weekdata[weekcount].wqSuccess = weekdata[weekcount].wqSuccess / c
            weekdata[weekcount].callbacksOutgoing = weekdata[weekcount].callbacksOutgoing / c
            weekdata[weekcount].callbacksIncoming = weekdata[weekcount].callbacksIncoming / c
        }

        let labels = [];
        let dataStorage1 = [];
        let dataStorage2 = [];
        let dataStorage3 = [];

        weekdata.map(e => {
            let d = new Date(e.id)
            const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
            const mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(d);
            const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
            labels.push(da + "." + mo + "." +ye)
        })
        weekdata.map(e => dataStorage1.push(e.direct))
        weekdata.map(e => dataStorage2.push(e.direct + e.redirected + e.wqSuccess + e.callbacksOutgoing))
        weekdata.map(e => dataStorage3.push(e.direct + e.redirected + e.wqSuccess + e.callbacksOutgoing + e.callbacksIncoming))

        this.state.daychartdata = {
            labels: labels,
            datasets: [
                {
                    label: 'Q1',
                    backgroundColor: 'rgba(60,141,188,0.9)',
                    borderColor: 'rgba(60,141,188,0.8)',
                    pointRadius: false,
                    pointHoverRadius: 3,
                    pointHitRadius: 10,
                    pointColor: '#3b8bba',
                    pointStrokeColor: 'rgba(60,141,188,1)',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: 'rgba(60,141,188,1)',
                    data: dataStorage1
                },
                {
                    label: 'Q2',
                    backgroundColor: 'rgba(135, 178, 205, 1)',
                    borderColor: 'rgba(135, 178, 205, 1)',
                    pointRadius: false,
                    pointHoverRadius: 3,
                    pointHitRadius: 10,
                    pointColor: 'rgba(135, 178, 205, 1)',
                    pointStrokeColor: '#c1c7d1',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: 'rgba(155, 188, 200, 1)',
                    data: dataStorage2
                },
                {
                    label: 'Q3',
                    backgroundColor: 'rgba(210, 214, 222, 1)',
                    borderColor: 'rgba(210, 214, 222, 1)',
                    pointRadius: false,
                    pointHoverRadius: 3,
                    pointHitRadius: 10,
                    pointColor: 'rgba(210, 214, 222, 1)',
                    pointStrokeColor: '#c1c7d1',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: 'rgba(220,220,220,1)',
                    data: dataStorage3
                },
            ]
        }

        return <Line data={this.state.daychartdata}
                     height={260}
                     options={this.state.lineChartOptions}/> ;
    }

    getBarChart(groupdata, options){
        let labels = [];
        let dataStorage1 = [];
        let dataStorage2 = [];
        let dataStorage3 = [];

        groupdata.map(e => labels.push(e.id))
        groupdata.map(e => (dataStorage1.push(Math.round((e.direct + e.redirected + e.wqSuccess)* 100 / (e.direct + e.redirected + e.wqSuccess + e.wqAbort + e.callbacks + e.voicebox + e.unanswered + e.busy)))))
        groupdata.map(e => dataStorage2.push(Math.round((e.direct + e.redirected + e.wqSuccess + e.callbacksOutgoing) * 100 / (e.direct + e.redirected + e.wqSuccess + e.wqAbort + e.callbacks + e.voicebox + e.unanswered + e.busy))))
        groupdata.map(e => dataStorage3.push(Math.round((e.direct + e.redirected + e.wqSuccess + e.callbacks) * 100 / (e.direct + e.redirected + e.wqSuccess + e.wqAbort + e.callbacks + e.voicebox + e.unanswered + e.busy))))
        this.state.barChartData = {
            labels: labels,
            datasets: [
                {
                    label: 'Q1',
                    backgroundColor: 'rgba(2, 117, 216, 1)',
                    borderColor: 'rgba(2, 117, 216, 1)',
                    pointRadius: false,
                    pointColor: 'rgba(2, 117, 216, 1)',
                    pointStrokeColor: '#c1c7d1',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: 'rgba(2, 117, 216, 1)',
                    data: dataStorage1
                },
                {
                    label: 'Q2',
                    backgroundColor: 'rgba(240, 173, 78, 0.9)',
                    borderColor: 'rgba(240, 173, 78, 0.8)',
                    pointRadius: false,
                    pointColor: '#3b8bba',
                    pointStrokeColor: 'rgba(240, 173, 78, 1)',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: 'rgba(240, 173, 78, 1)',
                    data: dataStorage2
                },
                {
                    label: 'Q3',
                    backgroundColor: 'rgba(210, 214, 222, 1)',
                    borderColor: 'rgba(210, 214, 222, 1)',
                    pointRadius: false,
                    pointColor: 'rgba(210, 214, 222, 1)',
                    pointStrokeColor: '#c1c7d1',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: 'rgba(220,220,220,1)',
                    data: dataStorage3
                }

            ]
        }

        return <Bar data={this.state.barChartData}
                    height={260}
                    options={options} id="canvas"/>;

    }

    getStackedOptions() {
        this.setState({monthChartOptions: this.state.stackedBarChartOptions});

    }

    getNonStackedOptions() {
        this.setState({monthChartOptions: this.state.barChartOptions});

    }


}