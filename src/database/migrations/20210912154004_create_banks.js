
exports.up = function (knex) {
	return knex.schema.createTable('banks', function (table) {
		table.increments('id').primary()
		table.integer('user_id')
		table.string('name').notNullable()
		table.string('routing_number').comment('Encrypted field that only exists on your machine, unless user allows data to be shared with Plaid services.')
		table.string('account_number').comment('Encrypted field that only exists on your machine, unless user allows data to be shared with Plaid services.')
		table.string('account_username').comment('Encrypted field that only exists on your machine, unless user allows data to be shared with Plaid services.')
		table.string('account_password').comment('Encrypted field that only exists on your machine, unless user allows data to be shared with Plaid services.')
		table.string('type')
		table.string('status').defaultTo('active')
		table.foreign('user_id').references('id').inTable('users')
		table.timestamp('created_at').defaultTo(knex.fn.now())
		table.timestamp('updated_at').defaultTo(knex.fn.now())
	})
}

exports.down = function (knex) {
	return knex.schema.dropTable('banks')
}