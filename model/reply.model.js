const mongoose = require('mongoose')

const replySchema = mongoose.Schema({
    text:{
        type:String,
        require:true
    },
    image:{
        type:String,
    },
    url:{
        type:String
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    questionId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Question"
    }
},
{
    timestamps:true
})

const Reply = mongoose.model("Reply", replySchema)

module.exports = Reply