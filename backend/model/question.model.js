const mongoose = require('mongoose')
const Reply = require('./reply.model')

const questionSchema = mongoose.Schema({
    category:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
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

