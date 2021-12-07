
import React, {Component} from 'react';
import PageContainer from "../../../@jumbo/components/PageComponents/layouts/PageContainer";
import GridContainer from "../../../@jumbo/components/GridContainer";
import Grid from "@material-ui/core/Grid";
import NewUser from "./NewUser";


export default class Config extends Component{

    constructor(props) {
        super(props);
    }


    componentWillUnmount() {
    }


    render() {
        return(
            <PageContainer heading="Konfiguration">

                <GridContainer>
                    <Grid item xs={12}>
                        <NewUser/>
                    </Grid>
                </GridContainer>
            </PageContainer>
        );
    }
}

