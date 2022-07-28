const express = require("express")

const router = express.Router()
const { addTeam, getAllTeams, addMember, removeTeam, getTeam, createTeamAssignment, createAllTeams, submitTeamAssignment, getTeamMembers } = require("../controllers/teamController");
const isAuthenticatedUser = require("../middleware/auth");
const authorizedRoles = require("../middleware/authRoles");


router.route("/getAllTeams").get(isAuthenticatedUser, getAllTeams);
router.route("/admin/teams/getTeam/{teamId}").get(isAuthenticatedUser, getTeam);
router.route("/admin/teams/addTeam").post(isAuthenticatedUser, authorizedRoles("admin"), addTeam);
router.route("/admin/teams/createAssignment/{teamId}").post(isAuthenticatedUser, authorizedRoles("admin"), createTeamAssignment);
router.route("/admin/teams/removeTeam").delete(isAuthenticatedUser, authorizedRoles("admin"), removeTeam);
router.route("/admin/teams/createAllTeams").post(isAuthenticatedUser, authorizedRoles("admin"), createAllTeams);
router.route("/teams/submitTeamAssignment/:teamAssignId").post(isAuthenticatedUser, authorizedRoles("NCG"), submitTeamAssignment);
router.route("/teams/getTeamMembers").get(isAuthenticatedUser, getTeamMembers);


module.exports = router