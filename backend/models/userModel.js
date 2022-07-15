const mongoose = require("mongoose")
const validator = require("validator")
const jwt = require("jsonwebtoken")
const userSchema = mongoose.Schema({
    name:{
        type:String,
        required: [true,"Please enter User Name"]
    },
    email:{
        type: String,
        required: [true, "Please enter your email"],
        unique: true,
        validate: [validator.isEmail , "please enter a valid email"] 
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

// JWT TOKEN
userSchema.methods.getJWTToken = function(){
    return jwt.sign({id: this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE,
    });
}

module.exports = mongoose.model("UserModel", userSchema);
