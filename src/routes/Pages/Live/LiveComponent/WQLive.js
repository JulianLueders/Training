import React, {Component} from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import {CardHeader} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import {getWQRecent} from "../../../../util/APIUtils";
import {qbarRestAPI} from "../../../../util/RomicoAPIUtils";

export default class WQLive extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }
    componentDidMount() {
        this.setState({liveData: qbarRestAPI().then(response => this.setLiveData(response))})
        this.setState({liveData: qbarRestAPI().then(response => console.log(response))})
        this.interval = setInterval(() => this.setState({ time: Date.now(), livedata: qbarRestAPI().then(response => this.setLiveData(response))}), 30000);
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }
    render(){
        return (<Grid item xs={12}>
            <Card className="card" style={{height: "100%"}}>
                <CardHeader title="Wartefeld: Live" action={
                    <button type="button" className="btn btn-tool" data-card-widget="remove" onClick={() => this.props.handleRemove("WQLive")}><i
                        className="fas fa-times"></i>
                    </button>
                }/>
                <CardContent></CardContent>
            </Card>
        </Grid>);
    }
}