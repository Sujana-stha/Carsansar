<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\VehicleOption;

class VehicleOptionsController extends Controller
{
    public function index()
    {
        return VehicleOption::all();
    }
 
    public function show(VehicleOption $vehicle_option)
    {
        return $vehicle_option;
    }
 
    public function store(Request $request)
    {
        $vehicle_option = VehicleOption::create($request->all());
 
        return response()->json($vehicle_option, 201);
    }
 
    public function update(Request $request, VehicleOption $vehicle_option)
    {
        $vehicle_option->update($request->all());
 
        return response()->json($vehicle_option, 200);
    }
 
    public function delete(VehicleOption $vehicle_option)
    {
        $vehicle_option->delete();
 
        return response()->json(null, 204);
    }
}
