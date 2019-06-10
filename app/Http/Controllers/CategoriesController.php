<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Category;

class CategoriesController extends Controller
{
    public function index(Request $request)
    {   
        $category = Category::with('createdBy:id,first_name,last_name')->orderBy($request->column, $request->order)->paginate(3);
        return $category;
    }

    public function getList()
    {
        $category = Category::where('status','1')->pluck('category_desc','id');
        return $category;
    }
 
    public function show(Category $category)
    {
        return $category;
    }
 
    public function store(Request $request)
    {
        $errormsg = "";
        $result = false;
        $errorcode="";
        try{
            if($request->get('category_desc')!=null){
                $request->merge(['created_by'=>auth()->id()]);
                $category = Category::create($request->all());
                $result = true;
            }else{
                $result = false;
                $errormsg = "Category Description cannot be null";
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
 
    public function update(Request $request, Category $category)
    {
        $category->update($request->all());
 
        return response()->json($category, 200);
    }
 
    public function delete(Category $category)
    {
        $category->delete();
 
        return response()->json(null, 204);
    }
}
