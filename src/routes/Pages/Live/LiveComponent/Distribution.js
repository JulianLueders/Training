import React, {Component} from "react";
import News from "./News";
import {getAnalyticsToday} from "../../../../util/APIUtils";
import {Doughnut} from "react-chartjs-2";
import * as FaIcons from "react-icons/fa";
import {CardHeader} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import GridContainer from "../../../../@jumbo/components/GridContainer";
import Grid from "@material-ui/core/Grid";
import {Cancel} from "@material-ui/icons";
import Card from "@material-ui/core/Card";

export default class Distribution extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }
    componentDidMount() {
        this.setState({ pieData: getAnalyticsToday(this.props.groupId).then(response => this.setPieData(response)), time: Date.now()})
        console.log("PIE")
        this.interval = setInterval (() => this.setState({ pieData: getAnalyticsToday(this.props.groupId).then(response => this.setPieData(response))}), 30000)
    }

    setPieData(response){
        this.setState({pieData: {
                labels: [
                    'Direkt angenommen',
                    'Umgeleitet/Gepickt',
                    'Wartefeld erfolgreich',
                    'Zurückgerufen',
                    'Voicebox',
                    'Besetzt',
                    'Unbeantwortet',
                    'Wartefeld-Abbruch'
                ],
                datasets: [
                    {
                        data: [response.direct, response.redirected, response.wqSuccess, response.callbackIncoming + response.callbackOutgoing, response.voicebox, response.busy, response.unanswered, response.wqAbort],
                        backgroundColor: ['#45bd33','#429136','#487a41','#40573d','#41e5e8','#deab33','#e84941','#8f2c27'],
                    }
                ]
            }, sumSuccess: response.direct + response.redirected + response.wqSuccess + response.callbackIncoming + response.callbackOutgoing, sumUnsuccess: response.busy + response.unanswered + response.wqAbort})
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }
    pieOptions     = {
        maintainAspectRatio: false,
        responsive: true,
        legend: {
            display: false
        }
    }


    render(){
        console.log(window.location.href)
        return (

            <Card className="card" style={{height: "100%"}}>
                <CardHeader className="card-header" title="Verteilung: Live" action={
                    <button type="button" className="btn btn-tool" data-card-widget="remove" onClick={() => this.props.handleRemove("Distribution")}><i
                        className="fas fa-times"></i>
                    </button>
                }/>
                <CardContent className="card-body" style={{height: "100%"}}>
                    <GridContainer style={{height: "100%"}}>
                        <Grid item xs={7} style={{height: "100%"}}>
                            <Doughnut data={this.state.pieData} options={this.pieOptions} />
                        </Grid>
                        <Grid item xs={5} style={{height: "100%"}}>
                            <ul className="chart-legend clearfix">
                                <li><FaIcons.FaDotCircle style={{color: '#45bd33'}}/> Direkt</li>
                                <li><FaIcons.FaDotCircle style={{color: '#42a633'}}/> Umgeleitet</li>
                                <li><FaIcons.FaDotCircle style={{color: '#487a41'}}/> Wartefeld</li>
                                <li><FaIcons.FaDotCircle style={{color: '#40573d'}}/> Zurückgerufen</li>
                                <li><FaIcons.FaDotCircle style={{color: '#41e5e8'}}/> VoiceBox</li>
                                <li><FaIcons.FaDotCircle style={{color: '#deab33'}}/> Besetzt</li>
                                <li><FaIcons.FaDotCircle style={{color: '#e84941'}}/> Unbeantwortet</li>
                                <li><FaIcons.FaDotCircle style={{color: '#8f2c27'}}/> Wartefeld-Abbruch</li>
                            </ul>
                        </Grid>
                    </GridContainer>
                </CardContent>
            </Card>
        );
    }
    /*render(){
       return (<div className="card" style={{height:"100%"}}>
            <div className="card-header">
                <h3 className="card-title">Verteilung: Live</h3>

                <div className="card-tools">
                    <button type="button" className="btn btn-tool" data-card-widget="collapse"><i
                        className="fas fa-minus"></i>
                    </button>
                    <button type="button" className="btn btn-tool" data-card-widget="remove"><i
                        className="fas fa-times"></i>
                    </button>
                </div>
            </div>
           <div className="card-body">
               Heyo
             </div>
        </div>)*/

}