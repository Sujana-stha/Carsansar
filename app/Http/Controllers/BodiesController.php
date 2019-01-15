<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Body;

class BodiesController extends Controller
{
    public function index()
    {
        $body= Body::with('createdBy:id,name')->orderBy('id', 'desc')->paginate(3);
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
