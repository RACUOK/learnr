const router = require('express').Router()
const {getQuestions, getQuestionsById, createQuestion, updateQuestion, deleteQuestion, searchQuestion, getQuestionByUser} = require('../controller/questionController')

const {protect} = require('../middleware/authMiddleware')
const {grantAccess} = require('../permission/permission')

router.route('/').get(getQuestions)
router.route('/get-question-by-user').get(protect, getQuestionByUser)
router.route('/getquestions').get(protect, searchQuestion)
router.route('/create').post(protect, createQuestion)
router.route('/:id').get(getQuestionsById).put(protect, updateQuestion).delete(protect, deleteQuestion)

module.exports = router