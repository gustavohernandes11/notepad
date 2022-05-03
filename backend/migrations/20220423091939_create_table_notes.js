
exports.up = function(knex, Promise) {
    return knex.schema.createTable('notes', table => {
        table.increments('id').primary();
        table.string('title').defaultTo(null);
        table.boolean('favorite').defaultTo(false);
        table.integer("category_id").references('id').inTable('categories').notNull();
      })
      
  };
  
  exports.down = function(knex, Promise) {
      return knex.schema.dropTable('notes')
    
  };

