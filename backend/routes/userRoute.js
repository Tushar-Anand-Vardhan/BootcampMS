const express = require("express")

const router = express.Router()
const {getAllUsers, addUser, updateUser, removeUser, loginUser, createAssignmentsForAll, logoutUser, registerUser, addUserFromExcel, submitAssignment} = require("../controllers/userController")
const isAuthenticatedUser = require("../middleware/auth");
const authorizedRoles = require("../middleware/authRoles");


router.route("/users").get(isAuthenticatedUser,authorizedRoles("admin"),getAllUsers);
router.route("/user/add").post(addUser);
router.route("/user/addAll").post(addUserFromExcel);
router.route("/user/update").post(updateUser);
router.route("/user/delete").delete(removeUser);
router.route("/user/register").post(registerUser);
router.route("/user/login").post(loginUser);
router.route("/user/createAssignment").post(createAssignmentsForAll);
router.route("/user/logout").get(isAuthenticatedUser,logoutUser);
router.route("/user/submitAssignment/:id").post(isAuthenticatedUser,submitAssignment);




module.exports = router