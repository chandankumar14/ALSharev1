/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.table("al_pay", table => {
        table.float("event__prize_charge").after("status").defaultTo(0.0)
        table.integer("eventId").after("transId").defaultTo(0)
    })
};
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.table("al_pay", table => {
        table.dropColumn("event__prize_charge")
        table.dropColumn("eventId")
    })
};
