const Model = require('objection').Model;

class contentViews extends Model {
    static get tableName() {
        return "content_views"
    }

}
module.exports = contentViews