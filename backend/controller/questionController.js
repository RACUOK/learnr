const Question = require('../model/question.model')
const asyncHandler = require('express-async-handler')
const {roles} = require('../roles')

// get all questions

const getQuestions = asyncHandler(async (req, res) => {
    const questions = await Question.find()
    res.json(questions)
})

// get question by ID

const getQuestionsById = asyncHandler(async (req, res) => {
    const question = await Question.findById(req.params.id)

    if(question) {
        res.json(question)
    } else {
        res.status(400).json({message:"Question not found"})
    }
})

// create a question

const createQuestion = asyncHandler(async (req, res) => {


    const {category,  title,  description, image, replies} = req.body

    if(!category || !title || !description) {
        res.status(400)
        throw new Error("Please fill all the fields")
    } else{
        const question = new Question({
            user: req.user._id, category,  title,  description, image,  replies
        })

        const createdQuestion = await question.save()

        res.status(201).json(createdQuestion)
    }
})

// update a question

const updateQuestion = asyncHandler(async (req, res) => {

    const {category,  title,  description, image,  replies} = req.body

    const question = await Question.findById(req.params.id)

    var permission = roles.can(req.user.userRole).updateAny("question")

    if (permission.granted === false) {
        if(question.user.toString() === req.user._id.toString()) {
            permission = roles.can(req.user.userRole).updateOwn("question")
        } 
    }

    if (permission.granted) {
        if(question) {
            question.category = category
            question.title = title
            question.description = description
            question.image = image
            question. replies = replies
    
            const updatedQuestion = await question.save()
            res.json(updatedQuestion)
        } else {
            res.status(404)
            throw new Error("Question not found")
        }
    } else{
        res.status(403)
        throw new Error("You don't have permission!")
    }
    
})

// delete a question

const deleteQuestion = asyncHandler(async (req,res) => {
    const question = await Question.findById(req.params.id)

    if(question.user.toString() !== req.user._id.toString()) {
        res.status(401)
        throw new Error("You cannot perform this action")
    } 

    if(question) {
        await question.remove()
        res.json({message:"Question Removed"})
    } else {
        res.status(404)
        throw new Error("Note not found")
    }
})

module.exports = {getQuestions, createQuestion, getQuestionsById, updateQuestion, deleteQuestion}