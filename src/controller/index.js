const userController  = require("../controller/users/user_controller")
const eventController = require("../controller/events/event_controller")
const eventContentcontroller = require("../controller/events/event_content_controller")
const followersFollowingController = require("../controller/following_followers/following_followers_controller")
const contentController = require("../controller/content/content_controller")
const transactionController = require("../controller/transaction/transaction_controller")
module.exports ={
    userController,
    eventController ,
    followersFollowingController,
    contentController,
    eventContentcontroller,
    transactionController
}