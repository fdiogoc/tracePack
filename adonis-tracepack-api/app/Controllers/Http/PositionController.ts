import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Position from 'App/Models/Position'

export default class PositionController
{
    public async index({ }: HttpContextContract)
    {

        return Position.query()
    }

    public async positions({ auth }: HttpContextContract)
    {
        const positons = await Position.query();
        console.log(positons)
        return positons
    }

    public async show({ params }: HttpContextContract)
    {
        try
        {
            const positon = await Position.find(params.id)
            if (positon)
            {

                return positon
            }
        } catch (error)
        {
            console.log(error)
        }
    }

    public async update({ request, params }: HttpContextContract)
    {
        const positon = await Position.find(params.id)
        if (positon)
        {
            positon.name = request.input('name')
            positon.color = request.input('color')
            positon.json = request.input('geoJSON')
            if (await positon.save())
            {
                return positon
            }
            return // 422
        }
        return // 401
    }

    public async create({ auth, request }: HttpContextContract)
    {
        const position = new Position()
        position.name = request.input('name')
        position.color = request.input('color')
        position.json = request.input('geoJson')
        console.log(position)
        await position.save()
        return position
    }
    public async delete({ response, auth, params }: HttpContextContract)
    {
        await Position.query().where('id', params.id).delete()
        return response.redirect('/dashboard')
    }



    private async find(id: number): Promise<Position | null>
    {
        try
        {
            const positon = await Position.find(id)
            if (positon)
            {
                return positon
            }
        } catch (error)
        {
            console.log(error)
        }
        return null
    }
}