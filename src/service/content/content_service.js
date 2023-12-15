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

const postedContentList = async (userId,pageNo) => {
    try {
        let err, result
        [err, result] = await to(contentRepository.postedContentList(userId,pageNo))
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

const markAsFavourites = async (data) => {
    try {
        let err, result
        [err, result] = await to(contentRepository.markAsFavourites(data))
        if (!result && result == undefined) {
            throw ErrorResponse(err.message)
        }
        return result
    }
    catch (err) {
        throw ErrorResponse(err.message)
    }
}

const removeFavouritesContent = async (userId,contentId) => {
    try {
        let err, result
        [err, result] = await to(contentRepository.removeFavouritesContent(userId,contentId))
        if (!result && result == undefined) {
            throw ErrorResponse(err.message)
        }
        return result
    }
    catch (err) {
        throw ErrorResponse(err.message)
    }
}

const userFavouritesContentList = async (userId) => {
    try {
        let err, result
        [err, result] = await to(contentRepository.userFavouritesContentList(userId))
        if (!result && result == undefined) {
            throw ErrorResponse(err.message)
        }
        return result
    }
    catch (err) {
        throw ErrorResponse(err.message)
    }
}

const contentDetails = async (userId, contentId) => {
    try {
        let err, result
        [err, result] = await to(contentRepository.contentDetails(userId, contentId))
        if (!result && result == undefined) {
            throw ErrorResponse(err.message)
        }
        return result
    }
    catch (err) {
        throw ErrorResponse(err.message)
    }
}

const contentViews = async (data) => {
    try {
        let err, result
        [err, result] = await to(contentRepository.contentViews(data))
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
    contentAction,
    markAsFavourites,
    userFavouritesContentList,
    removeFavouritesContent,
    contentDetails,
    contentViews
}