<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class VehicleOption extends Model
{
    protected $fillable = ['d_id','vi_id','option_id','status','created_by','created_dt'];
}
