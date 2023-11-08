const followersFollowingRepository = require("../../repository/followers_following/followers_following_repository")

//*******follow user******* */
const follow = async (data) => {
    try {
        let err, result
        [err, result] = await to(followersFollowingRepository.follow(data))
        if (!result && result == undefined) {
            throw ErrorResponse(err.message)
        }
    }
    catch (err) {
        throw ErrorResponse(err.message)
    }
}
//**********unFollow ******** */
const unFollow = async (data) => {
    try {
        let err, result
        [err, result] = await to(followersFollowingRepository.unFollow(data))
        if (!result && result == undefined) {
            throw ErrorResponse(err.message)
        }
    }
    catch (err) {
        throw ErrorResponse(err.message)
    }
}
//********users following List ******** */
const userFollowingList = async (data) => {
    try {
        let err, result
        [err, result] = await to(followersFollowingRepository.userFollowingList(data))
        if (!result && result == undefined) {
            throw ErrorResponse(err.message)
        }
    }
    catch (err) {
        throw ErrorResponse(err.message)
    }
}


const userFollowersList = async (data) => {
    try {
        let err, result
        [err, result] = await to(followersFollowingRepository.userFollowersList(data))
        if (!result && result == undefined) {
            throw ErrorResponse(err.message)
        }
    }
    catch (err) {
        throw ErrorResponse(err.message)
    }
}

module.exports={
    follow ,
    unFollow ,
    userFollowingList,
    userFollowersList
}