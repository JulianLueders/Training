import React from "react";
import NewAuthors from "./NewAuthors";
import StatisticsModernCard from "../../../@jumbo/components/Common/StatisticsModernCard";
import StatisticsClassicCard from "../../../@jumbo/components/Common/StatisticsClassicCard";

const Review = ({questions}) => {

    function getQuestions(){
        let rows = [];
        for(let i = 0; i < questions.length; i++){
            let answer = getAnswer(questions[i].answer, questions[i]);
            let correct = getAnswer(questions[i].order, questions[i]);
            let bgcolor = ['#FCE3E3 -18.96%', '#fff 108.17%'];
            let color = '#F63232';
            if(questions[i].answer == questions[i].order){
                bgcolor = ['#E2FFE7 -18.96%', '#fff 108.17%'];
                color = '#29CF6B'
            }
            if(!questions[i].answered){
                bgcolor = ['#E1DFDF -18.96%', '#fff 108.17%'];
                color = '#9D9C9C'
            }
            rows.push(<div key={"key_question_"+i}><StatisticsClassicCard
                backgroundColor={bgcolor}
                gradientDirection="180deg"
                color={color}
                question={questions[i].question}
                answer={getAnswer(questions[i].answer, questions[i])}
                correct={getAnswer(questions[i].order, questions[i])}
            /><br/></div>)
        }
        return rows;
    }
    function getAnswer(id, question){
        if(id == 1){
            return question.answer1;
        }else if(id == 2){
            return question.answer2;
        }else if(id == 3){
            return question.answer3;
        }else if(id == 4){
            return question.answer4;
        }
        return null;
    }

    function goBack(){

    }
    return(<div>
        <NewAuthors questions={questions}/>
        <br/>
        {getQuestions()}
        <br/>
        <a onClick={() => goBack()} id="LB_Cancel" style={{fontSize: "14px", float: "right", cursor: "pointer", color: "#19528d"}}>Zurück zum Test</a>
    </div>);

}
export default Review;
