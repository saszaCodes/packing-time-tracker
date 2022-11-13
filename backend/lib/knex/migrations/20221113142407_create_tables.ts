module.exports = {
  up: async function (knex) {
    return knex.schema.createTable("orders", function (table) {
      table.increments("id");
      table.integer("orderId").notNullable();
      table.string("title").notNullable();
      table.string("areaName").notNullable();
      table.string("type").notNullable();
      table.string("date").notNullable();
      table.integer("units").notNullable();
      table.integer("duration").notNullable();
    });
  },
  down: async function (knex) {
    return knex.schema.dropTable("orders");
  },
};
