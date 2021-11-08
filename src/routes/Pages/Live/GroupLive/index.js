import React, {Component} from 'react';
import 'chartjs-plugin-annotation';
import { Responsive, WidthProvider } from "react-grid-layout";
import Grid from "@material-ui/core/Grid";
import Distribution from "../LiveComponent/Distribution";
import WQPrognosis from "../LiveComponent/WQPrognosis";
import HeadData from "../LiveComponent/HeadData";
import PageContainer from "../../../../@jumbo/components/PageComponents/layouts/PageContainer";
import GridContainer from "../../../../@jumbo/components/GridContainer";
import WQLive from "../LiveComponent/WQLive";
export const GroupLive = ({id}) => (
            <PageContainer>
               <GridContainer>
                   <Grid item xs={12}>
                       <HeadData groupId={id}/>
                   </Grid>
                   <Grid item xs={8} style={{height: '500px'}}>
                       <WQPrognosis groupId={id} style={{height: '500px'}}/>
                   </Grid>
                   <Grid item xs={4} style={{height: '500px'}}>
                       <Distribution groupId={id} style={{height: '500px'}}/>
                   </Grid>
               </GridContainer>
            </PageContainer>
        );



