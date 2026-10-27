const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength:3,
        maxLength:10
    },
    lastName: {
        type: String,
        minLength:3,
        maxLength:10
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        maxLength: 50,
        validate: function(val){
            if(validator.isEmail(val)){
                return true
            }
            else{
                return false
            }
        }
    },
    age: {
        type: Number,
        validate: function(val){
            if(val >= 18 && val <= 60 ){
                return true
            }
            else{
                return false
            }
        }
    },
    gender: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    "photoUrl": {
        type: String,
    },
    "skills": {
        type: String,
        maxLength: 100
    }
})

userSchema.methods.isPwdMatch = async function(userEnteredPwd){
    const userData = this;
    const hashPwd = userData.password;
    const pwdMatch = await bcrypt.compare(userEnteredPwd, hashPwd);
    return pwdMatch;
}

userSchema.methods.createJwt = function() {
    const userData = this;
    const token = jwt.sign({id: userData._id}, "dev@Tinder");
    return token;
}
const User = mongoose.model("user", userSchema)

module.exports = User;