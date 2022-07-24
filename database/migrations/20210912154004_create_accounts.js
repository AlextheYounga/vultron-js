
exports.up = function (knex) {
	return knex.schema.createTable('accounts', function (table) {
		table.increments('id').primary()
		table.bigInteger('user_id')
		table.string('last_four').notNullable()
		table.string('name').notNullable()
		table.string('institution').notNullable()
		table.string('balance_available')
		table.string('balance_ledger')
		table.string('type')
		table.string('subtype')
		table.string('currency')
		table.string('status').defaultTo('open')
		table.foreign('user_id').references('id').inTable('users')
		table.timestamp('created_at').defaultTo(knex.fn.now())
		table.timestamp('updated_at').defaultTo(knex.fn.now())
	})
}

exports.down = function (knex) {
	return knex.schema.dropTable('accounts')
}