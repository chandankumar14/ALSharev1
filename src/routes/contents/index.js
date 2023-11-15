const promiseRouter = require('express-promise-router');
const Router = promiseRouter();
const passport = require("passport");
require("../../middlewares/passport")(passport)
const authMiddleware = passport.authenticate('jwt', { session: false });
const contentController = require("../../controller/index").contentController
Router.post(`/post_content`, authMiddleware, contentController.postContent)
Router.get(`/post_draft_content/:contentId`, authMiddleware, contentController.postDraftcontent)
Router.get(`/user_posted_content_list/:userId`, authMiddleware, contentController.userPostedContentList)
Router.get(`/user_draft_content_list/:userId`, authMiddleware, contentController.userDraftContentList)
Router.get(`/delete_posted_content_list/:contentId`, authMiddleware, contentController.deletePostedContent)
Router.get(`/posted_content_list`, authMiddleware, contentController.postedContentList)
Router.post(`/content_rating`, authMiddleware, contentController.contentRating)
Router.post(`/content_action`, authMiddleware, contentController.contentAction)

module.exports = Router
