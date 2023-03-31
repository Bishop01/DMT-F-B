<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Carbon\Carbon;

class CreateTransactionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->string('status',20);
            $table->string('date', 50)->default(Carbon::now());
            $table->string('method',20);
            $table->string('user_id');
            $table->unsignedbiginteger('ticket_id');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');;
            $table->foreign('ticket_id')->references('id')->on('tickets');
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
        Schema::dropIfExists('transactions');
    }
}
