const ErrorHandler = require("../utils/errorHandler");
const UserModel = require("../models/userModel");
const AssignmentModel = require("../models/assignmentModel");
const sendToken = require("../utils/jwtTokens");
const validatePassword = require("../utils/passValidator");
const excelToJson = require("../utils/excelToJson");
const assignmentModel = require("../models/assignmentModel");


exports.addUserFromExcel = async (req, res, next) => {
    const userList = excelToJson()
    UserModel.insertMany(userList)
        .then(function (docs) {
            res.json(docs);
        })
        .catch(function (err) {
            res.status(500).send(err);
        });
}

exports.addUser = async (req, res, next) => {
    try {
        const newUser = await UserModel.create(req.body);
        res.status(201).json({
            success: true,
            newUser
        })

    } catch (error) {
        const errors = { email: "", name: "" }

        if (error.code === 11000) {
            errors.email = "This email is registered already";
            return res.status(404).json({
                success: false,
                errors
            })

        }
        Object.values(error.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;

        })
        return res.status(404).json({
            success: false,
            errors
        })
    }


}

exports.getAllUsers = async (req, res, next) => {
    const allUsers = await UserModel.find()
    res.status(200).json({
        success: true,
        allUsers
    })
}


exports.updateUser = async (req, res, next) => {
    const updatedUserData = {
        name: req.body.newName,
        email: req.body.newEmail,
        role: req.body.newRole,
        id: req.body.id
    }

    const updatedUser = await UserModel.findByIdAndUpdate(req.body.id, updatedUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });
    res.status(200).json({
        success: true,
        updatedUser
    })
}

exports.removeUser = async (req, res, next) => {
    const deletedUser = await UserModel.findById(req.body.id);
    if (!deletedUser) {
        return next(new ErrorHandler("user does not exist", 404));
    }
    deletedUser.remove();
    res.status(200).json({
        success: true,
        message: "user deleted successfully"
    })
}


exports.registerUser = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new ErrorHandler("Please enter your Email and password", 404));
    }
    const user = await UserModel.findOne({ email }).select("+password");
    if (!user) {
        return next(new ErrorHandler("User is not added to the bootcamp, please contact admin", 403));
    }
    // TOOD: send confirmation email , OTP
    if (user.password) {
        return next(new ErrorHandler("User is already registered", 404));
    }

    const errors = validatePassword(password);
    console.log(errors)
    if (errors.length === 0) {
        user.password = req.body.password;
        await user.save({ validateBeforeSave: false });
        sendToken(user, 200, res);
    }
    else {
        return res.status(404).json({
            success: false,
            errors
        })
    }
}
exports.loginUser = async (req, res, next) => {
    const { email, password } = req.body
    if (!email || !password) {
        return next(new ErrorHandler("Please enter your Email and password", 400));
    }
    const user = await UserModel.findOne({ email }).select("+password");

    if (!user?.password) {//!user || user.password === ""
        return next(new ErrorHandler("User is not added to the bootcamp, please contact admin", 401));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("invalid email or password", 401));
    }

    else {
        sendToken(user, 200, res);
    }

}


exports.logoutUser = async (req, res, next) => {
    const { name } = req.user;
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    })
    res.status(200).json({
        success: true,
        message: `${name} logged out`,
    })
}

// TODO: API to submit 

exports.submitAssignment = async (req, res, next) => {
    const status = {
        NOTSUBMITED: 0,
        SUBMMITED: 1,
        MARKED: 2
    }
    const ncgId = req.user?.id;  //null pointer does not come
    console.log(ncgId)
    const link = req.body?.ncgSubmittedLink?.link;
    const assignId = req.params?.assignId;

    const assn = await AssignmentModel.findById(assignId);
    if (!assn) {
        return next(new ErrorHandler("Assignment does not exists", 404))
    }
    else {
        const ncgAssignment = assn.ncgSubmittedLink?.find(a => a.ncg_id === ncgId);
        if (ncgAssignment?.status === 0) {
            assn.ncgSubmittedLink?.forEach((subLink) => {
                if (subLink?.ncg_id === ncgId) {
                    subLink.link = link;
                    subLink.status = status.SUBMMITED;
                }
            })

            assn.save({ validateBeforeSave: false });
            res.status(200).json({
                success: true
            });
        }
        else {
            return next(new ErrorHandler("You have already submitted your assignment", 401))
        }
    }
}

// return array of ranks with id of each ncg - top20 preferably 


exports.getLeaderboardInfo = async (req, res, next) => {
    //todo

    const allUsers = await UserModel.find({ role: "NCG" });
    if (!allUsers) {
        return next(new ErrorHandler("No NCGs are added yet", 404))
    }
    const leaderBoard = []
    // rank , ncg name, ncg email , marks

    allUsers.forEach((usr) => {
        leaderBoard.push({
            userId: usr._id.toString(),
            userName: usr.name,
            userEmail: usr.email,
            userMarks: usr.totalMarks
        })
    })

    leaderBoard.sort((a, b) => {
        return b.userMarks - a.userMarks;
    });
    let count = 1;
    leaderBoard[0].rank = count;
    for (let i = 1; i < leaderBoard.length; i++) {
        let element = leaderBoard[i];
        if (leaderBoard[i].userMarks !== leaderBoard[i - 1].userMarks) {
            count++;
        }
        element.rank = count;

    }
    console.log(leaderBoard)

    return res.status(200).json({
        success: true,
        leaderBoard
    });



}


// get all mentors
exports.getAllMentors = async (req, res, next) => {
    const allUsers = await UserModel.find({ role: "mentor" })
    res.status(200).json({
        success: true,
        allUsers
    })
}