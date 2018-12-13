<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Make;

class MakesController extends Controller
{
    public function index()
    {
        
        $make = Make::paginate(3);
        return $make;
    }
 
    public function show(Make $make)
    {
        return $make;
    }
 
    public function store(Request $request)
    {
        $make = Make::create($request->all());
 
        return response()->json($make, 201);
    }
 
    public function update(Request $request, Make $make)
    {
            
        $make->update($request->all());
 
        return response()->json($make, 200);
    }
 
    public function delete(Make $make)
    {
        $make->delete();
 
        return response()->json(null, 204);
    }
}
