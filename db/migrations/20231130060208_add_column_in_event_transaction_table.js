/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.table("transactions", table => {
        table.boolean("event__prize_charge").after("eventId").defaultTo(false)
        })
};
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.table("transactions", table => {
        table.dropColumn("event_charge")
    })
};
