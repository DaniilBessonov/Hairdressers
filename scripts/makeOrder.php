<?php
require_once 'SmsRu.php';
require_once 'myClasses.php';
require_once 'HairdresserStorage.php';


function getOrder()
{
    $req = isset($_POST['order']) ? $_POST['order'] : null;
    return Order::withJSON($req);
}

function init()
{
    $ord = getOrder();
    $hairdressers = new HairdresserStorage();
    if ($hairdressers->checkInBlackList($ord->client_phone)) return array('emailNotification' => false, "smsForClient" => false, "smsForAdministrator" => false, "smsForHairdresser" => false);
    $h_id = ($ord->hairdresser_id != 0) ? $ord->hairdresser_id : $ord->calc_hairdresser_id;
    $haird = $hairdressers->getById($h_id);
    $sc = smsForClient($ord, $haird);
    $sh = smsForHairdresser($ord, $haird);
    $sa = smsForAdministrator($ord, $haird);
    $en = emailNotification($ord, $haird);
    return array('emailNotification' => $en, "smsForClient" => $sc, "smsForAdministrator" => $sa, "smsForHairdresser" => $sh);
}

function emailNotification($ord, $haird)
{
    $ser = '';
    foreach ($ord->services as $serv) {
        $ser .= $serv . '  ';
    }
    $text = "Заказ для мастера #$haird->hairdresser_id: $haird->name $haird->surname \nID в VK: id$haird->vkid\nТелефон мастера: $haird->phone \n\nОт клиента: $ord->client_name \nНеобходимые услуги: $ser \nТелефон клиента: $ord->client_phone\n\nНеобходимо проконтролировать ввыполнение заказа.";

    if ($ord->hairdresser_id == 0) {
        $text = "СВОБОДНЫЙ " . $text;
    }

    return mail("dabessonov@yandex.ru", "HairdressersNN", $text);
}

function smsNotification($phone, $text)
{
    $api = new SmsRu(1); //TODO testMode=1
    $r = $api->send($phone, $text);
    return $r['isSuccess'];
}

function smsForClient($ord, $haird)
{
    $text = "Ваш заказ принят. $haird->name свяжется с Вами в ближайшее время.";
    return smsNotification($ord->client_phone, $text);
}

function smsForAdministrator($ord, $haird)
{
    $admin_phone = '89515575856';
    $ser = $ord->services[0];
    $clName = Utils::convertToTranslite($ord->client_name);
    $hrName = Utils::convertToTranslite($haird->surname);
    $text = "Client: $clName $ord->client_phone. Master: $hrName. Ser: $ser";
    return smsNotification($admin_phone, $text);
}

function smsForHairdresser($ord, $haird)
{
    $text = "Вам заказ от Парикмахер на дом: $ord->client_name тел $ord->client_phone. Пожалуйста, оперативно свяжитесь с клиентом!";
    return smsNotification($haird->phone, $text);
}

try {
    $response = init();
    echo json_encode($response);
} catch (ValidateException $e) {
    echo json_encode(array('validation_error' => $e));
}
?>
