const asyncHandler = require('express-async-handler')
const User = require('../model/user.model')
const generateToken = require('../utils/generateToken')

// register user

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password,field,  pic, userRole, } = req.body

    const userExists = await User.findOne({email})

    if(userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    // create new User
    const user = await User.create({
        name, email, password,field,  pic, userRole
    });

    if (user) {

        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            userRole:user.userRole,
            token:generateToken(user._id)
        })
        console.log("User added!");
    }
    else {
        res.status(400)
        throw new Error("Error Occured")
    }

})

// login user

const authUser = asyncHandler(async (req,res) => {
    const {email, password} = req.body;

    const user = await User.findOne({email});

    if(user && (await user.matchPassword(password))) {
        res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            userRole:user.userRole,
            token:generateToken(user._id),

        })
        console.log("Successfully logged in!");
    } else {
        res.status(400)
        throw new Error("Invalid Email or password!");
    }

   
});

module.exports = {registerUser, authUser}