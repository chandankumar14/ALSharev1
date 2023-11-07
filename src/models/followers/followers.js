const Model = require('objection').Model;
class followers extends Model {
    static get tableName() {
        return "followers"
    }

    static get relationMappings() {
        const users = require("../users/user")
        return {
            // this is for user transaction details 
            followers: {
                relation: Model.BelongsToOneRelation,
                modelClass: users,
                join: {
                    from: 'followers.followersId',
                    to: 'users.userId'
                }
            }
        }
    }
}

module.exports = followers