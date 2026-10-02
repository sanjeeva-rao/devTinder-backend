const adminAuth = (req,res,next)=>{
    // Add authentication
    console.log("Authentication......")
    let token = req.query.id
    if(token === "xyz"){
        next();
    }
    else{
        res.status(401).send("Un authorised")
    }
}

const userAuth = (req,res,next)=>{
    // Add authentication
    console.log("Authentication......")
    let token = req.query.id
    if(token === "xyz"){
        next();
    }
    else{
        res.status(401).send("Un authorised")
    }
}

module.exports = {adminAuth, userAuth}