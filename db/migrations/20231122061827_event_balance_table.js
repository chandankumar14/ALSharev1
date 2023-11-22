/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("event_balance", table => {
        table.increments("id").primary()
        table.integer("userId")
            .unsigned()
            .notNullable()
            .references("userId")
            .inTable("users")
        table.float("credit_amount")
        table.float("debit_amount")
        table.string("orderId") // this is representing the razorpay orderId
        table.string("transId")
        table.string("payment_mode")
        table.boolean("status").defaultTo(true)
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
    return knex.schema.dropTable("event_balance")
};
