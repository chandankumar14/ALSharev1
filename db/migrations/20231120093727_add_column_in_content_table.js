/**
 * @param { import("knex").Knex } knex
* @returns { Promise<void> }
*/
exports.up = function (knex) {
    return knex.schema.table("content", table => {
        table.boolean("following").defaultTo(0).after("userCount")
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.table("content", table => {
        table.dropColumn("following")
    })
};
