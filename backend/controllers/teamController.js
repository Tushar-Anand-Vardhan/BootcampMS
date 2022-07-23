const TeamModel = require("../models/teamModel");
const UserModel = require("../models/userModel");

// todo: array of ncg id 
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
            $push: {
                teamAssignments: newAssignment
            } 
        })
    
    res.status(201).json({
        success: true,
        updatedAssignment
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

exports.createAllTeams = async (req,res,next)=>{
    const teamSize = 3;
    const allUsers = await UserModel.find({role:"NCG"}).select("id");
    const allUserIds = [];
    allUsers.forEach((usr)=>{
  
        allUserIds.push(usr._id.toString())
    })
    const teams = [];
    for (let i = 0; i < allUserIds.length; i += teamSize) {
        const teamMembersId = allUserIds.slice(i, i + teamSize);
        console.log(teamMembersId)
        teams.push({
            teamName: `Team${i+1}`,
            teamMembers: teamMembersId
        })
    }
    console.log(teams)
    const allTeams = await TeamModel.insertMany(teams);
    return res.status(200).json({
        success:true,
        allTeams
    })
}
