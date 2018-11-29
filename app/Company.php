<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    protected $fillable = ['company_cd','name','address','email','contact_no','status','created_by','updated_by'];
}
