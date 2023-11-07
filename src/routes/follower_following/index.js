const promiseRouter = require('express-promise-router');
const Router = promiseRouter();
const followersFollowingController  = require("../../controller/index").followersFollowingController;

//***********Followers and following module Routing here *********** */
Router.post(`/follow_user`,followersFollowingController.follow);
Router.post(`/unfollow_user`,followersFollowingController.unFollow);
Router.post(`/user_following_list`,followersFollowingController.userFollowingList);
Router.post(`/user_followers_list`,followersFollowingController.userFollowersList)

module.exports = Router

