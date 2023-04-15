<?php
namespace extend\exception;

use RuntimeException;
use Throwable;

/**
 * 附件管理错误异常处理类
 * Class AuthException
 * @package extend\exception
 */
class UploadFileException extends RuntimeException
{
    public function __construct($message = "", $code = 0, Throwable $previous = null)
    {

        parent::__construct($message, $code, $previous);
    }
}
