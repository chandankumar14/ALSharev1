/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.table("content", table => {
        table.boolean("To_followers").defaultTo(false)
        table.boolean("To_Grp").defaultTo(false)
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.table("content", table => {
        table.dropColumn("To_followers")
        table.dropColumn("To_Grp")
    })
};
