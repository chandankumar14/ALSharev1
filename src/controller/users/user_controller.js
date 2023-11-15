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

module.exports = {
    user_singIn_signUp,
    OTPVerification
}