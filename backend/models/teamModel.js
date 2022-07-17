const mongoose = require("mongoose");
const assignmentSchema = require("./assignmentModel");
const userSchema = require("./userModel")

const teamSchema = mongoose.Schema({
    teamId: {
        type: Number,
        required: true
    },
    members : [{type: mongoose.Schema.Types.ObjectId, required: true, ref: userSchema}],
    teamAssignments : [{type: mongoose.Schema.Types.ObjectId, default:0, ref: assignmentSchema}]
})

module.exports = mongoose.model("TeamModel", teamSchema);