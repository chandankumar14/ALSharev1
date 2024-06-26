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

const editUserProfile = async (data,userId) => {
    let err, result
    try {
        [err, result] = await to(userRepository.editUserProfile(data,userId))
        if (!result && result == undefined) {
            throw ErrorResponse(err.message)
        }
        return result
    } catch (err) {
        throw ErrorResponse(err.message)
    }
}

const user_details = async (userId) => {
    let err, result
    try {
        [err, result] = await to(userRepository.user_details(userId))
        if (!result && result == undefined) {
            throw ErrorResponse(err.message)
        }
        return result
    } catch (err) {
        throw ErrorResponse(err.message)
    }
}

const userParticipantsEventList = async (userId) => {
    let err, result
    try {
        [err, result] = await to(userRepository.userParticipantsEventList(userId))
        if (!result && result == undefined) {
            throw ErrorResponse(err.message)
        }
        return result
    } catch (err) {
        throw ErrorResponse(err.message)
    }
}

const accountDeletion = async (Email_Phone) => {
    let err, result
    try {
        [err, result] = await to(userRepository.accountDeletion(Email_Phone))
        if (!result && result == undefined) {
            throw ErrorResponse(err.message)
        }
        return result
    } catch (err) {
        throw ErrorResponse(err.message)
    }
}

const accountDeletionVerification = async (OTP_code) => {
    let err, result
    try {
        [err, result] = await to(userRepository.accountDeletionVerification(OTP_code))
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
    OTPVerification,
    editUserProfile,
    user_details,
    userParticipantsEventList,
    accountDeletion,
    accountDeletionVerification
}