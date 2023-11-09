const promiseRouter = require('express-promise-router');
const Router = promiseRouter();
const eventController = require("../../controller/index").eventController
const eventContentcontroller = require("../../controller/index").eventContentcontroller
// **********All event related  Routing  *********
Router.post(`/create_event`, eventController.createEvent);
Router.post(`/post_draft_event`, eventController.postDraftevent)
Router.post(`/posted_event_list_by_userId`, eventController.postedEventListByUserId)
Router.post(`/draft_event_list`, eventController.draftEventListByUserId)
Router.get(`/all_posted_event_list`, eventController.AllPostedeventList)

//*********event content Routing here********** */
Router.post(`/post_event_content`, eventContentcontroller.postEventContent)
Router.post(`/delete_event_content`, eventContentcontroller.deleteEventContent)
Router.post(`/post_draft_event_content`, eventContentcontroller.postDraftEventContent)
Router.post(`/user_posted_event_content_list`, eventContentcontroller.userPostedEventContent)
Router.post(`/user_draft_event_content_list`, eventContentcontroller.userDfratEventContent)
Router.get(`/posted_event_content_list`, eventContentcontroller.eventContentList)
Router.post(`/event_content_rating`, eventContentcontroller.eventContentRating)
Router.post(`/event_content_action`, eventContentcontroller.eventContentAction)
module.exports = Router


