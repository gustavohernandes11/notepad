
exports.up = function(knex, Promise) {
    return knex.schema.alterTable('notes', table => {
        table.timestamp('createdAt').defaultTo(null);
        table.integer("user_id").references('id').inTable('users').notNull();
        table.boolean('important').defaultTo(false);
      })
};

exports.down = function(knex, Promise) {
    return knex.schema.alterTable('notes', table => {
        table.dropColumn('createdAt');
        table.dropColumn('user_id');
        table.dropColumn('important');
      })
};
