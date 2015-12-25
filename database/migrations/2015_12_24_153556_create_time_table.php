<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTimeTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('time_table', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('userid');
            $table->integer('credits');
            $table->string('slotid');
            $table->string('courseCode');
            $table->string('nameofthecourse');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('time_table');
    }
}
