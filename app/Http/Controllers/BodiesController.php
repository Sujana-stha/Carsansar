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
        $errormsg = "";
        $result = false;
        $errorcode="";
        try{
            if($request->get('body_desc')!=null){
                $request->merge(['created_by'=>auth()->id()]);
                $body = Body::create($request->all());
                $result = true;
            }else{
                $result = false;
                $errormsg = "Body Description cannot be null";
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
