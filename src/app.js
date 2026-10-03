const express = require("express");
const { createDatabse } = require("./Config/dataBase.js");
const app = express();
const User = require("./model/user.js")

app.use(express.json())

app.get("/user", async(req,res) => {
    try{
        const userData = await User.findOne({email: req.body.email})
        res.send(userData)
    }
    catch(err){
        res.status(400).send("Some thing went wrong !")
    }
})

// Get all the users from data base
app.get("/feed", async(req,res) => {
    try{
        const allData = await User.find({});
        res.send(allData)
    }
    catch(err){
        res.status(400).send("Some thing went wrong !")
    }
})

app.delete("/user", async(req,res)=>{
    try{
      const deletedData = await User.findByIdAndDelete(req.body.id);
      res.send(deletedData)
    }
    catch(err){
        res.status(400).send("Some thing went wrong !")
    }
})

app.patch("/user", async(req,res)=>{
    try{
        const updatedData = await User.findByIdAndUpdate(req.body._id, req.body, {returnDocument: "after"});
        res.send(updatedData)
    }
    catch(err){
        res.status(400).send("Some thing went wrong !", err)
    }
})

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