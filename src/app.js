const express = require("express");
const { createDatabse } = require("./Config/dataBase.js");
const app = express();
const User = require("./model/user.js");
const {signUpValidation, loginValidation} = require("./utils/validation.js");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const {userAuth} = require("./middleWare/auth.js")

app.use(express.json());

app.use(cookieParser());

app.post("/signUp", async(req,res) => {
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

app.post("/login", async(req,res) => {
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

app.use("/", userAuth)

app.get("/profile", async(req,res) => {
    try{
        const userDetails = res.userDetails
        res.send(userDetails)
    }
    catch(err){
        res.status(500).send("Error: " + err )
    }
})

app.post("/sendRequest",  async(req, res) => {
    try{
        res.send("Sent Connection request successfully")
    }
    catch(err){
        res.status(500).send("Error: " + err )
    }
})

createDatabse().then(function(){
    console.log("connection success")
    app.listen(7777,function(){
        console.log("Server is listening on port number 7777")
    })
}).catch(function(){
    console.log("connection failed");
})