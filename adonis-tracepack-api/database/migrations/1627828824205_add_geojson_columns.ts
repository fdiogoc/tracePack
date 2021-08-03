import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Positions extends BaseSchema
{
  protected tableName = 'positions'

  public async up()
  {
    this.schema.table(this.tableName, (table) =>
    {
      table.json('json')
    })
  }

  public async down()
  {
    this.schema.table(this.tableName, (table) =>
    {
      table.json('json')
    })
  }
}
