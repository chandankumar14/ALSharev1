/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.table("favourites", table => {
        table.integer("content_owner_Id").after("contentId")
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.table("favourites", table => {
        table.dropColumn("content_owner_Id")
    })
};
