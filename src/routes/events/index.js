const promiseRouter = require('express-promise-router');
const Router = promiseRouter();
const eventController = require("../../controller/index").eventController
const eventContentcontroller = require("../../controller/index").eventContentcontroller
const passport = require("passport")
require("../../middlewares/passport")(passport)
const authMiddleware = passport.authenticate('jwt', { session: false });
// **********All event related  Routing  *********
Router.post(`/create_event`, authMiddleware, eventController.createEvent);
Router.put(`/post_draft_event`, authMiddleware, eventController.postDraftevent)
Router.get(`/posted_event_list_by_userId/:userId`, authMiddleware, eventController.postedEventListByUserId)
Router.get(`/draft_event_list_by_userId/:userId`, authMiddleware, eventController.draftEventListByUserId)
Router.get(`/all_posted_event_list`,authMiddleware, eventController.AllPostedeventList)
Router.delete(`/delete_draft_event`, authMiddleware, eventController.deleteDraftevent)
//*********event content Routing here********** */
Router.post(`/post_event_content`, authMiddleware, eventContentcontroller.postEventContent)
Router.get(`/delete_event_content/:contentId`, authMiddleware, eventContentcontroller.deleteEventContent)
Router.put(`/post_draft_event_content`, authMiddleware, eventContentcontroller.postDraftEventContent)
Router.get(`/user_posted_event_content_list/:userId`, authMiddleware, eventContentcontroller.userPostedEventContent)
Router.get(`/user_draft_event_content_list/:userId`, authMiddleware, eventContentcontroller.userDfratEventContent)
Router.get(`/posted_event_content_list`, authMiddleware, eventContentcontroller.eventContentList)
Router.post(`/event_content_rating`, authMiddleware, eventContentcontroller.eventContentRating)
Router.post(`/event_content_action`, authMiddleware, eventContentcontroller.eventContentAction)
Router.post(`/event_content_details`, authMiddleware, eventContentcontroller.eventContentDetails)
module.exports = Router


