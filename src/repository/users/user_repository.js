const userModel = require("../../models/users/user")
const common = require("../../../utilities/common")
// **********Registered new User **********
const RegisteredUser = async (data) => {
    const Regex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/
    const phone = data.phone?data.phone:'';
    const email = data.email?data.email:'';
    const deviceId = data.deviceId
    try {
        let err, result
        [err, result] = await to(userModel.query().select("*")
            .orWhere({
                "email": email
            })
            .orWhere({ "phone": phone })
        );
        if (err) {
            throw ErrorResponse(err.message)
        }
       return result
    } catch (err) {
        throw ErrorResponse(err.message)
    }

}



// exporting ALL module
module.exports = {
    RegisteredUser
}