<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateVehicleoptionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('vehicle_options', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('d_id')->nullable();
            $table->integer('vi_id')->nullable();
            $table->integer('option_id')->nullable();
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
        Schema::dropIfExists('vehicleoptions');
    }
}
