const express = require("express");
const authRouter = express.Router();
const {signUpValidation, loginValidation} = require("../utils/validation.js");
const User = require("../model/user.js");
const bcrypt = require("bcrypt");

authRouter.post("/signUp", async(req,res) => {
    try{
        // add validation
        signUpValidation(req);
        // hash password
        const hashPwd = await bcrypt.hash(req.body.password,10);
        req.body.password = hashPwd;
        // create new instance of user model
        const userData = new User(req.body);
        await userData.save();
        res.send("signup successfull")
    }
    catch(err){
        res.status(500).send("Error: " + err )
    }
   
})

authRouter.post("/login", async(req,res) => {
    try{
        const {email,password} = req.body;
        loginValidation(email,password);
        const userData = await User.findOne({email: email});
        const pwdMatch = await userData.isPasswordValid(password);
        if(!pwdMatch) throw new Error("Invalid password")
        // create jwt
        const token = userData.createJwt();
        // create cooke
        res.cookie("token", token)
        res.send("Successfully completed login");
    }
    catch(err){
        res.status(500).send("Error: " + err )
    }
});

module.exports = authRouter;