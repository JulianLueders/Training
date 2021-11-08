
import React, {Component} from 'react';
import {testUrl3} from "../../../util/APIUtils";
import {Table, TableHead, TableRow} from "@material-ui/core";
import TableCell from "@material-ui/core/TableCell";
import PageContainer from "../../../@jumbo/components/PageComponents/layouts/PageContainer";
import GridContainer from "../../../@jumbo/components/GridContainer";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import EnhancedTable from "./EnhancedTable";


export default class DetailedTable extends Component{

    constructor(props) {
        super(props);
        this.state = { tabledata: null};
        const script = document.createElement("script");
        script.src = "dataTables.bootstrap4.min.js";
        script.async = true;

        document.body.appendChild(script);
    }
    componentDidMount() {
        testUrl3().then(response => this.setState({tabledata: response}));
    }

    render() {
        return(
            <PageContainer heading="Detaillierte Tabellenansicht">
                <GridContainer>
                    {(this.state.tabledata != null) ?
                        <EnhancedTable data={this.state.tabledata}/>
                        : (<div></div>)
                    }
                </GridContainer>

            </PageContainer>

        );
    }

}
