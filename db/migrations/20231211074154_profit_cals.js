/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("profit_cals", table => {
        table.increments("Id").primary()
        table.integer("userId")
            .unsigned()
            .notNullable()
            .references("userId")
            .inTable("users")
        table.integer("eventId")
            .unsigned()
            .nullable()
            .references("eventId")
            .inTable("events")
        table.float("profite_percentage").defaultTo(80)
        table.float("min_prize")
        table.float("entry_fee")
        table.integer("expected_users")
        table.boolean("status").defaultTo(false)
        table.timestamp("created_at").notNullable().defaultTo(knex.fn.now())
        table.timestamp("updated_at").notNullable().defaultTo(knex.fn.now())
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("profit_cals")
};
