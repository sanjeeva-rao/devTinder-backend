const mongoose = require("mongoose");
const validator = require("validator");

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
        required: true,
        maxLength: 20
    }
})

const User = mongoose.model("user", userSchema)

module.exports = User;