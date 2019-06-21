<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Make;
use Config;

class MakesController extends Controller
{   
    public function index(Request $request)
    {
        $make = Make::with('createdBy:id,first_name,last_name')->orderBy($request->column, $request->order)->paginate(config('app_env.NO_OF_ROWS'));
        return $make;
    }
 
    public function show(Make $make)
    {
        return $make;
    }

    public function getList()
    {
        $make = Make::where('status','1')->pluck('make_desc','id');
        return $make;
    }
 
    public function store(Request $request)
    {
        $errormsg = "";
        $result = false;
        $errorcode="";
        try{
            if($request->get('make_desc')!=null){
                $request->merge(['created_by'=>auth()->id()]);
                $make = Make::create($request->all());
                $result = true;
            }else{
                $result = false;
                $errormsg = "Make Description cannot be null";
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
