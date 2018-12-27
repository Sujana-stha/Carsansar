<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\OptionCategory;

class OptionsCategoriesController extends Controller
{
    public function index()
    {
        
        $optionCategories = OptionCategory::paginate(3);
        return $optionCategories;
    }
 
    public function show(OptionCategory $optionCategories)
    {
        return $optionCategories;
    }
 
    public function store(Request $request)
    {
        $optionCategories = OptionCategory::create($request->all());
 
        return response()->json($optionCategories, 201);
    }
 
    public function update(Request $request, OptionCategory $optionCategories)
    {
            
        $optionCategories->update($request->all());
 
        return response()->json($optionCategories, 200);
    }
 
    public function delete(OptionCategory $optionCategories)
    {
        $optionCategories->delete();
       
        return response()->json(null, 204);

    }
}
