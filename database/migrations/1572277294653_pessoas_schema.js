'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PessoasSchema extends Schema {
  up () {
    this.create('pessoas', (table) => {
      table.increments()
      table.string('nome', 80).notNullable()
      table.string('idade', 3)
      table.string('rg', 11).notNullable()
      table.string('cpf', 12).notNullable().unique()
      table.timestamps()
    })
  }

  down () {
    this.drop('pessoas')
  }
}

module.exports = PessoasSchema
