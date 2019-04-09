<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image as ImageInt;
use App\VehicleInfo;
use App\Deal;
use App\Attribute;
use App\Financing;
use App\Image;
use App\VehicleOption;
use DB;

class DealsController extends Controller
{
    private $user_id = 1;
    public function index()
    {
        return Deal::with('vehicleInfo','company','attribute','financing','images','options','createdBy:id,name')->get();
    }
 
    public function show(Deal $deal)
    {
        return $deal;
    }

    private function generateStockNo($id){
        $id = "WH".($id);
        return $id;
    }
 
    public function store(Request $request)
    {
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
             'created_by' => $this->user_id
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
           'created_by' => $this->user_id
        ]);

        $attribute = new Attribute([
            'exterior_color_id' => $request->get('exterior_color_id'),
            'interior_color_id' => $request->get('interior_color_id'),
            'doors' => $request->get('doors'),
            'passenger' => $request->get('passenger'),
            'body_id' => $request->get('body_id'),
            'created_by' => $this->user_id
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
            'created_by' => $this->user_id
        ]); 

        $options_array=$request->get('option_id');
         
        $file = $request->file('files');

        $imagemeta = $request->get('imagemeta');

        // echo $imagemeta[0];exit;

        

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
            $stock_number = $this->generateStockNo($d_id);
            if($deal->stock_number==""){
                $deal->stock_number= $stock_number;
                $deal->save();
            }
            
            $attribute->vi_id = $vi_id;
            $attribute->d_id = $d_id;
            $attribute->option_ids = $options_array;
            $attribute->save();

            if($deal->financing_flag){
                $financing->d_id = $d_id;
                $financing->vi_id = $vi_id;
                $financing->save();
            } 
            
            // if(count($options_array)>0){
            //     // for($i=0;$i<count($options_array);$i++){
            //     //     $options = new VehicleOption([
            //     //         'd_id' => $d_id,
            //     //         'vi_id' => $vi_id,
            //     //         'option_id' => $options_array[$i],
            //     //         'created_by' => 1
            //     //     ]);
            //     //     $options->save();
            //     // }
                
            // } 

            if(count($file)>0){
                for($i=0;$i<count($file);$i++){
                    Storage::putFileAs('public/whrepo/'.$stock_number.'/', $file[$i],$file[$i]->getClientOriginalName());
                    $image = new Image([]);
                    $image->d_id = $d_id;
                    $image->vi_id = $vi_id;
                    $image->path = 'public/whrepo/'.$stock_number.'/'.$file[$i]->getClientOriginalName();
                    //if(count($imagemeta)>0){
                        if($imagemeta[$i]=='true'){
                            //echo $imagemeta[$i];exit;
                            $image->main_flag = '1';
                        }else{
                            $image->main_flag = '0';
                        }
                    //}
                    $image->order = $i+1;
                    $image->created_by = $this->user_id;
                    $image->save();
                    $filename=pathinfo($file[$i]->getClientOriginalName(),PATHINFO_FILENAME);
                    $extension = pathinfo($file[$i]->getClientOriginalName(),PATHINFO_EXTENSION);
                    
                    // $img = ImageInt::make($file[$i]);
                    // dd($img);exit;
                    // // // now you are able to resize the instance
                    //  $img->resize(300, 300);

                    //  $img->save();

                    // dd($img);exit;

                    // and insert a watermark for example
                    //$img->insert('public/watermark.png');

                    // finally we save the image as a new file
                    //$img->save('public/whrepo/WH2/foo150150.jpg');
                        
                }
            }
        
            DB::commit();
            return response()->json('Vehicle Added Successfully.', 201);
            
        } catch (\Exception $e) {
            
            DB::rollback(); 
            //File::deleteDirectory($path);
            return response()->json($e);          
        }

       

        
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
