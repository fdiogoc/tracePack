import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Position extends BaseModel
{
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string;

  @column()
  public color: string;

  @column()
  public geoJSON: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
