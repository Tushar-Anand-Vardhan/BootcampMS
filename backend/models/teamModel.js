const mongoose = require("mongoose");
const assignmentSchema = require("./assignmentModel");
const userSchema = require("./userModel")

const teamSchema = mongoose.Schema({
    teamName: {type:String},
    teamMembers : [{type: String}],
    teamAssignments : [{type: mongoose.Schema.Types.ObjectId, default:0, ref: assignmentSchema}],
    teamMentor:{type:String}
})

module.exports = mongoose.model("TeamModel", teamSchema);