<?php
// +----------------------------------------------------------------------
// | Niucloud-admin 企业快速开发的多应用管理平台
// +----------------------------------------------------------------------
// | 官方网址：https://www.niucloud.com
// +----------------------------------------------------------------------
// | niucloud团队 版权所有 开源版本可自由商用
// +----------------------------------------------------------------------
// | Author: Niucloud Team
// +----------------------------------------------------------------------

declare (strict_types=1);

namespace core\base;

use think\Validate;

/**
 * 验证器器基类
 * Class BaseValidate
 * @package core\base
 */
class BaseValidate extends Validate
{

    public function __construct()
    {
        parent::__construct();
        $this->parseMsg();
    }

    public function parseMsg(){
        if(!empty($this->message))
        {
            foreach ($this->message as $key => $value)
            {
                if(is_array($value))
                {
                    $this->message[$key] = get_lang($value[0], $value[1]);
                }
            }
        }

    }

}
