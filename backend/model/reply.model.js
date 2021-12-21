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
    }
},
{
    timestamps:true
})

const Reply = mongoose.model("Reply", replySchema)

module.exports = Reply