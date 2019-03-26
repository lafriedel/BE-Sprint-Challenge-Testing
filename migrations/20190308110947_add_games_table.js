exports.up = function(knex, Promise) {
  return knex.schema.createTable("games", table => {
    table.increments();
    table.string("title", 128).notNullable();
    table.string("genre", 55).notNullable();
    table.integer("releaseYear", 55);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("games");
};
