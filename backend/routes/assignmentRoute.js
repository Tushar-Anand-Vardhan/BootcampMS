const express = require("express")

const router = express.Router()
const {createAssignmentForAll, getAllAssignments, updateAssignment, deleteAssignment, getAssignment, getSingleUserSubmission, uploadOrUpdateMarks, createAssignmentForAllTeams} = require("../controllers/assignmentController");
const isAuthenticatedUser = require("../middleware/auth");


router.route("/getAllAssignments").get(getAllAssignments);
router.route("/admin/assignments/getAssignment/{assignId}").get(getAssignment);
router.route("/admin/assignments/createAssignmentForAll").post(createAssignmentForAll);
router.route("/admin/assignments/createAssignmentForAllTeams").post(createAssignmentForAllTeams);
router.route("/admin/assignments/updateAssignment").post(updateAssignment);
router.route("/admin/assignments/deleteAssignment").delete(deleteAssignment);
router.route("/admin/assignments/getSingleUserSubmission/:assignmentId/:userId").get(getSingleUserSubmission);
router.route("/admin/assignments/uploadOrUpdateMarks/:assignmentId/:userId").post(isAuthenticatedUser,uploadOrUpdateMarks);





module.exports = router