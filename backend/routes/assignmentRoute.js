const express = require("express")

const router = express.Router()
const { createAssignmentForAll, getAllAssignments, updateAssignment, deleteAssignment, getAssignment, getSingleUserSubmission, uploadOrUpdateMarks, createAssignmentForAllTeams, uploadOrUpdateTeamMarks, getAllTeamAssignments, uploadOrUpdateAllMarks, uploadOrUpdateAllTeamMarks } = require("../controllers/assignmentController");
const isAuthenticatedUser = require("../middleware/auth");
const authorizedRoles = require("../middleware/authRoles");


router.route("/getAllAssignments").get(isAuthenticatedUser, getAllAssignments);
router.route("/getAllTeamAssignments").get(isAuthenticatedUser, getAllTeamAssignments);
router.route("/admin/assignments/getAssignment/{assignId}").get(isAuthenticatedUser, authorizedRoles("admin"), getAssignment);
router.route("/admin/assignments/createAssignmentForAll").post(isAuthenticatedUser, authorizedRoles("admin"), createAssignmentForAll);
router.route("/admin/assignments/createAssignmentForAllTeams").post(isAuthenticatedUser, authorizedRoles("admin"), createAssignmentForAllTeams);
router.route("/admin/assignments/updateAssignment").post(isAuthenticatedUser, authorizedRoles("admin"), updateAssignment);
router.route("/admin/assignments/deleteAssignment").delete(isAuthenticatedUser, authorizedRoles("admin"), deleteAssignment);
router.route("/admin/assignments/getSingleUserSubmission/:assignmentId/:userId").get(isAuthenticatedUser, authorizedRoles("admin"), getSingleUserSubmission);
router.route("/admin/assignments/uploadOrUpdateMarks/:assignmentId/:userId").post(isAuthenticatedUser, authorizedRoles("admin"), uploadOrUpdateMarks);
router.route("/admin/assignments/uploadOrUpdateAllMarks/:assignmentId/").post(isAuthenticatedUser, authorizedRoles("admin"), uploadOrUpdateAllMarks);
router.route("/admin/assignments/uploadOrUpdateTeamMarks/:assignmentId/:teamId").post(isAuthenticatedUser, authorizedRoles("admin"), uploadOrUpdateTeamMarks);
router.route("/admin/assignments/uploadOrUpdateAllTeamMarks/:assignmentId").post(isAuthenticatedUser, authorizedRoles("admin"), uploadOrUpdateAllTeamMarks);


module.exports = router