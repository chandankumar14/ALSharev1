/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
*/
exports.up = function (knex) {
    return knex.schema.table("events", table => {
        table.float("Min_Prize").after("prize")
        table.integer("Expected_Users").after("entry_fee")
        table.integer("Min_Prize_percentage").after("entry_fee")
    })
};
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.table("events", table => {
        table.dropColumn("Min_Prize")
        table.dropColumn("Expected_Users")
        table.dropColumn("Min_Prize_percentage")
    })
};
