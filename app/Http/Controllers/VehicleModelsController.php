<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\VehicleModel;
use Config;

class VehicleModelsController extends Controller
{
    public function index(Request $request)
    {
        $model = VehicleModel::with('createdBy:id,first_name,last_name')->orderBy($request->column, $request->order)->paginate(config('app_env.NO_OF_ROWS'));
        return $model;
    }

    public function getList()
    {
        
        $model = VehicleModel::where('status','1')->pluck('model_desc','id');
        return $model;
    }
 
    public function show(VehicleModel $model)
    {
        return $model;
    }
 
    public function store(Request $request)
    {
        $errormsg = "";
        $result = false;
        $errorcode="";
        try{
            if($request->get('model_desc')!=null){
                $request->merge(['created_by'=>auth()->id()]);
                $model = VehicleModel::create($request->all());
                $result = true;
            }else{
                $result = false;
                $errormsg = "Model Description cannot be null";
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
 
    public function update(Request $request, VehicleModel $model)
    {
        $model->update($request->all());
 
        return response()->json($model, 200);
    }
 
    public function delete(VehicleModel $model)
    {
        $model->delete();
 
        return response()->json(null, 204);
    }
}
