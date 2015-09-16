<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use App\Photo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PhotoController extends Controller
{

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth', ['except' => ['anyGetactiveforcity']]);
    }

    public function anyAll()
    {
        return Photo::all();
    }

    public function anyGet($id)
    {
        return Photo::find($id);
    }

    public function anyAdd($json)
    {
        $p = json_decode($json);
        $ph = new Photo();
        $ph->hairdresser_id = $p->hairdresser_id;
        $ph->url = base64_decode($p->url);
        $lastNumber = Photo::where('hairdresser_id', '=', $p->hairdresser_id)->count();
        $ph->order_number = $lastNumber;
        $ph->save();
        if ($lastNumber < 6) {
            $hc = new HairdresserController();
            $hc->anyRefreshpreview($ph->id);
        }
        return $ph;
    }

    public function anyUpdateorder($json)
    {
        $p = json_decode($json);
        $ph = Photo::find($p->id);
        $ph->order_number = $p->order_number;
        $ph->save();
        return $ph;
    }

    public function anyGetfor($h_id)
    {
        return Photo::where('hairdresser_id', '=', $h_id)->orderBy('order_number')->get();
    }

    public function anyGetactiveforcity($city)
    {
        return DB::table('hairdressers')
            ->where('status', '=', 1)
            ->where('city_id', '=', $city)
            ->join('photos', 'photos.hairdresser_id', '=', 'hairdressers.id')
            ->orderBy('order_number')
            ->select("photos.id", "photos.hairdresser_id", "photos.vk_owner_id", "photos.vk_photo_id", "photos.order_number", "photos.url")
            ->get();
    }

    public function anyGetallforcity($city)
    {
        return DB::table('hairdressers')
            ->where('city_id', '=', $city)
            ->join('photos', 'photos.hairdresser_id', '=', 'hairdressers.id')
            ->orderBy('order_number')
            ->select("photos.id", "photos.hairdresser_id", "photos.vk_owner_id", "photos.vk_photo_id", "photos.order_number", "photos.url")
            ->get();
    }

}
