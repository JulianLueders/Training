
import React, {Component} from 'react';
import PageContainer from "../../../@jumbo/components/PageComponents/layouts/PageContainer";
import GridContainer from "../../../@jumbo/components/GridContainer";
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
