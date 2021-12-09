
exports.up = function (knex) {
	return knex.schema.createTable('users', function (table) {
		table.increments('id').primary()
		table.string('name').notNullable()
		table.string('username').notNullable()
		table.string('email').notNullable()		
		table.timestamp('email_verified_at')
		table.string('password').notNullable()
		table.string('remember_token')
		table.string('two_factor_secret')
		table.string('two_factor_recovery_codes')
		table.unique('email')
		table.unique('password')
		table.timestamp('created_at').defaultTo(knex.fn.now())
		table.timestamp('updated_at').defaultTo(knex.fn.now())
	})
}

exports.down = function (knex) {
	return knex.schema.dropTable('users');
}