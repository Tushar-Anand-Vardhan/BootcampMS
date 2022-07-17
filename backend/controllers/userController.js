const UserModel = require("../models/userModel");
const IndividualAssignmentModel = require("../models/individualAssignmentModel");
const AssignmentModel = require("../models/assignmentModel");
const sendToken = require("../utils/jwtTokens");

// Add a user, admin uses this method to add a new member to the bootcamp
// the new user can be a NCG, a mentor or another admin
exports.addUser = async (req,res,next)=>{
    const newUser = await UserModel.create(req.body);

    res.status(201).json({
        success: true,
        newUser
    })
}
// get alll users, used to display all the users in the admins dashboard
exports.getAllUsers = async (req,res,next)=>{
    const allUsers = await UserModel.find()
    res.status(200).json({
        success:true,
        allUsers
    })
}
// Add a assignment, admin uses this method to add a new assignment for all users
exports.createAssignmentsForAll = async (req,res,next)=>{
    const newAssignment = await AssignmentModel.create(req.body);
    if(newAssignment) {
    const updatedAssignments = await UserModel.updateMany({}, 
        { $push: {
        assignments: req.body.assignment
    } })
    }
    
    res.status(201).json({
        success: true,
        newAssignment
    })
}
// on the admin dashborad, the admin can update 
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
// on admin dashboard, admin can delete a user.
exports.removeUser = async (req,res,next)=>{
    const deletedUser = await UserModel.findById(req.body.id);
    if(!deletedUser){
        res.status(404).json({
            success:false,
            message:`user does not exist`
        })
    }
    deletedUser.remove();
    res.status(200).json({
        success:true,
        message:"user deleted successfully"
    })
}

// register a new user,
// when a new user registers, it's checked in the admins owned list 
// and if the email is present then only, 
// that ncg / mentor / admin will be added to it's respective DM


exports.loginUser = async (req,res,next)=>{
    const {email} = req.body
    if(!email){
        res.status(404).json({
            success:false,
            message:"Please enter your Email"
        })
        return 
    }
    const user = await UserModel.findOne({ email });
    if(!user){
        res.status(401).json({
            success:false,
            message:"User is not added to the bootcamp, please contact admin"
        })
        return
    }

    else {
        sendToken(user,200,res);
    }

}