<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class Booking extends Model {

    protected $fillable = ['client_name', 'client_phone', 'hairdresser_id', 'service'/*,'booking_date','execution_date','payment_date','status','comment'*/];

}
