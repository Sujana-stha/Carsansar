<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Color;

class ColorsController extends Controller
{
    public function index(Request $request)
    {
        $color= Color::with('createdBy:id,name')->orderBy($request->column, $request->order)->paginate(3);
        return $color;
    }

    public function getList()
    {
        $color = Color::where('status','1')->pluck('color_desc','id');
        return $color;
    }
 
    public function show(Color $color)
    {
        return $color;
    }
 
    public function store(Request $request)
    {
        // $color = new Color([
        //     'color_cd' => $request->get('color_cd'),
        //     'color_desc' => $request->get('color_desc'),
        //     'created_by' => 1
        // ]);
        // $color->save();
  
  
        // return response()->json('Color Added Successfully.', 201);
        $color = Color::create($request->all());
 
        return response()->json($color, 201);

        //var_dump($request);exit;
        // $request->created_by=1;
        // $color = Color::create($request->all());
 
        // return response()->json($color, 201);
    }
 
    public function update(Request $request, Color $color)
    {
        $color->update($request->all());
 
        return response()->json($color, 200);
    }
 
    public function delete(Color $color)
    {
        $color->delete();
 
        return response()->json(null, 204);
    }
}
