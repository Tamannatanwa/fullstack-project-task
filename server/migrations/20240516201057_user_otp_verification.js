exports.up = function (knex) {
  return knex.schema.createTable("public.user_otp_verification", function (table) {
    table.increments("id").primary();
    table.integer("user_id").unsigned().notNullable();
    table.foreign("user_id").references("id").inTable("public.users");
    table.string("otp").notNullable();
    table
      .timestamp("expires_at")
      .defaultTo(knex.raw("CURRENT_TIMESTAMP + INTERVAL '1 HOUR'"));
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("public.user_otp_verification");
};
