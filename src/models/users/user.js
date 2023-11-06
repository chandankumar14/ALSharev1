const Model = require('objection').Model;
class users extends Model {
    static get tableName() {
        return "users"
    }
    static get relationMappings() {
        const transaction = require("../transaction/transaction")
        return {
            // this is for user transaction details 
            transaction: {
                relation: Model.HasManyRelation,
                modelClass: transaction,
                join: {
                    from: 'users.userId',
                    to: 'transactions.userId'
                }
            }
        }
    }
}

module.exports = users