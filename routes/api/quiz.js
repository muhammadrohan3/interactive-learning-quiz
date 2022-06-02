const express = require('express')
const router = express.Router()
const { Quiz } = require('../../models/Quiz')
const { Question } = require('../../models/QuizQuestion')

router.post('/add-result', async (req, res) => {
    console.log('adding quiz info')

    try {
        
        //console.log("total correct", correct)
        let result = await new Quiz(req.body).save()
        //const result = await new Quiz(req.body).save()
        res.status(200).send({ done: "done" })
    } catch (error) {
        res.status(500).send("Internal server error")
    }

})
router.post('/get-question' , async (req, res)=>
{
    //type, no of questions 
    const result = await Question.find({type : req.body.type})
    res.status(200).send(result)
})

router.post('/get-results', async (req, res)=>
{
    
    const result = await Quiz.find({user : req.body._id})
    console.log(result)
    res.status(200).send(result)
})
router.get('/get-types' , async (req, res)=>
{
    
    const result = await Question.distinct("type")
    res.status(200).send(result)
})
router.post('/addQuestion', async (req, res) => {
    
    const result = await new Question(req.body).save()
    res.status(200).send(result)
})
module.exports = router