const promiseRouter = require('express-promise-router');
const Router = promiseRouter();
const eventController = require("../../controller/index").eventController
// **********All Users Routing  *********
Router.post(`/create_event`, eventController.createEvent);
Router.post(`/post_draft_event`, eventController.postDraftevent)
Router.post(`/posted_event_list_by_userId`, eventController.postedEventListByUserId)
Router.post(`/draft_event_list`, eventController.draftEventListByUserId)
Router.get(`/all_posted_event_list`, eventController.AllPostedeventList)

module.exports = Router


