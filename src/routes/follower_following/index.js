const promiseRouter = require('express-promise-router');
const Router = promiseRouter();
const followersFollowingController  = require("../../controller/index").followersFollowingController;
const passport = require("passport")
require("../../middlewares/passport")(passport)
const authMiddleware = passport.authenticate('jwt', { session: false });
//***********Followers and following module Routing here *********** */
Router.post(`/follow_user`,authMiddleware,followersFollowingController.follow);
Router.post(`/unfollow_user`,authMiddleware,followersFollowingController.unFollow);
Router.get(`/user_following_list/:userId`,authMiddleware,followersFollowingController.userFollowingList);
Router.get(`/user_followers_list/:userId`,authMiddleware,followersFollowingController.userFollowersList);
Router.post(`/following_status`,authMiddleware,followersFollowingController.followingStatus)

module.exports = Router

