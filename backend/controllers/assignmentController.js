const AssignmentModel = require("../models/assignmentModel");
const UserModel = require("../models/userModel");
const TeamModel = require("../models/teamModel");
const ErrorHandler = require("../utils/errorHandler");

// Add a assignment, admin uses this method to add a new assignment

exports.createAssignmentForAll = async (req,res,next)=>{
    const allUsers = await UserModel.find({role:"NCG"});
    const allUserIds = [];
    allUsers.forEach((usr)=>{
        const x = {
            ncg_id: usr._id,
        }
        allUserIds.push(x)
    })
    const assnBody = {
        title: req.body.title,
        content: req.body.content,
        credit: req.body.credit,
        maxMarks: req.body.maxMarks,
        ncgSubmittedLink: allUserIds,
        
    }
    console.log(assnBody)
    const newAssignment = await AssignmentModel.create(assnBody);
    if(newAssignment){
        const allUsers = await UserModel.find();
        await UserModel.updateMany({'_id':{ $in : allUsers }},{ 
            $push:{
                assignments: newAssignment.id
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
// get all assignments in everyone's dashboard
exports.getAllAssignments = async (req,res,next)=>{
    const allAssignments = await AssignmentModel.find()
    res.status(200).json({
        success:true,
        allAssignments
    })
}

// get a particular assignment 
//will be used by admin for viewing individual assignments
exports.getAssignment = async (req,res,next)=>{
    const assignment = await AssignmentModel.findById(req.params.id)
    res.status(200).json({
        success:true,
        assignment
    })
}

// on the admin dashboard, the admin can modify
exports.updateAssignment = async (req,res,next)=>{
    const updatedAssignmentData = {
        assignId : req.body.id,
        title : req.body.newProblemStatement,
        content : req.body.newDescription,
        credit : req.body.newCredit,
        dueDate : req.body.newDate
    }

    const updatedAssignment = await AssignmentModel.findByIdAndUpdate(req.body.id , updatedAssignmentData,{
        new:true,
        runValidators:true,
        useFindAndModify: false,
    });
    console.log(updatedAssignment)
    res.status(200).json({
        success:true,
        updatedUser
    })
}
// on admin dashboard, admin can delete an assignment.
exports.deleteAssignment = async (req,res,next)=>{
    const deletedAssignment = await AssignmentModel.findById(req.body.id);
    if(!deletedAssignment){
        res.status(404).json({
            success:false,
            message:`Assignment does not exist`
        })
    }
    deletedUser.remove();
    res.status(200).json({
        success:true,
        message:"Assignment deleted successfully"
    })
}


// get submission details (link) of single user for a single assignment
exports.getSingleUserSubmission = async(req,res,next)=>{
    //todo
    const assignment = await AssignmentModel.findById(req.params.assignmentId)
    const userId = req.params.userId;

    const singleUserSubmission = assignment.ncgSubmittedLink.find((usr)=>{
        return (usr.ncg_id === userId)
    })
    console.log(singleUserSubmission);
    return res.status(200).json({
        success:true,
        singleUserSubmission
    })
}

// update marks for NCG with given ID -- send link and marks in body, usr n assn id in params

exports.uploadOrUpdateMarks = async (req,res,next) => {

    const status = {
        NOTSUBMITED:0,
        SUBMMITED:1,
        MARKED:2
    }
    console.log(req.user.name)
    const ncgId = req.params.userId
    const assignmentId = req.params.assignmentId;
    const {marks} = req.body;
    const assn = await AssignmentModel.findById(assignmentId);
    if (!assn) {
        return next(new ErrorHandler("Assignment does not exists",404))
    }
    else {
        if(marks > assn.maxMarks){
            return next(new ErrorHandler(`maximum marks for this assignment is ${assn.maxMarks}`,400))
        }
            const ncgAssignment = assn.ncgSubmittedLink.find((a)=>{
                return (a.ncg_id === ncgId);
            })
            if(ncgAssignment.status === 1){

                assn.ncgSubmittedLink.forEach((subLink)=>{
                if(subLink.ncg_id === ncgId){
                    subLink.marks = marks;
                    subLink.status = status.MARKED;
                }
            }); 

            assn.save({validateBeforeSave:false});
            res.status(200).json({
                success: true
            });

            const usr = await UserModel.findById(ncgId);
            usr.totalMarks += (marks*assn.credit*100)/assn.maxMarks;
            usr.save({validateBeforeSave:false});

            }
            else if(ncgAssignment.status === 2){
                return next(new ErrorHandler("You have already uploaded marks",401))
            }
            else{
                return next(new ErrorHandler("The NCG has not submitted the assignment",401))
            }
    }

}

// create assignment for all teams
exports.createAssignmentForAllTeams = async (req,res,next)=>{
    const allTeams = await TeamModel.find();
    const allTeamIds = [];
    allTeams.forEach((team)=>{
        const x = {
            team_id: team._id,
        }
        allTeamIds.push(x)
    })
    
    const teamAssnBody = {
        title: req.body.title,
        content: req.body.content,
        credit: req.body.credit,
        maxMarks: req.body.maxMarks,
        teamSubmittedLink: allTeamIds,
        
    }
    console.log(teamAssnBody)
    const newAssignment = await AssignmentModel.create(teamAssnBody);
    if(newAssignment){
        const allTeams = await TeamModel.find();
        await TeamModel.updateMany({'_id':{ $in : allTeams }},{ 
            $push:{
                teamAssignments: newAssignment._id
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