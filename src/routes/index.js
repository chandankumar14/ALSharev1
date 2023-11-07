const user = require("../routes/users/index")
const event = require("../routes/events/index")
const followersFollowing = require("../routes/follower_following/index")
module.exports =[
    user,
    event,
    followersFollowing
]
      
