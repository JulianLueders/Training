import React, {Component, useState} from "react";
import {Line} from "react-chartjs-2";
import {getAnalyticsToday, getWQFuture, getWQRecent} from "../../../../util/APIUtils";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import {CardHeader} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";

export default class WQPrognosis extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }
    componentDidMount() {
        this.setState({liveData: getWQRecent(this.props.groupId).then(response => this.setLiveData(response))})
        this.interval = setInterval(() => this.setState({ time: Date.now(), livedata: getWQRecent(this.props.groupId).then(response => this.setLiveData(response))}), 30000);
    }
    setLiveData(response){
        let data = []
        let labels = []
        response.map(e => labels.push(e.label))
        response.map(e => data.push(e.data))
        getWQFuture(this.props.groupId).then(res => this.setLiveData2(res, data, labels))

    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }
    lineOptions = {
        maintainAspectRatio : false,
        responsive : true,
        animation: {
            duration: 0
        },
        legend: {
            display: false,
        },
        scales: {
            xAxes: [{
                ticks:{
                    stepSize: 3,
                    display: true,
                    autoSkip: true,
                    maxTicksLimit: 20,
                    maxRotation: 0,
                    minRotation: 0,
                },
                gridLines : {
                    display : false,
                    drawBorder: false,
                }
            }],
            yAxes: [{
                ticks : {
                    stepSize: 1,
                    beginAtZero: true,
                    suggestedMax: 8
                },
                gridLines : {
                    display : true,
                    drawBorder: false,
                }
            }]

        },
        annotation: {
            annotations: [
                {
                    type: "line",
                    mode: "vertical",
                    scaleID: "x-axis-0",
                    value: 120,
                    borderColor: "red",
                    label: {
                        content: "Aktuell",
                        enabled: true,
                        position: "center",
                        yAdjust: -28,
                        backgroundColor: 'rgba(52, 58, 64, 0.7)',
                    }
                }
            ]
        }
    }
    setLiveData2(response, data1, labels){
        let data = []
        for(let i = 0; i < data1.length-1; i++){
            data.push(0);
        }
        data.push(data1[data1.length-1])
        response.map(e => labels.push(e.label))
        response.map(e => data.push(e.data))
        this.setState({liveData: {
                labels  : labels,
                datasets: [
                    {
                        label               : 'Wartefeld aktuell',
                        fill                : true,
                        borderWidth         : 1,
                        lineTension         : 0,
                        spanGaps : true,
                        borderColor         : '#0275d8',
                        pointRadius         : 1,
                        pointHoverRadius    : 5,
                        pointColor          : '#0275d8',
                        pointBackgroundColor: '#0275d8',
                        data                : data1
                    },
                    {
                        label               : 'Wartefeld Progonose',
                        fill                : true,
                        borderWidth         : 1,
                        lineTension         : 0,
                        spanGaps : true,
                        borderColor         : 'rgb(91, 192, 222, 0.8)',
                        pointRadius         : 1,
                        pointHoverRadius    : 5,
                        pointColor          : 'rgb(91, 192, 222, 0.9)',
                        pointBackgroundColor: 'rgb(91, 192, 222, 0.9)',
                        data                : data
                    }
                ]
            }})
    }

    render(){
        return (
            <Card className="card" id="wqp" style={{height: "100%"}}>
                <CardHeader title ="Wartefeld Live mit Prognose" action={
                    <button type="button" className="btn btn-tool" data-card-widget="remove" onClick={() => this.props.handleRemove("WQPrognosis")}><i
                        className="fas fa-times"></i>
                    </button>
                }/>
                <CardContent className="card-body" style={{height: "90%"}}>
                    <Line options={this.lineOptions} data={this.state.liveData}/>
                </CardContent>
            </Card>

        );
    }
}