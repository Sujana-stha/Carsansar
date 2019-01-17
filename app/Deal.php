<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Deal extends Model
{
    protected $fillable = ['title','vi_id','stock_number','company_id','kms','price','vehicle_status','trim','ad_desc','warranty_flag','warranty_desc','financing_flag','available_flag','created_by'];

    
    public function createdBy()
    {
        return $this->belongsTo('App\User', 'created_by', 'id');
    }

    public function vehicleInfo()
    {
        return $this->belongsTo('App\VehicleInfo', 'vi_id', 'id');
    }

    public function company()
    {
        return $this->belongsTo('App\Company', 'company_id', 'id');
    }

    public function attribute()
    {
        return $this->hasOne('App\Attribute', 'id', 'd_id');
    }

    public function financing()
    {
        return $this->hasOne('App\Financing', 'id', 'd_id');        
    }

    public function images()
    {
        return $this->hasMany('App\Image', 'id', 'd_id');        
    }

    public function options()
    {
        return $this->hasMany('App\VehicleOption','id','d_id');
    }
    
}