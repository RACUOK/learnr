const router = require('express').Router()
const {getQuestions, getQuestionsById, createQuestion, updateQuestion, deleteQuestion} = require('../controller/questionController')

const {protect} = require('../middleware/authMiddleware')
const {grantAccess} = require('../permission/permission')

router.route('/').get(getQuestions)
router.route('/create').post(protect, grantAccess('createOwn', 'question'), createQuestion)
router.route('/:id').get(protect, getQuestionsById).put(protect, updateQuestion).delete(protect, grantAccess('deleteOwn','question'), deleteQuestion)

module.exports = router