const Model = require('objection').Model;
class eventContent extends Model {
    static get tableName() {
        return "event_content"
    }
    static get relationMappings() {
        const event_content_action = require("../events/event_content_action")
        const event_content_rating = require("../events/event_content_rating")
        return {
            action: {
                relation: Model.HasManyRelation,
                modelClass: event_content_action,
                join: {
                    from: 'event_content.contentId',
                    to: 'event_content_action.contentId'
                }
            },
            rating: {
                relation: Model.HasManyRelation,
                modelClass: event_content_rating,
                join: {
                    from: 'event_content.contentId',
                    to: 'event_content_rating.contentId'
                }
            },
        }
    }
}

module.exports = eventContent