const passport = require("passport")
require("../../middlewares/passport")(passport)
const promiseRouter = require('express-promise-router');
const Router = promiseRouter();
const authMiddleware = passport.authenticate('jwt', { session: false });
const transactionController = require("../../controller/index").transactionController

Router.post(`/payment_initate`, authMiddleware, transactionController.eventPaymentInitiation);
Router.post(`/payment_completion`, authMiddleware, transactionController.eventPaymentComplection);
Router.post(`/payment_initated_to_wallet`, authMiddleware, transactionController.addToWalletInitiation);
//********** This is for wallet feature************* */
Router.post(`/wallet_payment_completion`, authMiddleware, transactionController.addToWalletPaymentCompletion);
Router.get(`/user_wallet_balance/:userId`, authMiddleware, transactionController.walletBalance);
Router.get(`/wallet_trans_history_list/:userId`, authMiddleware, transactionController.walletTransHistoryList);
//*************This is event balance feature******** */
Router.get(`/event_balance_history/:userId`, authMiddleware, transactionController.eventBalanceTransHistory);
Router.get(`/event_balance/:userId`, authMiddleware, transactionController.eventBalance);

module.exports = Router 