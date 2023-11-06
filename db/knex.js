const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, '../.env') });
module.exports = {
    development: {
        client: 'mysql',
        useNullAsDefault: true,
        migrations: {
            directory: "../db/migrations"
        },
        seeds: {
            directory: "../db/seeds"
        },
        connection: {
            host: process.env.DB_HOST, //development.host
            user: process.env.DB_USER, //development.username
            password: process.env.DB_PASSWORD, //development.password
            database: process.env.DB_NAME    //development.database 
        },
        migrations: {
            tableName: 'knex_migrations'
        }
    },
    staging: {
        client: 'mysql',
        useNullAsDefault: true,
        migrations: {
            directory: "../db/migrations"
        },
        seeds: {
            directory: "../db/seeds"
        },
        connection: {
            host: process.env.DB_HOST, //staging.host
            user: process.env.DB_USER, //staging.username
            password: process.env.DB_PASSWORD, //staging.password
            database: process.env.DB_NAME    //staging.database
        },
        migrations: {
            tableName: 'knex_migrations'
        }
    },

    production: {
        client: 'mysql',
        useNullAsDefault: true,
        migrations: {
            directory: "../db/migrations"
        },
        seeds: {
            directory: "../db/seeds"
        },
        connection: {
            host: process.env.DB_HOST, //production.host
            user: process.env.DB_USER, //production.username
            password: process.env.DB_PASSWORD, //production.password
            database: process.env.DB_NAME    //production.database
        },
        migrations: {
            tableName: 'knex_migrations'
        },
        pool: {
            min: 3,
            max: 10
        }
    },

};