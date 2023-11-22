const followersFollowingService = require("../../service/followers_following/followers_following_service")

//******* Follow user ************ */
const follow = async (req, res) => {
    let result, data,err
    data = req.body
   try {
        [err, result] = await to(followersFollowingService.follow(data))
        if (err) {
            throw badRequestError(err.message)
        }
        return okResponse(res, {
            result
        }, "following successfully..");
    }
    catch (err) {
        throw badRequestError(err.message)
    }
}
//************* Unfollow user *********** */

const unFollow = async (req, res) => {
    let result, data
    data = req.body
    try {
        [err, result] = await to(followersFollowingService.unFollow(data))
        if (err) {
            throw badRequestError(err.message)
        }
        return okResponse(res, {
            result
        }, "unFollowing successfully..");
    }
    catch (err) {
        throw badRequestError(err.message)
    }
}
//***********userFollowers List ********** */
const userFollowersList = async (req, res) => {
    let result, err
   let userId = req.params.userId
    try {
        [err, result] = await to(followersFollowingService.userFollowersList(userId))
        if (err) {
            throw badRequestError(err.message)
        }
        return okResponse(res, {
            result
        }, "Your Followers List..");
    }
    catch (err) {
        throw badRequestError(err.message)
    }
}

const userFollowingList = async (req, res) => {
    let result, err
   let userId = req.params.userId
    try {
        [err, result] = await to(followersFollowingService.userFollowingList(userId))
        if (err) {
            throw badRequestError(err.message)
        }
        return okResponse(res, {
            result
        }, "Your Following List..");
    }
    catch (err) {
        throw badRequestError(err.message)
    }
}

const followingStatus = async (req, res) => {
    let result, err
    let userId = req.body.userId;
    let followingId = req.body.followingId
    try {
        [err, result] = await to(followersFollowingService.followingStatus(userId, followingId))
        if (err) {
            throw badRequestError(err.message)
        }
        return okResponse(res, {
            result
        }, "Your Following status..");
    }
    catch (err) {
        throw badRequestError(err.message)
    }
}


module.exports = {
    follow,
    unFollow,
    userFollowersList,
    userFollowingList,
    followingStatus
}
