const router = require('express').Router()
const {createReply, getReplyById, updateReply, deleteReply} = require('../controller/replyController')

const {protect} = require('../middleware/authMiddleware')

router.route('/create').post(protect, createReply)
router.route('/:id').get(getReplyById).put(protect,updateReply).delete(protect, deleteReply)

module.exports = router