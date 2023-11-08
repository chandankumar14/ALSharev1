const Model = require('objection').Model;

class eventContentAction extends Model {
    static get tableName() {
        return "event_content_action"
    }
    
}
module.exports = eventContentAction