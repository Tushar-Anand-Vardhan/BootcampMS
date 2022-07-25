const express = require("express")

const router = express.Router()
const {createAssignmentForAll, getAllAssignments, updateAssignment, deleteAssignment, getAssignment, getSingleUserSubmission, uploadOrUpdateMarks, createAssignmentForAllTeams, uploadOrUpdateTeamMarks, getAllTeamAssignments} = require("../controllers/assignmentController");
const isAuthenticatedUser = require("../middleware/auth");


router.route("/getAllAssignments").get(isAuthenticatedUser,getAllAssignments);
router.route("/getAllTeamAssignments").get(isAuthenticatedUser,getAllTeamAssignments);
router.route("/admin/assignments/getAssignment/{assignId}").get(isAuthenticatedUser,getAssignment);
router.route("/admin/assignments/createAssignmentForAll").post(isAuthenticatedUser,createAssignmentForAll);
router.route("/admin/assignments/createAssignmentForAllTeams").post(isAuthenticatedUser,createAssignmentForAllTeams);
router.route("/admin/assignments/updateAssignment").post(isAuthenticatedUser,updateAssignment);
router.route("/admin/assignments/deleteAssignment").delete(isAuthenticatedUser,deleteAssignment);
router.route("/admin/assignments/getSingleUserSubmission/:assignmentId/:userId").get(isAuthenticatedUser,getSingleUserSubmission);
router.route("/admin/assignments/uploadOrUpdateMarks/:assignmentId/:userId").post(isAuthenticatedUser,uploadOrUpdateMarks);
router.route("/admin/assignments/uploadOrUpdateTeamMarks/:assignmentId/:teamId").post(isAuthenticatedUser,uploadOrUpdateTeamMarks);





module.exports = router