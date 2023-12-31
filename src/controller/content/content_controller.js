const contentService = require("../../service/content/content_service")
const postContent = async (req, res) => {
    let result, data,err
    data = req.body
    try {
        [err, result] = await to(contentService.postContent(data))
        if (err) {
            throw badRequestError(err.message)
        }
        return okResponse(res, {
            result
        }, "your content is posted successfully.");
    }
    catch (err) {
        throw badRequestError(err.message)
    }
}

const postDraftcontent = async (req, res) => {
    let result,err
    let contentId = req.body.contentId;
    let userId = req.body.userId
    try {
        [err, result] = await to(contentService.postDraftcontent(contentId,userId))
        if (err) {
            throw badRequestError(err.message)
        }
        return okResponse(res, {
            result
        }, "your draft content is posted successfully.");
    }
    catch (err) {
        throw badRequestError(err.message)
    }
}


const userDraftContentList = async (req, res) => {
    let result, err
   let userId = req.params.userId
    try {
        [err, result] = await to(contentService.userDraftContentList(userId))
        if (err) {
            throw badRequestError(err.message)
        }
        return okResponse(res, {
            result
        }, "your draft content list....");
    }
    catch (err) {
        throw badRequestError(err.message)
    }
}

const userPostedContentList = async (req, res) => {
    let result, err
   let  userId = req.params.userId
    try {
        [err, result] = await to(contentService.userPostedContentList(userId))
        if (err) {
            throw badRequestError(err.message)
        }
        return okResponse(res, {
            result
        }, "your posted content list....");
    }
    catch (err) {
        throw badRequestError(err.message)
    }
}

const deletePostedContent = async (req, res) => {
    let result, err
    let contentId = req.body.contentId
    let userId = req.body.userId
    try {
        [err, result] = await to(contentService.deletePostedContent(contentId,userId))
        if (err) {
            throw badRequestError(err.message)
        }
        return okResponse(res, {
            result
        }, "your posted content is deleted successfully....");
    }
    catch (err) {
        throw badRequestError(err.message)
    }
}

const postedContentList = async (req, res) => {
    let result,err
    let userId = req.query.userId;
    let pageNo = req.query.pageNo ? req.query.pageNo : 0;
   try {
        [err, result] = await to(contentService.postedContentList(userId,pageNo))
        if (err) {
            throw badRequestError(err.message)
        }
        return okResponse(res, {
            result
        }, "Posted content  list....");
    }
    catch (err) {
        throw badRequestError(err.message)
    }
}

const contentRating = async (req, res) => {
    let result, data,err
    data = req.body
    try {
        [err, result] = await to(contentService.contentRating(data))
        if (err) {
            throw badRequestError(err.message)
        }
        return okResponse(res, {
            result
        }, "Your rating is saved....");
    }
    catch (err) {
        throw badRequestError(err.message)
    }
}

const contentAction = async (req, res) => {
    let result, data,err
    data = req.body
    try {
        [err, result] = await to(contentService.contentAction(data))
        if (err) {
            throw badRequestError(err.message)
        }
        return okResponse(res, {
            result
        }, "Your action is saved....");
    }
    catch (err) {
        throw badRequestError(err.message)
    }
}

const markAsFavourites = async (req, res) => {
    let result, err,data
    data = req.body
    try {
        [err, result] = await to(contentService.markAsFavourites(data))
        if (err) {
            throw badRequestError(err.message)
        }
        return okResponse(res, {
            result
        }, "this content is saved as favourites....");
    }
    catch (err) {
        throw badRequestError(err.message)
    }
}

const removeFavouritesContent = async (req, res) => {
    let result, err;
    let userId = req.body.userId;
    let contentId = req.body.contentId;
   
    try {
        [err, result] = await to(contentService.removeFavouritesContent(userId,contentId))
        if (err) {
            throw badRequestError(err.message)
        }
        return okResponse(res, {
            result
        }, "your favourites content is remove successfully....");
    }
    catch (err) {
        throw badRequestError(err.message)
    }
}

const userFavouritesContentList = async (req, res) => {
    let result, err
    let userId = req.params.userId
    try {
        [err, result] = await to(contentService.userFavouritesContentList(userId))
        if (err) {
            throw badRequestError(err.message)
        }
        return okResponse(res, {
            result
        }, "your  favourites content list ....");
    }
    catch (err) {
        throw badRequestError(err.message)
    }
}

const contentDetails = async (req, res) => {
    let result, err;
    let userId = req.body.userId;
    let contentId = req.body.contentId;
   try {
        [err, result] = await to(contentService.contentDetails(userId,contentId))
        if (err) {
            throw badRequestError(err.message)
        }
        return okResponse(res, {
            result
        }, "content details fetch successfully....");
    }
    catch (err) {
        throw badRequestError(err.message)
    }
}

const contentViews = async (req, res) => {
    let result, err;
    let data = req.body;
    try {
        [err, result] = await to(contentService.contentViews(data))
        if (err) {
            throw badRequestError(err.message)
        }
        return okResponse(res, {
            result
        }, "content views is saved successfully....");
    }
    catch (err) {
        throw badRequestError(err.message)
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