const promiseRouter = require('express-promise-router');
const common = require("../../../utilities/common")
const Router = promiseRouter();
const passport = require("passport");
require("../../middlewares/passport")(passport)
const authMiddleware = passport.authenticate('jwt', { session: false });
const userController = require("../../controller/index").userController;
// **********All Users Routing  *********
Router.post(`/user_singIn_signUp`, userController.user_singIn_signUp);
Router.post(`/otp_verification`, userController.OTPVerification);
Router.put(`/edit_user_profile`, authMiddleware, common.upload_profile_image.single("profile_image"), userController.editUserProfile);

module.exports = Router


