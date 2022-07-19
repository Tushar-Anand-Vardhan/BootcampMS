const mongoose = require("mongoose")
const assignmentSchema = mongoose.Schema({
    title:{
        type:String,
    },
    content: {
        type: String,
    },
    credit: {
        type: Number,
        default: 1
    },
    dueDate: {
        type: Date,
        default: Date.now // to do + ask future date
    },
    AllAssignmentStatus: {
        type: Number,
        default: 0
    },
    ncgSubmittedLink: [{
        ncg_id: {
            type: String,
        },
        link: {
            type: String,
        },
        status: {
            type: Number,
            default: 0
        },
        date:{
            type: Date,
            default: Date.now
        }
    }],
    //status  -- > 0 , 1 -> sub  , 2 marks given, 3 --> due ( etc)  number
    //submission string , default
})


module.exports = mongoose.model("AssignmentModel", assignmentSchema);