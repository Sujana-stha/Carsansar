<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Color extends Model
{
    protected $fillable = ['color_cd','color_desc','created_by'];

    
    public function createdBy()
    {
        return $this->belongsTo('App\User', 'created_by', 'id');
    }
}
