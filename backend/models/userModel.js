const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required: [true,"Please enter User Name"]
    },
    email:{
        type: String,
        required: [true, "Please enter your email"],
        unique: true,
    },
    password:{
        type: String,
        required: [true, "Please enter your password"],
        minlength: [8 , "password should be more than 8 character"],
        select: false,
    },
    role:{
        type: String,
        default: "NCG"
    },
    teamAssignments:{
        teamId:Number,
        assignments:[
            {
                title:String,
                marks:Number,
                submittedAt: Date
            }
        
        ]
    },
    assignments:{
        
            title:String,
            marks:Number,
            submittedAt: Date
        
    },

})

module.exports = mongoose.model("UserModel", userSchema);
