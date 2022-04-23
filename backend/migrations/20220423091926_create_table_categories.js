
exports.up = function(knex, Promise) {
    return knex.schema.createTable('categories', table => {
        table.increments('id').primary();
        table.string('name').notNull();
        table.string('color').defaultTo('#fff');
        table.integer("user_id").references('id').inTable('users').notNull();
      })
      
  };
  
  exports.down = function(knex, Promise) {
      return knex.schema.dropTable('categories')
    
  };