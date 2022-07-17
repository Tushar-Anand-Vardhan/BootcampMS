const mongoose = require("mongoose")

const assignmentSchema = mongoose.Schema({
    assignId: {
        type: Number,
        required: true,
    },
    title:{
        type:String,
        required: [true,"Please enter User Name"]
    },
    content: {
        type: String,
        required: [true, "Please enter assignment in detail"],
    },
    credit: {
        type: Number,
        required: [true, "Please enter assignment weightage"],
        default: 1
    },
    dueDate: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("AssignmentModel", assignmentSchema);
