const userModel = require("../../models/users/user")
const common = require("../../../utilities/common")
const msg = require("../../../utilities/msg")
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
            [err, result1] = await to(sendOTP(Email_Phone,deviceId))
            if (err) {
                throw ErrorResponse(err.message)
            }
            return result1
        } 
        // ********If OTP verification is not completed **************
       else if (result[0].OTP_Verification === 0) {
            let err, result1
            const Regex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
            if (Email_Phone.match(Regex)) {
               //************Send OTP to email address******* */
                [err, result1] = await to(SendOtpToEmail(Email_Phone, result));
                if (err) {
                    throw ErrorResponse(err.message)
                }
                return result

            } else {
                //***********Send OTP to mobile no  */
                [err, result1] = await to(SendOtpToMobile(Email_Phone, result));
                if (err) {
                    throw ErrorResponse(err.message)
                }
                return result
            }

        }
        //*******If user is using different device******* */
        else if (result.length > 0 && result[0].OTP_Verification === 1 && result[0].deviceId != deviceId) {
            let err, result1
            const Regex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
            if (Email_Phone.match(Regex)) {
                //************Send OTP to email address******* */
                [err, result1] = await to(SendOtpToEmail(Email_Phone,result));
                msg.msg =`OTP has been sent to your Email Address  ${Email_Phone}`
                if (err) {
                    throw ErrorResponse(err.message)
                }
                return result

            } else {
                //***********Send OTP to mobile no  */
                [err, result1] = await to(SendOtpToMobile());
                msg.msg =`OTP has been sent to your Mobile No  ${Email_Phone}`
                if (err) {
                    throw ErrorResponse(err.message)
                }
                return result
            }
        }
        else {
            msg.msg =`You are loggedIn successfully`
            return result
        }
    } catch (err) {
        throw ErrorResponse(err.message)
    }
}

const SendOtpToEmail = async (Email_Phone, results) => {
    try {
        let err, result1
        const Regex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
        //********** */ sending OTP to email address***********
        if (Email_Phone.match(Regex)) {
            const result = await common.SendOtpToEmail(Email_Phone);
            [err, result1] = await to(userModel.query().update({ OTP: result.OTP })
                .where({ "userId": results[0].userId }))
            msg.msg = `OTP has been sent to your Email Address  ${Email_Phone}`
            if (err) {
                throw ErrorResponse(err.message)
            }
            return result1
        }

    } catch (err) {
        throw ErrorResponse(err.message)
    }
}


const SendOtpToMobile = async (Email_Phone, results) => {
    try {
        let err, result1
        const result = await common.SendOtpToMobile(Email_Phone);
        [err, result1] = await to(userModel.query().update({ OTP: result.encrypt_pass })
            .where({ "userId": results[0].userId }))

        msg.msg = `OTP has been sent to your mobile no  ${Email_Phone}`
        if (err) {
            throw ErrorResponse(err.message)
        }
        return result1

    } catch (err) {
        throw ErrorResponse(err.message)
    }
}

const sendOTP = async (Email_Phone,deviceId) => {
    try {
        let err, result1
        const Regex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/
        //********** */ sending OTP to email address***********
        if (Email_Phone.match(Regex)) {
            const result = await common.SendOtpToEmail(Email_Phone)
            const userpayload = {
                firstName: result.firstName,
                email: Email_Phone,
                OTP: result.OTP,
                deviceId:deviceId
            };
            [err, result1] = await to(userModel.query().insert(userpayload));
            msg.msg =`OTP has been sent to your Email Address  ${Email_Phone}`
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
            [err, result1] = await to(userModel.query().insert(userpayload1));
            msg.msg =`OTP has been sent to your Mobile No  ${Email_Phone}`
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
        let err, result
        const OTP = await common.EncryptPassword(data.OTP_code);
        [err, result] = await to(userModel.query().update({ OTP_Verification: 1 }).where({ "OTP": OTP }));
        msg.msg = `OTP verification has been completed `
        if (err) {
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