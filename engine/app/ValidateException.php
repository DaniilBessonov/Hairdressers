<?php

namespace App;

class ValidateException extends \Exception{
    function __construct($message)
    {
        $this->msg = $message;
    }

    public $msg = null;
}