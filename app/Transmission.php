<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Transmission extends Model
{
    protected $fillable = ['transmission_desc','status','created_by','updated_by'];
}
