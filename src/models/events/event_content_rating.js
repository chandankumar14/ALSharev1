const Model = require('objection').Model;
class eventContentRating extends Model {
    static get tableName() {
        return "event_content_rating"
    }
}

module.exports = eventContentRating