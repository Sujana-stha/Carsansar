<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Transmission;

class TransmissionsController extends Controller
{
    public function index(Request $request)
    {
        $transmission = Transmission::with('createdBy:id,name')->orderBy($request->column, $request->order)->paginate(3);
        return $transmission;
    }

    public function getList()
    {
        $transmission = Transmission::where('status','1')->pluck('transmission_desc','id');
        return $transmission;
    }
 
    public function show(Transmission $transmission)
    {
        return $transmission;
    }
 
    public function store(Request $request)
    {
        $errormsg = "";
        $result = false;
        $errorcode="";
        try{
            if($request->get('transmission_desc')!=null){
                $transmission = Transmission::create($request->all());
                $result = true;
            }else{
                $result = false;
                $errormsg = "Transmission Description cannot be null";
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
 
    public function update(Request $request, Transmission $transmission)
    {
        $transmission->update($request->all());
 
        return response()->json($transmission, 200);
    }
 
    public function delete(Transmission $transmission)
    {
        $transmission->delete();
 
        return response()->json(null, 204);
    }
}
