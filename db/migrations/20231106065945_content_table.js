/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("content", table => {
      table.increments("contentId").primary()
      table.string("title", 10, 100)
      table.string("description", 100, 1000)
      table.json("tags")
      table.string("originalSourcePath") // this is original path of content like youtube url or other media url
      table.string("customSourcePath") // this is customize url 
      table.string("contentType")
      table.string("contentSource") // like youtube or instagram or facebook
      table.integer("userId")
        .unsigned()
        .notNullable()
        .references("userId")
        .inTable("users")
      table.boolean("contentStatus").defaultTo(false)
      table.string("thumbnail")
      table.string("duration")
      table.float("rating")
      table.integer("userCount") // total no of user who has given rating 
      table.timestamp("created_at").notNullable().defaultTo(knex.fn.now())
      table.timestamp("updated_at").notNullable().defaultTo(knex.fn.now())
    })
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function (knex) {
    return knex.schema.dropTable("content")
  };
  
  
  