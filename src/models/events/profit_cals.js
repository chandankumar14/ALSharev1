const Model = require('objection').Model;

class profit_cals extends Model {
    static get tableName() {
        return 'profit_cals';
    }
    static get relationMappings() {
        const event = require("./event")
        const users = require("../users/user")
        return {
            // this is for event owner details 
            event_owner: {
                relation: Model.BelongsToOneRelation,
                modelClass: users,
                join: {
                    from: 'profit_cals.userId',
                    to: 'users.userId'
                }
            },
            // this is for participants details 
            event_details: {
                relation: Model.HasOneRelation,
                modelClass: event,
                join: {
                    from: 'profit_cals.eventId',
                    to: 'events.eventId'
                }
            },
        }
    }
}


module.exports = profit_cals

