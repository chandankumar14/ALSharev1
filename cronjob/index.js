require('../src/global_function');
const knex = require("knex");
const { Model } = require('objection');
const knexConfig = require("../db/knex");
const knexInstance = knex(knexConfig['development']);

Model.knex(knexInstance)
const config = require("./config");
const scheduler = require("./schedular");
process.on("message", (msg) => {
    scheduler.ingintConfig(config);
    process.send({ "message": "Child Process Running Successfully" })
})