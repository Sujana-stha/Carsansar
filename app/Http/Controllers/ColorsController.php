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
        $errormsg = "";
        $result = false;
        $errorcode="";
        try{
            if($request->get('color_desc')!=null){
                $color = Color::create($request->all());
                $result = true;
            }else{
                $result = false;
                $errormsg = "Color Description cannot be null";
            }
            
        }catch(\Exception $exception)
        {
            //dd($exception);exit;
            $errormsg = $exception->getMessage();
            $errorcode = $exception->getCode();
        }
        return response()->json(['success'=>$result,'errormsg'=>$errormsg,'errorcode'=>$errorcode]);
        
 
        //return response()->json($enginesize, 201);
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
