const Model = require('objection').Model;
class participants extends Model {
    static get tableName() {
        return 'participants';
    }
    static get relationMappings() {
        const events = require("../events/event")
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
        }
    }
}

module.exports  = participants