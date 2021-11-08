import React, {Component} from "react";
import Grid from "@material-ui/core/Grid";
import {CardHeader} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import GridContainer from "../../../../@jumbo/components/GridContainer";
import {getConfigValue} from "../../../../util/APIUtils";

export default class News extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        getConfigValue("news").then(response => this.setState({news: response.value}))
    }

    render(){
        return (
            <Card className="card" style={{height: "100%"}}>
                <CardHeader title="Live-Nachrichten" action={
                    <button type="button" className="btn btn-tool" data-card-widget="remove" onClick={() => this.props.handleRemove("News")}><i
                        className="fas fa-times"></i>
                    </button>
                }/>
                {this.state.news != null ? (<CardContent className="card-body">
                    <iframe  style={{height: '100%', width: '95%', position: 'relative', align: 'center'}}
                             src={this.state.news}frameBorder="0"
                             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                             allowFullScreen></iframe>
                </CardContent>)  : (<div>Loading...</div>)}
            </Card>);
    }
}