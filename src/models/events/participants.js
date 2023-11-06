const Model = require('objection').Model;
class participants extends Model {
    static get tableName() {
        return 'participants';
    }
}

module.exports  = participants