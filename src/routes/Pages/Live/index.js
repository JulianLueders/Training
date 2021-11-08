import React, {Component} from 'react';
import {
    addWallboardConfig,
    getAnalyticsToday,
    getLiveMessages,
    getWallboard, getWallboardConfig,
    getWQFuture,
    getWQRecent,
    setWallboardConfig, setWallboardConfig2,
    testUrl6
} from "../../../util/APIUtils";
import LiveComponent from "./LiveComponent";
import PageContainer from "../../../@jumbo/components/PageComponents/layouts/PageContainer";
import GridContainer from "../../../@jumbo/components/GridContainer";
import 'chartjs-plugin-annotation';
import { Responsive, WidthProvider } from "react-grid-layout";
import Card from "@material-ui/core/Card";
import {Box, Button} from "@material-ui/core";
import FormDialog from "./Common/FormDialog";
import {sweetAlerts} from "../../../util/swals";
const ResponsiveGridLayout = WidthProvider(Responsive);
let layer = {};
let ll = {lg: [{
        i: "Messages",
        h: 6,
        w: 12,
        y: 0,
        x: 0
},
    {
        i: "HeadData",
        h: 6,
        w: 12,
        y: 7,
        x: 0
    },
    {
        i: "News",
        h: 33,
        w: 8,
        y: 88,
        x: 0
    },
    {
        i: "Weather",
        h: 33,
        w: 4,
        y: 88,
        x: 8
    },
    {
        i: "WQPrognosis",
        h: 21,
        w: 12,
        y: 13,
        x: 0
    },
    {
        i: "Groups",
        h: 27,
        w: 8,
        y: 34,
        x: 0
    },
    {
        i: "GroupTalktime",
        h: 27,
        w: 12,
        y: 61,
        x: 0
    },
    {
        i: "Distribution",
        h: 27,
        w: 4,
        y: 34,
        x: 8
    }
]}
export default class Live extends Component{
    componentDidMount() {
       // getWallboard().then(response => this.setWallboardAndLayout(response))

        getWallboardConfig().then(response => this.setState({layout: JSON.parse(response.value)}))
    }


    constructor(props) {
        super(props);
        this.state = { wallboard: null, messages: null};
        this.onReset = this.onReset.bind(this);
        this.onAdd = this.onAdd.bind(this);
        this.onRemove = this.onRemove.bind(this)
    }
    componentWillUnmount() {
    }

    onSave(){
        setWallboardConfig2(JSON.stringify(layer)).then(response =>  sweetAlerts('success', 'Wallboard gespeichert!')).catch(error => {
            sweetAlerts('error', 'Fehler beim Speichern des Wallboards!')
        })
    }
    onReset(){
        setWallboardConfig2(JSON.stringify(ll)).then(response => console.log("Wallboard saved."))
        this.setState({layout: ll})
    }
    onLayoutChange(layout, layouts) {
        layer = layouts
    }
    onAdd(age){
       // addWallboardConfig(age).then(response => this.setState({layout: this.state.layout}))
        console.log(this.state.layout)

        let l = this.state.layout.lg.concat({static: false, w: 12, moved: false, h: 15, x: 0, y: 0,  i: age})
        this.setState({layout: {lg: l}})
    }
    onRemove(age){
        console.log("REMOVE")
        const d = this.state.layout.lg;
        console.log(d[0])
        for(let i = 0; i < d.length; i++){
            console.log(d[i].i + " " +age)
            if(d[i].i == age){
                let l = this.state.layout.lg.splice(i, 1)
                this.setState({})
                console.log(this.state.layout.lg)
            }
        }
    }
    createElement(el) {
        return <div key={""+el}><LiveComponent handleRemove={this.onRemove} name={el}/></div>
    }
    getWallboardComponents(data){
        const rows = [];
        console.log("dd")
        console.log(data)
        const removeStyle = {
            position: "absolute",
            right: "2px",
            top: 0,
            cursor: "pointer"
        };
        for(let i = 0; i < data.length; i++){
            rows.push(this.createElement(data[i].name))
        }
        return rows;
    }
   /* setWallboardAndLayout(data){
        let layout = [];
        for(let i = 0; i < data.length; i++){
            layout.push({i: ""+data[i].name, x: data[i].x, y: data[i].y, w: data[i].w, h: data[i].h })
        }
        this.setState({wallboard: data, layout: {lg: layout}})
        setWallboardConfig2(JSON.stringify({lg: ll})).then(response => console.log("Wallboard saved."))
        getWallboardConfig().then(response => console.log(response))
    }*/

    render() {
        return(
            <PageContainer>
                {(this.state.layout != null) ? (
                    <ResponsiveGridLayout
                        id="gridSystem"
                        style={{position: "relative"}}
                        layouts={this.state.layout}
                        breakpoints={{ lg: 12 }}
                        cols={{ lg: 12 }}
                        rowHeight={10}
                        width={12}
                        onLayoutChange={(layout, layouts) =>
                            this.onLayoutChange(layout, layouts)
                        }>
                        {this.state.layout.lg.map(el => this.createElement(el.i))}
                    </ResponsiveGridLayout>) : (<div>Still Loading...</div>)}

                    <br/>

                    <Box display="flex" alignItems="center" justifyContent="space-between" mb={5}>
                        <FormDialog id="form_id" handleAdd={this.onAdd} style={{marginLeft: 10}}/>
                        <Button style={{marginLeft: 30}} onClick={this.onReset} variant="outlined" color="primary">
                            Zurücksetzen
                        </Button>
                        <Button style={{ marginLeft: "auto" }} onClick={this.onSave} variant="outlined" color="primary">
                            Speichern
                        </Button>
                    </Box>
            </PageContainer>
        );
    }

}

