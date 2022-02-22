const mongoose = require('mongoose')
const Reply = require('./reply.model')

const questionSchema = mongoose.Schema({
    grade:{
        type:String,
        required:true
    },
    subject:{
        type:String,
        required:true
    },
    topic:{
        type:String,
        required:true
    },
    description:{
        type:String,

    },
    image:{
        type:String,
    },
    replies:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Reply"
    }],
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    }
},{
    timestamps:true
})

const Question = mongoose.model("Question", questionSchema)

module.exports = Question
