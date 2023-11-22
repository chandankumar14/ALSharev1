const Model = require('objection').Model;

class al_pay extends Model {
    static get tableName() {
        return "al_pay"
    }
    static get relationMappings() {
        const users = require("../users/user")
        return {
            user_details: {
                relation: Model.BelongsToOneRelation,
                modelClass: users,
                join: {
                    from: 'al_pay.userId',
                    to: 'users.userId'
                }
            },
        }
    }

}
module.exports = al_pay