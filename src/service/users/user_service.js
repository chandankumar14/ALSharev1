const userRepository = require("../../repository/users/user_repository")
const user_singIn_signUp = async (data) => {
    let err, result
    try {
        [err, result] = await to(userRepository.user_singIn_signUp(data))
        if (!result && result == undefined) {
            throw ErrorResponse(err.message)
        }
        return result
    } catch (err) {
        throw ErrorResponse(err.message)
    }
}

const OTPVerification = async (data) => {
    let err, result
    try {
        [err, result] = await to(userRepository.OTPVerification(data))
        if (!result && result == undefined) {
            throw ErrorResponse(err.message)
        }
        return result
    } catch (err) {
        throw ErrorResponse(err.message)
    }
}


module.exports = {
    user_singIn_signUp,
    OTPVerification
}