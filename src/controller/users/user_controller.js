const userService = require("../../service/users/user_service")

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
        }, "user details fetch successfully.");
    }
    catch (err) {
        throw badRequestError(err.message)
    }
}


module.exports = {
    user_singIn_signUp
}