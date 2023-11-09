const promiseRouter = require('express-promise-router');
const Router = promiseRouter();
const contentController = require("../../controller/index").contentController

Router.post(`/post_content`, contentController.postContent)
Router.post(`/post_draft_content`, contentController.postDraftcontent)
Router.post(`/user_posted_content_list`, contentController.userPostedContentList)
Router.post(`/user_draft_content_list`, contentController.userDraftContentList)
Router.post(`/delete_posted_content_list`, contentController.deletePostedContent)
Router.get(`/posted_content_list`, contentController.postedContentList)
Router.post(`/content_rating`, contentController.contentRating)
Router.post(`/content_action`, contentController.contentAction)

module.exports = Router
