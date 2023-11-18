/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("events", table => {
        table.increments("eventId").primary()
        table.integer("userId")
            .unsigned()
            .notNullable()
            .references("userId")
            .inTable("users")
        table.string("title")
        table.string("description")
        table.dateTime("start_date")
        table.dateTime("end_date")
        table.json("prize")
        table.float("entry_fee")
        table.boolean("event_status")
        table.boolean("To_followers").defaultTo(false)
        table.boolean("To_Grp").defaultTo(false)
        table.boolean("delete").defaultTo(false)
        table.timestamp("created_at").notNullable().defaultTo(knex.fn.now())
        table.timestamp("updated_at").notNullable().defaultTo(knex.fn.now())
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable("events")
};
