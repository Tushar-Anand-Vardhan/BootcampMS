const AssignmentModel = require("../models/assignmentModel");
const UserModel = require("../models/userModel");
const TeamModel = require("../models/teamModel");
const ErrorHandler = require("../utils/errorHandler");

// Add a assignment, admin uses this method to add a new assignment

exports.createAssignmentForAll = async (req, res, next) => {
    const allUsers = await UserModel.find({ role: "NCG" });
    if (!allUsers) {
        return next(new ErrorHandler("No NCGs added", 404))
    }
    const allUserIds = allUsers.map(user => { return { ncg_id: user._id } })

    const assnBody = {
        title: req.body.title,
        content: req.body.content,
        credit: req.body.credit,
        maxMarks: req.body.maxMarks,
        assignmentType: "individual",
        ncgSubmittedLink: allUserIds,

    }
    console.log(assnBody)
    const newAssignment = await AssignmentModel.create(assnBody);
    if (!newAssignment) {
        return next(new ErrorHandler("Could not create an assignment", 400))
    }
    if (newAssignment) {
        const allUsers = await UserModel.find();
        if (!allUsers) {

        }
        await UserModel.updateMany({ '_id': { $in: allUsers } }, {
            $push: {
                assignments: newAssignment.id
            }
        })



    } else {
        return next(new ErrorHandler("No NCGs added", 404));
    }

    res.status(201).json({
        success: true,
        newAssignment
    })
}
// get all assignments in everyone's dashboard
exports.getAllAssignments = async (req, res, next) => {
    const allAssignments = await AssignmentModel.find({ assignmentType: 'individual' })
    if (!allAssignments) {
        return next(new ErrorHandler("No individual assignment exists", 404))
    }
    res.status(200).json({
        success: true,
        allAssignments
    })
}

// get all assignments in everyone's dashboard
exports.getAllTeamAssignments = async (req, res, next) => {
    const allAssignments = await AssignmentModel.find({ assignmentType: 'team' })
    if (!allAssignments) {
        return next(new ErrorHandler("No team assignment exists", 404))
    }
    res.status(200).json({
        success: true,
        allAssignments
    })
}

// get a particular assignment 
//will be used by admin for viewing individual assignments
exports.getAssignment = async (req, res, next) => {
    const assignment = await AssignmentModel.findById(req.params.id)
    if (!assignment) {
        return next(new ErrorHandler("Assignment with given id does not exists", 404))
    }
    res.status(200).json({
        success: true,
        assignment
    })
}

