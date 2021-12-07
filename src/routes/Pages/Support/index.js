import React, {Component} from "react";
import {Link} from "react-router-dom";
import PageContainer from "../../../@jumbo/components/PageComponents/layouts/PageContainer";
import GridContainer from "../../../@jumbo/components/GridContainer";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import {CardContent} from "@material-ui/core";

export default class Support extends Component{


    render() {
        return(
            <PageContainer heading="Hilfe">
                <GridContainer>

                </GridContainer>
            </PageContainer>

        );
    }
}
