const express = require("express");
const profileRouter = express.Router();
const {userAuth} = require("../middleWare/auth");
const {profileValidate} = require("../utils/validation");
const validator = require("validator");
const bcrypt = require("bcrypt")


profileRouter.get("/profile/view", userAuth, async(req,res) => {
    try{
        const userDetails = res.userDetails
        res.send(userDetails)
    }
    catch(err){
        res.status(500).send("Error: " + err )
    }
})

profileRouter.patch("/profile/edit", userAuth, async(req, res) => {
    try{
        const updateNeeded = profileValidate(req);
        if(!updateNeeded) throw new Error("Can't able to Edit the profile");
        const loginDetails = res.userDetails;
        Object.keys(req.body).forEach((key) => {
            loginDetails[key] = req.body[key]
        })
        await loginDetails.save()
        res.json({message: "Profile Edited succesfully", data: loginDetails})
    }

    catch(err){
        res.status(500).send("Error: " + err )
    }
    
})

profileRouter.patch("/profile/passwordEdit", userAuth, async (req,res) => {
    try{
        // verify new pwd is diff from old one
        const userDetails = res.userDetails;
        const newPassword = req.body.password;
        const pwdMachWithOld = await userDetails.isPwdMatch(newPassword);
        if(pwdMachWithOld) throw new Error("Password is same as old one")
        // Verify new password is valid
        if(!validator.isStrongPassword(newPassword)) throw new Error("Enter a strong password")
        // include new pwd
        userDetails.password = await bcrypt.hash(newPassword,10);
        // save
        userDetails.save();
        // create new cookies
        const token = userDetails.createJwt();
        res.cookie("token", token)
        res.send("Successfully updated the password")
    }
    catch(err){
        res.status(500).send("Error: " + err )
    }
})
module.exports = profileRouter;