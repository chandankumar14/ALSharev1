const followersModel = require("../../models/followers/followers")
const followingModel = require("../../models/following/following")
// ********follow new user ***********
const follow = async (data) => {
    try {
        let err, result1, result12
        let followers, following
        followers = {
            userId: data.followingUserId,
            followersId: data.userId,
            status: true
        }
        following = {
            userId: data.userId,
            followingId: data.followingUserId,
            status: true
        }
        //*******updating followers table here *********** */
        [err, result12] = await to(followersModel.query().insert(followers));
        if (err) {
            throw ErrorResponse(err.message)
        }
        // *******updating following table here ************
        [err, result1] = await to(followingModel.query().insert(following))
        if (err) {
            throw ErrorResponse(err.message)
        }
        return result1
    } catch (err) {
        throw ErrorResponse(err.message)
    }
}

//************unFollow **************** */
const unFollow = async (data) => {
    try {
        let err, result1, result12
        //***********updating followers table ******* */
        [err, result1] = await to(followersModel.query().update({ "status": 1 }).where({ "userId": data.unFollowinguserId }));
        if (err) {
            throw ErrorResponse(err.message)
        }
        //**********updating following table here ************* */
        [err, result12] = await to(followingModel.query().update({ "status": 1 }).where({ "userId": data.userId }))
        if (err) {
            throw ErrorResponse(err.message)
        }
        return result12
    } catch (err) {
        throw ErrorResponse(err.message)
    }
}


// **********user following list *************
const userFollowingList = async (data) => {
    try {
        let err, result
        [err, result] = await to(followingModel.query().select("*")
            .withGraphFetched('[following]')
            .modifyGraph('following', (builder) => builder.select("userId", "firstName", "lastName", "middleName", "email"))
            .where({ "userId": data.userId })
            .where({ "status": 1 }))
        if (err) {
            throw ErrorResponse(err.message)
        }
        return result
    } catch (err) {
        throw ErrorResponse(err.message)
    }
}
//*******users Followers List ********** */
const userFollowersList = async (data) => {
    try {
        let err, result
        [err, result] = await to(followersModel.query().select("*")
            .withGraphFetched('[followers]')
            .modifyGraph('followers', (builder) => builder.select("userId", "firstName", "lastName", "middleName", "email"))
            .where({ "userId": data.userId })
            .where({ "status": 1 }))
        if (err) {
            throw ErrorResponse(err.message)
        }
        return result
    } catch (err) {
        throw ErrorResponse(err.message)
    }
}

module.exports = {
    follow ,
    userFollowingList,
    userFollowersList,
    unFollow
}
