<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image as Image;
use App\VehicleInfo;
use App\Deal;
use App\Attribute;
use App\Financing;
use App\Image as VehicleImage;
use App\VehicleOption;
use DB;
use Carbon\Carbon;


class DealsController extends Controller
{

    //private $user_id = 1;
    public function index(Request $request)
    {
        // $user = $request->user();
        // $company_id = $user->company_id;
        $column= 'id';
        $order= 'dsc';
        if($request->column == 'year') {
            $column = 'vehicleInfo.year';
        }

        if($request->order == 'asc') {
            $order = 'asc';
        }

            //echo $column ;
        // } else {
        //     $column = 'column';
        // }
        
        
        return Deal::with('vehicleInfo.categoryId:id,category_desc',
                        'vehicleInfo.makeId:id,make_desc',
                        'vehicleInfo.modelId:id,model_desc',
                        'vehicleInfo.fueltypeId:id,fueltype_desc',
                        'vehicleInfo.driveId:id,drive_desc',
                        'vehicleInfo.enginesizeId:id,enginesize_desc',
                        'vehicleInfo.transmissionId:id,transmission_desc',
                        'vehicleInfo.mfgexteriorcolorId:id,color_cd,color_desc',
                        'company',
                        'attribute.exteriorcolorId:id,color_cd,color_desc',
                        'attribute.interiorcolorId:id,color_cd,color_desc',
                        'attribute.bodyId:id,body_desc',
                        'financing',
                        'images',
                        'createdBy:id,first_name,last_name')->orderBy($column, $order)->paginate(3);
    }
 
