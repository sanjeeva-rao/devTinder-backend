const express = require("express");
const connectionRequestRouter = express.Router();
const {userAuth} = require("../middleWare/auth");

connectionRequestRouter.post("/sendRequest", userAuth,  async(req, res) => {
    try{
        res.send("Sent Connection request successfully")
    }
    catch(err){
        res.status(500).send("Error: " + err )
    }
})

module.exports = connectionRequestRouter