const Model = require('objection').Model;

class content extends Model {
    static get tableName() {
        return "content"
    }

}
module.exports = content