const mongoose = require("mongoose")
const assignmentSchema = mongoose.Schema({
    title: {
        type: String,
    },
    content: {
        type: String,
    },
    credit: {
        type: Number,
        default: 1
    },
    maxMarks: {
        type: Number,
        default: 100
    },
    dueDate: {
        type: Date,
        default: Date.now() + 2 * 24 * 60 * 60 * 1000 
    },
    assignmentType: {
        type: String,
        default: 'individual'
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
            default: ""
        },
        status: {
            type: Number,
            default: 0
        },
        date: {
            type: Date,
            default: Date.now
        },
        marks: {
            type: Number,
            default: 0
        }
    }],
    teamSubmittedLink: [{
        team_id: {
            type: String,
        },
        link: {
            type: String,
            default: ""
        },
        status: {
            type: Number,
            default: 0
        },
        date: {
            type: Date,
            default: Date.now
        },
        marks: {
            type: Number,
            default: 0
        }
    }],
    //status  -- > 0 , 1 -> sub  , 2 marks given, 3 --> due ( etc)  number
    //submission string , default
})




module.exports = mongoose.model("AssignmentModel", assignmentSchema);