<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Enginesize extends Model
{
    protected $fillable = ['enginesize_desc','status','created_by','updated_by'];

    public function createdBy()
    {
        return $this->belongsTo('App\User', 'created_by', 'id');
    }
}
