<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateHairdressersTable extends Migration
{

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('hairdressers', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('city_id')->unsigned()->default(95);
            $table->boolean('status')->default(0); // 0 - not active  1 - active
            $table->string('name', 15);
            $table->string('surname', 15);
            $table->string('phone', 20);
            $table->integer('vk_id')->unsigned()->nullable();
            $table->string('description', 200)->default('');
            $table->string('refer', 10)->default('Данич');
            $table->smallInteger('rating')->unsigned()->default(0);
            $table->smallInteger('svadebnaiy')->unsigned()->nullable();
            $table->smallInteger('vechernaiy')->unsigned()->nullable();
            $table->smallInteger('ukladka')->unsigned()->nullable();
            $table->smallInteger('modelnay')->unsigned()->nullable();
            $table->smallInteger('himia')->unsigned()->nullable();
            $table->smallInteger('viprimlenie')->unsigned()->nullable();
            $table->smallInteger('vosstanovlenie')->unsigned()->nullable();
            $table->smallInteger('naraschivanie')->unsigned()->nullable();
            $table->smallInteger('okrashivanie')->unsigned()->nullable();
            $table->smallInteger('melirovanie')->unsigned()->nullable();
            $table->smallInteger('male_modelnay')->unsigned()->nullable();
            $table->smallInteger('podmashinku')->unsigned()->nullable();
            $table->string('photos_xs', 400)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('hairdressers');
    }

}
