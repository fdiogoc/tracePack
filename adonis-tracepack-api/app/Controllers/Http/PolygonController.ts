import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Polygon from 'App/Models/Polygon'

export default class PolygonController
{
    public async index({ }: HttpContextContract)
    {

        return Polygon.query()
    }

    public async polygons({ auth }: HttpContextContract)
    {
        const polygons = await Polygon.query();
        console.log(polygons)
        return polygons
    }

    public async show({ params }: HttpContextContract)
    {
        try
        {
            const polygon = await Polygon.find(params.id)
            if (polygon)
            {

                return polygon
            }
        } catch (error)
        {
            console.log(error)
        }
    }

    public async update({ request, params }: HttpContextContract)
    {
        const polygon = await Polygon.find(params.id)
        if (polygon)
        {
            polygon.name = request.input('name')
            polygon.color = request.input('color')
            polygon.json = request.input('geoJSON')
            if (await polygon.save())
            {
                return polygon
            }
            return // 422
        }
        return // 401
    }

    public async create({ auth, request }: HttpContextContract)
    {
        const polygon = new Polygon()
        polygon.name = request.input('name')
        polygon.color = request.input('color')
        polygon.json = request.input('geoJson')
        console.log(polygon)
        await polygon.save()
        return polygon
    }
    public async delete({ response, auth, params }: HttpContextContract)
    {
        await Polygon.query().where('id', params.id).delete()
        return response.redirect('/dashboard')
    }



    private async find(id: number): Promise<Polygon | null>
    {
        try
        {
            const polygon = await Polygon.find(id)
            if (polygon)
            {
                return polygon
            }
        } catch (error)
        {
            console.log(error)
        }
        return null
    }
}