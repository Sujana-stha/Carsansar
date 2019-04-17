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

Route::post('register', 'Auth\RegisterController@register');

//Public Route
//Route::post('/login','AuthenticationController@login')->name('login');

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

//Route::post('/register','AuthenticationController@register')->name('register');

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return response()->json($request->user());
});

//Private Route
 Route::middleware('auth:api')->group(function () {
    Route::post('logout', 'UserController@signout');

    //makes
    Route::get('makes', 'MakesController@index');

    Route::get('makes/getList', 'MakesController@getList');

    Route::get('makes/{make}', 'MakesController@show');

    Route::post('makes','MakesController@store');

    Route::put('makes/{make}','MakesController@update');

    Route::delete('makes/{make}', 'MakesController@delete');
    
    //bodies
    Route::get('bodies', 'BodiesController@index');

    Route::get('bodies/getList', 'BodiesController@getList');
    
    Route::get('bodies/{body}', 'BodiesController@show');
    
    Route::post('bodies','BodiesController@store');
    
    Route::put('bodies/{body}','BodiesController@update');
    
    Route::delete('bodies/{body}', 'BodiesController@delete');

    //categories
    Route::get('categories', 'CategoriesController@index');

    Route::get('categories/getList', 'CategoriesController@getList');
    
    Route::get('categories/{category}', 'CategoriesController@show');
    
    Route::post('categories','CategoriesController@store');
    
    Route::put('categories/{category}','CategoriesController@update');
    
    Route::delete('categories/{category}', 'CategoriesController@delete');

    //colors
    Route::get('colors', 'ColorsController@index');

    Route::get('colors/getList', 'ColorsController@getList');
    
    Route::get('colors/{color}', 'ColorsController@show');
    
    Route::post('colors','ColorsController@store');
    
    Route::put('colors/{color}','ColorsController@update');
    
    Route::delete('colors/{color}', 'ColorsController@delete');

    //companies
    Route::get('companies', 'CompaniesController@index');

    Route::get('companies/getList', 'CompaniesController@getList');
    
    Route::get('companies/{company}', 'CompaniesController@show');
    
    Route::post('companies','CompaniesController@store');
    
    Route::put('companies/{company}','CompaniesController@update');
    
    Route::delete('companies/{company}', 'CompaniesController@delete');

    //drives
    Route::get('drives', 'DrivesController@index');

    Route::get('drives/getList', 'DrivesController@getList');
    
    Route::get('drives/{drive}', 'DrivesController@show');
    
    Route::post('drives','DrivesController@store');
    
    Route::put('drives/{drive}','DrivesController@update');
    
    Route::delete('drives/{drive}', 'DrivesController@delete');

    //enginesizes
    Route::get('enginesizes', 'EnginesizesController@index');

    Route::get('enginesizes/getList', 'EnginesizesController@getList');
    
    Route::get('enginesizes/{enginesize}', 'EnginesizesController@show');
    
    Route::post('enginesizes','EnginesizesController@store');
    
    Route::put('enginesizes/{enginesize}','EnginesizesController@update');
    
    Route::delete('enginesizes/{enginesize}', 'EnginesizesController@delete');

    //fueltypes
    Route::get('fueltypes', 'FueltypesController@index');

    Route::get('fueltypes/getList', 'FueltypesController@getList');
    
    Route::get('fueltypes/{fueltype}', 'FueltypesController@show');
    
    Route::post('fueltypes','FueltypesController@store');
    
    Route::put('fueltypes/{fueltype}','FueltypesController@update');
    
    Route::delete('fueltypes/{fueltype}', 'FueltypesController@delete');

    //models
    Route::get('models', 'VehicleModelsController@index');

    Route::get('models/getList', 'VehicleModelsController@getList');
    
    Route::get('models/{model}', 'VehicleModelsController@show');
    
    Route::post('models','VehicleModelsController@store');
    
    Route::put('models/{model}','VehicleModelsController@update');
    
    Route::delete('models/{model}', 'VehicleModelsController@delete');

    //vehicle options
    Route::get('vehicle-options', 'VehicleOptionsController@index');
    
    Route::get('vehicle-options/{vehicle_option}', 'VehicleOptionsController@show');
    
    Route::post('vehicle-options','VehicleOptionsController@store');
    
    Route::put('vehicle-options/{vehicle_option}','VehicleOptionsController@update');
    
    Route::delete('vehicle-options/{vehicle_option}', 'VehicleOptionsController@delete');

    //options
    Route::get('options', 'OptionsController@index');

    Route::get('options/getList', 'OptionsController@getList');
    
    Route::get('options/getDesc/{id}', 'OptionsController@getOptionDesc');

    Route::get('options/{option}', 'OptionsController@show');
    
    Route::post('options','OptionsController@store');
    
    Route::put('options/{option}','OptionsController@update');
    
    Route::delete('options/{option}', 'OptionsController@delete');


    // option categories
    Route::get('optionsCategories', 'OptionsCategoriesController@index');
    
    Route::get('optionsCategories/{optionCategories}', 'OptionsCategoriesController@show');
    
    Route::post('optionsCategories','OptionsCategoriesController@store');
    
    Route::put('optionsCategories/{optionCategories}','OptionsCategoriesController@update');
    
    Route::delete('optionsCategories/{optionCategories}', 'OptionsCategoriesController@delete');

    //transmissons
    Route::get('transmissions', 'TransmissionsController@index');

    Route::get('transmissions/getList', 'TransmissionsController@getList');
    
    Route::get('transmissions/{transmission}', 'TransmissionsController@show');
    
    Route::post('transmissions','TransmissionsController@store');
    
    Route::put('transmissions/{transmission}','TransmissionsController@update');
    
    Route::delete('transmissions/{transmission}', 'TransmissionsController@delete');

    //vehicles
    Route::get('vehicles', 'DealsController@index');
    
    Route::get('vehicles/{vehicle}', 'DealsController@show');
    
    Route::post('vehicles','DealsController@store');
    
    Route::put('vehicles/{vehicle}','DealsController@update');
    
    Route::delete('vehicles/{vehicle}', 'DealsController@delete');

});

//importScript

//Route::get('vehicles', 'DealsController@index');
 
//Route::get('vehicles/{vehicle}', 'DealsController@show');
 
Route::get('import','ImportScriptController@ReadCSV');
 
//Route::put('vehicles/{vehicle}','DealsController@update');
 
//Route::delete('vehicles/{vehicle}', 'DealsController@delete');


