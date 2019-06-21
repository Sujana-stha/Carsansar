<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Color;
use Config; 

class ColorsController extends Controller
{
    public function index(Request $request)
    {
        $color= Color::with('createdBy:id,first_name,last_name')->orderBy($request->column, $request->order)->paginate(config('app_env.NO_OF_ROWS'));
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
                $request->merge(['created_by'=>auth()->id()]);
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
        $color->updated_by = auth()->id();
        $color->update($request->all());
        return response()->json($color, 200);
    }
 
    public function delete(Color $color)
    {
        $color->delete();
 
        return response()->json(null, 204);
    }
}
