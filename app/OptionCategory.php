<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class OptionCategory extends Model
{
    protected $fillable = ['oc_desc','status','created_by','updated_by'];

    public function createdBy()
    {
        return $this->belongsTo('App\User', 'created_by', 'user_id');
    }
    protected $table = 'option_categories';
    protected $primaryKey ='oc_id';
}
