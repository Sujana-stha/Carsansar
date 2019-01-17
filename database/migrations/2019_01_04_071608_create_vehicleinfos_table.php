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
        Schema::create('vehicle_infos', function (Blueprint $table) {
            $table->increments('id');
            $table->string('vin',20)->nullable();
            $table->integer('category_id')->nullable();
            $table->string('year',4)->nullable();
            $table->integer('make_id')->nullable();
            $table->integer('model_id')->nullable();
            $table->integer('fueltype_id')->nullable();
            $table->integer('drive_id')->nullable();
            $table->integer('enginesize_id')->nullable();
            $table->integer('cylinder')->nullable();
            $table->integer('transmission_id')->nullable();
            $table->integer('mfg_exterior_color_id')->nullable();
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
        Schema::dropIfExists('vehicle_infos');
    }
}
