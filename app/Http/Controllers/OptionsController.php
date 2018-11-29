<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Option;

class OptionsController extends Controller
{
    public function index()
    {
        return Option::all();
    }
 
    public function show(Option $option)
    {
        return $option;
    }
 
    public function store(Request $request)
    {
        $option = Option::create($request->all());
 
        return response()->json($option, 201);
    }
 
    public function update(Request $request, Option $option)
    {
        $option->update($request->all());
 
        return response()->json($option, 200);
    }
 
    public function delete(Option $option)
    {
        $option->delete();
 
        return response()->json(null, 204);
    }
}
