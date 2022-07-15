const express = require("express")

const router = express.Router()
const {getAllUsers, addUser, updateUser, removeUser, loginUser} = require("../controllers/userController")


router.route("/users").get(getAllUsers);
router.route("/user/add").post(addUser);
router.route("/user/update").post(updateUser);
router.route("/user/delete").delete(removeUser);
router.route("/user/login").post(loginUser);



module.exports = router