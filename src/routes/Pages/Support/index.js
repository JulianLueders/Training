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
                            <Grid item xs={6}>
                                <Card className="card">
                                    <CardHeader style={{backgroundColor: '#0275d8', color:'#FFF'}} titleTypographyProps={{variant:'h4' }} title="Datenerfassung"/>

                                    <CardContent className="card-body">
                                        Ausgewertet wurden eingehende Anrufe, exterene Telefonate und Rückrufe.<br/><br/><br/>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={6}>
                                <Card className="card">
                                    <CardHeader style={{backgroundColor: '#0275d8', color:'#FFF'}} titleTypographyProps={{variant:'h4' }} title="Erreichbarkeitsqualitäten"/>

                                    <CardContent className="card-body">
                                        <b>Q1:</b> Direkt angenommene Anrufe + Umgeleitete Anrufe + Erfolgreich über Wartefeld vermittelte Anrufe<br/>
                                        <b>Q2:</b> Q1 + Ausgehende Rückrufe<br/>
                                        <b>Q3:</b> Q2 + Eingehende Rückrufe<br/>

                                        <br/>
                                        <b>Voicebox:</b> Wird derzeit online IMMER als nicht erfolgreich aufgefasst.<br/>
                                    </CardContent>
                                </Card>
                        </Grid>
                </GridContainer>
            </PageContainer>

        );
    }
}