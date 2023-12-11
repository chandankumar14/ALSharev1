/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
*/
exports.up = function (knex) {
    return knex.schema.table("event_content", table => {
        table.integer("views").after("userId")
       
    })
};
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.table("event_content", table => {
        table.dropColumn("views")
       })
};
