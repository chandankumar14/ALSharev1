const Model = require('objection').Model;
class eventContent extends Model {
    static get tableName() {
        return "event_content"
    }
    static get relationMappings() {
        const users = require("../users/user")
        return {
            // this is for event owner details 
            content_owner: {
                relation: Model.BelongsToOneRelation,
                modelClass: users,
                join: {
                    from: 'event_content.userId',
                    to: 'users.userId'
                }
            },
        }
    }
}

module.exports = eventContent