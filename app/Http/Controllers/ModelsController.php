<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Model;

class ModelsController extends Controller
{
    public function index()
    {
        return Model::all();
    }
 
    public function show(Model $model)
    {
        return $model;
    }
 
    public function store(Request $request)
    {
        $model = Model::create($request->all());
 
        return response()->json($model, 201);
    }
 
    public function update(Request $request, Model $model)
    {
        $model->update($request->all());
 
        return response()->json($model, 200);
    }
 
    public function delete(Model $model)
    {
        $model->delete();
 
        return response()->json(null, 204);
    }
}
