/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("event_content_action", table => {
        table.increments("actionId").primary()
        table.integer("userId")
            .unsigned()
            .notNullable()
            .references("userId")
            .inTable("users")
        table.integer("contentId")
        table.integer("eventId")
            .unsigned()
            .nullable()
            .references("eventId")
            .inTable("events")
        table.integer("typeId")
        table.string("name")
        table.string("value")
        table.float("rating")
       table.boolean("active").defaultTo(true)
        table.timestamp("created_at").notNullable().defaultTo(knex.fn.now())
        table.timestamp("updated_at").notNullable().defaultTo(knex.fn.now())
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable("event_content_action")
};
