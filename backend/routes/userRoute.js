const express = require("express")

const router = express.Router()
const {getAllUsers, addUser, updateUser, removeUser, loginUser, logoutUser, registerUser, addUserFromExcel, submitAssignment, getLeaderboardInfo} = require("../controllers/userController")
const isAuthenticatedUser = require("../middleware/auth");
const authorizedRoles = require("../middleware/authRoles");


router.route("/users").get(isAuthenticatedUser,authorizedRoles("admin"),getAllUsers);
router.route("/user/add").post(addUser);
router.route("/user/addAll").post(addUserFromExcel);
router.route("/user/update").post(isAuthenticatedUser,updateUser);
router.route("/user/delete").delete(isAuthenticatedUser,removeUser);
router.route("/user/register").post(registerUser);
router.route("/user/login").post(loginUser);
router.route("/user/logout").get(isAuthenticatedUser,logoutUser);
router.route("/user/submitAssignment/:assignId").post(isAuthenticatedUser,submitAssignment);
router.route("/getLeaderboardInfo").get(getLeaderboardInfo)




module.exports = router