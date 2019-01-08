<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Make extends Model
{
    protected $fillable = ['make_desc','status','created_by','updated_by'];

    public function createdBy()
    {
        return $this->belongsTo('App\User', 'created_by', 'id');
    }
}
