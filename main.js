const knex = require("knex");
const express = require("express");
const body_parser = require("body-parser");
const knexConfig = require("./db/knex");
const promiseRouter = require("express-promise-router");
const cors = require("cors");
const { Model} = require('objection');
const v1 = require("./src/routes/index");
const PORT_NO = process.env.PORT_NO;
const API_URL = process.env.API_URL;
let HOST_NO = process.env.HOST;
// ********Knex Initializing here **********
const knexInstance = knex(knexConfig['development']);
 Model.knex(knexInstance)
//*******creating express APP here ********** */
const App = express();
const router = promiseRouter();
App.use(body_parser.urlencoded({ extended: false }))
    .use(body_parser.json())
    .use(cors)
    .use(router)

//*********creating Routing configuration here ********* */
// App.use(`/${API_URL}/`, v1);

const server = App.listen(PORT_NO, () => {
    console.log(`Server running at http://${HOST_NO}:${server.address().port}/`);
});
