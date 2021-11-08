
import React, {Component} from 'react';
import {Bar} from "react-chartjs-2";
import {getAnalyticsToday, getGroupsAnalyticsLive} from "../../../../util/APIUtils";
import Grid from "@material-ui/core/Grid";
import {CardHeader} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
export default class GroupsAnalytics extends Component{

    constructor(props) {
        super(props);
        this.state = {data: null};
    }

    componentDidMount() {
        getGroupsAnalyticsLive().then(response => this.setState({data: response}))
        this.interval = setInterval (() =>  getGroupsAnalyticsLive().then(response => this.setState({data: response})), 3000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return(

            <Card className="card" style={{height: "100%"}}>
                <CardHeader className="card-header" title="Live: nach Gruppen" action={
                    <button type="button" className="btn btn-tool" data-card-widget="remove" onClick={() => this.props.handleRemove("Groups")}><i
                        className="fas fa-times"></i>
                    </button>
                }/>
                <CardContent style={{height: "90%"}}>
                    {(this.state.data != null) ?
                        this.getCard(this.state.data)
                        : (<div className="card" >Still loading...</div>)
                    }
                </CardContent>
            </Card>

        );
    }

    getCard(data){
        let labels = [];
        let q1 = [];
        let q2 = [];
        let q3 = [];
        let q4 = [];
        let q5 = [];
        let q6 = [];
        let q7 = [];
        data.map(e => labels.push(e.id))
        data.map(e => q1.push(e.direct + e.redirected + e.wqSuccess))
        data.map(e => q3.push(e.callbacksIncoming))
        data.map(e => q2.push(e.callbacksOutgoing))
        data.map(e => q4.push(e.voicebox))

        data.map(e => q5.push(e.busy))
        data.map(e => q6.push(e.unanswered))
        data.map(e => q7.push(e.wqAbort))

        let wekd = Math.round((q1[0] + q1[1] + q1[2] + q1[3] + q1[4] + q2[0] + q2[1] + q2[2] + q2[3] + q2[4] + q3[0] + q3[1] + q3[2] + q3[3] + q3[4]) / 5);
        let weke = Math.round((q1[5] + q1[6] + q2[5] + q2[6] + q3[5] + q3[6]) / 2);
        let wekg = Math.round((wekd * 5 + weke * 2) / 7);

        let salesGraphChartData = {
            labels  : labels,
            datasets: [
                {
                    label               : 'Erfolgreich',
                    fill                : true,
                    borderWidth         : 0,
                    lineTension         : 0,
                    spanGaps : true,
                    borderColor         : '45bd33',
                    backgroundColor     : '#45bd33',
                    data                : q1
                },
                {
                    label               : 'Zurückgerufen (ausgehend)',
                    fill                : true,
                    borderWidth         : 0,
                    lineTension         : 0,
                    spanGaps : true,
                    borderColor         : '#487a41',
                    backgroundColor         : '#487a41',
                    data                : q2
                },
                {
                    label               : 'Zurückgerufen (eingehend)',
                    fill                : true,
                    borderWidth         : 0,
                    lineTension         : 0,
                    spanGaps : true,
                    borderColor         : '#40573d',
                    backgroundColor     : '#40573d',
                    data                : q3
                },
                {
                    label               : 'Voicebox',
                    fill                : true,
                    borderWidth         : 2,
                    lineTension         : 0,
                    spanGaps : true,
                    borderColor         : '#41e5e8',
                    backgroundColor     : '#41e5e8',
                    data                : q4
                },
                {
                    label               : 'Besetzt',
                    fill                : true,
                    borderWidth         : 2,
                    lineTension         : 0,
                    spanGaps : true,
                    borderColor         : '#deab33',
                    backgroundColor     : '#deab33',
                    data                : q5
                },
                {
                    label               : 'Unbeantwortet',
                    fill                : true,
                    borderWidth         : 2,
                    lineTension         : 0,
                    spanGaps : true,
                    borderColor         : 'rgba(232,73,65,0.9)',
                    backgroundColor     : 'rgba(232,73,65,0.8)',
                    data                : q6
                },
                {
                    label               : 'WQ-Abbruch',
                    fill                : true,
                    borderWidth         : 2,
                    lineTension         : 0,
                    spanGaps : true,
                    borderColor         : 'rgba(143,44,39,0.9)',
                    backgroundColor     : 'rgba(143,44,39,0.8)',
                    data                : q7
                }
            ]
        }

        let salesGraphChartOptions = {
            maintainAspectRatio: false,
            responsive: true,
            legend: {
                display: true
            },
            scales: {
                xAxes: [{
                    stacked: true,
                    gridLines: {
                        display: false,
                    }
                }],
                yAxes: [{
                    stacked: true,

                    gridLines: {
                        display: false,
                    },
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
        return(
            <Bar data={salesGraphChartData}
                 options={salesGraphChartOptions}/>
        );
    }

}

