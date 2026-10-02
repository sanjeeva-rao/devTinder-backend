const express = require("express");
const app = express();

app.listen(7777,function(){
    console.log("Server is listening on port number 7777")
})

app.use("/user", (req,res,next) => {
    console.log("User 1")
    //res.send("Hello User 1");
    next()
}, [(req,res, next)=>{
    console.log("User 2");
    //res.send("Hello User 2");
    next()
}],
    (req,res)=>{
        console.log("User 3");
        res.send("Hello User 3");
    }
)

app.use("/test", (req,res,next)=>{
    next()
})
app.use("/test", (req,res,next)=>{
    next()
}, (re,res,next) =>{
    res.send("Hello")
})