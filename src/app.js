const express = require("express");
const { createDatabse } = require("./Config/dataBase.js");
const app = express();
const cookieParser = require("cookie-parser");
const authRouter = require("./routers/authRouter.js");
const connectionRequestRouter = require("./routers/connectionRequests.js");
const profileRouter = require("./routers/profile.js");
const userRouter = require("./routers/userRouter.js");
const cors = require("cors")

app.use(express.json());

app.use(cookieParser());

app.use(cors({ origin: "http://localhost:5173",credentials:true}))

app.use("/", authRouter);
app.use("/", connectionRequestRouter);
app.use("/", profileRouter);
app.use("/", userRouter)

createDatabse().then(function(){
    console.log("connection success")
    app.listen(7777,function(){
        console.log("Server is listening on port number 7777")
    })
}).catch(function(){
    console.log("connection failed");
})