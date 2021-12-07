import React from 'react';
import StatisticsModernCard from '../../../../@jumbo/components/Common/StatisticsModernCard';
import StarsIcon from '@material-ui/icons/Stars';
import AuthorsChart from './AuthorsChart';
import Box from '@material-ui/core/Box';

const NewAuthors = ({questions}) => {
    let data = [];
    let correct = 0;
    let percentage = 0;
    let answered = 0;
    if(questions.length > 0){
        for(let i = 0; i <questions.length; i++){
            if(questions[i].answer == questions[i].order){
                correct++;
            }
            if(questions[i].answered){
                answered++;
            }
        }
        percentage = correct*100 / questions.length;
        let chartColor = percentage >= 75 ? '#20A555' : '#8B061E';
        data = [
            { name: 'Richtig', value: correct, color: '#fff' },
            { name: 'Falsch', value: questions.length-correct, color: chartColor },
        ];
    }
  return (
    <StatisticsModernCard
      backgroundColor={percentage >= 75 ?  "#29CF6B" : "#E00930"}
      titleIcon={<StarsIcon style={{ color: '#fff' }} />}
      title="AZF-Test"
      subTitle={answered+"/"+questions.length+" Fragen beantwortet"}>
      <Box mt={-7.5}>
        <AuthorsChart data={data} percentage={percentage}/>
      </Box>
    </StatisticsModernCard>
  );
};

export default NewAuthors;
