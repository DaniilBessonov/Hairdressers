<?php namespace App\Http\Controllers;

use App\Booking;
use App\Hairdresser;
use App\Order;
use App\SmsSender;
use App\Utils;
use App\ValidateException;
use Illuminate\Support\Facades\DB;

class BookingController extends Controller
{

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth', ['except' => ['anyAdd']]);
    }

    public function anyAdd($json)
    {
        try {
            $ord = new Order($json);
            if ((new Utils())->checkInBlackList($ord->client_phone)) return json_encode('black');
            $ord->isCommon = $this->isOrderCommon($ord);
            $h = $this->getHairdresserForOrder($ord);
            $this->smsForClient($ord, $h);
            $hn = $this->smsForHairdresser($ord, $h);
            $this->smsForAdministrator($ord, $h, $hn);
            $this->emailNotification($ord, $h, $hn, "dabessonov@yandex.ru");
            //$this->emailNotification($ord, $h, $hn, "archi-doma2@yandex.ru");
            $this->addInCRM($json, $h->id);
            return json_encode('success');
        } catch (ValidateException $e) {
            return json_encode(array('validation_error' => $e));
        }
    }

    private function isOrderCommon($ord)
    {
        return !(isset($ord->hairdresser_id) && $ord->hairdresser_id != 0 && $ord->hairdresser_id != null);
    }

    private function getHairdresserForOrder($ord)
    {
        if (!$ord->isCommon) return Hairdresser::findOrFail($ord->hairdresser_id);
        $serviceFilter = '';
        foreach ($ord->services as $service) {
            $serviceFilter .= ' and ' . $service . ' is not NULL and ' . $service . ' !=0 ';
        }
        $query = 'select * from hairdressers WHERE status=1 and city_id=' . $ord->city_id . $serviceFilter . 'order by rating desc limit 1';
        return DB::select($query)[0];
        //TODO case when neverbody selected!!!
    }

    private function convertServicesToStr($services)
    {
        $result = '';
        foreach ($services as $service) {
            $result .= $service . '  ';
        }
        return $result;
    }

    private function addInCRM($json, $h_id)
    {
        $p = json_decode($json);
        $params = get_object_vars($p);
        $b = new Booking($params);
        $b->booking_date = date('Y-m-d H:i:s');
        $b->status = 'Новый';
        $b->hairdresser_id = $h_id;
        $b->service = $this->convertServicesToStr($p->services);
        $b->save();
        return $b;
    }

    private function smsNotification($phone, $text)
    {
        $api = new SmsSender(0);  //TODO testMode=1
        $r = $api->send($phone, $text);
        return $r['isSuccess'];
    }

    private function smsForClient($ord, $h)
    {
        $text = "Ваш заказ принят. $h->name свяжется с Вами в ближайшее время.";
        return $this->smsNotification($ord->client_phone, $text);
    }

    private function smsForAdministrator($ord, $haird, $isSmsProvideToHairdresser)
    {
        $admin_phone = '89515575856';
        $ser = $ord->services[0];
        $utils = new Utils();
        $clName = $utils->convertToTranslite($ord->client_name);
        $hrName = $utils->convertToTranslite($haird->surname);
        $text = "Client: $clName $ord->client_phone. Master: $hrName. Ser: $ser";
        if (!$isSmsProvideToHairdresser) $text .= ' SMS send FAILED!';
        return $this->smsNotification($admin_phone, $text);
    }

    private function smsForHairdresser($ord, $haird)
    {
        $text = "Вам заказ от Парикмахер на дом: $ord->client_name тел $ord->client_phone. Пожалуйста, оперативно свяжитесь с клиентом!";
        return $this->smsNotification($haird->phone, $text);
    }

    private function emailNotification($ord, $haird, $isSmsProvideToHairdresser, $email)
    {
        $ser = $this->convertServicesToStr($ord->services);
        $text = "Заказ для мастера #$haird->id: $haird->name $haird->surname \nID в VK: id$haird->vk_id\nТелефон мастера: $haird->phone \n\nОт клиента: $ord->client_name \nНеобходимые услуги: $ser \nТелефон клиента: $ord->client_phone\n\nНеобходимо проконтролировать выполнение заказа.";
        if ($ord->isCommon) $text = "СВОБОДНЫЙ " . $text;
        if (!$isSmsProvideToHairdresser) $text .= " \n\n\nSMS парикмахеру НЕ ДОСТАВЛЕНО!!!";
        return mail($email, "HairdressersNN", $text);
    }

    public function anyMarkagreed($json)
    {
        $p = json_decode($json);
        $date = (isset($p->date)) ? $p->date : $this->getNow();
        $b = Booking::find($p->id);
        $b->execution_date = $date;
        $b->status = 'Договорились';
        $b->save();
        return $b;
    }

    public function anyMarkmade($json)
    {
        $p = json_decode($json);
        $date = (isset($p->date)) ? $p->date : $this->getNow();
        $b = Booking::find($p->id);
        $b->execution_date = $date;
        //$b->status = 'Выполнен';
        $b->save();
        return $b;
    }

    public function anyMarkpaid($json)
    {
        $p = json_decode($json);
        $date = (isset($p->date)) ? $p->date : $this->getNow();
        $b = Booking::find($p->id);
        $b->payment_date = $date;
        $b->status = 'Оплачен';
        $b->save();
        return $b;
    }

    public function anyComment($json)
    {
        $p = json_decode($json);
        $b = Booking::find($p->id);
        $b->comment = $p->comment;
        $b->save();
        return $b;
    }

    public function anyStatus($json)
    {
        $p = json_decode($json);
        $b = Booking::find($p->id);
        $b->status = $p->status;
        $b->save();
        return $b;
    }

    public function anyFullprice($json)
    {
        $p = json_decode($json);
        $b = Booking::find($p->id);
        $b->full_price = $p->full_price;
        $b->work_price = $p->full_price;
        $b->reward = $p->full_price * 0.2;
        $b->save();
        return $b;
    }

    public function anyWorkprice($json)
    {
        $p = json_decode($json);
        $b = Booking::find($p->id);
        $b->work_price = $p->work_price;
        $b->reward = $p->work_price * 0.2;
        $b->save();
        return $b;
    }

    public function anyReward($json)
    {
        $p = json_decode($json);
        $b = Booking::find($p->id);
        $b->reward = $p->reward;
        $b->save();
        return $b;
    }

    public function anyAll()
    {
        //return Booking::all();
        return DB::table('bookings')
            ->join('hairdressers', 'hairdressers.id', '=', 'bookings.hairdresser_id')
            ->select('bookings.*', 'hairdressers.name', 'hairdressers.surname')
            ->get();
    }

    public function anyAllbycity($city)
    {
        return DB::select('select b.*, h.name, h.surname from bookings b join hairdressers h on h.id=b.hairdresser_id WHERE b.city_id=? order by b.id DESC', [$city]);
    }

    public function anyGet($id)
    {
        return Booking::find($id);
    }

    public function anyOnlyactive()
    {
        return Booking::whereRaw('status in ("Новый","Договорились","Выполнен")')->get();
    }

    public function anyOnlyactivebycity($city)
    {
        return DB::select('select b.*, h.name, h.surname from bookings b join hairdressers h on h.id=b.hairdresser_id WHERE b.status in ("Новый","Договорились","Выполнен") and b.city_id=? order by b.id DESC', [$city]);
    }

    public function anyOnlynotactive()
    {
        return Booking::whereRaw('status in ("Оплачен","Продолбан","Пустой","Дубликат")')->get();
    }

    public function anyOnlynotactivebycity($city)
    {
        return DB::select('select b.*, h.name, h.surname from bookings b join hairdressers h on h.id=b.hairdresser_id WHERE b.status in ("Оплачен","Продолбан","Пустой","Дубликат") and b.city_id=? order by b.id DESC', [$city]);
    }

    public function anyOnlypaidbycity($city)
    {
        return DB::select('select b.*, h.name, h.surname from bookings b join hairdressers h on h.id=b.hairdresser_id WHERE b.status in ("Оплачен") and b.city_id=? order by b.id DESC', [$city]);
    }

    private function getNow()
    {
        return date('Y-m-d H:i:s');
    }

}
