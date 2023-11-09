/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("users", (table) => {
        table.increments("userId").primary()
        table.string("firstName")
        table.string("lastName")
        table.string("middleName")
        table.string("email")
        table.json("location")
        table.string("profileImage")
        table.string("about")
        table.date("DOB")
        table.string("phone")
        table.string("password")
        table.boolean("delete").defaultTo(false)
        table.string("deviceId") // to identify the user , 
        table.string("OTP") // to validate the otp verification process , this is in incrypted form 
        table.string("Gender")
        table.timestamp("created_at").notNullable().defaultTo(knex.fn.now())
        table.timestamp("updated_at").notNullable().defaultTo(knex.fn.now())
    })
};
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable("users");
};
