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
            host: process.env.DB_DEVELOPMENT_HOST, //development.host
            user: process.env.DB_DEVELOPMENT_USER, //development.username
            password: process.env.DB_DEVELOPMENT_PASSWORD, //development.password
            database: process.env.DB_DEVELOPMENT_NAME    //development.database 
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
            host: process.env.DB_STAGING_NAME, //staging.host
            user: process.env.DB_STAGING_USER, //staging.username
            password: process.env.DB_STAGING_PASSWORD, //staging.password
            database: process.env.DB_STAGING_HOST    //staging.database
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
            host: process.env.DB_PRODUCTION_HOST, //production.host
            user: process.env.DB_PRODUCTION_USER, //production.username
            password: process.env.DB_PRODUCTION_PASSWORD, //production.password
            database: process.env.DB_PRODUCTION_NAME    //production.database
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