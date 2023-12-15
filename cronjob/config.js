const {expireEventList} = require("../src/repository/events/event_repository")

const expireEventDetails = {
    frequency: '*/2 * * * *',
    handler: expireEventList,
    message: "Expire event list fetch Successfully"
}

module.exports = {
    expireEventDetails,
   
}