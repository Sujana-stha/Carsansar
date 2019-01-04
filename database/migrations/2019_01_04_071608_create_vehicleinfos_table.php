<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateVehicleinfosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('vehicleinfos', function (Blueprint $table) {
            $table->increments('id');
            $table->string('vin',20);
            $table->integer('category_id');
            $table->string('year',4);
            $table->integer('make_id');
            $table->integer('model_id');
            $table->integer('fueltype_id');
            $table->integer('drive_id');
            $table->integer('enginesize_id');
            $table->integer('cylinder');
            $table->integer('transmission_id');
            $table->integer('mfg_exterior_color_id');
            $table->tinyInteger('status')->default('1');
            $table->integer('created_by');
            $table->integer('updated_by')->nullable();
            $table->timestamp('created_at');
            $table->timestamp('updated_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('vehicleinfos');
    }
}
