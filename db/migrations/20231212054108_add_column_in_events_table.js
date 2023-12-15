/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
*/
exports.up = function (knex) {
    return knex.schema.table("events", table => {
        table.json("prize_range").after("prize").defaultTo(null)

    })
};
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.table("events", table => {
        table.dropColumn("prize_range")
    })
};
