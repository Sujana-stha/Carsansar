<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Fueltype extends Model
{
    protected $fillable = ['fueltype_desc','status','created_by','updated_by'];
}
