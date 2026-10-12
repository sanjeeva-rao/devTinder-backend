const express = require("express");
const connectionRequestRouter = express.Router();
const {userAuth} = require("../middleWare/auth");
const connectionRequestsSchema = require("../model/connectionRequests");
const User = require("../model/user");

connectionRequestRouter.post("/requests/send/:connectionType/:toUserId", userAuth,  async(req, res) => {
    try{
        const {connectionType, toUserId} = req.params;
        // Allow only interested and ignored
        const allowedRequestTypes = ["interested", "ignored"];
        if(allowedRequestTypes.indexOf(connectionType) === -1) throw new Error("Invalid request type");
        // Verify toUserId exists
        const toUserDetails = await User.findById(toUserId);
        if(!toUserDetails) throw new Error("Receiver user id not exists in DB");
        // compare from and to user id
        const fromUserId = res.userDetails._id;
        // Verify if any connection exist b/w from and to user id
        const existingReq = await connectionRequestsSchema.findOne({$or: [{fromUserId, toUserId}, {fromUserId: toUserId, toUserId: fromUserId}]})
        if(existingReq) throw new Error("Already connection exists b/w from and to user")
        const request = new connectionRequestsSchema({fromUserId,toUserId,connectionType})
        await request.save()
        res.json({message: "Sent Connection request successfully", data: request})
    }
    catch(err){
        res.status(500).send("Error: " + err )
    }
})

module.exports = connectionRequestRouter