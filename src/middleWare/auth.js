const jwt = require("jsonwebtoken");
const User = require("../model/user");

const userAuth = async(req,res,next)=>{
    try{
        const {token} = req.cookies;
        if(!token) throw new Error("Token expired");
        const decoded = jwt.verify(token, "dev@Tinder");
        const userId = decoded.id;
        const userDetils = await User.findById(userId);
        if(!userDetils) throw new Error("User not found")
        res.userDetails = userDetils;
        next()
    }
    catch(err){
        res.status(500).send("Error: " + err)
    }
}

module.exports = {userAuth}