<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Option extends Model
{
    protected $fillable = ['d_id','vi_id','option_id','status','created_by','created_dt'];
}
