const mongoose = require('mongoose')
const Schema = mongoose.Schema

const QuizQuestion = new Schema(
    {
        question : {type : String , required : true}, 
        type : {type : String , required : true},
        options :
        [
            {option : {type : String , required : true}, isCorrect : {type : Boolean , required : true}},
        ],
        
       

    }
) 
const Question = mongoose.model("Question" , QuizQuestion)
module.exports = {Question}
