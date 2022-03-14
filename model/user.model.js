const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    field:[String],
    pic:{
        type:String,
        required:true,
        default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    userRole:{
        type:String,
        enum:['basic','editor','admin'],
        default:'basic'
    }

},{
    timestamps:true
});

// encrypt user password

userSchema.pre("save", async function (next) {
    if(!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

// decrypt password
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

const User = mongoose.model('User',userSchema);

module.exports = User;
