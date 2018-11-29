<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Body extends Model
{
    protected $fillable = ['body_desc','status','created_by','updated_by'];

}
