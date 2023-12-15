/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("content_views", (table) => {
        table.increments("Id").primary()
        table.integer("userId")
            .unsigned()
            .notNullable()
            .references("userId")
            .inTable("users")
        table.integer("eventContentId")
            .unsigned()
            .nullable()
            .references("contentId")
            .inTable("event_content")
        table.integer("contentId")
            .unsigned()
            .nullable()
            .references("contentId")
            .inTable("content")
        table.dateTime("view_date")
        table.timestamp("created_at").notNullable().defaultTo(knex.fn.now())
        table.timestamp("updated_at").notNullable().defaultTo(knex.fn.now())
    })
};
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable("content_views");
};
