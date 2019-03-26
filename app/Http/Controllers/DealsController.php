<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\VehicleInfo;
use App\Deal;
use App\Attribute;
use App\Financing;
use App\Image;
use App\VehicleOption;
use DB;

class DealsController extends Controller
{
    public function index()
    {
        return Deal::with('vehicleInfo','company','attribute','financing','images','options','createdBy:id,name')->get();
    }
 
    public function show(Deal $deal)
    {
        return $deal;
    }
 
    public function store(Request $request)
    {
        $file = $request->file('files');
        $ext = $file->extension();
        // echo $ext;
        // dd($request->all());
        // $request->get('file');
        // $res = $request->hasFile('files');
        //  if($res) {
        //     echo "Succeed";
        // } else {
        //     echo "Failed";
        // }
       
        // // print_r($request);
        // // exit;
       
        $vehicle_info = new VehicleInfo([
             'vin' => $request->get('vin'),
             'category_id' => $request->get('category_id'),
             'year' => $request->get('year'),
             'make_id' => $request->get('make_id'),
             'model_id' => $request->get('model_id'),
             'fueltype_id' => $request->get('category_id'),
             'drive_id' => $request->get('drive_id'),
             'enginesize_id' => $request->get('enginesize_id'),
             'cylinder' => $request->get('cylinder'),
             'transmission_id' => $request->get('transmission_id'),
             'mfg_exterior_color_id' => $request->get('mfg_exterior_color_id'),
             'created_by' => 1
        ]);
        $deal = new Deal([
           'title' => $request->get('title'),
           'stock_number' => $request->get('stock_number'),
           'company_id' => $request->get('company_id'),
           'kms' => $request->get('kms'),
           'price' => $request->get('price'),
           'vehicle_status' => $request->get('vehicle_status'),
           'trim' => $request->get('trim'),
           'ad_desc' => $request->get('ad_desc'),
           'warranty_flag' => $request->get('warranty_flag'),
           'warranty_desc' => $request->get('warranty_desc'),
           'financing_flag' => $request->get('financing_flag'),
           'created_by' => 1
        ]);

        $attribute = new Attribute([
            'exterior_color_id' => $request->get('exterior_color_id'),
            'interior_color_id' => $request->get('interior_color_id'),
            'doors' => $request->get('doors'),
            'passenger' => $request->get('passenger'),
            'body_id' => $request->get('body_id'),
            'created_by' => 1
        ]);

        $financing = new Financing([            
            'type' => $request->get('type'),
            'payment' => $request->get('payment'),
            'payment_type' => $request->get('payment_type'),
            'downpayment' => $request->get('downpayment'),
            'number_of_payment' => $request->get('number_of_payment'),
            'source' => $request->get('source'),
            'odometer' => $request->get('odometer'),
            'description' => $request->get('description'),
            'created_by' => 1
        ]); 

        $options_array=$request->get('option_id');
         
        //$options = new VehicleOption([]); 

        DB::beginTransaction();
        try {
            $vehicle = VehicleInfo::where('vin', '=', $vehicle_info->vin)->first();
            $vi_id="";
            if ($vehicle === null) {            
                $vehicle_info->save();
                $vi_id=$vehicle_info->id;
            }else{
                $vi_id=$vehicle->id;
            }         
            
            $deal->vi_id = $vi_id;
            $deal->save();
            $d_id=$deal->id;

            $attribute->vi_id = $vi_id;
            $attribute->d_id = $d_id;
            $attribute->save();

            if($deal->financing_flag){
                $financing->d_id = $d_id;
                $financing->vi_id = $vi_id;
                $financing->save();
            } 
            
            if(count($options_array)>0){
                for($i=0;$i<count($options_array);$i++){
                    $options = new VehicleOption([
                        'd_id' => $d_id,
                        'vi_id' => $vi_id,
                        'option_id' => $options_array[$i],
                        'created_by' => 1
                    ]);
                    $options->save();
                }
                
            }            
            
        
            DB::commit();
            return response()->json('Vehicle Added Successfully.', 201);
            
        } catch (\Exception $e) {
            
            DB::rollback(); 
            return response()->json($e);          
        }

        //$images

        
    }
 
    public function update(Request $request, Deal $deal)
    {
        // $color->update($request->all());
 
        // return response()->json($color, 200);
    }
 
    public function delete(Deal $deal)
    {
        // $color->delete();
 
        // return response()->json(null, 204);
    }
}
