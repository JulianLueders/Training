import React, {Component} from "react";
import Grid from "@material-ui/core/Grid";
import {CardHeader} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import GridContainer from "../../../../@jumbo/components/GridContainer";
import {getConfigValue} from "../../../../util/APIUtils";

export default class Weather extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        getConfigValue("weather").then(response => this.setState({news: response.value}))
        this.setState({})

    }

    render(){
        return (
            <Card className="card" style={{height: "100%"}}>
                <CardHeader title="Wetter" action={
                    <button type="button" className="btn btn-tool" data-card-widget="remove" onClick={() => this.props.handleRemove("Weather")}><i
                        className="fas fa-times"></i>
                    </button>
                }/>
                {this.state.news != null ? (<CardContent className="card-body">
                    <iframe
                        src={this.state.news}
                        frameBorder="0" scrolling="NO" allowTransparency="true"
                        sandbox="allow-same-origin allow-scripts allow-popups allow-popups-to-escape-sandbox"
                        style={{width: '95%', height: "100%"}}></iframe>
                    <div><a
                        href="https://www.meteoblue.com/de/wetter/woche/frankfurt-am-main_deutschland_2925533?utm_source=weather_widget&utm_medium=linkus&utm_content=three&utm_campaign=Weather%2BWidget"
                        target="_blank">meteoblue</a></div>
                </CardContent>)  : (<div>Loading...</div>)}
            </Card>);
    }
}