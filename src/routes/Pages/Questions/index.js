import React from 'react';
import GridContainer from '../../../@jumbo/components/GridContainer';
import PageContainer from '../../../@jumbo/components/PageComponents/layouts/PageContainer';
import Box from '@material-ui/core/Box';
import IntlMessages from '../../../@jumbo/utils/IntlMessages';
import Grid from '@material-ui/core/Grid';
import Question from "./Question";
import Review from "./review";

const breadcrumbs = [
    { label: 'Home', link: '/' },
];

const Questions = ({mode, quiz}) => {
    const [review, setReview] = React.useState(false);
    const [questions, setQuestions] = React.useState([]);
    function onFinishTest(questions){
        console.log(questions)
        setQuestions(questions);
        setReview(true);
    }
    return (
        <PageContainer heading="Fragen Lernen" breadcrumbs={breadcrumbs}>
            <GridContainer>
                <Grid item xs={12}>
                    {review ? (<Review questions={questions}/>):(<Question mode={mode} quiz={quiz} onFinish={onFinishTest}/>)}
                </Grid>
            </GridContainer>
        </PageContainer>
    );
};

export default Questions;
