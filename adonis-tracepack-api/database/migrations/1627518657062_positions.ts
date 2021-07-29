import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Positions extends BaseSchema
{
  protected tableName = 'positions'

  public async up()
  {
    this.schema.createTable(this.tableName, (table) =>
    {
      table.increments('id').primary()
      table.string('name')
      table.string('color')
      table.jsonb('geoJSON')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down()
  {
    this.schema.dropTable(this.tableName)
  }
}
