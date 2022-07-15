const AssignmentModel = require("../models/assignmentModel");

// Add a assignment, admin uses this method to add a new assignment
exports.createAssignment = async (req,res,next)=>{
    const newAssignment = await AssignmentModel.create(req.body);

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
    const assignment = await AssignmentModel.findById(req.body.id)
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
        dueDate : req.body.newDate
    }

    const updatedAssignment = await AssignmentModel.findByIdAndUpdate(req.body.id , updatedAssignmentData,{
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
