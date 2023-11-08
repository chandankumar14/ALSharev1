const Model = require('objection').Model;

class contentAction extends Model {
    static get tableName() {
        return "content_action"
    }

}
module.exports = contentAction