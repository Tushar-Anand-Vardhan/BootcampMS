const express = require("express")

const router = express.Router()
const {createAssignment, getAllAssignments, updateAssignment, deleteAssignment, getAssignment} = require("../controllers/assignmentController")


router.route("/getAllAssignments").get(getAllAssignments);
router.route("/admin/getAssignment/{assignId}").get(getAssignment);
router.route("/admin/createAssignment").post(createAssignment);
router.route("/admin/updateAssignment").post(updateAssignment);
router.route("/admin/deleteAssignment").delete(deleteAssignment);



module.exports = router