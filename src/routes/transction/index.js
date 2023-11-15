const passport = require("passport")
require("../../middlewares/passport")(passport)
const promiseRouter = require('express-promise-router');
const Router = promiseRouter();
const authMiddleware = passport.authenticate('jwt', { session: false });
const transactionController = require("../../controller/index").transactionController

Router.post(`/payment_initate`, authMiddleware, transactionController.eventPaymentInitiation);
Router.post(`/payment_completion`, authMiddleware, transactionController.eventPaymentComplection)