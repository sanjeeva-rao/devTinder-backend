const express = require("express");
const userRouter = express.Router();
const {userAuth} = require("../middleWare/auth");
const connectionRequestsSchema = require("../model/connectionRequests");


userRouter.get("/user/allRequests", userAuth, async (req,res) => {
    try{
        const loginUser = res.userDetails;
        const requests = await connectionRequestsSchema.find({toUserId: loginUser._id, connectionType: "interested"}).populate("fromUserId");
        const requestsData = requests.map((req) => {
            return {
                connectionId : req._id,
                userId : req.fromUserId._id,
                firstName: req.fromUserId.firstName,
                lastName: req.fromUserId.lastName
            }
        })
        res.json({message: "All connection requests", data:  requestsData})
    }

    catch(err){
        res.status(400).json({message: "Error : " + err.message})
    }
})

userRouter.get("/user/connections", userAuth, async(req,res)=>{
     try{
        const loginUser = res.userDetails;
        console.log(loginUser)
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
                lastName: otherUser.lastName
            }
        })
        res.json({message: "All connections", data: data})
    }

    catch(err){
        res.status(400).json({message: "Error : " + err.message})
    }
})

module.exports = userRouter;