/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.group(() =>
{
  Route.group(() =>
  {
    Route.post('register', 'AuthController.register')
    Route.post('login', 'AuthController.login')
  }).prefix('auth')

  Route.group(() =>
  {
    Route.get('', 'PositionController.positions')
    Route.post('', 'PositionController.create')
    Route.put('update', 'PositionController.update')
    Route.put('delete', 'PositionController.delete')
    Route.get('find', 'PositionController.find')
  }).prefix('position').middleware('auth:api')

  Route.group(() =>
  {
    Route.get('', 'PolygonController.polygons')
    Route.post('', 'PolygonController.create')
    Route.put('update', 'PolygonController.update')
    Route.put('delete', 'PolygonController.delete')
    Route.get('find', 'PolygonController.find')
  }).prefix('polygon').middleware('auth:api')

}).prefix('api/v1')