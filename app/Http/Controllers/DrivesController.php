<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Drive;

class DrivesController extends Controller
{
    public function index()
    {
        return Drive::all();
    }
 
    public function show(Drive $drive)
    {
        return $drive;
    }
 
    public function store(Request $request)
    {
        $drive = Drive::create($request->all());
 
        return response()->json($drive, 201);
    }
 
    public function update(Request $request, Drive $drive)
    {
        $drive->update($request->all());
 
        return response()->json($drive, 200);
    }
 
    public function delete(Drive $drive)
    {
        $drive->delete();
 
        return response()->json(null, 204);
    }
}
