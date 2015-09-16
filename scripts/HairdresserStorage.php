<?php
require_once 'myClasses.php';

class HairdresserStorage
{
    private $storage = null;

    public function getStorage()
    {
        return $this->storage;
    }

    function __construct()
    {
        $this->storage = array();
        //alive
        array_push($this->storage, new Hairdresser(9, 'Светлана', 'Чурбанова', 89307111373, 113717588)); //Megafon
        array_push($this->storage, new Hairdresser(10, 'Александра', 'Морозова', 89527715655, 182626074)); //MTC
        array_push($this->storage, new Hairdresser(11, 'Елена', 'Мокеева', 89081536478, 226737129)); //Tele2
        array_push($this->storage, new Hairdresser(12, 'Мария', 'Карягина', 89101002007, 4285023)); //MTC
        array_push($this->storage, new Hairdresser(14, 'Лиза', 'Косенко', 89202585849, 171214804)); //Megafon
        array_push($this->storage, new Hairdresser(15, 'Ирина', 'Шкилева', 89049043689, 57566707)); //Russia //89527842076 = Tele2 //'Шкилева-Струкова'
        array_push($this->storage, new Hairdresser(16, 'Оксана', 'Егорова', 89535620800, 177686605)); //Tele2
        array_push($this->storage, new Hairdresser(17, 'Анна', 'Баграмян', 89527713555, 211383754)); //Tele2
        array_push($this->storage, new Hairdresser(18, 'Ольга', 'Леонтьева', 89101478133, 91089469)); //MTC
        array_push($this->storage, new Hairdresser(19, 'Александра', 'Махалова', 89200211155, 16323368)); //Megafon
        array_push($this->storage, new Hairdresser(20, 'Екатерина', 'Вихрева', 89503425399, 22944210));
        array_push($this->storage, new Hairdresser(21, 'Екатерина', 'Геворгизова', 79027826565, 16676108)); //410 - 48 - 54
        array_push($this->storage, new Hairdresser(22, 'Светлана', 'Ражикова', 89081526114, 16676108)); //410 - 48 - 54
        array_push($this->storage, new Hairdresser(23, 'Екатерина', 'Отвагина', 89040626429, 63913031));
        array_push($this->storage, new Hairdresser(24, 'Яна', 'Колтунова', 89524699377, 181860803));
        array_push($this->storage, new Hairdresser(25, 'Вероника', 'Молчанова', 89101229583, 229969857));
        array_push($this->storage, new Hairdresser(26, 'Нина', 'Бахтина',89087412665, 214761720));
    }

    function getById($id)
    {
        foreach ($this->storage as $haird) {
            if ($haird->hairdresser_id == $id) return $haird;
        }
        return null;
    }

    function checkInBlackList($phone)
    {
        $blackList = array();
        array_push($blackList, '+7 (902) 681-66-86');

        foreach ($blackList as $blPhone) {
            if ($phone == $blPhone) return true;
        }
        return false;
    }
}
