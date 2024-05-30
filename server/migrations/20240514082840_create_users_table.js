exports.up = function (knex) {
  return knex.schema.createTable("public.users", function (table) {
    table.increments("id").primary();
    table.string("username").notNullable();
    table.string("email").notNullable().unique();
    table.string("password").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("public.user_otp_verification");
};
