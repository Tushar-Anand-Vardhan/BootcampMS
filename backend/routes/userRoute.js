const express = require("express")

const router = express.Router()
const {getAllUsers, addUser, updateUser, removeUser} = require("../controllers/userController")


router.route("/users").get(getAllUsers);
router.route("/user/add").post(addUser);
router.route("/user/update").post(updateUser);
router.route("/user/delete").delete(removeUser);



module.exports = router