// on the admin dashboard, the admin can modify
exports.updateAssignment = async (req, res, next) => {
    const updatedAssignmentData = {
        assignId: req.body.id,
        title: req.body.newProblemStatement,
        content: req.body.newDescription,
        credit: req.body.newCredit,
        dueDate: req.body.newDate
    }

    const updatedAssignment = await AssignmentModel.findByIdAndUpdate(req.body.id, updatedAssignmentData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    if (!updatedAssignment) {
        return next(new ErrorHandler("Could not update the assignment", 400))
    }
    res.status(200).json({
        success: true,
        message: "User updated successfully",
        updatedUser
    })
}
// on admin dashboard, admin can delete an assignment.
exports.deleteAssignment = async (req, res, next) => {
    const deletedAssignment = await AssignmentModel.findById(req.body.id);
    if (!deletedAssignment) {
        res.status(404).json({
            success: false,
            message: `Assignment does not exist`
        })
    }
    deletedUser.remove();
    res.status(200).json({
        success: true,
        message: "Assignment deleted successfully"
    })
}


// get submission details (link) of single user for a single assignment
exports.getSingleUserSubmission = async (req, res, next) => {
    //todo
    const assignment = await AssignmentModel.findById(req.params.assignmentId)
    if (!assignment) {
        return next(new ErrorHandler('Assignment does not exists', 404))
    }
    const userId = req.params.userId;
    const singleUserSubmission = assignment.ncgSubmittedLink.find((usr) => usr.ncg_id === userId)
    return res.status(200).json({
        success: true,
        singleUserSubmission
    })
}

// update marks for NCG with given ID -- send link and marks in body, usr n assn id in params
exports.uploadOrUpdateAllMarks = async (req, res, next) => {
    const status = {
        NOTSUBMITED: 0,
        SUBMMITED: 1,
        MARKED: 2
    }
    const assignmentId = req.params.assignmentId;
    const data = req.body


    data.forEach(async (x) => {
        const assn = await AssignmentModel.findById(assignmentId);
        if (!assn) {
            return next(new ErrorHandler("Assignment does not exists", 404))
        }
        else {
            const ncgId = x.ncgId;
            const marks = x.marks;
            if (marks > assn.maxMarks) {
                return next(new ErrorHandler(`maximum marks for this assignment is ${assn.maxMarks}`, 400))
            }
            const ncgAssignment = assn.ncgSubmittedLink.find((a) => {
                return (a.ncg_id === ncgId);
            })

            if (ncgAssignment.status === status.SUBMMITED) {

                assn.ncgSubmittedLink.forEach((subLink) => {
                    if (subLink.ncg_id === ncgId) {
                        subLink.marks = marks;
                        subLink.status = status.MARKED;
                    }
                });

                await assn.save({ validateBeforeSave: false });

                const usr = await UserModel.findById(ncgId);
                if (!assn) {
                    return next(new ErrorHandler("user does not exists", 404))
                }
                usr.totalMarks += (marks * assn.credit * 100) / assn.maxMarks;
                await usr.save({ validateBeforeSave: false });

            }
            else if (ncgAssignment.status === status.MARKED) {
                return next(new ErrorHandler("You have already uploaded marks", 405))
            }
            else {
                return next(new ErrorHandler("The NCG has not submitted the assignment", 405))
            }

        }
    });

    res.status(200).json({ success: true })
}

exports.uploadOrUpdateMarks = async (req, res, next) => {

    const status = {
        NOTSUBMITED: 0,
        SUBMMITED: 1,
        MARKED: 2
    }
    const ncgId = req.params.userId
    const assignmentId = req.params.assignmentId;
    const { marks } = req.body;
    const assn = await AssignmentModel.findById(assignmentId);
    if (!assn) {
        return next(new ErrorHandler("Assignment does not exists", 404))
    }
    else {
        if (marks > assn.maxMarks) {
            return next(new ErrorHandler(`maximum marks for this assignment is ${assn.maxMarks}`, 400))
        }
        const ncgAssignment = assn.ncgSubmittedLink.find((a) => {
            return (a.ncg_id === ncgId);
        })
        if (ncgAssignment.status === 1) {

            assn.ncgSubmittedLink.forEach((subLink) => {
                if (subLink.ncg_id === ncgId) {
                    subLink.marks = marks;
                    subLink.status = status.MARKED;
                }
            });

            assn.save({ validateBeforeSave: false });
            res.status(200).json({
                success: true
            });

            const usr = await UserModel.findById(ncgId);
            usr.totalMarks += (marks * assn.credit * 100) / assn.maxMarks;
            usr.save({ validateBeforeSave: false });

        }
        else if (ncgAssignment.status === 2) {
            return next(new ErrorHandler("You have already uploaded marks", 405))
        }
        else {
            return next(new ErrorHandler("The NCG has not submitted the assignment", 405))
        }
    }

}

// create assignment for all teams
exports.createAssignmentForAllTeams = async (req, res, next) => {
    const allTeams = await TeamModel.find();
    if (!allTeams) {
        return next(new ErrorHandler("Teams have not been created", 404))
    }
    const allTeamIds = [];
    allTeams.forEach((team) => {  //use map instead of forEach
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
        assignmentType: "team",
        teamSubmittedLink: allTeamIds,

    }
    console.log(teamAssnBody)
    const newAssignment = await AssignmentModel.create(teamAssnBody);
    if (newAssignment) {
        const allTeams = await TeamModel.find();
        await TeamModel.updateMany({ '_id': { $in: allTeams } }, {
            $push: {
                teamAssignments: newAssignment._id
            }
        })
    } else {
        return next(new ErrorHandler("Assignment could not be created", 404));
    }

    res.status(201).json({
        success: true,
        newAssignment
    })
}

// update marks for Team with given ID -- send link and marks in body, usr n assn id in params

exports.uploadOrUpdateAllTeamMarks = async (req, res, next) => {
    const status = {
        NOTSUBMITED: 0,
        SUBMMITED: 1,
        MARKED: 2
    }

    const assignmentId = req.params.assignmentId;
    const data = req.body

    data.forEach(async (x) => {
        const teamId = x.teamId;
        const marks = x.marks;
        const assn = await AssignmentModel.findById(assignmentId);
        if (!assn) {
            return next(new ErrorHandler("Assignment does not exists", 404))
        }
        else {
            if (marks > assn.maxMarks) {
                return next(new ErrorHandler(`maximum marks for this assignment is ${assn.maxMarks}`, 400))
            }
            const teamAssignment = assn.teamSubmittedLink.find((a) => {

                return (a.team_id === teamId);
            });

            if (teamAssignment.status === status.SUBMMITED) {

                assn.teamSubmittedLink.forEach((subLink) => {
                    if (subLink.team_id === teamId) {
                        subLink.marks = marks;
                        subLink.status = status.MARKED;
                    }
                });

                await assn.save({ validateBeforeSave: false });

                const team = await TeamModel.findById(teamId).select("teamMembers");
                if (!team) {
                    return next(new ErrorHandler(`team wth id ${teamId} does not exists`, 404))
                }
                team.teamMembers.forEach(async (member) => {
                    const usr = await UserModel.findById(member);
                    if (!usr) {
                        return next(new ErrorHandler(`user with id ${member} does not exist`, 404))
                    }
                    usr.totalMarks += (marks * assn.credit * 100) / assn.maxMarks
                    await usr.save({ validateBeforeSave: false });
                })

            }

        }
    });
    res.status(200).json({
        success: true
    });
}


exports.uploadOrUpdateTeamMarks = async (req, res, next) => {

    const status = {
        NOTSUBMITED: 0,
        SUBMMITED: 1,
        MARKED: 2
    }
    const teamId = req.params.teamId
    const assignmentId = req.params.assignmentId;
    const { marks } = req.body;
    const assn = await AssignmentModel.findById(assignmentId);
    if (!assn) {
        return next(new ErrorHandler("Assignment does not exists", 404))
    }
    else {
        if (marks > assn.maxMarks) {
            return next(new ErrorHandler(`maximum marks for this assignment is ${assn.maxMarks}`, 400))
        }
        const teamAssignment = assn.teamSubmittedLink.find((a) => {

            return (a.team_id === teamId);
        })
        if (teamAssignment.status === status.SUBMMITED) {

            assn.teamSubmittedLink.forEach((subLink) => {
                if (subLink.team_id === teamId) {
                    subLink.marks = marks;
                    subLink.status = status.MARKED;
                }
            });

            assn.save({ validateBeforeSave: false });
            res.status(200).json({
                success: true
            });

            const team = await TeamModel.findById(teamId).select("teamMembers");
            console.log("hello")
            console.log(team.teamMembers)

            team.teamMembers.forEach(async (member) => {
                const usr = await UserModel.findById(member);
                usr.totalMarks += (marks * assn.credit * 100) / assn.maxMarks
                usr.save({ validateBeforeSave: false });
            })

        }
        else if (teamAssignment.status === status.MARKED) {
            return next(new ErrorHandler("You have already uploaded marks", 401))
        }
        else {
            return next(new ErrorHandler("The NCG has not submitted the assignment", 401))
        }
    }

}
