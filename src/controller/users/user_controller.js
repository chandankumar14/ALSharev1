const userService= require("../../service/users/user_service")

const RegisteredUser = async (req, res) => {
    let result, data
    data = req.body
    try {
        result = await userService.RegisteredUser(data)
        return createdResponse(res, {
            ...result
        }, "cashBackScheme added  successful");
    }
    catch (err) {
        throw badRequestError(err[0] ? err[0].message : err.message)
    }
}


module.exports ={
    RegisteredUser
}