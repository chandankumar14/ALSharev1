/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("transactions", table => {
        table.increments("id").primary()
        table.integer("userId")
            .unsigned()
            .notNullable()
            .references("userId")
            .inTable("users")
        table.integer("eventId")
            .unsigned()
            .notNullable()
            .references("eventId")
            .inTable("events")
        table.string("transId")
        table.string("payment_mode")
        table.boolean("status")
        table.float("amount")
        table.string("currency_code")
        table.timestamp("created_at").notNullable().defaultTo(knex.fn.now())
        table.timestamp("updated_at").notNullable().defaultTo(knex.fn.now())
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable("transactions")
};
