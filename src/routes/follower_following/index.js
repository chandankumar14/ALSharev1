const promiseRouter = require('express-promise-router');
const Router = promiseRouter();
const followersFollowingController  = require("../../controller/index").followersFollowingController;
const passport = require("passport")
require("../../middlewares/passport")(passport)
const authMiddleware = passport.authenticate('jwt', { session: false });
//***********Followers and following module Routing here *********** */
Router.post(`/follow_user`,authMiddleware,followersFollowingController.follow);
Router.post(`/unfollow_user`,authMiddleware,followersFollowingController.unFollow);
Router.post(`/user_following_list`,authMiddleware,followersFollowingController.userFollowingList);
Router.post(`/user_followers_list`,authMiddleware,followersFollowingController.userFollowersList)

module.exports = Router

