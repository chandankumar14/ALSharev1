const Model = require('objection').Model;
class participants extends Model {
    static get tableName() {
        return 'participants';
    }
    static get relationMappings() {
        const events = require("../events/event")
        const users = require("../../models/users/user")
        return {
            // ******join event list ********* details  
            join_event_list: {
                relation: Model.BelongsToOneRelation,
                modelClass: events,
                join: {
                    from: 'participants.eventId',
                    to: 'events.eventId'
                }
            },
            event_owner_details: {
                relation: Model.BelongsToOneRelation,
                modelClass: users,
                join: {
                    from: 'participants.event_owner_Id',
                    to: 'users.userId'
                }
            },
        }
    }
}

module.exports  = participants