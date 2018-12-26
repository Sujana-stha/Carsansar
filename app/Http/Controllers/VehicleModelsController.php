<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\VehicleModel;

class VehicleModelsController extends Controller
{
    public function index()
    {
        $model = VehicleModel::paginate(3);
        return $model;
    }
 
    public function show(VehicleModel $model)
    {
        return $model;
    }
 
    public function store(Request $request)
    {
        $model = VehicleModel::create($request->all());
 
        return response()->json($model, 201);
    }
 
    public function update(Request $request, VehicleModel $model)
    {
        $model->update($request->all());
 
        return response()->json($model, 200);
    }
 
    public function delete(VehicleModel $model)
    {
        $model->delete();
 
        return response()->json(null, 204);
    }
}
