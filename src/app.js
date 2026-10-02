const express = require("express");
const app = express();
const { adminAuth, userAuth } = require("./middleWare/auth")
app.listen(7777,function(){
    console.log("Server is listening on port number 7777")
})

app.use("/admin", adminAuth)

app.get("/user/login", (req,res) => {
    res.send("Login successful")
})

app.use("/user", userAuth, function(req,res){
    res.send("Welcome user..")
})

app.get("/admin/getData", (req,res)=>{
    res.send("Get Data succesfully") 
})

app.delete("/admin/deleteData", (req,res)=>{
    res.send("Data deleted successfully");
})