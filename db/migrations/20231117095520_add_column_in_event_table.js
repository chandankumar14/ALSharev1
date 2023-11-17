/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.table("events", table => {
        table.boolean("To_followers").defaultTo(false).after("delete")
        table.boolean("To_Grp").defaultTo(false).after("delete")
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.table("events", table => {
        table.dropColumn("To_followers")
        table.dropColumn("To_Grp")
    })
};
