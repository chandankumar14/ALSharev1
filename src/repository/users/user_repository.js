const userModel = require("../../models/users/user")
const common = require("../../../utilities/common")
// **********Registered new User **********
const user_singIn_signUp = async (data) => {
   const Email_Phone = data.Email_Phone ? data.Email_Phone : '';
    const deviceId = data.deviceId ? data.deviceId : '';
    try {
        let err, result, result1
        [err, result] = await to(userModel.query().select("*")
            .orWhere({
                "email": Email_Phone
            })
            .orWhere({ "phone": Email_Phone })
        );
        if (err) {
            throw ErrorResponse(err.message)
        }
        //*****************if user doesn't exist *********** */
        if (result.length === 0) {
            [err, result1] = await to(sendOTP(Email_Phone))
            if (err) {
                throw ErrorResponse(err.message)
            }
            return result1
        } 
        // ********If OTP verification is not completed **************
        else if (result[0].OTP_Verification === false) {
            [err, result1] = await to(sendOTP(Email_Phone))
            if (err) {
                throw ErrorResponse(err.message)
            }
            return result1
        }
        //*******If user is using different device******* */
        else if (result.length > 0 && result[0].OTP_Verification === true && result[0].deviceId != deviceId) {
            [err, result1] = await to(sendOTP(Email_Phone))
            if (err) {
                throw ErrorResponse(err.message)
            }
            return result1
        }
    } catch (err) {
        throw ErrorResponse(err.message)
    }
}

const sendOTP = async (Email_Phone) => {
    try {
        let err, result1
        const Regex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/
        //********** */ sending OTP to email address***********
        if (Email_Phone.match(Regex)) {
            const result = await common.SendOtpToEmail(Email_Phone)
            const userpayload = {
                firstName: result.firstName,
                email: Email_Phone,
                OTP: result.OTP
            };
            [err, result1] = await to(userModel.query().insert(userpayload))
            if (err) {
                throw ErrorResponse(err.message)
            }
            return result1
        } else {
            //***********sending OTP to mobile no ********** */
            const userName = common.generateUsername();
            const result = await common.SendOtpToMobile(Email_Phone)
            const userpayload1 = {
                firstName: userName,
                phone: Email_Phone,
                OTP: result.encrypt_pass,
            };
            [err, result1] = await to(userModel.query().insert(userpayload1))
            if (err) {
                throw ErrorResponse(err.message)
            }
            return result1
        }

    } catch (err) {
        throw ErrorResponse(err.message)
    }
}

const OTPVerification = async (data) => {
    try {
        let err, result, result1
        const OTP = await common.EncryptPassword(data);
        [err, result] = await to(userModel.query().select("*").where({ "OTP": OTP }))
        if (err) {
            throw ErrorResponse(err.message)
        }
        if (result && result.length > 0) {
            [err, result1] = await to(userModel.query().update({ OTP_Verification: true }).where({ "OTP": OTP }))
            if (err) {
                throw ErrorResponse(err.message)
            }
            return result1
        }
    } catch (err) {
        throw ErrorResponse(err.message)
    }
}


module.exports = {
    user_singIn_signUp,
    OTPVerification
}