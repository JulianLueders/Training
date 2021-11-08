import React from "react";
import {getAnalyticsToday, getHeadData} from "../../../../util/APIUtils";
import Grid from "@material-ui/core/Grid";
import GridContainer from "../../../../@jumbo/components/GridContainer";

export default class HeadData extends React.Component{
    constructor(props) {
        super(props);
        this.state = {}
    }
    componentDidMount() {
        this.setState({ pieData: getAnalyticsToday(this.props.groupId).then(response => this.setPieData(response)), time: Date.now()})
        this.interval2 = setInterval (() => getAnalyticsToday(this.props.groupId).then(response => this.setPieData(response)), 30000)
        this.setState({ pieData: getHeadData(this.props.groupId).then(response => this.setHeadData(response)), time: Date.now()})
        this.interval3 = setInterval (() => getHeadData(this.props.groupId).then(response => this.setHeadData(response)), 30000)
        console.log("PROPS: "+this.props)
        console.log(this.props)
    }
    setPieData(response){
        this.setState({sumSuccess: response.direct + response.redirected + response.wqSuccess + response.callbackIncoming + response.callbackOutgoing, sumUnsuccess: response.busy + response.unanswered + response.wqAbort})
    }
    setHeadData(response){
        this.setState({avg_duration: response.avg_duration, avg_wqAbort: response.avg_wqAbort, avg_wqSuccess: response.avg_wqSuccess, longest_wait: response.longest_wait, wqQuote: response.wqQuote})
    }
    componentWillUnmount() {
        clearInterval(this.interval2);
        clearInterval(this.interval3);

    }

    render(){
        return(
                    <GridContainer >
                        <Grid item xs={2}>
                            <div className="small-box bg-success">
                                <div className="inner">
                                    <h3 style={{color: '#FFF'}}>{this.state.sumSuccess}</h3>

                                    <p>Erfolgreiche Anrufe</p>
                                </div>
                                <div className="icon">
                                    <i className="ion ion-stats-bars"></i>
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={2}>
                            <div className="small-box bg-danger">
                                <div className="inner">
                                    <h3 style={{color: '#FFF'}}>{this.state.sumUnsuccess}</h3>

                                    <p>Erfolgslose Anrufe</p>
                                </div>
                                <div className="icon">
                                    <i className="ion ion-sad"></i>
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={2}>
                            <div className="small-box bg-info">
                                <div className="inner">
                                    <h3 style={{color: '#FFF'}}>{this.state.avg_duration}</h3>

                                    <p>Ø Gesprächsdauer</p>
                                </div>
                                <div className="icon">
                                    <i className="ion ion-android-call"></i>
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={2}>
                            <div className="small-box bg-warning">
                                <div className="inner">
                                    <h3>{this.state.avg_wqSuccess}</h3>

                                    <p>Ø Wartezeit</p>
                                </div>
                                <div className="icon">
                                    <i className="ion ion-ios-people"></i>
                                </div>

                            </div>
                        </Grid>
                        <Grid item xs={2}>
                            <div className="small-box bg-gray-light">
                                <div className="inner">
                                    <h3 style={{color: '#000'}}>{this.state.longest_wait}</h3>

                                    <p>Längste Wartezeit</p>
                                </div>
                                <div className="icon">
                                    <i className="ion ion-ios-timer"></i>
                                </div>

                            </div>
                        </Grid>
                        <Grid item xs={2}>
                            <div className="small-box bg-primary">
                                <div className="inner">
                                    <h3 style={{color: '#FFF'}}>{this.state.wqQuote} %</h3>

                                    <p>Wartefeld Quote</p>
                                </div>
                                <div className="icon">
                                    <i className="ion ion-pie-graph"></i>
                                </div>
                            </div>
                        </Grid>
                    </GridContainer>
        )}
}