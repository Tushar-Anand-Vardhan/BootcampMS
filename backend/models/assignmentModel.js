const mongoose = require("mongoose")

const assignmentSchema = mongoose.Schema({
    assignId: {
        type: Number,
        required: true,
    },
    title:{
        type:String,
        required: [true,"Please enter Assignemnt Name"]
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
        default: Date.now // to do + ask future date
    },

    status: {
        type: Number,
        default: 0
    }

    //status  -- > 0 , 1 -> sub  , 2 marks given, 3 --> due ( etc)  number



    //submission string , default 
})

module.exports = mongoose.model("AssignmentModel", assignmentSchema);
