const contentRepository = require("../../repository/content/content")

const postContent = async (data) => {
    try {
        let err, result
        [err, result] = await to(contentRepository.postContent(data))
        if (!result && result == undefined) {
            throw ErrorResponse(err.message)
        }
        return result
    }
    catch (err) {
        throw ErrorResponse(err.message)
    }
}

const postDraftcontent = async (contentId,userId) => {
    try {
        let err, result
        [err, result] = await to(contentRepository.postDraftcontent(contentId,userId))
        if (!result && result == undefined) {
            throw ErrorResponse(err.message)
        }
        return result
    }
    catch (err) {
        throw ErrorResponse(err.message)
    }
}

const userDraftContentList = async (userId) => {
    try {
        let err, result
        [err, result] = await to(contentRepository.userDraftContentList(userId))
        if (!result && result == undefined) {
            throw ErrorResponse(err.message)
        }
        return result
    }
    catch (err) {
        throw ErrorResponse(err.message)
    }
}

const userPostedContentList = async (userId) => {
    try {
        let err, result
        [err, result] = await to(contentRepository.userPostedContentList(userId))
        if (!result && result == undefined) {
            throw ErrorResponse(err.message)
        }
        return result
    }
    catch (err) {
        throw ErrorResponse(err.message)
    }
}

const deletePostedContent = async (contentId,userId) => {
    try {
        let err, result
        [err, result] = await to(contentRepository.deletePostedContent(contentId,userId))
        if (!result && result == undefined) {
            throw ErrorResponse(err.message)
        }
        return result
    }
    catch (err) {
        throw ErrorResponse(err.message)
    }
}

const postedContentList = async () => {
    try {
        let err, result
        [err, result] = await to(contentRepository.postedContentList())
        if (!result && result == undefined) {
            throw ErrorResponse(err.message)
        }
        return result
    }
    catch (err) {
        throw ErrorResponse(err.message)
    }
}

const contentRating = async (data) => {
    try {
        let err, result
        [err, result] = await to(contentRepository.contentRating(data))
        if (!result && result == undefined) {
            throw ErrorResponse(err.message)
        }
        return result
    }
    catch (err) {
        throw ErrorResponse(err.message)
    }
}

const contentAction = async (data) => {
    try {
        let err, result
        [err, result] = await to(contentRepository.contentAction(data))
        if (!result && result == undefined) {
            throw ErrorResponse(err.message)
        }
        return result
    }
    catch (err) {
        throw ErrorResponse(err.message)
    }
}

module.exports = {
    postContent,
    postDraftcontent,
    userDraftContentList,
    userPostedContentList,
    deletePostedContent,
    postedContentList,
    contentRating,
    contentAction

}