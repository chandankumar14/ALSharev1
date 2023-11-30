/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.table("event_balance", table => {
        table.boolean("event__prize_charge").after("status").defaultTo(0)
        table.boolean("eventId").after("transId").defaultTo(0)
    })
};
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.table("event_balance", table => {
        table.dropColumn("event__prize_charge")
        table.dropColumn("eventId")
    })
};
