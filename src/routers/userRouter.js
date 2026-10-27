const express = require("express");
const userRouter = express.Router();
const {userAuth} = require("../middleWare/auth");
const connectionRequestsSchema = require("../model/connectionRequests");
const User = require("../model/user");


userRouter.get("/user/allRequests", userAuth, async (req,res) => {
    try{
        const loginUser = res.userDetails;
        const requests = await connectionRequestsSchema.find({toUserId: loginUser._id, connectionType: "interested"}).populate("fromUserId");
        const requestsData = requests.map((req) => {
            return {
                connectionId : req._id,
                userId : req.fromUserId._id,
                firstName: req.fromUserId.firstName,
                lastName: req.fromUserId.lastName,
                skills: req.fromUserId.skills,
                age: req.fromUserId.age,
                photoUrl: req.fromUserId.photoUrl,
                id: req.fromUserId._id
            }
        })
        res.send(requestsData)
    }

    catch(err){
        res.status(400).json({message: "Error : " + err.message})
    }
})

userRouter.get("/user/connections", userAuth, async(req,res)=>{
     try{
        const loginUser = res.userDetails;
        const allConnections = await connectionRequestsSchema.find({$or: 
            [{fromUserId: loginUser._id, connectionType: "accepted"}, 
            {toUserId: loginUser._id, connectionType: "accepted"}
            ]}
        ).populate("toUserId fromUserId");
        const data = allConnections.map((con)=>{
            const otherUser = con.fromUserId._id.equals(loginUser._id) ? con.toUserId : con.fromUserId
            return{
                connectionId: req._id,
                firstName: otherUser.firstName,
                lastName: otherUser.lastName,
                skills: otherUser.skills,
                age: otherUser.age,
                photoUrl: otherUser.photoUrl,
                id: otherUser._id
            }
        })
        res.send(data)
    }

    catch(err){
        res.status(400).json({message: "Error : " + err.message})
    }
})

userRouter.get("/feed", userAuth, async(req,res) => {
    try{
        const loginUser = res.userDetails;
        // Find all the connections with login user
        const loginUserConnections = await connectionRequestsSchema.find({$or: [{fromUserId: loginUser._id}, {toUserId: loginUser.id}]});
        // create set and add hide users
        let hideUsers = new Set();
        hideUsers.add(loginUser._id.toString());
        loginUserConnections.forEach(function(connection){
            hideUsers.add(connection.fromUserId.toString());
            hideUsers.add(connection.toUserId.toString())
        })
        // Paginitation max limit 20
        let {page,limit} = req.query;
        if(!page) page = 1;
        if(!limit || limit > 20) limit = 20;

        page = Number(page)
        const skip = (page-1)*limit
        
        // Filter users other than himself and connections sent/received
        const feedUsers = await User.find({_id: {$nin: Array.from(hideUsers)}}).select("firstName lastName age skills gender photoUrl").limit(limit).skip(skip)
        res.send(feedUsers)
    }
    catch(err){
        res.status(400).json({message: "Error: "+err.message})
    }

})

module.exports = userRouter;