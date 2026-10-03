const express = require("express");
const { createDatabse } = require("./Config/dataBase.js");
const app = express();
const User = require("./model/user.js")

app.post("/signUp", async(req,res) => {
    // create new instance of user model
    const userData = new User({
        firstName: "Sanjeeva",
        lastName: "Rao",
        email: "Sanju@123.com",
        gender: "male",
        age: "28"
    })
    await userData.save();
    res.send("signup successfull")
})
createDatabse().then(function(){
    console.log("connection success")
    app.listen(7777,function(){
        console.log("Server is listening on port number 7777")
    })
}).catch(function(){
    console.log("connection failed");
})