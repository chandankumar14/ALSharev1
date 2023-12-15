/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
*/
exports.up = function (knex) {
    return knex.schema.table("events", table => {
        table.boolean("event_type").after("prize").defaultTo(true) //****** */ 0 is representing free event *********
    })
};
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.table("events", table => {
        table.dropColumn("event_type")
    })
};
