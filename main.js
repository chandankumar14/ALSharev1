require("./src/global_function")
const knex = require("knex");
const path = require("path")
const express = require("express");
const body_parser = require("body-parser");
const swaggerJSDoc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express")
const knexConfig = require("./db/knex");
const cors = require("cors");
const { Model } = require('objection');
const v1 = require("./src/routes/index");
const PORT_NO = process.env.PORT_NO;
const API_URL = process.env.API_URL;
let HOST_NO = process.env.HOST;
// ********Knex Initializing here **********
const knexInstance = knex(knexConfig['production']);
Model.knex(knexInstance)
//*******creating express APP here ********** */
const App = express();
App.use(cors());
App.use(body_parser.json());
App.use(body_parser.urlencoded({ extended: true }))
App.use(`/${API_URL}/`, express.static(path.join(__dirname, "user_profile_image")))
//*********creating Routing configuration here ********* */
App.use(`/${API_URL}/`, v1);
//*******************Swagger UI configuration is here*********** */

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "ALShare API",
            version: "1.0.0",
        },
        servers: [
            {
                url: `http://${HOST_NO}:${PORT_NO}/${API_URL}/`,
                description: "ALShare API Docs",
            },
        ],
    },
    apis: ['./src/routes/**/*.js'],
};
const specs = swaggerJSDoc(options);
App.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

const server = App.listen(PORT_NO, () => {
    console.log(`Server running at http://${HOST_NO}:${server.address().port}/`);
});

// ***********configuration for cron_job to update event balance***********
const { fork } = require('child_process');
const forked = fork("./cronjob/index");
forked.on('message', (msg) => {
    console.log('Message from child', msg);
});
forked.send('start')