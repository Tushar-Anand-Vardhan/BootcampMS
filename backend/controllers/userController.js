const UserModel = require("../models/userModel");

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

exports.registerNewUser = async (req,res,next)=>{

}