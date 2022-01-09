const Reply = require('../model/reply.model')
const asyncHandler = require('express-async-handler')
const Question = require('../model/question.model')
const {roles} = require('../roles')
 
// get reply by Id

const getReplyById = asyncHandler(async (req,res) => {
    const reply = await Reply.findById(req.params.id)

    if(reply) {
        res.json(reply)
    } else {
        res.status(400).json({message:"Reply not found"})
    }
})


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

// update a reply

const updateReply = asyncHandler(async (req,res) => {

    const {questionId, text, image, url} = req.body

    const reply = await Reply.findById(req.params.id)

    var permission = roles.can(req.user.userRole).updateAny("reply")

    if (permission.granted == false) {
        if(reply.user.toString() === req.user._id.toString()) {
            permission = roles.can(req.user.userRole).updateOwn("reply")
        } 
    }

    if (permission.granted) {
        if(reply) {
            reply.text = text
            reply.image = image
            reply.url = url
    
            const updatedReply = await reply.save()
            res.json(updatedReply)
        } else {
            res.status(404)
            throw new Error("Reply not found")
        }
    } else {
        res.status(403)
        throw new Error("You don't have permission!")
    }
    
})

// delete a reply

const deleteReply = asyncHandler(async (req,res) => {
    const reply = await Reply.findById(req.params.id)

    var permission = roles.can(req.user.userRole).deleteAny("reply")

    if (permission.granted == false) {
        if(reply.user.toString() === req.user._id.toString()) {
            permission = roles.can(req.user.userRole).deleteOwn("reply")
        } 
    }

    if (permission.granted) {
         if(reply) {
            await reply.remove()
            res.json({message: "Reply removed"})
        } else {
            res.status(404)
            throw new Error("Reply not found")
        }
    } else {
        res.status(403)
        throw new Error("You don't have permission!")
    }

})

module.exports = {createReply, getReplyById, updateReply, deleteReply}