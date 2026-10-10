const validator = require("validator")
const signUpValidation = (req) => {
    const {firstName, lastName, email, password} = req.body;
    if(!firstName){
        throw new Error("Enter first name")
    }
    if(!email){
        throw new Error("Enter Email")
    }
    if(!validator.isEmail(email)){
        throw new Error("Invalid email")
    }
    if(!validator.isStrongPassword(password)) {
        throw new Error("Enter strong password")
    }
}

const loginValidation = (email,password) => {
    if(!email){
        throw new Error("Enter email")
    }
    if(!validator.isEmail(email)) {
        throw new Error("Invalid email")
    }
}

const profileValidate = (req) => {
    const editIncludes = ["firstName", "lastName", "age", "gender"];
    const isUpdateNeeded = Object.keys(req.body).every(key => editIncludes.includes(key));
    return isUpdateNeeded;
}

module.exports = {signUpValidation, loginValidation, profileValidate}