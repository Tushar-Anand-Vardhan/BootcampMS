const UserModel = require("../models/userModel");
// const IndividualAssignmentModel = require("../models/individualAssignmentModel");
const AssignmentModel = require("../models/assignmentModel");
const sendToken = require("../utils/jwtTokens");
const assignmentModel = require("../models/assignmentModel");

// Add a user, admin uses this method to add a new member to the bootcamp
// the new user can be a NCG, a mentor or another admin
exports.addUser = async (req,res,next)=>{
    try {
        const newUser = await UserModel.create(req.body);    
        res.status(201).json({
            success: true,
            newUser
        })

    } catch (error) {
        const errors = {email:"" , password: "" , name:""}

        if(error.code === 11000){
            errors.email = "This email is registered already";
            res.status(404).json({
                success: false,
                errors
            })
             
        }
    
        Object.values(error.errors).forEach(({properties})=>{
            errors[properties.path] = properties.message;

        })
        res.status(404).json({
            success: false,
            errors
        })
    }
    
    
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
        res.status(403).json({
            success:false,
            message:"User is not added to the bootcamp, please contact admin"
        })
        return
    }

    else {
        sendToken(user,200,res);
    }

}

//log out user
exports.logoutUser =async (req,res,next)=>{
    
    res.cookie("token" , null , {
        expires: new Date(Date.now()),
        httpOnly:true,
    })
    
    res.status(200).json({
        success: true,
        message:"logged out",
    })
}

exports.submitAssignment = async (req, res, next) => {

    const status = {
        NOTSUBMITED:0,
        SUBMMITED:1
    }

  //  const { assignId, ncgSubmittedLink } = req.body;
    const ncg_id_1 = req.user.id;
    const link = req.body.ncgSubmittedLink.link;
    const assignId = req.body.assignId;


    if (!assignId) {
        res.status(404).json({
            success: false,
            message: "Please enter your assignId"
        })
        return
    }
    const assn = await assignmentModel.findOne({ assignId });
    if (!assn) {
        res.status(403).json({
            success: false,
            message: "assignId"
        })
        return
    }

    else {
          

        const assn = await assignmentModel.findOne({ assignId });
        const statusnow = await assignmentModel.findOne({ncgSubmittedLink: {$elemMatch: {ncg_id: ncg_id_1}}})
        console.log(ncg_id_1);
        console.log("-------------------")
        console.log(statusnow);
        console.log("-------------------")
            if(statusnow != 1)
            {
                console.log("working")
            assn.ncgSubmittedLink.push({
                ncg_id : ncg_id_1 ,
                link,
                status:1
            })
            
            assn.save({validateBeforeSave:false});
                res.status(200).json({
                    success: true
                })
        }
        else{
                res.status(200).json({
                    success: false,
                    message: "You have already submitted your assn" 
                })
        }

        
    }
}

// submit assignment status ko submitted,

// save assignment link

// update submission , uysermodel,findbyid, take assignment id, update and push submit array --> eg --> team model,