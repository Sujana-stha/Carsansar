<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Model extends Model
{
    protected $fillable = ['model_desc','status','created_by','updated_by'];
}
