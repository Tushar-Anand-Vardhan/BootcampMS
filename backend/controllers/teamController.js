const TeamModel = require("../models/teamModel");

exports.addTeam = async (req,res,next)=>{
    const newTeam = await TeamModel.create(req.body);

    res.status(201).json({
        success: true,
        newTeam
    })
}
// used to display all the teams in the admins dashboard
exports.getAllTeams = async (req,res,next)=>{
    const allTeams = await TeamModel.find()
    res.status(200).json({
        success:true,
        allTeams
    })
}

exports.getTeam = async (req,res,next)=>{
    const team = awaitTeamModel.findById(req.params.id)
    res.status(200).json({
        success:true,
        team
    })
}

//Create team assignment
exports.createTeamAssignment = async (req,res,next)=>{
    const newAssignment = await AssignmentModel.create(req.body);
    const updatedAssignment = await TeamModel.updateOne(
        {teamId: req.params.id}, 
        { 
            $push: {  // mongo term
                teamAssignments: newAssignment
            } 
        })
    
    res.status(201).json({
        success: true,
        updatedAssignment
    })
}

// on the admin dashborad, the admin can add new members to a team
exports.addMember= async (req,res,next)=>{
    const updatedTeam = await TeamModel.updateOne(
        {id: req.params.id},
        {
            $push: {
                members: req.body.member
            }
        });

    console.log(updatedTeam)
    if(!updatedTeam){
        res.status(404).json({
            success:false,
            message:`Cannot add new member`
        })
    }

    res.status(200).json({
        success:true,
        updatedTeam
    })
}
// on admin dashboard, admin can delete a Team.
exports.removeTeam = async (req,res,next)=>{
    const deletedTeam = await TeamModel.findById(req.body.id);
    if(!deletedTeam){
        res.status(404).json({
            success:false,
            message:`Team does not exist`
        })
    }
    deletedTeam.remove();
    res.status(200).json({
        success:true,
        message:"Team deleted successfully"
    })
}
