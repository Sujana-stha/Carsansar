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
            $table->integer('vi_id');
            $table->integer('stock_number');
            $table->integer('company_id');
            $table->integer('kms');
            $table->double('price',10,2);
            $table->enum('vehicle_status',['Used','New']);
            $table->string('trim',200)->nullable();
            $table->string('ad_desc',600)->nullable();
            $table->string('warranty_flag',1);
            $table->string('warranty_desc',100)->nullable();
            $table->string('financing_flag',1);
            $table->string('available_flag',1);
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
