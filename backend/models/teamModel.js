const mongoose = require("mongoose")

const teamSchema = mongoose.Schema({
    teamId: {
        type: Number,
        ref: "Team No ",
        required: [true,"Please enter Team No."]
    },
   
    members : [
    {
        name:{
            type:String,
            required: [true]
        },
        email:{
            type: String,
            required: [true],
            unique: true,
        }
    }
]
})
module.exports = mongoose.model("TeamModel", teamSchema);