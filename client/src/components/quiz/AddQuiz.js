import React, { useEffect, useState } from 'react'
import axios from 'axios'

function AddQuiz() {
    const [questions, setQuestions] = useState({
        question: '',
        type: '',
        option1: "",
        option2: "",
        option3: "",
        option4: "", 
        correct : ""
    })
    const [types, setTypes] = useState([])
    const [addType , setAddType] = useState()
    //get the types from the database
    //that are already present
    const getTypes = ()=>
    {
        axios.get('/api/quiz/get-types')
        .then((body)=>{
            
            setTypes(body.data)
        })
        .catch(err=>console.log(err))
    }
    useEffect(()=>
    {
        getTypes()
    },[])


    //when the user is typing in the input
    //it changes the state in realtime
    const handleChange = (e) => {
        
        setQuestions({...questions, [e.target.name] : e.target.value})
    }
    
    const addQuestion = (e) => {

        axios.post('/api/quiz/addquestion', e)
            .then((body) => { console.log(body.status) 
            document.location.reload()})
            .catch(err => console.log(err))
    }

    //when the submit is clicked
    //make the object and put that in that in the data base
    const handleSubmit = () =>
    {
        let optionName = ["option1","option2","option3","option4"]
        let options = []
        optionName.forEach((item)=>
        {
            if(questions[item] === questions.correct)
            {
                options.push({option :questions[item] , isCorrect : true})
            }
            else
            {
                options.push({option :questions[item] , isCorrect : false})
            }
        })
        const question = {
            question : questions.question, 
            type : questions.type, 
            options : options
        }
        
        addQuestion(question)
    }
    
    return (
        <>
            <h2>Add Questions
            </h2>
            <p>Please choose a category</p>
            <button className='btn btn-primary' onClick={()=>{setAddType("existing")}}>Existing Category</button>
            <button className='btn btn-primary' onClick={()=>{setAddType("new")}}>New Category</button>
            <form action="" className='mt-3'>
                {addType === "existing" &&<div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">Type</span>
                    <select className='form-select' placeholder="Enter Question" name="type" id="" onChange={(e) => { handleChange(e) }}>
                        <option value="">Choose</option>
                        {types.length> 0 && types.map((item)=>
                        {
                            return <option value={item}>{item}</option>
                        })}
                        
                    </select><option value=""></option>
                </div>}
                {addType === "new" &&<div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">Type</span>
                    <input type="text" name="type" className="form-control" placeholder="Enter Question" aria-label="Username" aria-describedby="basic-addon1" onChange={(e) => { handleChange(e) }} />
                </div>}
                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">Question</span>
                    <input type="text" name="question" className="form-control" placeholder="Enter Question" aria-label="Username" aria-describedby="basic-addon1" onChange={(e) => { handleChange(e) }} />
                </div>
                <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">Option 1</span>
                    <input type="text" className="form-control" id ="option1" name="option1" placeholder="Enter Option1" aria-label="Text input with checkbox" onChange={(e) => { handleChange(e) }} />
                </div>
                <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">Option 2</span>
                    <input type="text" className="form-control" id ="option2" name="option2" placeholder="Enter Option2" aria-label="Text input with checkbox" onChange={(e) => { handleChange(e) }}/>
                </div>
                <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">Option 3</span>
                    <input type="text" className="form-control" id ="option3" name="option3" placeholder="Enter Option3" aria-label="Text input with checkbox" onChange={(e) => { handleChange(e) }}/>
                </div>
                <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">Option 4</span>
                    <input type="text" className="form-control" id ="option4" name="option4" placeholder="Enter Option4" aria-label="Text input with checkbox" onChange={(e) => { handleChange(e) }}/>
                </div>
                <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">Correct option</span>
                    <input type="text" className="form-control" id ="correct" name="correct" placeholder="Enter Correct option" aria-label="Text input with checkbox" onChange={(e) => { handleChange(e) }}/>
                </div>
                
            </form>
            <button className='btn btn-primary' onClick = {()=>{handleSubmit()}}>Submit</button>
        </>
    )
}

export default AddQuiz