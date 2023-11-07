const promiseRouter = require('express-promise-router');
const Router = promiseRouter();
const userController = require("../../controller/index").userController
// **********All Users Routing  *********
Router.post(`/registered_user`, userController.RegisteredUser)

module.exports = Router


