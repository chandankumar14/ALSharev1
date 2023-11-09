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

const postDraftcontent = async (data) => {
    try {
        let err, result
        [err, result] = await to(contentRepository.postDraftcontent(data))
        if (!result && result == undefined) {
            throw ErrorResponse(err.message)
        }
        return result
    }
    catch (err) {
        throw ErrorResponse(err.message)
    }
}

const userDraftContentList = async (data) => {
    try {
        let err, result
        [err, result] = await to(contentRepository.userDraftContentList(data))
        if (!result && result == undefined) {
            throw ErrorResponse(err.message)
        }
        return result
    }
    catch (err) {
        throw ErrorResponse(err.message)
    }
}

const userPostedContentList = async (data) => {
    try {
        let err, result
        [err, result] = await to(contentRepository.userPostedContentList(data))
        if (!result && result == undefined) {
            throw ErrorResponse(err.message)
        }
        return result
    }
    catch (err) {
        throw ErrorResponse(err.message)
    }
}

const deletePostedContent = async (data) => {
    try {
        let err, result
        [err, result] = await to(contentRepository.deletePostedContent(data))
        if (!result && result == undefined) {
            throw ErrorResponse(err.message)
        }
        return result
    }
    catch (err) {
        throw ErrorResponse(err.message)
    }
}

const postedContentList = async (data) => {
    try {
        let err, result
        [err, result] = await to(contentRepository.postedContentList(data))
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