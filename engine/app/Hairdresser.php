<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class Hairdresser extends Model {

    protected $fillable = ['name','surname'];
    protected $guarded  = ['id'];

}
