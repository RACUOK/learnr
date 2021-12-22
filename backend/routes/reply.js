const router = require('express').Router()
const {createReply} = require('../controller/replyController')

const {protect} = require('../middleware/authMiddleware')

router.route('/create').post(protect, createReply)

module.exports = router