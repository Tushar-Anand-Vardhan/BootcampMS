const jwt = require("jsonwebtoken")
const UserModel = require("../models/userModel");

const isAuthenticatedUser = async (req, res, next) => {
    const { token } = req.cookies;
    //    const {token} = req.headers["x-access-token"];
    if (!token) {
        res.status(401).json({
            success: false,
            message: "please login to continue"
        })
        return
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await UserModel.findById(decodedData.id)
    next();

}
module.exports = isAuthenticatedUser