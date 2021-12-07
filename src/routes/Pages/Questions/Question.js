import React from "react";
import {
    deleteSavedTest,
    getAllQuestions,
    getSavedTest, setQuestionRight,
    setQuestionWrong,
    setSavedTest,
    toggleQuestionFlagged
} from "../../../util/APIUtils";
import {sweetAlerts} from "../../../util/swals";
import Link from "@material-ui/core/Link";

const Question = ({mode, quiz, onFinish}) => {
    let quizId = 1;
    if(quiz == "bzf"){
        quizId = 1;
    }else if(quiz == "azf"){
        quizId = 3;
    }

    let currentAnswer = 1;
    let colorSuccess = "#20A555";
    let colorFalse = "#F63232";
    let colorFlag = "orange";
    let colorQuestion = "black"
    let correctQuestions = 0;
    const [questions, setQuestions] = React.useState([]);
    const [questionId, setQuestionId] = React.useState(0);

    React.useEffect(() => {
        getSavedTest(mode, quizId).then(reponse => checkData(reponse));
        // getReportFormSections(rating).then(response => createRowData(response));
        //getAllQuestions('1').then(response => setData(response))
    }, []);

    function checkData(response){
        console.log(response)
        console.log("Saved:"+response);
        if(response == null || response.test == null){
            getAllQuestions(quizId, mode).then(response => setData(response))
        }else{
            console.log("hier")
            //console.log(JSON.parse(decodeURIComponent(response.test)));
            setQuestions(JSON.parse(response.test))
        }
    }
    function setData(response){
        let data = [];
        for(let i = 0; i < response.length; i++){
            const rndm = randomIntFromInterval(1, 4)
            if(rndm == 1){
                data.push({flag: response[i].flagged == "flag" ? true : false, order: 1, answer: 0, answered: false, id: response[i].id, question: response[i].question, answer1: response[i].answer1, answer2: response[i].answer2 ,answer3: response[i].answer3, answer4: response[i].answer4})
            }else if(rndm == 2){
                data.push({flag: response[i].flagged == "flag" ? true : false, order: 2, answer: 0, answered: false, id: response[i].id, question: response[i].question, answer1: response[i].answer2, answer2: response[i].answer1 ,answer3: response[i].answer3, answer4: response[i].answer4})

            }else if(rndm == 3){
                data.push({flag: response[i].flagged == "flag" ? true : false, order: 3, answer: 0, answered: false, id: response[i].id, question: response[i].question, answer1: response[i].answer3, answer2: response[i].answer2 ,answer3: response[i].answer1, answer4: response[i].answer4})
            }else{
                data.push({flag: response[i].flagged == "flag" ? true : false, order: 4, answer: 0, answered: false, id: response[i].id, question: response[i].question, answer1: response[i].answer2, answer2: response[i].answer4 ,answer3: response[i].answer3, answer4: response[i].answer1})
            }
        }
        console.log(data)
       //response.map(e => data.push({flag: e.flag == "flag" ? true : false, order: 0, answer: 0, answered: false, id: e.id, question: e.question, answer1: e.answer1, answer2: e.answer2 ,answer3: e.answer3, answer4: e.answer4}))
        setQuestions(data);
    }

    function setFlagged(id){
        let ans = {};
        let newQuestions = [];
        for(let i = 0; i < questions.length; i++){
            if(id == i){
                ans = questions[i];
                if(ans.flag)
                    ans.flag = false
                else
                    ans.flag = true;

                newQuestions.push(ans);
            }else{
                newQuestions.push(questions[i]);
            }
        }
        setQuestions(newQuestions)
    }

    function setAnswerToValue(id, answer){
        let ans = {};
        let newQuestions = [];
        for(let i = 0; i < questions.length; i++){
            if(id == i){
                ans = questions[i];
                ans.answered = true;
                ans.answer = answer;
                ans.color =
                    newQuestions.push(ans);
            }else{
                newQuestions.push(questions[i]);
            }
        }
        setQuestions(newQuestions)
    }

    function getColor(letter, number){
        if(questions[questionId].answered){
            if(questions[questionId].answer == number && questions[questionId].answer != questions[questionId].order){
                return colorFalse;
            }
            if(questions[questionId].order == number){
                return colorSuccess;
            }
        }
        if(letter){
            return "lightgray"
        }
        return colorQuestion;

    }

    function saveTest(){
        setSavedTest(mode, encodeURIComponent(JSON.stringify(questions)), quizId).then(response =>  sweetAlerts('success', response.message)).catch(error => {
            sweetAlerts('error', 'Fehler beim Speichern des Tests!')
        });
    }

    function setAnswer(answer){
        if(!questions[questionId].answered){
            currentAnswer = answer;
            if(answer == questions[questionId].order){
                correctQuestions = correctQuestions + 1;
                setQuestionRight(questions[questionId].id).then(e => console.log(e))
            }else{
                setQuestionWrong(questions[questionId].id).then(e => console.log(e))

            }
            setAnswerToValue(questionId, answer);
        }
    }



    function randomIntFromInterval(min, max) { // min and max included
        return Math.floor(Math.random() * (max - min + 1) + min)
    }


    function onClickNext(){

        if(questionId == questions.length-1){
            return;
        }
        setQuestionId(questionId+1)
        setQuestions(questions);

    }
    function onClickPrev(){
        if(questionId > 0){
            setQuestionId(questionId - 1)
        }

    }

    function onClickNumber(number){
        console.log("presv"+number);
        setQuestionId(number-1);

    }

    function getStyleQuickView(id){
        if(questions[id].answered){
            if(questions[id].order == questions[id].answer){
                return {backgroundColor: colorSuccess, color: "white"};
            }else{
                return {backgroundColor: colorFalse, color: "white"};
            }
        }else{
            return {backgroundColor: "white", color: "black"};
        }
    }



    function writeQuickview(){
        let rows = [];
        for(let i = 1; i <= questions.length; i++){
            rows.push(<div className="qsb-div"><a id={"quickview_"+i} className={questionId == (i-1) ? "qsb-gen qsb-sel" : "qsb-gen"} style={getStyleQuickView(i-1)}
                                                   onClick={() => onClickNumber(i)}>{i}</a><span
                className="mark-square" style={{display: "none"}}><i
                className="icon-pin-full"></i></span></div>)
        }
        return rows;
    }

    function deleteTest() {
        deleteSavedTest(mode, quizId).then(e => console.log(e))
    }

    function onClickFlag() {
        toggleQuestionFlagged(questions[questionId].id).then(e => setFlagged(questionId));
    }

    return (
        <div id="envelope">
            {questions.length > 0 ? (
            <form method="post"
                  autoComplete="off">
                <div id="Panel_content" className="content">
                    <div id="main-envelope">
                        <div className="test-panel-r">
                            <div id="ctl00_CPH_Main_LT1_UP_LeftButt">
                                <div style={{padding: "25px 0 3px 10px", textAlign: "center"}}>
                                    <div style={{textAlign: "center"}}>
                                        <a  onClick={() => saveTest()} id="LB_Save"
                                           style={{fontSize: "14px", marginRight: "20px", cursor: "pointer", color: "#19528d"}}>Test speichern</a>

                                        <a href="/" onClick={() => deleteTest()} id="LB_Cancel" style={{fontSize: "14px", cursor: "pointer", color: "#19528d"}}>Test
                                            abbrechen</a>
                                    </div>
                                    <div style={{textAlign: "center", padding: "25px 0 17px 0"}}>
                                        <a id="B_Finish" className="button-low" onClick={() => onFinish(questions)}
                                           style={{display: "inline-block" ,width: "130px", cursor: "pointer"}}>TEST ABGEBEN</a>
                                    </div>
                                    <div style={{display: "inlineBlock", textAlign:"left"}}>
                                        {writeQuickview()}
                                    </div>

                                    </div>
                            </div>
                            <div id="keymapimg" className="keymapimg1">
                                <div>
                                    <div>
                                        <span id="keyslide">1</span> von <span>2</span>
                                    </div>
                                    <a className="button" style={{cursor: "pointer"}}>WEITER</a>
                                </div>
                            </div>
                        </div>
                        <div className="test-container">

                            <div id="ctl00_CPH_Main_TP1_UP_Test">
                                <input type="hidden" name="ctl00$CPH_Main$TP1$HF_CurrentQs" id="HF_CurrentQs"
                                       value="0"/>
                                <input type="hidden" name="ctl00$CPH_Main$TP1$HF_TestId" id="HF_TestId"
                                       value="112951005"/>
                                <input type="hidden" name="ctl00$CPH_Main$TP1$HF_QsId" id="HF_QsId" value="4335"/>
                                <input type="hidden" name="ctl00$CPH_Main$TP1$HF_QsType" id="HF_QsType" value="0"/>
                                <div className="test-arrow-l">
                                </div>
                                <div className="test-arrow-r">
                                    <a id="clickNextA" title="Nächste Frage"
                                       className="no_underl icon-right-open-big text-dis"
                                       href onClick={onClickNext}></a>
                                </div>
                                <div style={{minHeight: "450px", margin: "30px 55px 0 0", float: "none"}}>
                                    <table style={{width: "100%"}}>
                                        <tr>
                                            <td>
                                                <div id="ctl00_CPH_Main_TP1_Panel_QsIndex"
                                                     style={{display: "inline-block", fontSize:"24px", fontWeight: 300, lineHeight: "28px"}}>
                                                    Q
                                                    <span id="questionCounter"> {questionId + 1}</span> /
                                                    <span id="questionsTotal" style={{padding: "0 3px"}}>{questions.length}</span>
                                                </div>
                                                <a id="LB_Mark" title="Zurück" className="no_underl icon-pin-full text-dis"
                                                   href onClick={onClickPrev}
                                                   style={{fontSize: "24px", paddingLeft: "12px"}}></a>
                                                <a id="LB_Flags" title="Markierungen setzen"
                                                   className="no_underl icon-flag text-dis" onClick={onClickFlag}
                                                   style={{fontSize: "24px", cursor: "pointer", color: (questions[questionId].flag ? colorFlag : "grey")}}></a>

                                                <input type="hidden"
                                                       name="ctl00$CPH_Main$TP1$QuestionFeedback$HF_Feedback_IdBaseExam"
                                                       id="HF_Feedback_IdBaseExam" value="1"/>

                                            </td>

                                        </tr>
                                    </table>


                                    <div id="TC_Test">

                                        <div>
                                            <div id="ctl00_CPH_Main_TP1_ctl01" id="ctl00_CPH_Main_TP1_ctl01">
                                                <div className="text-main" style={{padding: "2px 0 0 0"}}>
                                                    <div id="tr_question" className="text-qs text-all"
                                                         style={{fontSize: "14px"}}>
                                                        {questions[questionId].question}
                                                    </div>
                                                    <div id="Panel_Figures">
                                                    </div>
                                                    <div id="Panel_AnsBasic">
                                                        <table
                                                            style={{ width: "100%", borderCollapse: "separate", borderSpacing: "0 9px"}}>
                                                            <tr id="tr_answer1" onClick={() => setAnswer(1)} className=""
                                                                style={{fontSize: "14px", cursor: "pointer"}}>
                                                                <td id="tr_a" className="ans-let" style={{color: getColor(true, 1)}}>A</td>
                                                                <td id="td_answer1" className="text-ans text-all" style={{color: getColor(false,1)}}>
                                                                    {questions[questionId].answer1}
                                                                </td>
                                                                <td style={{width: "1px"}}>
                                                                    <div className="ans-hg"></div>
                                                                </td>
                                                            </tr>
                                                            <tr id="tr_answer2" onClick={() => setAnswer(2)} className=""
                                                                style={{fontSize: "14px", cursor: "pointer"}}>
                                                                <td id="tr_b" className="ans-let" style={{color: getColor(true, 2)}}>B</td>
                                                                <td id="td_answer2" className="text-ans text-all" style={{color: getColor(false,2)}}>
                                                                    {questions[questionId].answer2}
                                                                </td>
                                                                <td>
                                                                    <div className="ans-hg"></div>
                                                                </td>
                                                            </tr>
                                                            <tr id="tr_answer3" onClick={() => setAnswer(3)} className=""
                                                                style={{fontSize: "14px", cursor: "pointer"}}>
                                                                <td id="tr_c" className="ans-let" style={{color: getColor(true, 3)}}>C</td>
                                                                <td id="td_answer3" className="text-ans text-all" style={{color: getColor(false,3)}}>
                                                                    {questions[questionId].answer3}

                                                                </td>
                                                                <td>
                                                                    <div className="ans-hg"></div>
                                                                </td>
                                                            </tr>
                                                            <tr id="tr_answer4" onClick={() => setAnswer(4)} className=""
                                                                style={{fontSize: "14px", cursor: "pointer"}}>
                                                                <td id="tr_d" className="ans-let" style={{color: getColor(true, 4)}}>D</td>
                                                                <td id="td_answer4" className="text-ans text-all" style={{color: getColor(false,4)}}>
                                                                    {questions[questionId].answer4}

                                                                </td>
                                                                <td>
                                                                    <div className="ans-hg"></div>
                                                                </td>
                                                            </tr>
                                                        </table>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>) : (null)}
        </div>


    );
};

export default Question;
