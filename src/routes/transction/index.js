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
Router.post(`/join_event_from_wallet`, authMiddleware, transactionController.joinEventFromWallet)
//*************This is event balance feature******** */
Router.get(`/event_balance_history/:userId`, authMiddleware, transactionController.eventBalanceTransHistory);
Router.get(`/event_balance/:userId`, authMiddleware, transactionController.eventBalance);
Router.post(`/join_event_from_event_balance`, authMiddleware, transactionController.joinEventFromEventBalance)
//***************Event prize charge*******   */
Router.post(`/event_charge_wallet`, authMiddleware, transactionController.eventChargeThroughWallet);
Router.post(`/event_charge_event_balance`, authMiddleware, transactionController.eventChargeThroughEventBalance);
Router.post(`/event_charge_others`, authMiddleware, transactionController.eventChargeThroughOthers);
Router.post(`/join_free_event`,authMiddleware,transactionController.joinFreeEvent)
module.exports = Router 