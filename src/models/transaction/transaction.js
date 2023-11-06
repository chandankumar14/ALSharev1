const Model = require('objection').Model;
class transaction extends Model {
    static get tableName() {
        return 'transaction';
    }
}
module.exports  = transaction