const Reply = require('../model/reply.model')
const asyncHandler = require('express-async-handler')
const Question = require('../model/question.model')
 
// create a reply

const createReply = asyncHandler(async (req,res) => {
    const {questionId, text, image, url} = req.body

    const reply = new Reply({
        user: req.user._id,questionId, text, image, url
    })

    const createdReply = await reply.save() 
    .then((result) => {
        Question.findById((questionId), (err, question) => {
            if(question) {
                question.replies.push(reply)
                question.save()
                res.json({message:"Reply created"})
            }
        })
    
    })
    .catch((error) => {
        res.status(500).json({error})
    })
    
  
})

module.exports = {createReply}