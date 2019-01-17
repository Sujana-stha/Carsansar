<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class VehicleInfo extends Model
{
    protected $fillable = ['vin','category_id','year','make_id','model_id','fueltype_id','drive_id','enginesize_id','cylinder','transmission_id','mfg_exterior_color_id','created_by'];

    
    public function createdBy()
    {
        return $this->belongsTo('App\User', 'created_by', 'id');
    }
}