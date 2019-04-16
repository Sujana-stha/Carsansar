<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class VehicleInfo extends Model
{
    protected $fillable = ['vin','category_id','year','make_id','model_id','fueltype_id','drive_id','enginesize_id','cylinder','transmission_id','mfg_exterior_color_id','created_by'];
 

    public function categoryId()
    {
        return $this->belongsTo('App\Category', 'category_id', 'id');
    }
    public function makeId()
    {
        return $this->belongsTo('App\Make', 'make_id', 'id');
    }
    public function modelId()
    {
        return $this->belongsTo('App\VehicleModel', 'model_id', 'id');
    }
    public function fueltypeId()
    {
        return $this->belongsTo('App\Fueltype', 'fueltype_id', 'id');
    }
    public function driveId()
    {
        return $this->belongsTo('App\Drive', 'drive_id', 'id');
    }
    public function enginesizeId()
    {
        return $this->belongsTo('App\Enginesize', 'enginesize_id', 'id');
    }
    public function transmissionId()
    {
        return $this->belongsTo('App\Transmission', 'transmission_id', 'id');
    }
    public function mfgexteriorcolorId()
    {
        return $this->belongsTo('App\Color', 'mfg_exterior_color_id', 'id');
    }
    public function createdBy()
    {
        return $this->belongsTo('App\User', 'created_by', 'id');
    }

}