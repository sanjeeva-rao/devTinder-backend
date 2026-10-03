const express = require("express");
const { createDatabse } = require("./Config/dataBase.js");
const app = express();
const User = require("./model/user.js")

app.use(express.json())
app.post("/signUp", async(req,res) => {
    // create new instance of user model
    const userData = new User(req.body)
    try{
        await userData.save();
        res.send("signup successfull")
    }
    catch{
        res.status(500).send("Signup failed")
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