<?php namespace App;


class SmsSender
{
    protected
        $key = '51241b24-e13c-c624-0505-f79f15e38750',
        $testMode = 0,
        $url = 'http://sms.ru/',
        $response = null;

    public function __construct($testMode = 0)
    {
        $this->testMode = $testMode;
    }

    public function send($phone, $text)
    {
        $command = 'sms/send';
        $params = array(
            "api_id" => $this->key,
            "test" => $this->testMode,
            "to" => $phone,
            "text" => $text
        );
        return $this->execute($command, $params);
    }

    private function execute($command, $params)
    {
        $ch = curl_init($this->url . $command);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_TIMEOUT, 30);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $params);
        $body = curl_exec($ch);
        curl_close($ch);

        if ($this->testMode) {
            $m = mail("dabessonov@yandex.ru", "TEST HairdressersNN " . $command, "TEST to phone: " . $params['to'] . " \n\ntext: " . $params['text'] . " \n\nSms.ru Response: " . $body);
            $response = array(
                "isSuccess" => $m,
                "status_id" => 'testMode',
                "sms_id" => 'testMode'
            );
            return $response;
        }
        $lines = explode(PHP_EOL, $body);
        $response = array(
            "isSuccess" => 100 == intval($lines[0]) ? true : false,
            "status_id" => intval($lines[0]),
            "sms_id" => count($lines) > 1 ? $lines[1] : null
        );
        return $response;
    }
}