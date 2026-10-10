const express = require("express");
const profileRouter = express.Router();
const {userAuth} = require("../middleWare/auth")

profileRouter.get("/profile", userAuth, async(req,res) => {
    try{
        const userDetails = res.userDetails
        res.send(userDetails)
    }
    catch(err){
        res.status(500).send("Error: " + err )
    }
})

module.exports = profileRouter;