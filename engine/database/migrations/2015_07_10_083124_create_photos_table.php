<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePhotosTable extends Migration
{

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('photos', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('hairdresser_id')->unsigned();
            $table->integer('vk_owner_id')->nullable();
            $table->integer('vk_photo_id')->unsigned()->nullable();
            $table->integer('order_number')->unsigned();
            $table->string('url', 70)->nullable();
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
        Schema::drop('photos');
    }

}
