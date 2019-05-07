<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\OptionCategory;

class OptionsCategoriesController extends Controller
{
    public function index(Request $request)
    {
        return OptionCategory::with('createdBy:id,name')->get();
    }
 
    public function show(OptionCategory $optionCategories)
    {
        return $optionCategories;
    }
 
    public function store(Request $request)
    {
        $errormsg = "";
        $result = false;
        $errorcode="";
        try{
            if($request->get('optioncategory_desc')!=null){
                $optionCategories = OptionCategory::create($request->all());
                $result = true;
            }else{
                $result = false;
                $errormsg = "Option Category Description cannot be null";
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
 
    public function update(Request $request, OptionCategory $optionCategories)
    {
            
        $optionCategories->update($request->all());
 
        return response()->json($optionCategories, 200);
    }
 
    public function delete(OptionCategory $optionCategories)
    {
        $optionCategories->delete();
       
        return response()->json(null, 204);

    }
}
