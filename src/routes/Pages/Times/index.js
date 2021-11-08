
import React, {Component} from 'react';
import { hourly, weekday} from "../../../util/APIUtils";
import {Link} from "react-router-dom";
import {Bar} from "react-chartjs-2";
import { Donut } from 'react-dial-knob'
import PageContainer from "../../../@jumbo/components/PageComponents/layouts/PageContainer";
import GridContainer from "../../../@jumbo/components/GridContainer";
import Grid from "@material-ui/core/Grid";
import {CardHeader} from "@material-ui/core";
import CmtCard from "../../../@coremat/CmtCard";
import CmtCardHeader from "../../../@coremat/CmtCard/CmtCardHeader";
import CmtCardFooter from "../../../@coremat/CmtCard/CmtCardFooter";
import CmtCardExpendableContent from "../../../@coremat/CmtCardExpendableContent";
import CmtCardContent from "../../../@coremat/CmtCard/CmtCardContent";

const breadcrumbs = [{ label: 'Home', link: '/' }];

export default class Times extends Component{

    constructor(props) {
        super(props);
        this.state = { weekdaydata: null, hourlydata: null};
    }

    componentDidMount() {
        weekday().then(response => this.setState({weekdaydata: response}));
        hourly().then(response => this.setState({hourlydata: response}));
    }

    render() {
        return(

            <PageContainer heading="Projektionen" breadcrumbs={breadcrumbs}>
                <GridContainer>

                    <Grid item xs={12}>
                        {(this.state.weekdaydata != null) ? this.getCard(this.state.weekdaydata) : (<div className="card">Still loading...</div>)}
                    </Grid>
                    <Grid item xs={12}>
                        {(this.state.hourlydata != null) ? this.getCardHourly(this.state.hourlydata) : (<div className="card">Still loading...</div>)}
                    </Grid>
                </GridContainer>
            </PageContainer>

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
                    label               : 'Q1',
                    fill                : true,
                    borderWidth         : 2,
                    lineTension         : 0,
                    spanGaps : true,
                    borderColor         : 'rgba(76,235,52,0.9)',
                    backgroundColor     : 'rgba(76,235,52,0.8)',
                    data                : q1
                },
                {
                    label               : 'Q2',
                    fill                : true,
                    borderWidth         : 2,
                    lineTension         : 0,
                    spanGaps : true,
                    borderColor         : 'rgba(67,166,51,0.9)',
                    backgroundColor         : 'rgba(67,166,51,0.8)',
                    data                : q2
                },
                {
                    label               : 'Q3',
                    fill                : true,
                    borderWidth         : 2,
                    lineTension         : 0,
                    spanGaps : true,
                    borderColor         : 'rgba(61,99,55,0.9)',
                    backgroundColor     : 'rgba(61,99,55,0.8)',
                    data                : q3
                },
                {
                    label               : 'Voicebox',
                    fill                : true,
                    borderWidth         : 2,
                    lineTension         : 0,
                    spanGaps : true,
                    borderColor         : 'rgba(65,229,232,0.9)',
                    backgroundColor     : 'rgba(65,229,232,0.8)',
                    data                : q4
                },
                {
                    label               : 'Besetzt',
                    fill                : true,
                    borderWidth         : 2,
                    lineTension         : 0,
                    spanGaps : true,
                    borderColor         : 'rgba(222,171,51,0.9)',
                    backgroundColor     : 'rgba(222,171,51,0.8)',
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
            <CmtCard>
                <CmtCardHeader title="Übersicht: Wochentage" />
                <CmtCardContent>
                    <Bar data={salesGraphChartData}
                         height={360}
                         options={salesGraphChartOptions}/>
                </CmtCardContent>
                <CmtCardFooter className="card-footer">
                    <GridContainer>
                        <Grid item xs={4} align="center">
                            <Donut  style={{align: "center"}}
                                    diameter={100}
                                    min={0}
                                    max={100}
                                    step={1}
                                    value={wekd}
                                    theme={{
                                        donutColor: '#39CCCC',
                                        donutThickness: '20'
                                    }}
                                    ariaLabelledBy={'my-label'}/>

                            <label className="text-info" id={'my-label'}>Wochentage</label>
                        </Grid>
                        <Grid item xs={4} align="center">
                            <Donut  diameter={100}
                                    style={{align: "center"}}
                                    min={0}
                                    max={100}
                                    step={1}
                                    value={weke}
                                    theme={{
                                        donutColor: '#39CCCC',
                                        donutThickness: '20'
                                    }}
                                    ariaLabelledBy={'my-label'}/>

                            <label className="text-info" id={'my-label'}>Wochenende</label>
                        </Grid>
                        <Grid item xs={4} align="center">
                            <Donut  diameter={100}
                                    style={{align: "center"}}
                                    min={0}
                                    max={100}
                                    step={1}
                                    value={wekg}
                                    theme={{
                                        donutColor: '#39CCCC',
                                        donutThickness: '20'
                                    }}
                                    ariaLabelledBy={'my-label'}/>

                            <label className="text-info" id={'my-label'}>Gesamt</label>
                        </Grid>
                    </GridContainer>
                </CmtCardFooter>
            </CmtCard>
        );
    }

    getCardHourly(data){
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
        let salesGraphChartData = {
            labels  : labels,
            datasets: [
                {
                    label               : 'Q1',
                    fill                : true,
                    borderWidth         : 2,
                    lineTension         : 0,
                    spanGaps : true,
                    borderColor         : 'rgba(76,235,52,0.9)',
                    backgroundColor     : 'rgba(76,235,52,0.8)',
                    data                : q1
                },
                {
                    label               : 'Q2',
                    fill                : true,
                    borderWidth         : 2,
                    lineTension         : 0,
                    spanGaps : true,
                    borderColor         : 'rgba(67,166,51,0.9)',
                    backgroundColor         : 'rgba(67,166,51,0.8)',
                    data                : q2
                },
                {
                    label               : 'Q3',
                    fill                : true,
                    borderWidth         : 2,
                    lineTension         : 0,
                    spanGaps : true,
                    borderColor         : 'rgba(61,99,55,0.9)',
                    backgroundColor     : 'rgba(61,99,55,0.8)',
                    data                : q3
                },
                {
                    label               : 'Voicebox',
                    fill                : true,
                    borderWidth         : 2,
                    lineTension         : 0,
                    spanGaps : true,
                    borderColor         : 'rgba(65,229,232,0.9)',
                    backgroundColor     : 'rgba(65,229,232,0.8)',
                    data                : q4
                },
                {
                    label               : 'Besetzt',
                    fill                : true,
                    borderWidth         : 2,
                    lineTension         : 0,
                    spanGaps : true,
                    borderColor         : 'rgba(222,171,51,0.9)',
                    backgroundColor     : 'rgba(222,171,51,0.8)',
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
            <CmtCard>
                <CmtCardHeader title="Übersicht: Stunden"/>
                <CmtCardContent className="card-body">
                    <Bar data={salesGraphChartData}
                         height={360}
                         options={salesGraphChartOptions}/>
                </CmtCardContent>
            </CmtCard>
        );
    }
}

