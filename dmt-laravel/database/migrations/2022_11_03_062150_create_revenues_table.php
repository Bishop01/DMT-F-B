<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRevenuesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('revenues', function (Blueprint $table) {
            $table->id();
            $table->integer("tickets_sold_app")->length(10);
            $table->integer("tickets_sold_manual")->length(10);
            $table->integer("revenue_app")->length(10);
            $table->integer("revenue_manual")->length(10);
            $table->integer("revenue_total")->length(10);
            $table->string("date", 30);
            //$table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('revenues');
    }
}
