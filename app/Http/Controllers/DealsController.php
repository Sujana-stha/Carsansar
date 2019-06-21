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
use App\User;
use DB;
use Carbon\Carbon;
use ParseCsv;
use Config;

//master models
use App\Make;
use App\Company;
use App\VehicleModel;
use App\Color;
use App\Fueltype;
use App\Drive;
use App\Enginesize;
use App\Transmission;
use App\Body;
use App\Option;
use App\Category;


class DealsController extends Controller
{

    public function index(Request $request)
    {
        $user = $request->user();
        $company_id = $user->company_id;
        $column= 'id';
        $order= 'dsc';
        if($request->column == 'year') {
            $column = 'vehicleInfo.year';
        }

        if($request->order == 'asc') {
            $order = 'asc';
        }            
       //print_r(config('app_env.SUPER_ADMIN_NAME'));exit;
        if($user->username == config('app_env.SUPER_ADMIN_NAME')){
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
                            'createdBy:id,first_name,last_name')->orderBy($column, $order)->paginate(config('app_env.NO_OF_ROWS'));
        }else{
            return Deal::where('company_id',$company_id)
                        ->where('status',1)
                        ->with('vehicleInfo.categoryId:id,category_desc',
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
                            'createdBy:id,first_name,last_name')->orderBy($column, $order)->paginate(config('app_env.NO_OF_ROWS'));
        }
        
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
        $user_id = auth()->id();
        $user = User::find($user_id); 
        $company_id = $user->company_id;
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
             'created_by' => $user_id
        ]);
        $deal = new Deal([
            'title' => $request->get('title'),
            'stock_number' => $request->get('stock_number'),
            'company_id' => $company_id,
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
            'created_by' => $user_id
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
            'created_by' => $user_id
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
            'created_by' => $user_id
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
                        $image->created_by = $user_id;
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

    public function import(Request $request){
        // $normalTimeLimit = ini_get('max_execution_time');
        // echo $normalTimeLimit;exit;
        // $res=file_exists('http://tdrvehicles2.azureedge.net/photos/import/201903/1221/0447/dee9a864-53b1-47b5-8530-44335032e1de.jpg?w=420&h=315');
        // echo "hello".$res;exit;
        //http://tdrvehicles2.azureedge.net/photos/import/201903/1217/0345/aaf14e9b-3c37-4b34-a898-d80c0d895bc1.jpg?w=420&h=315
        // $size = getimagesize("http://tdrvehicles2.azureedge.net/photos/import/201903/1217/0345/aaf14e9b-3c37-4b34-a898-d80c0d895bc1.jpg");
        // print_r($size); exit;
        // $size = 0;
        // try{
        //     $img=Image::make('http://tdrvehicles2.azureedge.net/photos/import/201903/1217/0345/aaf14e9b-3c37-4b34-a898-d80c0d895bc1.jpg');
        //         //ob_end_clean();
        //         $res = $img->response();
        //         //$img=Image::make($main_photo_path);  
        //         $size = $img->mime();  
        //         // $mime = $img->mime();
        //         // echo "here";
        //         echo "<pre>";        
        //     //$res = $img->response('Content-Type');
        //     // $gue = $res->headers;
        //     // $sue = $gue->'headers:protected';
        //         // echo "size".$size;
        //         // echo "mime".$mime;
        //         print_r($size);
        //     exit;
        // }catch (\Exception $e) {
        //     //return $e->getMessage();
        // }
        // exit;
        set_time_limit(0);
        
        $file = $request->file('file');
        $csv = new ParseCsv\Csv();
        $csv->encoding('UTF-16', 'UTF-8');
        $csv->delimiter = "|";
        $csv->parse($file);
        $titles= $csv->titles;
        $count=count($csv->data);
        //echo "count=".$count;exit;
        $vehicles_data=$csv->data;

        // $path = 'http://tdrvehicles2.azureedge.net/photos/import/201807/2019/2109/9809fb52-150e-4419-8e53-4ea3afcb2da9.jpg?w=420&h=315';
        // $path_wo = substr($path,0,strpos($path,'?'));
        // //echo $path_wo;exit;
        // $filename = basename($path_wo);

        // if ( ! File::exists(public_path()."/images/whrepo") ) { File::makeDirectory(public_path()."/images/whrepo"); }

        // $res = Image::make($path)->save(public_path()."/images/whrepo/".$filename);

         //$ad_desc = array_column($vehicles_data,'StockNumber');
         //$request = new Request('GET', 'http://tdrvehicles2.azureedge.net/photos/import/201807/2019/2109/9809fb52-150e-4419-8e53-4ea3afcb2da9.jpg?w=420&h=315');
         //$client = new Client();
         //$res = $client->get('http://tdrvehicles2.azureedge.net/photos/import/201807/2019/2109/9809fb52-150e-4419-8e53-4ea3afcb2da9.jpg?w=420&h=315');
         //$content = (string) $res->getBody();
         //$content = $res->getBody();
         
         //$path = Storage::download($content);
         //$path = Storage::putFile('photos',$request);
        //$path=Storage::put('photos/test5.jpg', $content);

        

        // echo '<pre>';
        // print_r($ad_desc);
        // //print_r(array_unique($ad_desc));
        // echo '<pre>';
        // exit;

        /* Company Starts*/
        $company_cds = array();     
        $company_cds = array_values(array_map('strtolower', array_unique(array_column($vehicles_data,'CompanyID'))));

        $company_names = array();     
        $company_names = array_values(array_map('strtolower', array_unique(array_column($vehicles_data,'CompanyName'))));

        
        for($i=0;$i<count($company_cds);$i++){
            if (Company::where('company_cd',$company_cds[$i] )->exists()) {
                // exists
            }else{
                $company_row = new Company([
                    'company_cd' => $company_cds[$i], 
                    'name' => $company_names[$i],                   
                    'created_by' => $this->user_id
               ]);
               $company_row->save();
            }
        }
        /* Company Ends*/

        /* Makes Starts*/
        $makes = array();     
        $makes = array_values(array_map('strtolower', array_unique(array_column($vehicles_data,'Make'))));
        
        for($i=0;$i<count($makes);$i++){
            if (Make::where('make_desc',$makes[$i] )->exists()) {
                // exists
            }else{
                $make_row = new Make([
                    'make_desc' => $makes[$i],                    
                    'created_by' => $this->user_id
               ]);
               $make_row->save();
            }
        }
        /* Makes Ends*/

        /* Vehicle Model Starts*/
        $vmodels = array();     
        $vmodels = array_values(array_map('strtolower', array_unique(array_column($vehicles_data,'Model'))));
        
        for($i=0;$i<count($vmodels);$i++){
            if (VehicleModel::where('model_desc',$vmodels[$i] )->exists()) {
                // exists
            }else{
                $vmodel_row = new VehicleModel([
                    'model_desc' => $vmodels[$i],                    
                    'created_by' => $this->user_id
               ]);
               $vmodel_row->save();
            }
        }
        /* Vehicle Model Ends*/

        /* Color Starts*/
        $colors = array();     
        $colors = array_values(array_map('strtolower', array_unique(array_column($vehicles_data,'Exterior Color'))));
        
        for($i=0;$i<count($colors);$i++){
            if (Color::where('color_desc',$colors[$i] )->exists()) {
                // exists
            }else{
                $color_row = new Color([
                    'color_desc' => $colors[$i],                    
                    'created_by' => $this->user_id
               ]);
               $color_row->save();
            }
        }
        /* Color Ends*/

        /* FuelType Starts*/
        $fueltypes = array();     
        $fueltypes = array_values(array_map('strtolower', array_unique(array_column($vehicles_data,'FuelType'))));
        
        for($i=0;$i<count($fueltypes);$i++){
            if (Fueltype::where('fueltype_desc',$fueltypes[$i] )->exists()) {
                // exists
            }else{
                $fueltype_row = new Fueltype([
                    'fueltype_desc' => $fueltypes[$i],                    
                    'created_by' => $this->user_id
               ]);
               $fueltype_row->save();
            }
        }
        /* FuelType Ends*/

        /* Drive Starts*/
        $drives = array();     
        $drives = array_values(array_map('strtolower', array_unique(array_column($vehicles_data,'Drive'))));
        
        for($i=0;$i<count($drives);$i++){
            if (Drive::where('drive_desc',$drives[$i] )->exists()) {
                // exists
            }else{
                $drive_row = new Drive([
                    'drive_desc' => $drives[$i],                    
                    'created_by' => $this->user_id
               ]);
               $drive_row->save();
            }
        }
        /* Drive Ends*/

        /* EngineSize Starts*/
        $enginesizes = array();     
        $enginesizes = array_values(array_map('strtolower', array_unique(array_column($vehicles_data,'Engine Size'))));
        
        for($i=0;$i<count($enginesizes);$i++){
            if (Enginesize::where('enginesize_desc',$enginesizes[$i] )->exists()) {
                // exists
            }else{
                $enginesize_row = new Enginesize([
                    'enginesize_desc' => $enginesizes[$i],                    
                    'created_by' => $this->user_id
               ]);
               $enginesize_row->save();
            }
        }
        /* EngineSize Ends*/

        /* Transmission Starts*/
        $transmissions = array();     
        $transmissions = array_values(array_map('strtolower', array_unique(array_column($vehicles_data,'Transmission'))));
        
        for($i=0;$i<count($transmissions);$i++){
            if (Transmission::where('transmission_desc',$transmissions[$i] )->exists()) {
                // exists
            }else{
                $transmission_row = new Transmission([
                    'transmission_desc' => $transmissions[$i],                    
                    'created_by' => $this->user_id
               ]);
               $transmission_row->save();
            }
        }
        /* Transmission Ends*/

        /* Body Starts*/
        $bodies = array();     
        $bodies = array_values(array_map('strtolower', array_unique(array_column($vehicles_data,'Body'))));
        
        for($i=0;$i<count($bodies);$i++){
            if (Body::where('body_desc',$bodies[$i] )->exists()) {
                // exists
            }else{
                $body_row = new Body([
                    'body_desc' => $bodies[$i],                    
                    'created_by' => $this->user_id
               ]);
               $body_row->save();
            }
        }
        /* Body Ends*/

        /* Option Starts*/
        $options = array();     
        //$options = array_values(array_map('strtolower', array_unique(array_column($vehicles_data,'Options'))));
        $options = array_column($vehicles_data,'Options');
        
        for($i=0;$i<count($options);$i++){
            $options_array = explode(',',$options[$i]);
            // echo "<pre>";
            // print_r($options_array);exit;
            for($j=0;$j<count($options_array);$j++){
                if (Option::where('option_desc',strtolower($options_array[$j]) )->exists()) {
                    // exists
                }else{
                    $option_row = new Option([
                        'option_desc' => strtolower($options_array[$j]),                    
                        'created_by' => $this->user_id
                   ]);
                   $option_row->save();
                }

            }
            
        }
        /* Option Ends*/
    
        /*Begin Main Data Loop*/

        for($i=0;$i<$count;$i++){
            $created_at = date('Y-m-d H:i:s',strtotime($vehicles_data[$i]['CreatedDate']));
            $updated_at = date('Y-m-d H:i:s',strtotime($vehicles_data[$i]['ModifiedDate']));
            $vi_id = "";
            $d_id = "";

            /* Vehicle Info Start*/

            $category_id = Category::where('category_desc',$vehicles_data[$i]['Category'])->value('id');
            $make_id = Make::where('make_desc',$vehicles_data[$i]['Make'])->value('id');
            $model_id = VehicleModel::where('model_desc',$vehicles_data[$i]['Model'])->value('id');
            $fueltype_id = Fueltype::where('fueltype_desc',$vehicles_data[$i]['FuelType'])->value('id');
            $drive_id = Drive::where('drive_desc',$vehicles_data[$i]['Drive'])->value('id');
            $enginesize_id = Enginesize::where('enginesize_desc',$vehicles_data[$i]['Engine Size'])->value('id');
            $transmission_id = Transmission::where('transmission_desc',$vehicles_data[$i]['Transmission'])->value('id');
            $mfg_exterior_color_id = Color::where('color_desc',$vehicles_data[$i]['Mfg Exterior Color'])->value('id');

            if (VehicleInfo::where('vin',$vehicles_data[$i]['Vin'] )->exists()) {
                // exists
                $vi_id = VehicleInfo::where('vin',$vehicles_data[$i]['Vin'])->value('id');
                $vehicleinfo = VehicleInfo::find($vi_id);
                $vehicleinfo->category_id = $category_id;
                $vehicleinfo->year = $vehicles_data[$i]['Year'];
                $vehicleinfo->make_id = $make_id;
                $vehicleinfo->model_id = $model_id;
                $vehicleinfo->fueltype_id = $fueltype_id;
                $vehicleinfo->drive_id = $drive_id;
                $vehicleinfo->enginesize_id = $enginesize_id;
                $vehicleinfo->cylinder = $vehicles_data[$i]['Cylinder'];
                $vehicleinfo->transmission_id = $transmission_id;
                $vehicleinfo->mfg_exterior_color_id = $mfg_exterior_color_id;
                $vehicleinfo->updated_at = $updated_at;
                $vehicleinfo->updated_by = $this->user_id;

                $vehicleinfo->save();

            }else{
                
                $vehicleinfo_row = new VehicleInfo([
                    'vin' => $vehicles_data[$i]['Vin'],                    
                    'category_id' => $category_id,
                    'year' => $vehicles_data[$i]['Year'],
                    'make_id' => $make_id,
                    'model_id' => $model_id,
                    'fueltype_id' => $fueltype_id,
                    'drive_id' => $drive_id,
                    'enginesize_id' => $enginesize_id,
                    'cylinder' => $vehicles_data[$i]['Cylinder'],
                    'transmission_id' => $transmission_id,
                    'mfg_exterior_color_id' => $mfg_exterior_color_id,
                    'created_at' => $created_at,
                    'created_by'=> $this->user_id

                ]);
               $vehicleinfo_row->save();
               $vi_id = $vehicleinfo_row->id;
            } 

            /* Vehicle Info End*/

            /*Deals Start*/

            $company_id = Company::where('company_cd',$vehicles_data[$i]['CompanyID'])->value('id');
            $warranty_flag = $vehicles_data[$i]['Warranty'] == "Not Available" ? 0 : 1;
            $exterior_color_id = Color::where('color_desc',$vehicles_data[$i]['Exterior Color'])->value('id');
            $interior_color_id = Color::where('color_desc',$vehicles_data[$i]['Interior Color'])->value('id');
            $body_id = Body::where('body_desc',$vehicles_data[$i]['Body'])->value('id');
            $opts = explode(',',$vehicles_data[$i]['Options']);    
            $opts = array_filter($opts);
            //print_r($opts);exit;
            $opt_ids = array();
            for($k=0;$k<count($opts);$k++){                    
                $opt_ids[$k]= Option::where('option_desc',strtolower($opts[$k]))->value('id');
            }  
            
            $option_ids = implode(',',$opt_ids);

            //print_r($option_ids);exit;   
            
            if(Deal::where('stock_number',$vehicles_data[$i]['StockNumber'] )->where('available_flag','Y')->exists()){
                
                $d_id = Deal::where('stock_number',$vehicles_data[$i]['StockNumber'] )->where('available_flag','Y')->value('id');
                $deal = Deal::find($d_id);
                $deal->title = $vehicles_data[$i]['Year'].$vehicles_data[$i]['Make'].$vehicles_data[$i]['Model'];
                $deal->company_id = $company_id;
                $deal->kms = $vehicles_data[$i]['KMS'];
                $deal->price = $vehicles_data[$i]['Price'];
                $deal->vehicle_status = $vehicles_data[$i]['Status'];
                $deal->trim = $vehicles_data[$i]['Trim'];
                $deal->ad_desc = $vehicles_data[$i]['AdDescription'];
                $deal->warranty_flag = $warranty_flag;
                $deal->warranty_desc = $vehicles_data[$i]['WarrantyDescription'];
                $deal->financing_flag = $vehicles_data[$i]['FinancingIsAvailable'];
                $deal->updated_at = $updated_at;
                $deal->updated_by = $this->user_id;

                $deal->save();

                $attribute = Attribute::where('d_id', $d_id)->first();
                $attribute->option_ids = $option_ids;
                $attribute->exterior_color_id = $exterior_color_id;
                $attribute->interior_color_id = $interior_color_id;
                $attribute->doors = $vehicles_data[$i]['Doors'];
                $attribute->passenger = $vehicles_data[$i]['Passenger'];
                $attribute->body_id = $body_id;
                $attribute->updated_at = $updated_at;
                $attribute->updated_by = $this->user_id;

                $attribute->save();

            }else{                
                
                $deal_row = new Deal([
                    'title' => $vehicles_data[$i]['Year'].$vehicles_data[$i]['Make'].$vehicles_data[$i]['Model'],
                    'vi_id' => $vi_id,
                    'stock_number' => $vehicles_data[$i]['StockNumber'],
                    'company_id' => $company_id,
                    'kms' => $vehicles_data[$i]['KMS'],
                    'price' => $vehicles_data[$i]['Price'],
                    'vehicle_status' => $vehicles_data[$i]['Status'],
                    'trim' => $vehicles_data[$i]['Trim'],
                    'ad_desc' => $vehicles_data[$i]['AdDescription'],
                    'warranty_flag' => $warranty_flag,
                    'warranty_desc' => $vehicles_data[$i]['WarrantyDescription'],
                    'financing_flag' => $vehicles_data[$i]['FinancingIsAvailable'],
                    'created_at' => $created_at,
                    'created_by' => $this->user_id
                ]);
                $deal_row->save();
                $d_id = $deal_row->id;

                /*Attribute Start*/
                
                $attribute_row = new Attribute([
                    'd_id' => $d_id,
                    'vi_id' => $vi_id,
                    'option_ids' => $option_ids,
                    'exterior_color_id' => $exterior_color_id,
                    'interior_color_id' => $interior_color_id,
                    'doors' => $vehicles_data[$i]['Doors'],
                    'passenger' => $vehicles_data[$i]['Passenger'],
                    'body_id' => $body_id,
                    'created_at' => $created_at,
                    'created_by' => $this->user_id
                ]);

                $attribute_row->save();            
                /*Attribute End*/

                //images start
                
                
                $main_photo_path = $vehicles_data[$i]['MainPhoto'];
                $pathinfo = pathinfo($main_photo_path);
                //$main_photo_path_wo = substr($main_photo_path,0,strpos($main_photo_path,'?'));
                //echo $main_photo_path_wo;exit;
                //$filename = basename($main_photo_path_wo);
                //$ext = substr($filename,strpos($filename,'.'),strlen($filename));
                //echo $ext;exit;
                $filename = substr($vehicles_data[$i]['Year'].$vehicles_data[$i]['Make'].$vehicles_data[$i]['Model'].$i,0,220);

                if ( ! File::exists(public_path()."/images/whrepo/".$vehicles_data[$i]['StockNumber']) ) { File::makeDirectory(public_path()."/images/whrepo/".$vehicles_data[$i]['StockNumber']); }
                //http://tdrvehicles2.azureedge.net/photos/import/201903/1221/0447/dee9a864-53b1-47b5-8530-44335032e1de.jpg?w=420&h=315
                try{
                    $img=Image::make($pathinfo['dirname']."/".$pathinfo['basename']); 
                    $mime=$img->mime();
                    //$size=getimagesize($img);
                    $size=$img->response(); 
                    //echo "mime".$mime;
                    echo "<pre>";
                    print_r($mime);exit;
                    //if()                  

                }catch (\Exception $e) {
                    //return $e->getMessage();
                }
                // //$img=Image::make($main_photo_path);
                // print_r($img);exit;
                // if($img){
                    //$img->save(public_path()."/images/whrepo/".$vehicles_data[$i]['StockNumber']."/".$filename.$ext);
                // }
                

            

                //images end

            }
            /*Deals End*/
        }

        /*End of Main Data Loop*/
    }
}
