<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Attribute extends Model
{
    protected $fillable = ['d_id','vi_id','exterior_color_id','interior_color_id','doors','passenger','body_id','created_by'];

    
    public function createdBy()
    {
        return $this->belongsTo('App\User', 'created_by', 'id');
    }
}