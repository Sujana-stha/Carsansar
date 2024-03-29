<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Fueltype;
use Config;

class FueltypesController extends Controller
{
    public function index(Request $request)
    {
        // return Fueltype::all();
        $fueltype = Fueltype::with('createdBy:id,first_name,last_name')->orderBy($request->column, $request->order)->paginate(config('app_env.NO_OF_ROWS'));
        return $fueltype;
    }

    public function getList()
    {
        $fueltype = Fueltype::where('status','1')->pluck('fueltype_desc','id');
        return $fueltype;
    }
 
    public function show(Fueltype $fueltype)
    {
        return $fueltype;
    }
 
    public function store(Request $request)
    {
        $errormsg = "";
        $result = false;
        $errorcode="";
        try{
            if($request->get('fueltype_desc')!=null){
                $request->merge(['created_by'=>auth()->id()]);
                $fueltype = Fueltype::create($request->all());
                $result = true;
            }else{
                $result = false;
                $errormsg = "Fuel Type Description cannot be null";
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
 
    public function update(Request $request, Fueltype $fueltype)
    {
        $fueltype->update($request->all());
 
        return response()->json($fueltype, 200);
    }
 
    public function delete(Fueltype $fueltype)
    {
        $fueltype->delete();
 
        return response()->json(null, 204);
    }
}
