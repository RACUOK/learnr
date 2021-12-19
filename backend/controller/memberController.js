const asyncHandler = require('express-async-handler')
const Member = require('../model/member.model')
const generateToken = require('../utils/generateToken')

// register user

const registerMember = asyncHandler(async (req, res) => {
    const { name, email, password,field,  pic, userRole, } = req.body

    const memberExists = await Member.findOne({email})

    if(memberExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    // create new Member
    const member = await Member.create({
        name, email, password,field,  pic, userRole
    });

    if (member) {

        res.status(201).json({
            _id:member._id,
            name:member.name,
            email:member.email,
            userRole:member.userRole,
            token:generateToken(member._id)
        })
        console.log("Member added!");
    }
    else {
        res.status(400)
        throw new Error("Error Occured")
    }

})

// login user
const authMember = asyncHandler(async (req,res) => {
    const {email, password} = req.body;

    const member = await Member.findOne({email});

    if(member && (await member.matchPassword(password))) {
        res.json({
            _id:member._id,
            name:member.memberName,
            email:member.email,
            userRole:member.userRole,
            token:generateToken(member._id),

        })
        console.log("Successfully logged in!");
    } else {
        res.status(400)
        throw new Error("Invalid Email or password!");
    }

   
});

module.exports = {registerMember, authMember}