<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBookingsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('bookings', function(Blueprint $table)
		{
			$table->increments('id');
            $table->string('client_name');
            $table->string('client_phone');
            $table->integer('hairdresser_id');
            $table->string('service');
            $table->integer('city_id')->unsigned()->default(95);
            $table->dateTime('booking_date');
            $table->dateTime('execution_date')->nullable();
            $table->dateTime('payment_date')->nullable();
            $table->string('status');
            $table->string('comment', 400)->nullable();
            $table->integer('full_price')->nullable();
            $table->integer('work_price')->nullable();
            $table->integer('reward')->nullable();
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
		Schema::drop('bookings');
	}

}
