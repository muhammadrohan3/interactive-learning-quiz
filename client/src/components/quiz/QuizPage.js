import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { connect } from 'react-redux';
function QuizPage({ auth: { user } }) {
    
    const { type } = useParams()
    const [option, setOption] = useState({})
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [score, setScore] = useState(0)
    const [length, setLength] = useState(0)
    const [show, setShow] = useState(false)
    const [questions , setQuestions] = useState([])
   

    //to get the questions from the data base
    //based on the type of the quiz
    useEffect(()=>
    {
        axios.post('/api/quiz/get-question' , {
            type : type 
        })
        .then((body)=>{setQuestions(body.data)
        })
        .catch(err=>console.log(err))
    },[])


    //function to select and unselect the option
    const handleClick = (item) => {
        
        setOption(item)
        questions[currentQuestion].options.map((item2) => {
            document.getElementById(item2.option).style.background = "white"
        })
        document.getElementById(item.option).style.background = "#73c2fb"
    }
   

    //when the user click submit
    //calculate the score based onb the submission
    const handleSubmission = () => {
        questions[currentQuestion].options.map((item) => {
            if (option.isCorrect && option.option === item.option) {
                
                setScore(score + 1)
                document.getElementById(item.option).style.background = "#98ff98"
            }
            else if (option.option === item.option) {
                document.getElementById(item.option).style.background = "#ff5c5c"
            }
            if (item.isCorrect) {
                document.getElementById(item.option).style.background = "#98ff98"
            }
        })
        document.getElementById("next").disabled = false
    }

    //takes the user to the next questions

    const handleNext = () => {
        if (currentQuestion < length - 1) {
            setCurrentQuestion(currentQuestion + 1)
        }

        else if (currentQuestion === length - 1) {
            document.getElementById("next").style.display = 'none'
            document.getElementById("4").style.display = 'flex'
            setShow(false)
        }
        questions[currentQuestion].options.forEach((item) => {
            document.getElementById(item.option).style.background = "white"
        })
        document.getElementById("next").disabled = true
    }

    //function to show result 
    //and update that in the database
    const showResult = () => {
        document.getElementById("2").style.display = 'flex'
        document.getElementById("4").style.display = 'none'
        axios.post('/api/quiz/add-result', {
            type : type, 
            user : user._id, 
            totalQuestions : length, 
            correctQuestions : score, 
            percentage : Number(((score /  length) * 100).toFixed(2))
        })
    }

    //action triggered when the user enters
    //no of questions he want to attempt
    const handleChange = e => {
        if (e.target.value >= 1 && e.target.value <= questions.length) {
            setLength(e.target.value)
            
            document.getElementById("start-quiz").disabled = false
        }
        else {
            document.getElementById("testPara").innerHTML = "Please enter number between 1 and " + questions.length
            document.getElementById("start-quiz").disabled = true
        }
    }

    //action when the strt button is clicked
    const startQuiz = () => {
        setShow(true)
        document.getElementById("question-info").style.display = "none"
    }
    return (
        <div className="container m-3">
            <div className="d-flex justify-content-center">
                <h2>{type}</h2>
            </div>

            <h4>Rules and take aways for quiz</h4>
            <ol>
                <li>You can retake quiz any time you want</li>
                <li>In order to pass the quiz you need to get atleast 50% marks</li>
                <li>Each question carry one mark</li>
                <li>Each question has 1 correct option</li>
                <li>You can only choose your answer once</li>
            </ol>
            
            {/* to get the no of the questions the user wants to attempt */}
            {questions.length > 0 && <div id="question-info">
                <input className='form-control' type="number" placeholder={'Enter No of Questions (1-' + questions.length + ")"} onChange={(e) => { handleChange(e) }} />
                <button className="btn btn-primary mt-3" id='start-quiz' onClick={() => { startQuiz() }}>Start Quiz</button>
                <p id='testPara'></p>
            </div>}


            
            {/* {show hides the table when  the conditions applied before and after quiz} */}
            {show && <> <table className='table table-bordered'>

                <thead  >
                    <tr>
                        <th className='d-flex'>Q : {questions[currentQuestion].question}</th>
                    </tr>
                </thead>

                <tbody>
                    {questions[currentQuestion].options.map((item) => {

                        return <tr className="d-flex options m-3" id={item.option} onClick={() => { handleClick(item) }}>{item.option}</tr>
                    })}
                </tbody>



            </table>
                <button className="btn btn-primary" onClick={() => { handleSubmission() }}>Submit</button>
                <button className="btn btn-primary" id='next' onClick={() => { handleNext() }} >Next</button>
                <p>Your score = {score + "/" + length}</p></>}
            {/* Show result component */}
            <button className="btn btn-primary" id='4' style={{ display: "none" }} onClick={() => {
                showResult()
            }}>Show result</button>


            {/* Show the result to the user */}
            <div className="result mt-3" id='2'>
                <div className="heading">
                    <h2>Result Card</h2>
                </div>
                <div className="info">
                    <span>Quiz Type</span>
                    <span>{type}</span>
                </div>
                <div className="info">
                    <span>Total Questions</span>
                    <span>{length}</span>
                </div>
                <div className="info">
                    <span>Correct Answers</span>
                    <span>{score}</span>
                </div>
                <div className="info">
                    <span>Percentage</span>
                    <span>{((score / length) * 100).toFixed(2)}%</span>
                </div>
                <div className="info">
                    <span>Quiz status</span>
                    <span>{((score / length) * 100) >= 50 ? "Passed" : "Failed"}</span>
                </div>
            </div>

        </div>
    )
}
const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps)(QuizPage);
