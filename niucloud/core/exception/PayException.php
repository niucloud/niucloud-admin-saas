<?php

namespace core\exception;

use RuntimeException;
use Throwable;

/**
 * 支付错误异常处理类
 */
class PayException extends RuntimeException
{
    public function __construct($message = "", $code = 0, Throwable $previous = null)
    {

        parent::__construct($message, $code, $previous);
    }
}
