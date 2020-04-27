exports.up = function(knex, Promise) {
	return knex.schema.createTable('clients', table => {

		table.increments('id').primary()
		table.string('name').notNull()
		table.string('cpf').notNull().unique()
		table.string('address').notNull()
		table.string('neighborhood').notNull()
		table.string('phone').notNull()
		table.string('cep').notNull()

	})  
};

exports.down = function(knex) {
  return knex.schema.dropTable('clients')
   	
};
