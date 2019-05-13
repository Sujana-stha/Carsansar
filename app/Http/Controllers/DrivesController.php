<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Drive;

class DrivesController extends Controller
{
    public function index(Request $request)
    {
        $drive = Drive::with('createdBy:id,name')->orderBy($request->column, $request->order)->paginate(3);
        return $drive;
    }

    public function getList()
    {
        $drive = Drive::where('status','1')->pluck('drive_desc','id');
        return $drive;
    }
 
    public function show(Drive $drive)
    {
        return $drive;
    }
 
    public function store(Request $request)
    {
        $errormsg = "";
        $result = false;
        $errorcode="";
        try{
            if($request->get('drive_desc')!=null){
                $request->merge(['created_by'=>auth()->id()]);
                $drive = Drive::create($request->all());
                $result = true;
            }else{
                $result = false;
                $errormsg = "Drive Description cannot be null";
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
