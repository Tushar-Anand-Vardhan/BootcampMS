const ErrorHandler = require("../utils/errorHandler");
const UserModel = require("../models/userModel");
const AssignmentModel = require("../models/assignmentModel");
const sendToken = require("../utils/jwtTokens");
const validatePassword = require("../utils/passValidator");
const excelToJson = require("../utils/excelToJson");


exports.addUserFromExcel = async (req,res,next)=>{
    const userList = excelToJson()
    console.log(userList)
    UserModel.insertMany(userList)
    .then(function (docs) {
        res.json(docs);
    })
    .catch(function (err) {
        res.status(500).send(err);
    });
}

exports.addUser = async (req,res,next)=>{
    try {
        const newUser = await UserModel.create(req.body);    
        res.status(201).json({
            success: true,
            newUser
        })

    } catch (error) {
        const errors = {email:"", name:""}

        if(error.code === 11000){
            errors.email = "This email is registered already";
            return res.status(404).json({
                success: false,
                errors
            })
             
        }
        Object.values(error.errors).forEach(({properties})=>{
            errors[properties.path] = properties.message;

        })
        return res.status(404).json({
            success: false,
            errors
        })
    }
    
    
}

exports.getAllUsers = async (req,res,next)=>{
    const allUsers = await UserModel.find()
    res.status(200).json({
        success:true,
        allUsers
    })
}

exports.createAssignmentsForAll = async (req,res,next)=>{
    const newAssignment = await AssignmentModel.create(req.body);
    if(newAssignment){
        const updatedAssignments = await UserModel.updateMany({},{ 
            $push:{
                assignments: req.body.assignment
            } 
        })
    }else{
        return next(new ErrorHandler("Assignment could not be created",404));
    }
    
    res.status(201).json({
        success: true,
        newAssignment
    })
}

exports.updateUser = async (req,res,next)=>{
    const updatedUserData = {
        name : req.body.newName,
        email : req.body.newEmail,
        role : req.body.newRole,
        id : req.body.id
    }

    const updatedUser = await UserModel.findByIdAndUpdate(req.body.id , updatedUserData ,{
        new:true,
        runValidators:true,
        useFindAndModify: false,
    });
    console.log(updatedUser)
    res.status(200).json({
        success:true,
        updatedUser
    })
}

exports.removeUser = async (req,res,next)=>{
    const deletedUser = await UserModel.findById(req.body.id);
    if(!deletedUser){
        return next(new ErrorHandler("user does not exist",404));
    }
    deletedUser.remove();
    res.status(200).json({
        success:true,
        message:"user deleted successfully"
    })
}


exports.registerUser = async (req,res,next)=>{
    const {email , password } = req.body;
    if(!email || !password){
        return next(new ErrorHandler("Please enter your Email and password",404));
    }
    const user = await UserModel.findOne({email}).select("+password");
    if(!user){
        return next(new ErrorHandler("User is not added to the bootcamp, please contact admin",403));
    }
    // TOOD: send confirmation email , OTP
    if(user.password!==""){
        return next(new ErrorHandler("User is already registered",404));
    }
    
    const errors = validatePassword(password);
    console.log(errors)
    if(errors.length === 0){
        user.password = req.body.password;
        await user.save({validateBeforeSave:false});
        sendToken(user,200,res);
    }
    else{
        return res.status(404).json({
            success:false,
            errors
        }) 
    }
}
exports.loginUser = async (req,res,next)=>{
    const {email,password} = req.body
    if(!email || !password){
        return next(new ErrorHandler("Please enter your Email and password",400));
    }
    const user = await UserModel.findOne({ email }).select("+password");

    if(!user || user.password===""){
        return next(new ErrorHandler("User is not added to the bootcamp, please contact admin",401));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if(!isPasswordMatched){
        return next(new ErrorHandler("invalid email or password",401));
    }

    else {
        sendToken(user,200,res);
    }

}


exports.logoutUser =async (req,res,next)=>{
    const {name} = req.user;
    res.cookie("token" , null , {
        expires: new Date(Date.now()),
        httpOnly:true,
    })
    res.status(200).json({
        success: true,
        message:`${name} logged out`,
    })
}

// TODO: API to submit 