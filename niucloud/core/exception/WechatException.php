<?php

namespace core\exception;

use RuntimeException;
use Throwable;

/**
 * 微信错误异常处理类
 */
class WechatException extends RuntimeException
{
    public function __construct($message = "", $code = 0, Throwable $previous = null)
    {

        parent::__construct($message, $code, $previous);
    }
}
