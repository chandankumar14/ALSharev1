const Model = require('objection').Model;
class Event extends Model {
    static get tableName() {
        return 'events';
    }
    static get relationMappings() {
        const participants = require("./participants")
        const users = require("../users/user")
        return {
            // this is for event owner details 
            event_owner: {
                relation: Model.BelongsToOneRelation,
                modelClass: users,
                join: {
                    from: 'events.userId',
                    to: 'users.userId'
                }
            },
            // this is for participants details 
            participant: {
                relation: Model.HasManyRelation,
                modelClass: participants,
                join: {
                    from: 'events.eventId',
                    to: 'participants.eventId'
                }
            },
        }
    }
}


module.exports = Event

