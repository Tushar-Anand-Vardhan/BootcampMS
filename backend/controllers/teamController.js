const TeamModel = require("../models/teamModel");
const UserModel = require("../models/userModel");
const AssignmentModel = require("../models/assignmentModel");
const ErrorHandler = require("../utils/errorHandler");

// todo: array of ncg id 
exports.addTeam = async (req, res, next) => {
    const newTeam = await TeamModel.create(req.body);
    if (!newTeam) {
        return next(new ErrorHandler("team could not be created", 400))
    }
    res.status(201).json({
        success: true,
        newTeam
    })
}
// used to display all the teams in the admins dashboard
exports.getAllTeams = async (req, res, next) => {
    const allTeams = await TeamModel.find()
    if (!allTeams) {
        return next(new ErrorHandler("No teams added", 404))
    }
    const allTeamDetail = [];


    for (let i = 0; i < allTeams.length; i++) {
        var ncgList = [];
        const team = allTeams[i]
        for (let j = 0; j < team.teamMembers.length; j++) {
            const element = team.teamMembers[j];
            const usr = await UserModel.findById(element);
            if (!usr) {
                return next(new ErrorHandler(`user with id ${element} does not exists`, 404))
            }
            if (usr) {
                ncgList.push({ name: usr.name })
            }
        }
        const mentor = await UserModel.findById(team.teamMentor)
        if (!mentor) {
            return next(new ErrorHandler(`mentor with id ${team.teamMentor} does not exists`, 404));
        }
        allTeamDetail[i] = {
            name: team.teamName,
            ncgs: ncgList,
            mentor: mentor.name,

        }
    }

    res.status(200).json({
        success: true,
        allTeamDetail
    })
}

exports.getTeam = async (req, res, next) => {
    const team = awaitTeamModel.findById(req.params.id)
    if (!team) {
        return next(new ErrorHandler(`team with id ${req.parama.id} was not found`, 404))
    }
    res.status(200).json({
        success: true,
        team
    })
}

//Create team assignment
exports.createTeamAssignment = async (req, res, next) => {
    const newAssignment = await AssignmentModel.create(req.body);
    if (!newAssignment) {
        return next(new ErrorHandler("Assignment could not be created", 400))
    }
    const updatedAssignment = await TeamModel.updateOne({ teamId: req.params.id }, { $push: { teamAssignments: newAssignment } });
    if (!updatedAssignment) {
        return next(new ErrorHandler("team could not be updated", 400))
    }
    res.status(201).json({
        success: true,
        updatedAssignment
    })
}


// on admin dashboard, admin can delete a Team.
exports.removeTeam = async (req, res, next) => {
    const deletedTeam = await TeamModel.findById(req.body.id);
    if (!deletedTeam) {
        res.status(404).json({
            success: false,
            message: `Team does not exist`
        })
    }
    deletedTeam.remove();
    res.status(200).json({
        success: true,
        message: "Team deleted successfully"
    })
}
// create all teams at once, picking K memebers at a time.
exports.createAllTeams = async (req, res, next) => {
    const teamSize = 3; //number of NCG in a team
    const allUsers = await UserModel.find({ role: "NCG" }).select("id");
    const allMentors = await UserModel.find({ role: "mentor" }).select("id");

    if (!allUsers) {
        return next(new ErrorHandler("No users registered", 404));
    }
    const allUserIds = [];
    allUsers.forEach((usr) => {

        allUserIds.push(usr._id.toString())
    })
    const allMentorIds = [];
    allMentors.forEach((men) => {

        allMentorIds.push(men._id.toString())
    })
    const teams = [];
    let teamCount = 1;
    for (let i = 0; i < allUserIds.length; i += teamSize) {

        const teamMembersId = allUserIds.slice(i, i + teamSize);
        console.log(teamMembersId)
        teams.push({
            teamMentor: allMentorIds[(teamCount - 1) % allMentorIds.length],
            teamName: `Team${teamCount}`,
            teamMembers: teamMembersId
        })
        teamCount++;
    }
    const allTeams = await TeamModel.insertMany(teams);
    if (!allTeams) {
        return next(new ErrorHandler("Teams could not be added", 400));
    }

    allTeams.forEach((team) => {
        team.teamMembers.forEach(async (id) => {
            const usr = await UserModel.findById(id);
            if (!usr) {
                return next(new ErrorHandler(`user with id ${id} does not exist`, 404));
            }
            usr.team = team._id;
            usr.save({ validateBeforeSave: false });
        })
    })

    return res.status(200).json({
        success: true,
        allTeams
    })
}

//submit team assignment. One person submits and everyone in that team gets the marks added.
exports.submitTeamAssignment = async (req, res, next) => {
    const status = {
        NOTSUBMITED: 0,
        SUBMMITED: 1,
        MARKED: 2
    }
    const ncgId = req.user.id;
    const teamId = await UserModel.findById(ncgId).select("team")
    if (!teamId) {
        return next(new ErrorHandler("ncg does not exists", 404));
    }
    const link = req.body.teamSubmittedLink.link;
    const teamAssignId = req.params.teamAssignId;
    const assn = await AssignmentModel.findById(teamAssignId);
    if (!assn) {
        return next(new ErrorHandler("Assignment does not exists", 404))
    }
    else if (assn.dueDate - Date.now() < 0) {
        return next(new ErrorHandler("Due date for this assignment has passed"), 400)
    }
    else {
        const teamAssignment = assn.teamSubmittedLink.find((a) => {
            console.log()
            return (a.team_id === teamId.team);
        })

        if (teamAssignment.status === 0) {
            console.log(teamAssignment.dueDate, "hello", Date.now())

            assn.teamSubmittedLink.forEach((subLink) => {
                if (subLink.team_id === teamId.team) {
                    subLink.link = link;
                    subLink.status = status.SUBMMITED;
                }
            })

            assn.save({ validateBeforeSave: false });
            res.status(200).json({
                success: true
            });
        }
        else {
            return next(new ErrorHandler("You have already submitted your assignment", 401))
        }
    }
}

//getTeamMembers
exports.getTeamMembers = async (req, res, next) => {
    const ncgId = req.user.id;
    const { team } = await UserModel.findById(ncgId).select("team")
    if (!team) {
        return next(new ErrorHandler("User does not exists", 404))
    }
    const teamDetails = await TeamModel.findById(team).select(["teamMembers", "teamMentor"])
    if (!teamDetails) {
        return next(new ErrorHandler("team does not exists", 404))
    }
    var userList = [];

    for (let i = 0; i < teamDetails.teamMembers.length; i++) {
        const element = teamDetails.teamMembers[i];
        const usr = await UserModel.findById(element);
        if (usr) {
            userList.push({ name: usr.name, email: usr.email })
        }

    }
    const mentor = await UserModel.findById(teamDetails.teamMentor)

    console.log(userList)
    return res.status(200).json({
        success: true,
        userList,
        mentor
    })
}


