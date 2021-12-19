const router = require('express').Router();
const { registerMember, authMember } = require('../controller/memberController');
let Member = require('../model/member.model');

router.route('/').post(registerMember)
router.route('/login').post(authMember)

module.exports = router;