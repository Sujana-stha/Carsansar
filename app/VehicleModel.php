<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class VehicleModel extends Model
{
    protected $fillable = ['model_desc','status','created_by','updated_by'];
    public function createdBy()
    {
        return $this->belongsTo('App\User', 'created_by', 'user_id');
    }
    protected $table = 'vehiclemodels';
}
