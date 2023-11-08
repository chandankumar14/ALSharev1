/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("event_content", table => {
        table.increments("contentId").primary()
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
        table.string("title")
        table.string("description")
        table.string("originalSourcePath")
        table.string("customSourcePath")
        table.string("contentSource")
        table.boolean("contentStatus").defaultTo(false)
        table.string("thumbnail")
        table.string("duration")
        table.string("rating")
        table.boolean("status")
        table.boolean("delete").defaultTo(false)
        table.integer("userCount") // total no of user who has given rating 
        table.timestamp("created_at").notNullable().defaultTo(knex.fn.now())
        table.timestamp("updated_at").notNullable().defaultTo(knex.fn.now())
    })

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable("event_content")
};
