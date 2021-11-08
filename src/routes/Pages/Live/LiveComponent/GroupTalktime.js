
import React, {Component} from 'react';
import {Bar} from "react-chartjs-2";
import {getGroupTalktimeToday} from "../../../../util/APIUtils";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import {CardHeader} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
export default class GroupTalktime extends Component{

    constructor(props) {
        super(props);
        this.state = {data: null};
    }

    componentDidMount() {
        getGroupTalktimeToday().then(response => this.setState({data: response}));
    }

    render() {
        return(
            <Card className="card" style={{height: "100%"}}>
                <CardHeader className="card-header" title="Gesprächszeit: nach Gruppen [in Minuten]" action={
                    <button type="button" className="btn btn-tool" data-card-widget="remove" onClick={() => this.props.handleRemove("GroupTalktime")}><i
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

        let salesGraphChartData = {
            labels  : Object.keys(data),
            datasets: [
                {
                    label               : 'Gesprächszeit',
                    fill                : true,
                    borderWidth         : 0,
                    lineTension         : 0,
                    spanGaps : true,
                    borderColor         : '#0d6efd',
                    backgroundColor     : '#0d6efd',
                    data                : Object.values(data)
                }
            ]
        }

        let salesGraphChartOptions = {
            maintainAspectRatio: false,
            responsive: true,
            legend: {
                display: false
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
                 height={360}
                 options={salesGraphChartOptions}/>
        );
    }

}

