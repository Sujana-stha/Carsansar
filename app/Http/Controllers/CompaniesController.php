<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Company;
use Config;

class CompaniesController extends Controller
{
    public function index(Request $request)
    {
        // return Company::all();
        $company = Company::with('createdBy:id,first_name,last_name')->orderby($request->column, $request->order)->paginate(config('app_env.NO_OF_ROWS'));
        return $company;
    }

    public function getList()
    {
        $company = Company::where('status','1')->pluck('name','id');
        return $company;
    }
 
    public function show(Company $company)
    {
        return $company;
    }
 
    public function store(Request $request)
    {
        $errormsg = "";
        $result = false;
        $errorcode="";
        try{
            if($request->get('name') && $request->get('address') && $request->get('email')!=null){
                $request->merge(['created_by'=>auth()->id()]);
                $company = Company::create($request->all());
                $result = true;
            }else{
                $result = false;
                $errormsg = "Company name, address and email cannot be null";
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
 
    public function update(Request $request, Company $company)
    {
        $company->update($request->all());
 
        return response()->json($company, 200);
    }
 
    public function delete(Company $company)
    {
        $company->delete();
 
        return response()->json(null, 204);
    }
}
