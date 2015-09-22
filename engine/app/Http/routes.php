<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

//Route::get('/', 'WelcomeController@index');
Route::get('/', 'HomeController@index');

Route::any('/auth/register', function(){
    return redirect('/auth/login');
});

//Route::get('home', 'HomeController@index');


Route::get('bookings.{city_id?}', ['middleware' => 'auth', function ($city_id = 95) {
    return view('bookings', ['city_id' => $city_id]);
}])->where('city_id', '[0-9]+');
/*Route::get('bookings', ['middleware' => 'auth', function () {
    return view('bookings');
}]);*/

Route::get('hairdressers.{city_id?}', ['middleware' => 'auth',  function($city_id = 95){
    return view('hairdressers', ['city_id' => $city_id]);
}])->where('city_id', '[0-9]+');
/*Route::get('hairdressers', ['middleware' => 'auth',  function(){
    return view('hairdressers');
}]);*/

Route::get('test-mode', ['middleware' => 'auth', function(){
    return view('test-mode');
}]);

Route::controllers([
	'auth' => 'Auth\AuthController',
	'password' => 'Auth\PasswordController',
]);

Route::controller('booking', 'BookingController');

Route::controller('hairdresser', 'HairdresserController');

Route::controller('photo', 'PhotoController');
