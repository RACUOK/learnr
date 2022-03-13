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


    const {grade, subject, topic, description, image, replies} = req.body

    if(!grade || !subject || !description) {
        res.status(400)
        throw new Error("Please fill all the fields")
    } else{
        const question = new Question({
            user: req.user._id, grade, subject,  topic,   description, image, replies

        })

        const createdQuestion = await question.save()

        res.status(201).json(createdQuestion)
    }
})

// update a question

const updateQuestion = asyncHandler(async (req, res) => {

    const {grade, subject,  topic,  description, image, replies} = req.body

    const question = await Question.findById(req.params.id)

    var permission = roles.can(req.user.userRole).updateAny("question")

    if (permission.granted === false) {
        if(question.user.toString() === req.user._id.toString()) {
            permission = roles.can(req.user.userRole).updateOwn("question")
        } 
    }

    if (permission.granted) {
        if(question) {
            question.grade = grade
            question.subject = subject
            question.topic = topic
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

    var permission = roles.can(req.user.userRole).deleteAny("question")

    if (permission.granted === false) {
        if(question.user.toString() === req.user._id.toString()) {
            permission = roles.can(req.user.userRole).deleteOwn("question")
        } 
    }

    if (permission.granted) {
        if(question) {
            await question.remove()
            res.json({message:"Question Removed"})
        } else {
            res.status(404)
            throw new Error("Note not found")
        }
    } else {
        res.status(403)
        throw new Error("You don't have permission!")
    }
    
})

// search a question

const searchQuestion = asyncHandler(async (req, res) => {
    const keyword = req.query.search ? {
        $or: [
            { grade: { $regex: req.query.search, $options: "i"}},
            { subject: { $regex: req.query.search, $options: "i"}},
            { topic : { $regex: req.query.search, $options: "i"}}
        ]
    } : {}

    const questions = await Question.find(keyword)
    res.send(questions)
})

module.exports = {getQuestions, createQuestion, getQuestionsById, updateQuestion, deleteQuestion, searchQuestion}
