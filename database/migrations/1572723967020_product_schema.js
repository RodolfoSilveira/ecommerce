'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductSchema extends Schema {
  up () {
    this.create('products', (table) => {
      table.increments()
      table.string('name', 200)
      table.integer('image_id').unsigned()
      table.text('description')
      table.decimal('price', 12, 2)
      table.timestamps()

      table.foreign('image_id')
      .references('id')
      .inTable('images')
      .onDelete('cascade')
    })

    this.create('image_product', table => {
      table.increments()
      table.integer('image_id').unsigned()
      table.integer('product_id').unsigned()
      table.foreign('image_id')
      .references('id')
      .inTable('images')
      .onDelete('cascade')

      table
      .foreign('product_id')
      .references('id')
      .inTable('products')
      .onDelete('cascade')
    })

    this.create('category_product', table => {
      table.increments()
      table.integer('product_id').unsigned()
      table.integer('category_id').unsigned()

      table
      .foreign('product_id')
      .references('id')
      .inTable('products')
      .onDelete('cascade')

      table
      .foreign('category_id')
      .references('id')
      .inTable('categories')
      .onDelete('cascade')
    })
  }

  down () {
    this.table('products', (table) => {
      // reverse alternations
      table.dropForeign('image_id')
    })
    this.table('image_product', (table) => {
      // reverse alternations
      table.dropForeign('image_id')
      table.dropForeign('product_id')
    })
    this.table('category_product', (table) => {
      // reverse alternations
      table.dropForeign('category_id')
      table.dropForeign('product_id')
    })
    this.drop('products')
    this.drop('image_product')
    this.drop('category_product')
  }
}

module.exports = ProductSchema
