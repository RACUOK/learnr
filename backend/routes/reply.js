const router = require('express').Router()
const {createReply, getReplyById, updateReply, deleteReply} = require('../controller/replyController')

const {protect} = require('../middleware/authMiddleware')
const {grantAccess} = require('../permission/permission')

router.route('/create').post(protect, grantAccess('createAny', 'reply'), createReply)
router.route('/:id').get(getReplyById).put(protect,grantAccess('updateOwn', 'reply'), updateReply).delete(protect, grantAccess('deleteOwn','reply'), deleteReply)

module.exports = router