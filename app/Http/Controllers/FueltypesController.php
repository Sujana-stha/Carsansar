<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Fueltype;

class FueltypesController extends Controller
{
    public function index()
    {
        // return Fueltype::all();
        $fueltype = Fueltype::with('createdBy:id,name')->orderBy('id', 'desc')->paginate(3);
        return $fueltype;
    }
 
    public function show(Fueltype $fueltype)
    {
        return $fueltype;
    }
 
    public function store(Request $request)
    {
        $fueltype = Fueltype::create($request->all());
 
        return response()->json($fueltype, 201);
    }
 
    public function update(Request $request, Fueltype $fueltype)
    {
        $fueltype->update($request->all());
 
        return response()->json($fueltype, 200);
    }
 
    public function delete(Fueltype $fueltype)
    {
        $fueltype->delete();
 
        return response()->json(null, 204);
    }
}
