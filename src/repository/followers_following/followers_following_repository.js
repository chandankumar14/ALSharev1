const followersModel = require("../../models/followers/followers")
const followingModel = require("../../models/following/following")
// ********follow new user ***********
const follow = async (data) => {
    try {
        let followers, following
        followers = {
            userId: data.followingUserId,
            followersId: data.userId,
            status: 1
        }
        following = {
            userId: data.userId,
            followingId: data.followingUserId,
            status: 1
        }
        const result12 = await followersModel.query().insert(followers);
        if (result12 && result12 != undefined) {
            try {
                let result1, err;
                [err, result1] = await to(followingModel.query().insert(following));
                if (err) {
                    throw ErrorResponse(err.message)
                }
                return result1
            } catch (err) {
                throw ErrorResponse(err.message)
            }
        }
    } catch (err) {
        throw ErrorResponse(err.message)
    }
}

//************unFollow **************** */
const unFollow = async (data) => {
    try {
        let err, result1, result12
        //***********updating followers table ******* */
        [err, result1] = await to(followersModel.query().update({ "status": 0 })
            .where({ "userId": data.unFollowinguserId })
            .where({ "followersId": data.userId }));
        if (result1 && result1 != undefined) {
            try {
                //**********updating following table here ************* */
                [err, result12] = await to(followingModel.query().update({ "status": 0 })
                    .where({ "followingId": data.unFollowinguserId })
                    .where({ "userId": data.userId }))
                return result12
            } catch (err) {
                throw ErrorResponse(err.message)
            }
        }

    } catch (err) {
        throw ErrorResponse(err.message)
    }
}


// **********user following list *************
const userFollowingList = async (userId) => {
    try {
        let err, result
        [err, result] = await to(followingModel.query().select("*")
            .withGraphFetched('[following]')
            .modifyGraph('following', (builder) => builder
                .select("userId", "firstName", "lastName", "middleName", "email"))
            .where({ "userId": userId })
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
const userFollowersList = async (userId) => {
    try {
        let err, result
        [err, result] = await to(followersModel.query().select("*")
            .withGraphFetched('[followers]')
            .modifyGraph('followers', (builder) => builder
                .select("userId", "firstName", "lastName", "middleName", "email"))
            .where({ "userId": userId })
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
    follow,
    userFollowingList,
    userFollowersList,
    unFollow
}
