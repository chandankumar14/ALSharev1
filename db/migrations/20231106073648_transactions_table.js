/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("transactions", table => {
        table.increments("id").primary()
        table.integer("userId")
            .unsigned()
            .notNullable()
            .references("userId")
            .inTable("users")
        table.integer("eventId")
            .unsigned()
            .references("eventId")
            .inTable("events")
        table.float("amount")
        table.string("orderId") // this is representing the razorpay orderId
        table.string("keyId") // this is razorpay keyId
        table.boolean("initiated").defaultTo(true)
        table.string("transId")
        table.string("payment_mode")
        table.boolean("status").defaultTo(false)
        table.string("currency_code")
        table.json("paymentResponse")
        table.timestamp("created_at").notNullable().defaultTo(knex.fn.now())
        table.timestamp("updated_at").notNullable().defaultTo(knex.fn.now())
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable("transactions")
};
