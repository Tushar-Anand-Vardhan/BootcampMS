const express = require("express")

const router = express.Router()
const {addTeam, getAllTeams, addMember, removeTeam, getTeam, createTeamAssignment, createAllTeams} = require("../controllers/teamController")


router.route("/getAllTeams").get(getAllTeams);
router.route("/admin/teams/getTeam/{teamId}").get(getTeam);
router.route("/admin/teams/addTeam").post(addTeam);
router.route("/admin/teams/createAssignment/{teamId}").post(createTeamAssignment);
router.route("/admin/teams/removeTeam").delete(removeTeam);
router.route("/admin/teams/createAllTeams").post(createAllTeams);




module.exports = router