import React, {Component} from "react";
import News from "./News";
import HeadData from "./HeadData";
import Messages from "./Messages";
import Distribution from "./Distribution";
import WQLive from "./WQLive";
import WQPrognosis from "./WQPrognosis";
import LineAnalytics from "./LineAnalytics";
import LineTalktime from "./LineTalktime";
import Groups from "./Groups";
import GroupsAnalytics from "./Groups";
import GroupTalktime from "./GroupTalktime";
import Weather from "./Weather";

export default class LiveComponent extends Component {

    constructor(props) {
        super(props);
    }
    component = (<div/>)

    render(){
        if(this.props.name == "News"){
            this.component = (<News handleRemove={this.props.handleRemove}/>)
        }else if(this.props.name == "HeadData"){
            this.component = (<HeadData/>)
        }else if(this.props.name == "Messages"){
            this.component = (<Messages/>)
        }else if(this.props.name == "WQLive"){
            this.component = (<WQLive handleRemove={this.props.handleRemove}/>)
        }else if(this.props.name == "WQPrognosis"){
            this.component = (<WQPrognosis handleRemove={this.props.handleRemove}/>)
        }else if(this.props.name == "Distribution"){
            this.component = (<Distribution handleRemove={this.props.handleRemove}/>)
        }else if(this.props.name == "Lines"){
            this.component = (<LineAnalytics handleRemove={this.props.handleRemove}/>)
        }else if(this.props.name == "LineTalktime"){
            this.component = (<LineTalktime handleRemove={this.props.handleRemove}/>)
        }else if(this.props.name == "Groups"){
            this.component = (<GroupsAnalytics handleRemove={this.props.handleRemove}/>)
        }else if(this.props.name == "GroupTalktime"){
            this.component = (<GroupTalktime handleRemove={this.props.handleRemove}/>)
        }else if(this.props.name == "Weather"){
            this.component = (<Weather handleRemove={this.props.handleRemove}/>)
        }

        return (this.component);
    }
}