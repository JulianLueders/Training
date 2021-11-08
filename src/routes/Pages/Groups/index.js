
import React, {Component} from 'react';
import {groupsLastYear, testUrl5} from "../../../util/APIUtils";
import {Link} from "react-router-dom";
import {Line, Pie} from "react-chartjs-2";
import PageContainer from "../../../@jumbo/components/PageComponents/layouts/PageContainer";
import GridContainer from "../../../@jumbo/components/GridContainer";
import Grid from "@material-ui/core/Grid";
import {CardHeader} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
export default class Groups extends Component{


    constructor(props) {
        super(props);
        this.state = { groupdata: null, trenddata: null};
    }

    componentDidMount() {
        groupsLastYear().then(response => this.setState({groupdata: response}));
        testUrl5().then(response => this.setState({trenddata: response}));

        groupsLastYear().then(response => console.log(response));
        testUrl5().then(response => console.log(response));

    }

    render() {
        return(

            <PageContainer heading="Gruppenübersicht">

                {(this.state.groupdata != null && this.state.trenddata != null) ?
                    this.getCards(this.state.groupdata, this.state.trenddata)
                    : (<div className="card">Still loading...</div>)
                }

            </PageContainer>

        );
    }

    getCards(data, trenddata){
        let trend = Object.values(trenddata)
        let divs = [];
        for (var i = 0; i < data.length; i++) {
            let piedata = {
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
                        data: [data[i].direct, data[i].redirected, data[i].wqSuccess, data[i].callbacks, data[i].busy, data[i].unanswered, data[i].wqAbort],
                        backgroundColor: ['#00a65a', '#166e09', '#086d59', '#00c0ef', '#f39c12', '#d9534f', '#95230b'],
                    }
                ]
            }

            let pieOptions = {
                maintainAspectRatio: false,
                responsive: true,
                tooltips: {
                    callbacks: {
                        label: function(tooltipItem, data) {
                            var dataset = data.datasets[tooltipItem.datasetIndex];
                            var meta = dataset._meta[Object.keys(dataset._meta)[0]];
                            var total = meta.total;
                            var currentValue = dataset.data[tooltipItem.index];
                            var percentage = parseFloat((currentValue/total*100).toFixed(1));
                            return currentValue + ' (' + percentage + '%)';
                        },
                        title: function(tooltipItem, data) {
                            return data.labels[tooltipItem[0].index];
                        }
                    }
                },
            }

            let lineOptions = {
                maintainAspectRatio : false,
                responsive : true,
                legend: {
                    display: true,
                },
                scales: {
                    xAxes: [{
                        ticks : {
                        },
                        gridLines : {
                            display : false,
                            drawBorder: false,
                        }
                    }],
                    yAxes: [{
                        ticks : {
                            stepSize: 25,
                            beginAtZero: true,
                            max: 100,
                        },
                        gridLines : {
                            display : true,
                            drawBorder: false,
                        }
                    }]
                }
            }
            let sumAll = data[i].direct + data[i].redirected + data[i].wqSuccess + data[i].callbacks + data[i].busy + data[i].unanswered + data[i].wqAbort
            let data1 = [];
            let data2 = [];
            let data3 = [];
            let labels = [];
            trend[i].map(e => labels.push(e.id));
            trend[i].map(e => data1.push(e.direct + e.redirected + e.wqSuccess))
            trend[i].map(e => data2.push(e.direct + e.redirected + e.wqSuccess + e.callbacksOutgoing))
            trend[i].map(e => data3.push(e.direct + e.redirected + e.wqSuccess + e.callbacks))


            let linedata = {
                labels  : labels,
                datasets: [
                    {
                        label               : 'Q1',
                        fill                : false,
                        borderWidth         : 2,
                        lineTension         : 0,
                        spanGaps : true,
                        borderColor         : 'rgba(76,235,52,0.8)',
                        pointRadius         : 3,
                        pointHoverRadius    : 7,
                        pointColor          : 'rgba(76,235,52,0.8)',
                        pointBackgroundColor: 'rgba(76,235,52,0.8)',
                        data                : data1
                    },
                    {
                        label               : 'Q2',
                        fill                : false,
                        borderWidth         : 2,
                        lineTension         : 0,
                        spanGaps : true,
                        borderColor         : 'rgba(67,166,51,0.8)',
                        pointRadius         : 3,
                        pointHoverRadius    : 7,
                        pointColor          : 'rgba(67,166,51,0.8)',
                        pointBackgroundColor: 'rgba(67,166,51,0.8)',
                        data                : data2
                    },
                    {
                        label               : 'Q3',
                        fill                : false,
                        borderWidth         : 2,
                        lineTension         : 0,
                        spanGaps : true,
                        borderColor         : 'rgba(61,99,55,0.9)',
                        pointRadius         : 3,
                        pointHoverRadius    : 7,
                        pointColor          : 'rgba(61,99,55,0.9)',
                        pointBackgroundColor: 'rgba(61,99,55,0.9)',
                        data                : data3
                    }
                ]
            }
            let s = <Line data={linedata}
                          height={250}
                          options={lineOptions}/>;
            if(trend[i].length < 3){
                s = <h6 style={{textAlign: 'center'}}><br/><br/><br/><br/><br/>Zu wenige Daten.<br/><br/><br/><br/><br/><br/><br/></h6>
            }
            divs.push (
                <GridContainer key={data[i].id}>
                    <Grid item xs={6}>
                        <Card className="card">
                            <CardHeader style={{backgroundColor: '#5bc0de'}} titleTypographyProps={{variant:'h4' }} title={"Übersicht: " +data[i].id+ " ("+sumAll+" Anrufe)"}/>
                            <CardContent className="card-body">
                                <Pie data={piedata}
                                     height={250}
                                     options={pieOptions}/>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={6}>
                        <Card>
                            <CardHeader style={{backgroundColor: '#5cb85c'}} titleTypographyProps={{variant:'h4' }} title={"Verlauf: " +data[i].id}/>
                            <CardContent className="card-body">
                                {s}
                            </CardContent>
                        </Card>
                    </Grid>
                </GridContainer>
            );
        }
        return divs;
    }
}

