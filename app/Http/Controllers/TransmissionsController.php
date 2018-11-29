<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Transmission;

class TransmissionsController extends Controller
{
    public function index()
    {
        return Transmission::all();
    }
 
    public function show(Transmission $transmission)
    {
        return $transmission;
    }
 
    public function store(Request $request)
    {
        $transmission = Transmission::create($request->all());
 
        return response()->json($transmission, 201);
    }
 
    public function update(Request $request, Transmission $transmission)
    {
        $transmission->update($request->all());
 
        return response()->json($transmission, 200);
    }
 
    public function delete(Transmission $transmission)
    {
        $transmission->delete();
 
        return response()->json(null, 204);
    }
}
