
exports.up = function(knex, Promise) {
    return knex.schema.alterTable('notes', table => {
        table.timestamp('content').notNull()
      })
};

exports.down = function(knex, Promise) {
    return knex.schema.alterTable('notes', table => {
        table.dropColumn('content')
      })
};
