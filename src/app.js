const express = require("express");
const app = express();
app.use("/1",(req,res)=>{
    res.send("hello world1")
})
app.use("/",(req,res)=>{
    res.send("hello world")
})
app.listen(1234,()=>{
    console.log("server is listening on port num 1244")
})