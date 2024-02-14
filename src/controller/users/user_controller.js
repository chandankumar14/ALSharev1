const userService = require("../../service/users/user_service")
const msg = require("../../../utilities/msg")

const user_singIn_signUp = async (req, res) => {
    let result, data
    data = req.body
    try {
        [err, result] = await to(userService.user_singIn_signUp(data))
        if (err) {
            throw badRequestError(err.message)
        }
        return okResponse(res, {
            result
        }, msg.msg);
    }
    catch (err) {
        throw badRequestError(err.message)
    }
}

const OTPVerification = async (req, res) => {
    let result, data
    data = req.body
    try {
        [err, result] = await to(userService.OTPVerification(data))
        if (err) {
            throw badRequestError(err.message)
        }
        return okResponse(res, {
            result
        }, msg.msg);
    }
    catch (err) {
        throw badRequestError(err.message)
    }
}
const editUserProfile = async (req, res) => {
    let result
    let payload = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        middleName: req.body.middleName,
        email: req.body.email,
        location: req.body.location,
        profileImage: req?.file?.filename ? req.file.filename : req.body.profileImage,
        about: req.body.about,
        DOB: req.body.DOB,
        phone: req.body.phone,
        Gender: req.body.Gender
    };
    let userId = req.body.userId
    try {
        [err, result] = await to(userService.editUserProfile(payload, userId))
        if (err) {
            throw badRequestError(err.message)
        }
        return okResponse(res, {
            result
        }, "your profile is updated successfully");
    }
    catch (err) {
        throw badRequestError(err.message)
    }
}

const user_details = async (req, res) => {
    let result ,err
    let userId = req.params.userId
    try {
        [err, result] = await to(userService.user_details(userId))
        if (err) {
            throw badRequestError(err.message)
        }
        return okResponse(res, {
            result
        }, "your profile is profile details fetch successfully");
    }
    catch (err) {
        throw badRequestError(err.message)
    }
}

const userParticipantsEventList = async (req, res) => {
    let result, err;
    let userId = req.query.userId;
   try {
        [err, result] = await to(userService.userParticipantsEventList(userId))
        if (err) {
            throw badRequestError(err.message)
        }
        return okResponse(res, {
            result
        }, "your all join event list details fetch successfully");
    }
    catch (err) {
        throw badRequestError(err.message)
    }
}
const accountDeletion = async (req, res) => {
    let result, err;
    let Email_Phone = req.query.Email_Phone;
   try {
        [err, result] = await to(userService.accountDeletion(Email_Phone))
        if (err) {
            throw badRequestError(err.message)
        }
        return okResponse(res, {
            result
        });
    }
    catch (err) {
        throw badRequestError(err.message)
    }
}

module.exports = {
    user_singIn_signUp,
    OTPVerification,
    editUserProfile,
    user_details,
    userParticipantsEventList,
    accountDeletion
}