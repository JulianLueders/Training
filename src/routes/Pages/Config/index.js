
import React, {Component} from 'react';
import {
    addMessage,
    deleteMessage,
    getConfigValue,
    getLiveMessages, getUserGroups,
    setAnalyticsMonthOrDay,
    setAnalyticsTime
} from "../../../util/APIUtils";
import Switch from "react-switch";
import PageContainer from "../../../@jumbo/components/PageComponents/layouts/PageContainer";
import GridContainer from "../../../@jumbo/components/GridContainer";
import {Box, CardContent} from "@material-ui/core";
import CardHeader from "@material-ui/core/CardHeader";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import NewUser from "./NewUser";
import WeatherNewsConfig from "./WeatherNewsConfig";


export default class Config extends Component{
    componentDidMount() {

        var form = document.getElementById("messageForm");
        function handleForm(event) {
            event.preventDefault();
            let message = document.getElementById("deleteMessage");
            console.log(message.value)
            deleteMessage(message.value)
            message.value = null;
        }
        form.addEventListener('submit', handleForm);
        var form2 = document.getElementById("messageAddForm");
        function handleForm2(event) {
            event.preventDefault();
            let message = document.getElementById("addMessageField");
            if (message.value != null && message.value != "") {
                console.log(message.value)
                addMessage(message.value)
                message.value = null;
            }
        }
        form2.addEventListener('submit', handleForm2);

        var form3 = document.getElementById("analyticsTimeForm");
        function handleForm3(event){
            event.preventDefault();
            let time = document.getElementById("timeField");
            if (time.value != null && time.value != "") {
                setAnalyticsTime(time.value)
                time.value = null;
            }
        }
        form3.addEventListener('submit', handleForm3)
        getLiveMessages().then(response => this.handleLiveMsg(response));
        getConfigValue('month').then(response => console.log(response));

        getConfigValue('month').then(response => this.setState({config: (response.value == 'false' ? false : true)}));
        getUserGroups().then(response => this.setState({groups: this.setOptions(response)}));
    }

    constructor(props) {
        super(props);
        this.state = {liveMessages: null, config: null};
        this.handleChangeMonth = this.handleChangeMonth.bind(this);

    }

    setOptions(data){
        let rows = [];
        data.map(e => rows.push(<MenuItem value={e.id}>{e.group_name}</MenuItem>))
        return rows;
    }

    handleChangeMonth(checked) {
        this.setState({ config: checked });
        setAnalyticsMonthOrDay(checked);
    }

    componentWillUnmount() {
    }

    handleLiveMsg(data){
        let opts = [];
        console.log(data)
        let messageField = document.getElementById("deleteMessage");
        for(let i = 0; i < data.length; i++){
            let option = document.createElement("option");
            option.value = data[i].message
            option.text = data[i].message
            messageField.add(option)
        }
    }

    render() {
        return(
            <PageContainer heading="Konfiguration">

                <GridContainer>
                    <Grid item xs={12}>
                        <Card>
                            <CardHeader className="card-header" title="Auswertungen"/>
                            <CardContent className="card-body">
                                <form role="form" id="analyticsTimeForm">

                                    <div className="form-group">
                                        <label>Auswertungszeitraum</label>
                                        <input type="number" className="form-control" id="timeField"
                                               placeholder="365"/>
                                        <br/>
                                        <Button type="submit" variant="contained" color="primary">Bestätigen</Button>
                                        <br/>
                                    </div>
                                    <div>
                                        <label>In Monaten</label>     <br/>
                                        {this.state.config != null ? (<Switch onChange={this.handleChangeMonth} checked={this.state.config} />) : (null)}
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12}>
                        <Card>
                            <CardHeader className="card-header" title="Auswertungen"/>
                            <CardContent className="card-body">
                                <form role="form" id="messageAddForm">

                                    <div className="form-group">
                                        <label>Live-Nachricht hinzufügen</label>
                                        <input type="text" className="form-control" id="addMessageField"
                                               placeholder="Live-Nachricht eingeben"/>
                                    </div>
                                    <Button type="submit" variant="contained" color="primary">Hinzufügen</Button>
                                </form>
                                <br/>
                                <form role="form" id="messageForm">

                                        <div className="form-group">
                                            <label>Live-Nachricht Löschen</label>
                                            <select id="deleteMessage" className="form-control select2bs4" style={{width: '100%'}}>
                                            </select>
                                        </div>
                                        <Button type="submit" variant="contained" color="primary">Löschen</Button>
                                </form>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12}>
                        <WeatherNewsConfig/>
                    </Grid>
                    <Grid item xs={12}>
                        {this.state.groups != null ? <NewUser groups={this.state.groups}/> : <div>Loading...</div>}
                    </Grid>
                </GridContainer>
            </PageContainer>
        );
    }
}