    public function show($id)
    {
        return Deal::with('vehicleInfo.categoryId:id,category_desc',
        'vehicleInfo.makeId:id,make_desc',
        'vehicleInfo.modelId:id,model_desc',
        'vehicleInfo.fueltypeId:id,fueltype_desc',
        'vehicleInfo.driveId:id,drive_desc',
        'vehicleInfo.enginesizeId:id,enginesize_desc',
        'vehicleInfo.transmissionId:id,transmission_desc',
        'vehicleInfo.mfgexteriorcolorId:id,color_cd,color_desc',
        'company',
        'attribute.exteriorcolorId:id,color_cd,color_desc',
        'attribute.interiorcolorId:id,color_cd,color_desc',
        'attribute.bodyId:id,body_desc',
        'financing',
        'images',
        'createdBy:id,first_name,last_name')->find($id);        
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
             'fueltype_id' => $request->get('fueltype_id'),
             'drive_id' => $request->get('drive_id'),
             'enginesize_id' => $request->get('enginesize_id'),
             'cylinder' => $request->get('cylinder'),
             'transmission_id' => $request->get('transmission_id'),
             'mfg_exterior_color_id' => $request->get('mfg_exterior_color_id'),
             'created_by' => auth()->id()
        ]);
        $deal = new Deal([
            'title' => $request->get('title'),
            'stock_number' => $request->get('stock_number'),
            'company_id' => $request->get('company_id'),
            'kms' => $request->get('kms'),
            'price' => $request->get('price'),
            'selling_price' => $request -> get('selling_price'),
            'vehicle_status' => $request->get('vehicle_status'),
            'trim' => $request->get('trim'),
            'vehicle_description' => $request-> get('vehicle_description'),
            'tech_specification' => $request -> get('tech_specification'),
            'ad_desc' => $request->get('ad_desc'),
            'warranty_flag' => $request->get('warranty_flag'),
            'warranty_desc' => $request->get('warranty_desc'),
            'financing_flag' => $request->get('financing_flag'),
            'created_by' => auth()->id()
        ]);

        $attribute = new Attribute([
            'exterior_color_id' => $request->get('exterior_color_id'),
            'interior_color_id' => $request->get('interior_color_id'),
            'doors' => $request->get('doors'),
            'passenger' => $request->get('passenger'),
            'fuel_economy' => $request->get('fuel_economy'),
            'mileage' => $request->get('mileage'),
            'city_mpg' => $request->get('city_mpg'),
            'highway_mpg' => $request->get('highway_mpg'),
            'body_id' => $request->get('body_id'),
            'option_ids' => $request->get('option_id'),
            'created_by' => auth()->id()
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
            'created_by' => auth()->id()
        ]); 

        //$options_array=$request->get('option_id');
         
        $file = $request->file('files');

        $imagemeta = $request->get('imagemeta');

        // echo $imagemeta[0];exit;

        //echo "here";exit;

        DB::beginTransaction();
        try {
            $vi_id=null;
            if($vehicle_info->vin != null){
                $vehicle = VehicleInfo::where('vin', '=', $vehicle_info->vin)->first();
                
                if ($vehicle === null) {            
                    $vehicle_info->save();
                    $vi_id=$vehicle_info->id;
                }else{
                    $vi_id=$vehicle->id;
                }         

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
            //$attribute->option_ids = $options_array;
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

            if(is_array($file)){
                if(count($file)>0){
                    for($i=0;$i<count($file);$i++){
                        Storage::putFileAs('public/whrepo/'.$stock_number.'/', $file[$i],$file[$i]->getClientOriginalName());
                        $image = new VehicleImage([]);
                        $image->d_id = $d_id;
                        $image->vi_id = $vi_id;
                        $image->path = $stock_number.'/'.$file[$i]->getClientOriginalName();
                        //if(count($imagemeta)>0){
                            if($imagemeta[$i]=='true'){
                                //echo $imagemeta[$i];exit;
                                $image->main_flag = '1';
                            }else{
                                $image->main_flag = '0';
                            }
                        //}
                        $image->order = $i+1;
                        $image->created_by = auth()->id();
                        $image->save();
                        $filename=pathinfo($file[$i]->getClientOriginalName(),PATHINFO_FILENAME);
                        $extension = pathinfo($file[$i]->getClientOriginalName(),PATHINFO_EXTENSION);
                        
                       
                        $img = Image::make($file[$i]);
                        
                        $img->resize(150, null, function ($constraint) { $constraint->aspectRatio(); } )->encode($extension);
                        Storage::put('public/whrepo/'.$stock_number.'/'.$filename.'-150X150.'.$extension, $img);
                        $img->resize(300, null, function ($constraint) { $constraint->aspectRatio(); } )->encode($extension);
                        Storage::put('public/whrepo/'.$stock_number.'/'.$filename.'-300X300.'.$extension, $img);
                        $img->resize(1024, null, function ($constraint) { $constraint->aspectRatio(); } )->encode($extension);
                        Storage::put('public/whrepo/'.$stock_number.'/'.$filename.'-1024X768.'.$extension, $img);
                        
                    }
                }
                
            }
            
            DB::commit();
            return response()->json('Vehicle Added Successfully.', 201);
            
        } catch (\Exception $e) {
           // echo "catch block";exit;
           // DB::rollback(); 
            //dd($e);exit;
            //File::deleteDirectory($path);
            return response()->json($e);          
        }
        
    }
 
    public function update(Request $request)
    {
        
        $vehicle_detail = $request->get('vehicles-detail');
        $files = $request->file('files');
        $image_meta = $request->get('imagemeta');
        
        $vehicle_detail = json_decode($vehicle_detail, true);
            // echo "<pre>";
            // var_dump($files);
   
            // exit();
        $c_vehicle_info = ($vehicle_detail['vehicle_info']!= null)?$vehicle_detail['vehicle_info']:null;        
        $c_attribute = ($vehicle_detail['attribute']!= null)?$vehicle_detail['attribute']:null; 
        $c_financing = ($vehicle_detail['financing']!= null)?$vehicle_detail['financing']:null; 
        $c_images = ($vehicle_detail['images']!= null)?$vehicle_detail['images']:null;

        $d_id = $vehicle_detail['id'];
        $vi_id = null;
        $deal = Deal::find($d_id);
        $deal->update([
            'title' => $vehicle_detail['title'],
            'stock_number' => $vehicle_detail['stock_number'],
            'company_id' => $vehicle_detail['company_id'],
            'kms' => $vehicle_detail['kms'],
            'price' => $vehicle_detail['price'],
            'vehicle_status' => $vehicle_detail['vehicle_status'],
            'trim' => $vehicle_detail['trim'],
            'ad_desc' => $vehicle_detail['ad_desc'],
            'warranty_flag' => $vehicle_detail['warranty_flag'],
            'warranty_desc' => $vehicle_detail['warranty_desc'],
            'financing_flag' => $vehicle_detail['financing_flag'],
            'updated_by' => auth()->id(),
            'updated_at' => Carbon::now()
        ]);

        if ($c_vehicle_info){
            $vi_id = $c_vehicle_info['id'];
            $vehicleinfo = VehicleInfo::find($vi_id);
            $vehicleinfo->update([
                'vin' => $c_vehicle_info['vin'],
                'category_id' => $c_vehicle_info['category_id'],
                'year' => $c_vehicle_info['year'],
                'make_id' => $c_vehicle_info['make_id'],
                'model_id' => $c_vehicle_info['model_id'],
                'fueltype_id' => $c_vehicle_info['fueltype_id'],
                'drive_id' => $c_vehicle_info['drive_id'],
                'enginesize_id' => $c_vehicle_info['enginesize_id'],
                'cylinder' => $c_vehicle_info['cylinder'],
                'transmission_id' => $c_vehicle_info['transmission_id'],
                'mfg_exterior_color_id' => $c_vehicle_info['mfg_exterior_color_id'], 
                'updated_by' => auth()->id(),
                'updated_at' => Carbon::now()
            ]);
        }
        if ($c_attribute){
            $a_id = $c_attribute['id'];
            //echo $a_id;exit;
            $attribute = Attribute::find($a_id);
            $attribute->update([
                'exterior_color_id' => $c_attribute['exterior_color_id'] != null ? $c_attribute['exterior_color_id'] : null,
                'interior_color_id' => $c_attribute['interior_color_id'],
                'doors' => $c_attribute['doors'],
                'passenger' => $c_attribute['passenger'],
                'body_id' => $c_attribute['body_id'],
                'option_ids' => $c_attribute['option_ids'],
                'updated_by' => auth()->id(),
                'updated_at' => Carbon::now()
            ]);
        }
        if ($c_financing){
            $f_id = $c_financing['id'];
            $financing = Financing::find($f_id);
            $financing->update([            
                'type' => $financing['type'],
                'payment' => $financing['payment'],
                'payment_type' => $financing['payment_type'],
                'downpayment' => $financing['downpayment'],
                'number_of_payment' => $financing['number_of_payment'],
                'source' => $financing['source'],
                'odometer' => $financing['odometer'],
                'description' => $financing['description'],
                'updated_by' => auth()->id(),
                'updated_at' => Carbon::now()
            ]);
        }  
        
        if ($c_images){
            $old_image_ids = [];
            for($i=0;$i<count($c_images);$i++){
                $img_id = $c_images[$i]['id'];
                $image = VehicleImage::find($img_id);
                $image->update([
                    'main_flag' => $c_images[$i]['main_flag']
                ]);
                array_push($old_image_ids,$c_images[$i]['id']);
            }
            $deleted_images = VehicleImage::where('d_id',$d_id)
                                ->whereNotIn('id',$old_image_ids)
                                ->get();
            
            for($i=0;$i<count($deleted_images);$i++){
                $file = explode('.',$deleted_images[$i]['path']);
                Storage::delete('public/'.$deleted_images[$i]['path']);
                Storage::delete('public/'.$file[0].'-150X150.'.$file[1]);
                Storage::delete('public/'.$file[0].'-300X300.'.$file[1]);
                Storage::delete('public/'.$file[0].'-1024X768.'.$file[1]);
            }
            VehicleImage::where('d_id',$d_id)
                            ->whereNotIn('id', $old_image_ids)
                            ->delete();
        }else{
            $deleted_images = VehicleImage::where('d_id',$d_id)
                                ->get();
            for($i=0;$i<count($deleted_images);$i++){
                $file = explode('.',$deleted_images[$i]['path']);
                Storage::delete('public/'.$deleted_images[$i]['path']);
                Storage::delete('public/'.$file[0].'-150X150.'.$file[1]);
                Storage::delete('public/'.$file[0].'-300X300.'.$file[1]);
                Storage::delete('public/'.$file[0].'-1024X768.'.$file[1]);
            }

            VehicleImage::where('d_id',$d_id)                           
                            ->delete();
        }

        if(is_array($files)){
            if(count($files)>0){
                $stock_number=$vehicle_detail['stock_number'];
                $max_order = VehicleImage::where('d_id',$d_id)
                                ->max('order');
                for($i=0;$i<count($files);$i++){
                    Storage::putFileAs('public/whrepo/'.$stock_number.'/', $files[$i],$files[$i]->getClientOriginalName());
                    $image = new VehicleImage([]);
                    $image->d_id = $d_id;
                    $image->vi_id = $vi_id;
                    $image->path = $stock_number.'/'.$files[$i]->getClientOriginalName();
                    //if(count($imagemeta)>0){
                        
                        if($image_meta[$i]=='true'){
                            //echo $imagemeta[$i];exit;
                            $image->main_flag = '1';
                        }else{
                            $image->main_flag = '0';
                        }
                    //}
                    $image->order = $max_order+1;
                    $image->created_by = auth()->id();
                    $image->save();
                    $filename=pathinfo($files[$i]->getClientOriginalName(),PATHINFO_FILENAME);
                    $extension = pathinfo($files[$i]->getClientOriginalName(),PATHINFO_EXTENSION);
                    
                   
                    $img = Image::make($files[$i]);
                    
                    $img->resize(150, null, function ($constraint) { $constraint->aspectRatio(); } )->encode($extension);
                    Storage::put('public/whrepo/'.$stock_number.'/'.$filename.'-150X150.'.$extension, $img);
                    $img->resize(300, null, function ($constraint) { $constraint->aspectRatio(); } )->encode($extension);
                    Storage::put('public/whrepo/'.$stock_number.'/'.$filename.'-300X300.'.$extension, $img);
                    $img->resize(1024, null, function ($constraint) { $constraint->aspectRatio(); } )->encode($extension);
                    Storage::put('public/whrepo/'.$stock_number.'/'.$filename.'-1024X768.'.$extension, $img);
                    
                }
            }
            
        }



 
        return response()->json($vehicleinfo,$deal,$attribute,$image,$financing, 200);
    }
 
    public function delete(Deal $deal)
    {
        // $color->delete();
 
        // return response()->json(null, 204);
    }

    public function deleteImages($ids,$d_id){
        $del_ids = VehicleImage::where('d_id',$d_id)->whereNotIn('id',$ids)->get();
        if(count($del_ids)>0){
            //$str_ids = implode ( ',' , $ids ); 
            //for($i=0;$i<count($ids);$i++){
                // $image = VehicleImage::find([$str_ids]);
                
                // if($image){
                    $del_ids->forceDelete();
                //}
            //}
        }
    }
}
