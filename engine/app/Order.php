<?php namespace App;

class Order {
    public $hairdresser_id = null;
    //public $calc_hairdresser_id = null;
    public $client_name = null;
    public $client_phone = null;
    public $services = null;
    public $isCommon = null;
    public $city_id = null;
    //public $hair_length = null;

    public function __construct($json)
    {
        $o = json_decode($json);
        $this->hairdresser_id = intval(htmlspecialchars($o->hairdresser_id, ENT_QUOTES));
        $this->city_id = intval(htmlspecialchars($o->city_id, ENT_QUOTES));
        //$this->calc_hairdresser_id = intval(htmlspecialchars($o->calc_hairdresser_id, ENT_QUOTES));
        //$this->client_name = trim(htmlspecialchars($o->client_name, ENT_QUOTES, 'cp1251')); //TODO
        $this->client_name = trim($o->client_name);
        $this->client_phone = htmlspecialchars($o->client_phone, ENT_QUOTES);
        //$this->hair_length = htmlspecialchars($o->hair_length, ENT_QUOTES);
        //$this->cprise = htmlspecialchars($o->cprice, ENT_QUOTES);
        $this->services = array();
        foreach ($o->services as $serv) {
            array_push($this->services, htmlspecialchars($serv, ENT_QUOTES));
        }
        return $this->validateOrder($this);
    }

    public function validateOrder($ord)
    {
        if (!is_numeric($ord->hairdresser_id)) throw new ValidateException('Invalid hairdresser ID');
        if (!is_numeric($ord->city_id)) throw new ValidateException('Invalid city ID');
        $name_pattern = '/^[а-яА-ЯёЁa-zA-Z]{1,20}$/u';
        if (preg_match($name_pattern, $ord->client_name) != 1) throw new ValidateException('Invalid client name: ' . $ord->client_name);
        $phone_pattern = '/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/';
        if (preg_match($phone_pattern, $ord->client_phone) != 1) throw new ValidateException('Invalid phone number');
        if (!is_array($ord->services) || count($ord->services) == 0) throw new ValidateException('Invalid services');
        return $ord;
    }
}