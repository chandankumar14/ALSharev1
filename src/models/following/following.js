const Model = require('objection').Model;
class following extends Model {
    static get tableName() {
        return "following"
    }
    static get relationMappings() {
        const users = require("../users/user")
        return {
            // this is for user transaction details 
            following: {
                relation: Model.BelongsToOneRelation,
                modelClass: users,
                join: {
                    from: 'following.followingId',
                    to: 'users.userId'
                }
            }
        }
    }
}

module.exports = following