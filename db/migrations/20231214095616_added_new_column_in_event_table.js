/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
*/
exports.up = function (knex) {
    return knex.schema.table("events", table => {
        table.float("total_amount").after("prize").defaultTo(0.00) //****** */ 0 is representing free event *********
    })
};
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.table("events", table => {
        table.dropColumn("total_amount")
    })
};
