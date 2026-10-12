const mongoose = require("mongoose");

const connectionRequestsSchema = new mongoose.Schema(
    {
        fromUserId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        toUserId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        connectionType: {
            type: String,
            required: true,
            enum: {
                values: ["interested", "ignored", "accepted", "rejected"],
                message: "Invalid connection type"
            }
        }
    },
    {
        timestamps: true
    }
)

connectionRequestsSchema.pre("save", function(req,res){
    if(this.fromUserId.equals(this.toUserId)) throw new Error("Can't send the requests to the same user");
})
const connectionRequestsModel = new mongoose.model("connectionRequests", connectionRequestsSchema)

module.exports = connectionRequestsModel