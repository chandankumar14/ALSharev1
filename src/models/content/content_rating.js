const Model = require('objection').Model;

class contentRating extends Model {
    static get tableName() {
        return "content_rating"
    }

}
module.exports = contentRating