const Model = require('objection').Model;
class eventContent extends Model {
    static get tableName() {
        return "event_content"
    }
    static get relationMappings() {
        const event_content_action = require("../events/event_content_action")
        const event_content_rating = require("../events/event_content_rating")
        const users = require("../../models/users/user")
        return {
            action: {
                relation: Model.HasManyRelation,
                modelClass: event_content_action,
                join: {
                    from: 'event_content.contentId',
                    to: 'event_content_action.contentId'
                }
            },
            rating_list: {
                relation: Model.HasManyRelation,
                modelClass: event_content_rating,
                join: {
                    from: 'event_content.contentId',
                    to: 'event_content_rating.contentId'
                }
            },
            user_details: {
                relation: Model.BelongsToOneRelation,
                modelClass: users,
                join: {
                    from: 'users.userId',
                    to: 'event_content.userId'
                }
            },
        }
    }
}

module.exports = eventContent