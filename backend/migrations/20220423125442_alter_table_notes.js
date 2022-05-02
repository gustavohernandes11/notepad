
exports.up = function(knex, Promise) {
    return knex.schema.alterTable('notes', table => {
        table.string('content', 1000).notNull()
      })
};

exports.down = function(knex, Promise) {
    return knex.schema.alterTable('notes', table => {
        table.dropColumn('content')
      })
};
