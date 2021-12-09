
exports.up = function (knex) {
	return knex.schema.createTable('password_resets', function (table) {
		table.string('email').notNullable()
		table.string('token')
		table.timestamp('created_at').defaultTo(knex.fn.now())
	})
}

exports.down = function (knex) {
	return knex.schema.dropTable('password_resets')
}
