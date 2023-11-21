const promiseRouter = require('express-promise-router');
const Router = promiseRouter();
const passport = require("passport");
require("../../middlewares/passport")(passport)
const authMiddleware = passport.authenticate('jwt', { session: false });
const contentController = require("../../controller/index").contentController
Router.post(`/post_content`, authMiddleware, contentController.postContent)
Router.put(`/post_draft_content`, authMiddleware, contentController.postDraftcontent)
Router.get(`/user_posted_content_list/:userId`, authMiddleware, contentController.userPostedContentList)
Router.get(`/user_draft_content_list/:userId`, authMiddleware, contentController.userDraftContentList)
Router.delete(`/delete_posted_content`, authMiddleware, contentController.deletePostedContent)
Router.get(`/posted_content_list/:userId`, authMiddleware, contentController.postedContentList)
Router.post(`/content_rating`, authMiddleware, contentController.contentRating)
Router.post(`/content_action`, authMiddleware, contentController.contentAction)
Router.post(`/mark_favourites`, authMiddleware, contentController.markAsFavourites)
Router.get(`/favourites_content_list/:userId`, authMiddleware, contentController.userFavouritesContentList)

module.exports = Router
