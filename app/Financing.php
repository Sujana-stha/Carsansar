<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Financing extends Model
{
    protected $fillable = ['d_id','vi_id','type','payment','payment_type','downpayment','number_of_payment','source','odometer','description','created_by'];

    
    public function createdBy()
    {
        return $this->belongsTo('App\User', 'created_by', 'id');
    }
}