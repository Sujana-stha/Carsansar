<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Option;

class OptionsController extends Controller
{
    public function index(Request $request)
    {
        // return Option::all();
        // $make = Make::with('createdBy:id,name')->orderBy('id', 'desc')->paginate(3);

        $option = Option::with(['ocId:id,optioncategory_desc','createdBy:id,name'])->orderBy($request->column, $request->order)->paginate(3);
        return $option;
    }

    public function getList()
    {
        $option = Option::where('status','1')->get();
        return $option;
    }
    
    public function getOptionDesc($ids)
    {
        $arr_ids = array();
        $option = "";
        if($ids){
            $arr_ids = explode(",",$ids);
        }
        
        if(count($arr_ids)>0){
            for($i=0;$i<count($arr_ids);$i++){
                if($option == ""){
                    $option = Option::where('status','1')->where('id',$arr_ids[$i])->value('option_desc'); 
                }else{
                    $option = $option . "," . Option::where('status','1')->where('id',$arr_ids[$i])->value('option_desc');
                }
            }
            
        }
        return $option;
    }

    public function show(Option $option)
    {
        return $option;
    }
 
    public function store(Request $request)
    {
        $errormsg = "";
        $result = false;
        $errorcode="";
        try{
            if($request->get('option_desc')!=null){
                $request->merge(['created_by'=>auth()->id()]);
                $option = Option::create($request->all());
                $result = true;
            }else{
                $result = false;
                $errormsg = "Option Description cannot be null";
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
 
    public function update(Request $request, Option $option)
    {
        $option->update($request->all());
 
        return response()->json($option, 200);
    }
 
    public function delete(Option $option)
    {
        $option->delete();
 
        return response()->json(null, 204);
    }
}
