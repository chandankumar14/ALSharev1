const userModel  = require("../../models/users/user")
// **********Registered new User **********
const RegisteredUser = async (data) => {
    try {
        let err, result
        [err, result] = await to(userModel.query().insert(data).returning("*"));
        if (err) {
            throw ErrorResponse(err.message)
        }
        return result
    } catch (err) {
        throw ErrorResponse(err.message)
    }
}



// exporting ALL module
module.exports ={
    RegisteredUser 
}