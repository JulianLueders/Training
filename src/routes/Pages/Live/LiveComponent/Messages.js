import React, {Component} from "react";
import {getAnalyticsToday, getLiveMessages} from "../../../../util/APIUtils";
import {CardContent, CardHeader} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";

export default class Messages extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    componentDidMount() {
        getLiveMessages().then(response => this.setState({messages: response}))
        this.interval3 = setInterval(() => this.turnCube(), 5000);
    }
    componentWillUnmount() {
        clearInterval(this.interval3);

    }
    i = 1;
    classes = [];
    currentClass = '';
    turnCube(){
        if(this.classes.length > 1) {
            let box = document.querySelector('.cube');
            let showClass = 'show-' + this.classes[this.i];
            if (this.currentClass) {
                box.classList.remove(this.currentClass);
            }
            console.log(showClass)
            box.classList.add(showClass);
            this.currentClass = showClass;
            this.i++;
            if (this.i == this.classes.length) {
                this.i = 0;
            }
        }
    }
    render(){
        return (
            <Card className="card" style={{height: "100%"}}>
                <CardContent className="card-body" style={{height: "100%"}}>
                    <div className="wrap">
                        {this.state.messages != null ? this.getNewsBoard(this.state.messages) : (<div> Loading... </div>)}
                    </div>
                </CardContent>
            </Card>);
    }

    getNewsBoard(msg){
        let sides = [];
        for(let i = 0; i < msg.length; i++){
            if(i == 0){
                sides[i] = <div className="cube__face front">{msg[i].message}</div>
                this.classes.push('front')
            }else if(i == 1){
                sides[i] = <div className="cube__face bottom">{msg[i].message}</div>
                this.classes.push('top')
            }else if(i == 2){
                sides[i] = <div className="cube__face back">{msg[i].message}</div>
                this.classes.push('back')
            }else if(i == 3){
                sides[i] = <div className="cube__face top">{msg[i].message}</div>
                this.classes.push('bottom')
            }
        }
        return (<div className="cube show-front">
            {sides}
        </div>)
    }
}