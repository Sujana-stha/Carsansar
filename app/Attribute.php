<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Attribute extends Model
{
    protected $fillable = ['d_id','vi_id','option_ids','exterior_color_id','interior_color_id','doors','passenger','fuel_economy','mileage','city_mpg','highway_mpg','body_id','created_by'];

    public function exteriorcolorId()
    {
        return $this->belongsTo('App\Color', 'exterior_color_id', 'id');
    }
    public function interiorcolorId()
    {
        return $this->belongsTo('App\Color', 'interior_color_id', 'id');
    }
    public function bodyId()
    {
        return $this->belongsTo('App\Body', 'body_id', 'id');
    }
    public function createdBy()
    {
        return $this->belongsTo('App\User', 'created_by', 'id');
    }
}