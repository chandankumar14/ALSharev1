const express = require("express");
const Router = express.Router();
const userController = require("../../controller/index").userController
// **********All Users Routing  *********
Router.post(`/registered_user`,userController.RegisteredUser)



module.exports = Router


