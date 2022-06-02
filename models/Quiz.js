const mongoose = require('mongoose')
const Schema = mongoose.Schema

const QuizSchema = new Schema({
    type: {type: String , required: true}, 
    user : {type: Schema.Types.ObjectId, Required : true }, 
    totalQuestions : {type : Number , required: true},
    correctQuestions : {type : Number , required: true},
    percentage : {type : Number , required : true}
})

const Quiz = mongoose.model("Quiz" , QuizSchema)

module.exports = {Quiz}