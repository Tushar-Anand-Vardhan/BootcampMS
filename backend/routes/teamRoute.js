const express = require("express")

const router = express.Router()
const {addTeam, getAllTeams, addMember, removeTeam, getTeam, createTeamAssignment, createAllTeams, submitTeamAssignment} = require("../controllers/teamController");
const isAuthenticatedUser = require("../middleware/auth");


router.route("/getAllTeams").get(isAuthenticatedUser,getAllTeams);
router.route("/admin/teams/getTeam/{teamId}").get(isAuthenticatedUser,getTeam);
router.route("/admin/teams/addTeam").post(isAuthenticatedUser,addTeam);
router.route("/admin/teams/createAssignment/{teamId}").post(isAuthenticatedUser,createTeamAssignment);
router.route("/admin/teams/removeTeam").delete(isAuthenticatedUser,removeTeam);
router.route("/admin/teams/createAllTeams").post(isAuthenticatedUser,createAllTeams);
router.route("/teams/submitTeamAssignment/:teamAssignId").post(isAuthenticatedUser,submitTeamAssignment);



module.exports = router