/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("followers", table => {
         table.increments("id")
         table.integer("userId")
             .unsigned()
             .notNullable()
             .references("userId")
             .inTable("users")
         table.integer("followersId")
             .unsigned()
             .notNullable()
             .references("userId")
             .inTable("users")
         table.boolean("status").defaultTo(false)
         table.timestamp("created_at").notNullable().defaultTo(knex.fn.now())
         table.timestamp("updated_at").notNullable().defaultTo(knex.fn.now())
     })
 };
 
 /**
  * @param { import("knex").Knex } knex
  * @returns { Promise<void> }
  */
 exports.down = function (knex) {
   return  knex.schema.dropTable("followers")
 };
 