const express = require("express")

const router = express.Router()
const { getAllUsers, addUser, updateUser, removeUser, loginUser, logoutUser, registerUser, addUserFromExcel, submitAssignment, getLeaderboardInfo, getAllMentors } = require("../controllers/userController")
const isAuthenticatedUser = require("../middleware/auth");
const authorizedRoles = require("../middleware/authRoles");


router.route("/users").get(isAuthenticatedUser, authorizedRoles("admin"), getAllUsers);
router.route("/user/add").post(isAuthenticatedUser, authorizedRoles("admin"), addUser);
router.route("/user/addAll").post(isAuthenticatedUser, authorizedRoles("admin"), addUserFromExcel);
router.route("/user/update").post(isAuthenticatedUser, authorizedRoles("admin"), updateUser);
router.route("/user/delete").delete(isAuthenticatedUser, authorizedRoles("admin"), removeUser);
router.route("/user/register").post(registerUser);
router.route("/user/login").post(loginUser);
router.route("/user/logout").get(isAuthenticatedUser, logoutUser);
router.route("/user/submitAssignment/:assignId").post(isAuthenticatedUser, authorizedRoles("NCG"), submitAssignment);
router.route("/getLeaderboardInfo").get(isAuthenticatedUser, getLeaderboardInfo)
router.route("/getAllMentors").get(isAuthenticatedUser, getAllMentors)



module.exports = router