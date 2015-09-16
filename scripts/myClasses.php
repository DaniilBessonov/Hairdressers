<?php
class myClasses
{
}

class Person
{
    public $id = null;
    public $name = null;
    public $phone = null;
}

class Client extends Person
{

}

class Hairdresser extends Person
{
    function __construct($id, $name, $surname, $phone, $vkid)
    {
        $this->hairdresser_id = $id;
        $this->name = $name;
        $this->surname = $surname;
        $this->phone = $phone;
        $this->vkid = $vkid;
    }

    public $hairdresser_id = null;
    public $name = null;
    public $surname = null;
    public $phone = null;
    public $vkid = null;
}

class Order
{
    public $hairdresser_id = null;
    public $calc_hairdresser_id = null;
    public $client_name = null;
    public $client_phone = null;
    public $services = null;
    public $hair_length = null;
    public $cprise = null;

    public static function withJSON($json)
    {
        $o = json_decode($json);
        $instance = new self();
        $instance->hairdresser_id = intval(htmlspecialchars($o->hairdresser_id, ENT_QUOTES));
        $instance->calc_hairdresser_id = intval(htmlspecialchars($o->calc_hairdresser_id, ENT_QUOTES));
        //$instance->client_name = trim(htmlspecialchars($o->client_name, ENT_QUOTES, 'cp1251')); //TODO
        $instance->client_name = trim($o->client_name);
        $instance->client_phone = htmlspecialchars($o->client_phone, ENT_QUOTES);
        $instance->hair_length = htmlspecialchars($o->hair_length, ENT_QUOTES);
        $instance->cprise = htmlspecialchars($o->cprice, ENT_QUOTES);
        $instance->services = array();
        foreach ($o->services as $serv) {
            array_push($instance->services, htmlspecialchars($serv, ENT_QUOTES));
        }
        return Order::validateOrder($instance);
    }

    public static function validateOrder($ord)
    {
        if (!is_numeric($ord->hairdresser_id)) throw new ValidateException('Invalid hairdresser ID');
        $name_pattern = '/^[а-яА-ЯёЁa-zA-Z]{1,20}$/u';
        if (preg_match($name_pattern, $ord->client_name) != 1) throw new ValidateException('Invalid client name: ' . $ord->client_name);
        $phone_pattern = '/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/';
        if (preg_match($phone_pattern, $ord->client_phone) != 1) throw new ValidateException('Invalid phone number');
        if (!is_array($ord->services) || count($ord->services) == 0) throw new ValidateException('Invalid services');
        return $ord;
    }
}

class ValidateException extends Exception
{
    function __construct($message)
    {
        $this->msg = $message;
    }

    public $msg = null;
}

class Utils
{
    public static function convertToTranslite($string)
    {
        $converter = array(
            'а' => 'a', 'б' => 'b', 'в' => 'v',
            'г' => 'g', 'д' => 'd', 'е' => 'e',
            'ё' => 'e', 'ж' => 'zh', 'з' => 'z',
            'и' => 'i', 'й' => 'y', 'к' => 'k',
            'л' => 'l', 'м' => 'm', 'н' => 'n',
            'о' => 'o', 'п' => 'p', 'р' => 'r',
            'с' => 's', 'т' => 't', 'у' => 'u',
            'ф' => 'f', 'х' => 'h', 'ц' => 'c',
            'ч' => 'ch', 'ш' => 'sh', 'щ' => 'sch',
            'ь' => '\'', 'ы' => 'y', 'ъ' => '\'',
            'э' => 'e', 'ю' => 'yu', 'я' => 'ya',

            'А' => 'A', 'Б' => 'B', 'В' => 'V',
            'Г' => 'G', 'Д' => 'D', 'Е' => 'E',
            'Ё' => 'E', 'Ж' => 'Zh', 'З' => 'Z',
            'И' => 'I', 'Й' => 'Y', 'К' => 'K',
            'Л' => 'L', 'М' => 'M', 'Н' => 'N',
            'О' => 'O', 'П' => 'P', 'Р' => 'R',
            'С' => 'S', 'Т' => 'T', 'У' => 'U',
            'Ф' => 'F', 'Х' => 'H', 'Ц' => 'C',
            'Ч' => 'Ch', 'Ш' => 'Sh', 'Щ' => 'Sch',
            'Ь' => '\'', 'Ы' => 'Y', 'Ъ' => '\'',
            'Э' => 'E', 'Ю' => 'Yu', 'Я' => 'Ya',
        );
        return strtr($string, $converter);
    }

    public static function checkInBlackList($phone)
    {
        $blackList = array();
        array_push($blackList, '+7 (902) 681-66-86');

        foreach ($blackList as $blPhone) {
            if ($phone == $blPhone) return true;
        }
        return false;
    }
}

?>