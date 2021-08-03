import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Polygons extends BaseSchema
{
  protected tableName = 'polygons'

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
