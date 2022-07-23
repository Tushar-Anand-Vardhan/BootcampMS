const express = require("express")

const router = express.Router()
const {addTeam, getAllTeams, addMember, removeTeam, getTeam, createTeamAssignment, createAllTeams, submitTeamAssignment} = require("../controllers/teamController");
const isAuthenticatedUser = require("../middleware/auth");


router.route("/getAllTeams").get(getAllTeams);
router.route("/admin/teams/getTeam/{teamId}").get(getTeam);
router.route("/admin/teams/addTeam").post(addTeam);
router.route("/admin/teams/createAssignment/{teamId}").post(createTeamAssignment);
router.route("/admin/teams/removeTeam").delete(removeTeam);
router.route("/admin/teams/createAllTeams").post(createAllTeams);
router.route("/teams/submitTeamAssignment/:teamAssignId").post(isAuthenticatedUser,submitTeamAssignment);



module.exports = router