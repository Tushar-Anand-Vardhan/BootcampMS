const mongoose = require("mongoose")
const assignmentSchema = require("./assignmentModel");
const validator = require("validator")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

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
        select: false,
        default:""
    },
    role:{
        type: String,
        default: "NCG"
    },
    totalMarks:{
        type: Number,
        default: 0
    },
    assignments:[{type: String}],
})




// JWT TOKEN
userSchema.methods.getJWTToken = function(){
    return jwt.sign({id: this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE,
    });
}

// Encrypting password before saving
userSchema.pre("save",async function(next){

    if(!this.isModified("password")){
        next();
    }

    this.password = await bcrypt.hash(this.password,10);
})

// compare passwords
userSchema.methods.comparePassword = async function(password){
    
    return await bcrypt.compare(password,this.password);
}



module.exports = mongoose.model("UserModel", userSchema);
