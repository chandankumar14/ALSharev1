const user = require("../routes/users/index")
const event = require("../routes/events/index")
const followersFollowing = require("../routes/follower_following/index")
const contentController = require("../routes/contents/index")
const transactionController = require("../routes/transction/index")
module.exports =[
    user,
    event,
    followersFollowing,
    contentController,
    transactionController
]
      
