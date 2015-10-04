<?php namespace App\Http\Controllers;

use App\Hairdresser;
use Illuminate\Support\Facades\DB;

class HairdresserController extends Controller
{

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth', ['except' => ['anyPublic']]);
    }

    public function anyAll()
    {
        return Hairdresser::all();
    }

    public function anyAllbycity($city)
    {
        return Hairdresser::where('city_id', '=', $city)->orderBy('rating', 'desc')->get();
    }

    public function anyOnlyactivebycity($city)
    {
        return Hairdresser::whereRaw('status=1 and city_id=' . $city)->orderBy('rating', 'desc')->get();
    }

    // get active hairdressers by city with only public fields
    public function anyPublic($city)
    {
        return DB::select('SELECT id, name, description,svadebnaiy,vechernaiy,ukladka,modelnay,himia,viprimlenie,vosstanovlenie,naraschivanie,okrashivanie,melirovanie,male_modelnay,podmashinku,photos_xs from hairdressers where city_id=? and status=1 order by rating desc',[$city]);
    }

    public function anyOnlynotactivebycity($city)
    {
        return Hairdresser::whereRaw('status=0 and city_id=' . $city)->orderBy('rating', 'desc')->get();
    }

    public function anyGet($id)
    {
        return Hairdresser::find($id);
    }

    public function anyCreate($city)
    {
        $h = new Hairdresser();
        $h->surname = 'Новый';
        $h->name = 'парикмахер';
        $h->city_id = $city;
        $h->photos_xs = '/img/xxs/avatar/obj.id_xxxs.jpg<br>/img/xxs/avatar/obj.id_xxxs.jpg<br>/img/xxs/avatar/obj.id_xxxs.jpg<br>/img/xxs/avatar/obj.id_xxxs.jpg<br>/img/xxs/avatar/obj.id_xxxs.jpg<br>/img/xxs/avatar/obj.id_xxxs.jpg';
        $h->save();
        return $h;
    }

    public function anyUpdate($json)
    {
        $p = json_decode($json);
        $h = Hairdresser::find($p->id);
        $h[$p->type] = ($p->type == 'photos_xs') ? base64_decode($p->content) : $p->content;
        $h->save();
        return $h;
    }

    public function anyRefreshpreview($photo_id)
    {
        DB::statement('SET group_concat_max_len = 1200');
        $r = DB::update(
            'UPDATE hairdressers h
              JOIN
              (SELECT
                 h.id                                 h_id,
                 GROUP_CONCAT(p.url ORDER BY p.order_number SEPARATOR \'<br>\') h_photo_xs
               FROM photos p1
                 JOIN hairdressers h ON h.id = p1.hairdresser_id
                 JOIN photos p ON p.hairdresser_id = h.id AND p.order_number < 6
               WHERE p1.id = ?
               GROUP BY h.id) t
                ON t.h_id = h.id
            SET h.photos_xs = t.h_photo_xs', [$photo_id]);
        DB::commit();
        return $r;
    }


}
