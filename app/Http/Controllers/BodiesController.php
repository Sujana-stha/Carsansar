<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Body;

class BodiesController extends Controller
{
    public function index(Request $request)
    {
        $body= Body::with('createdBy:id,name')->orderBy($request->column, $request->order)->paginate(3);
        return $body;
    }

    public function getList()
    {
        $body = Body::where('status','1')->pluck('body_desc','id');
        return $body;
    }
 
    public function show(Body $body)
    {
        return $body;
    }
 
    public function store(Request $request)
    {
        // $this->validate($request, [
        //     'title' => 'required|unique:bodies|max:255',        
        // ]);
        $body = Body::create($request->all());
 
        return response()->json($body, 201);
    }
 
    public function update(Request $request, Body $body)
    {
        $body->update($request->all());
 
        return response()->json($body, 200);
    }
 
    public function delete(Body $body)
    {
        $body->delete();
 
        return response()->json(null, 204);
    }
}
