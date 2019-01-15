<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Option extends Model
{
    protected $fillable = ['option_desc','oc_id','status','created_by','updated_by'];

    public function createdBy() {
        return $this->belongsTo('App\User','created_by','id');
    }

    public function ocId() {
        return $this->belongsTo('App\OptionCategory','oc_id','id');
    }
}
