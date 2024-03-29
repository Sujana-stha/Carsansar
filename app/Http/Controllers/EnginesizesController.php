<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Enginesize;
use Config;

class EnginesizesController extends Controller
{
    public function index(Request $request)
    {
        // return Enginesize::all();
        $enginesize = Enginesize::with('createdBy:id,first_name,last_name')->orderBy($request->column, $request->order)->paginate(config('app_env.NO_OF_ROWS'));
        return $enginesize;
    }

    public function getList()
    {
        $enginesize = Enginesize::where('status','1')->pluck('enginesize_desc','id');
        return $enginesize;
    }
 
    public function show(Enginesize $enginesize)
    {
        return $enginesize;
    }
 
    public function store(Request $request)
    {
        $errormsg = "";
        $result = false;
        $errorcode="";
        try{
            if($request->get('enginesize_desc')!=null){
                $request->merge(['created_by'=>auth()->id()]);
                $enginesize = Enginesize::create($request->all());
                $result = true;
            }else{
                $result = false;
                $errormsg = "Engine Size Description cannot be null";
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
 
    public function update(Request $request, Enginesize $enginesize)
    {
        $enginesize->update($request->all());
 
        return response()->json($enginesize, 200);
    }
 
    public function delete(Enginesize $enginesize)
    {
        $enginesize->delete();
 
        return response()->json(null, 204);
    }
}
