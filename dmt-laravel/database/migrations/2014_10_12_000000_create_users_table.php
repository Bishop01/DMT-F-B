<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Carbon\Carbon;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->string('id',20)->primary();
            $table->string('name');
            $table->string('password',70);
            $table->string('email',30);
            $table->string('phone',20);
            $table->string('nid',20)->nullable();
            $table->string('dob',30);
            $table->integer('wallet')->length(5)->default(0);
            $table->string('profilePic',50)->nullable();
            $table->integer('role')->length(5)->default(0);
            $table->string('resettoken',50)->nullable();
            $table->string('registrationDate',50)->default(Carbon::now());
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
        Schema::dropIfExists('users');
    }
}
