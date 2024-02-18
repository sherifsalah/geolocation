/**
 * Database migration to create the 'locations' table.
 *
 * @param {import("knex").Knex} knex - Knex instance for interacting with the database.
 * @returns {Promise<void>} - A Promise that resolves when the migration is complete.
 */
exports.up = function (knex) {
  return knex.schema.createTable('locations', function (table) {
    // Define columns for the 'locations' table
    table.increments('id').primary(); // Auto-incremented primary key
    table.string('title').notNullable(); // Title of the location (non-nullable)
    table.string('image').notNullable(); // URL of the location image (non-nullable)
    table.decimal('latitude', 18, 15).notNullable(); // Latitude of the location (non-nullable)
    table.decimal('longitude', 18, 15).notNullable(); // Longitude of the location (non-nullable)
    table.timestamps(true, true); // Automatic creation and update timestamps
  });
};

/**
 * Database migration to drop the 'locations' table.
 *
 * @param {import("knex").Knex} knex - Knex instance for interacting with the database.
 * @returns {Promise<void>} - A Promise that resolves when the migration is complete.
 */
exports.down = function (knex) {
  return knex.schema.dropTable('locations');
};

