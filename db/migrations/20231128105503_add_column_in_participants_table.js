/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.table("participants", table => {
        table.boolean("event_owner_Id").after("eventId").defaultTo(false)
    })
};
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.table("participants", table => {
        table.dropColumn("event_owner_Id")
    })
};
