const Model = require('objection').Model;

class content extends Model {
    static get tableName() {
        return "content"
    }
    static get relationMappings() {
        const content_action = require("../content/content_action")
        const content_rating = require("../content/content_rating")
        const users = require("../users/user")
        return {
            action: {
                relation: Model.HasManyRelation,
                modelClass: content_action,
                join: {
                    from: 'content.contentId',
                    to: 'content_action.contentId'
                }
            },
            rating_list: {
                relation: Model.HasManyRelation,
                modelClass: content_rating,
                join: {
                    from: 'content.contentId',
                    to: 'content_rating.contentId'
                }
            },
            user_details: {
                relation: Model.BelongsToOneRelation,
                modelClass: users,
                join: {
                    from: 'content.userId',
                    to: 'users.userId'
                }
            },
        }
    }

}
module.exports = content