const Model = require('objection').Model;

class event_balance extends Model {
    static get tableName() {
        return "event_balance"
    }
    static get relationMappings() {
        const users = require("../users/user")
        return {
            user_details: {
                relation: Model.BelongsToOneRelation,
                modelClass: users,
                join: {
                    from: 'event_balance.userId',
                    to: 'users.userId'
                }
            },
        }
    }

}
module.exports = event_balance