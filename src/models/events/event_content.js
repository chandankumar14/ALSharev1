const Model = require('objection').Model;
class eventContent extends Model {
    static get tableName() {
        return "event_content"
    }
}

module.exports = eventContent