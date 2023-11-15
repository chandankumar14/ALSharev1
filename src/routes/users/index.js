const promiseRouter = require('express-promise-router');
const Router = promiseRouter();
const userController = require("../../controller/index").userController
// **********All Users Routing  *********
Router.post(`/user_singIn_signUp`, userController.user_singIn_signUp)
Router.post(`/otp_verification`,userController.OTPVerification)

module.exports = Router


