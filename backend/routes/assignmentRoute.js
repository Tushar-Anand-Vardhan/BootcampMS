const express = require("express")

const router = express.Router()
const {createAssignment, getAllAssignments, updateAssignment, deleteAssignment, getAssignment} = require("../controllers/assignmentController")


router.route("/getAllAssignments").get(getAllAssignments);
router.route("/admin/assignments/getAssignment/{assignId}").get(getAssignment);
router.route("/admin/assignments/createAssignment").post(createAssignment);
router.route("/admin/assignments/updateAssignment").post(updateAssignment);
router.route("/admin/assignments/deleteAssignment").delete(deleteAssignment);



module.exports = router