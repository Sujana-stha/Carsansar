<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::resource('products', 'ProductController');

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

//bodies

Route::get('bodies', 'BodiesController@index');
 
Route::get('bodies/{body}', 'BodiesController@show');
 
Route::post('bodies','BodiesController@store');
 
Route::put('bodies/{body}','BodiesController@update');
 
Route::delete('bodies/{body}', 'BodiesController@delete');

//categories

Route::get('categories', 'CategoriesController@index');
 
Route::get('categories/{category}', 'CategoriesController@show');
 
Route::post('categories','CategoriesController@store');
 
Route::put('categories/{category}','CategoriesController@update');
 
Route::delete('categories/{category}', 'CategoriesController@delete');

//colors

Route::get('colors', 'ColorsController@index');
 
Route::get('colors/{color}', 'ColorsController@show');
 
Route::post('colors','ColorsController@store');
 
Route::put('colors/{color}','ColorsController@update');
 
Route::delete('colors/{color}', 'ColorsController@delete');

//companies

Route::get('companies', 'CompaniesController@index');
 
Route::get('companies/{company}', 'CompaniesController@show');
 
Route::post('companies','CompaniesController@store');
 
Route::put('companies/{company}','CompaniesController@update');
 
Route::delete('companies/{company}', 'CompaniesController@delete');

//drives

Route::get('drives', 'DrivesController@index');
 
Route::get('drives/{drive}', 'DrivesController@show');
 
Route::post('drives','DrivesController@store');
 
Route::put('drives/{drive}','DrivesController@update');
 
Route::delete('drives/{drive}', 'DrivesController@delete');

//enginesizes

Route::get('enginesizes', 'EnginesizesController@index');
 
Route::get('enginesizes/{enginesize}', 'EnginesizesController@show');
 
Route::post('enginesizes','EnginesizesController@store');
 
Route::put('enginesizes/{enginesize}','EnginesizesController@update');
 
Route::delete('enginesizes/{enginesize}', 'EnginesizesController@delete');

//fueltypes

Route::get('fueltypes', 'FueltypesController@index');
 
Route::get('fueltypes/{fueltype}', 'FueltypesController@show');
 
Route::post('fueltypes','FueltypesController@store');
 
Route::put('fueltypes/{fueltype}','FueltypesController@update');
 
Route::delete('fueltypes/{fueltype}', 'FueltypesController@delete');

//makes

Route::get('makes', 'MakesController@index');
 
Route::get('makes/{make}', 'MakesController@show');
 
Route::post('makes','MakesController@store');
 
Route::put('makes/{make}','MakesController@update');
 
Route::delete('makes/{make}', 'MakesController@delete');

//models

Route::get('models', 'VehicleModelsController@index');
 
Route::get('models/{model}', 'VehicleModelsController@show');
 
Route::post('models','VehicleModelsController@store');
 
Route::put('models/{model}','VehicleModelsController@update');
 
Route::delete('models/{model}', 'VehicleModelsController@delete');

//options

Route::get('options', 'OptionsController@index');
 
Route::get('options/{option}', 'OptionsController@show');
 
Route::post('options','OptionsController@store');
 
Route::put('options/{option}','OptionsController@update');
 
Route::delete('options/{option}', 'OptionsController@delete');

//transmissons

Route::get('transmissons', 'TransmissonsController@index');
 
Route::get('transmissons/{transmisson}', 'TransmissonsController@show');
 
Route::post('transmissons','TransmissonsController@store');
 
Route::put('transmissons/{transmisson}','TransmissonsController@update');
 
Route::delete('transmissons/{transmisson}', 'TransmissonsController@delete');


