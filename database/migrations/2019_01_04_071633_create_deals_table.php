<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDealsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('deals', function (Blueprint $table) {
            $table->increments('id');
            $table->string('title',200);
            $table->integer('vi_id')->nullable();
            $table->integer('stock_number')->nullable();
            $table->integer('company_id')->nullable();
            $table->integer('kms')->nullable();
            $table->double('price',10,2)->nullable();
            $table->enum('vehicle_status',['Used','New']);
            $table->string('trim',200)->nullable();
            $table->string('ad_desc',600)->nullable();
            $table->tinyInteger('warranty_flag')->default('1');
            $table->string('warranty_desc',100)->nullable();
            $table->tinyInteger('financing_flag')->default('1');
            $table->tinyInteger('available_flag')->default('1');
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
        Schema::dropIfExists('deals');
    }
}
