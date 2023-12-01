/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.table("al_pay", table => {
        table.boolean("for_event").after("transId").defaultTo(false)
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.table("al_pay", table => {
        table.dropColumn("for_event")
    })
};
