const Model = require('objection').Model;

class favourites extends Model {
    static get tableName() {
        return "favourites"
    }
    static get relationMappings() {
        const users = require("../../models/users/user");
        const content = require("../../models/content/content");
        const content_action = require("../../models/content/content_action");
        const content_rating  = require("../../models/content/content_rating")
        return {
            content_details: {
                relation: Model.BelongsToOneRelation,
                modelClass: content,
                join: {
                    from: 'favourites.contentId',
                    to: 'content.contentId'
                }
            },
            content_owner: {
                relation: Model.BelongsToOneRelation,
                modelClass: users,
                join: {
                    from: "favourites.content_owner_Id",
                    to: 'users.userId'
                }
            },
            content_action_list:{
                relation: Model.HasManyRelation,
                modelClass: content_action,
                join: {
                    from: "favourites.contentId",
                    to: 'content_action.contentId'
                } 
            },
            content_rating_list:{
                relation: Model.HasManyRelation,
                modelClass: content_rating,
                join: {
                    from: "favourites.contentId",
                    to: 'content_rating.contentId'
                } 
            }
        }
    }
}
module.exports = favourites