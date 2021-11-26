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
import CustomizedTables from "./table";

const breadcrumbs = [{ label: 'Home', link: '/' }];

export default class MailAnalytics extends Component {
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
        this.setState({ data: [{
            id: "JAN 2021",
            success: 14,
            fail: 5

        },{
            id: "FEB 2021",
            success: 20,
            fail: 7

        },{
            id: "MAR 2021",
            success: 34,
            fail: 15

        },{
            id: "APR 2021",
            success: 14,
            fail: 14

        },{
            id: "MAY 2021",
            success: 35,
            fail: 15

        }]});
    }

    render() {


        this.state.donutOptions = {
            maintainAspectRatio: false,
            responsive: true,
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




        return (
            <PageContainer heading="Mail: WQ" breadcrumbs={breadcrumbs}>
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
                            <CardHeader title ="Erreichbarkeit: Aktueller Monat"/>
                            <CardContent className="card-body">
                                {(this.state.data != null) ?
                                    this.getDonutChart(this.state.data)
                                    : (<div>Still loading...</div>)
                                }
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12}>
                        <Card>
                            <CardContent className="card-body">
                                <CustomizedTables></CustomizedTables>
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
        data.map(e => dataStorage1.push(e.success))
        data.map(e => dataStorage2.push(e.success + e.fail))


        this.state.areaChartData = {
            labels: labels,
            datasets: [
                {
                    label: 'Bearbeitet',
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
                    label: 'Unbearbeitet',
                    backgroundColor: 'rgba(210, 214, 222, 1)',
                    borderColor: 'rgba(210, 214, 222, 1)',
                    pointRadius: false,
                    pointColor: 'rgba(210, 214, 222, 1)',
                    pointStrokeColor: '#c1c7d1',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: 'rgba(155, 188, 200, 1)',
                    data: dataStorage2
                }
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
                'Bearbeitet',
                'Unbearbeitet'
            ],
            datasets: [
                {
                    data: [dataStorage1.success, dataStorage1.fail],
                    backgroundColor: ['#00a65a', '#d9534f'],
                }
            ]
        }

        return <Doughnut data={this.state.donutData}
                         height={260}
                         options={this.state.donutOptions}/> ;
    }


    datediff(first, second) {
        // Take the difference between the dates and divide by milliseconds per day.
        // Round to nearest whole number to deal with DST.
        return Math.round((second-first)/(1000*60*60*24));
    }


}