<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateFinancingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('financings', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('d_id');
            $table->integer('vi_id');
            $table->string('type',15);
            $table->double('payment',10,2);
            $table->string('payment_type',15);
            $table->double('downpayment',10,2);
            $table->integer('number_of_payment');
            $table->string('source',20);
            $table->string('odometer',20);
            $table->string('description',500)->nullable();
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
        Schema::dropIfExists('financings');
    }
}
