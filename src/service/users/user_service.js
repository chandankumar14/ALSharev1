const userRepository = require("../../repository/users/user_repository")
const RegisteredUser = async (data) => {
    let err, result
    try {
        [err, result] = await to(userRepository.RegisteredUser(data))
        if (!result && result == undefined) {
            throw ErrorResponse(err.message)
        }
        return result
    } catch (err) {
        throw ErrorResponse(err.message)
    }
}

module.exports = {
    RegisteredUser
}