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

namespace app\model\weapp;

use app\dict\sys\CloudDict;
use core\base\BaseModel;

/**
 * 微信小程序模型
 * Class WeappVersion
 * @package app\model\weapp
 */
class WeappVersion extends BaseModel
{

    /**
     * 数据表主键
     * @var string
     */
    protected $pk = 'id';

    /**
     * 模型名称
     * @var string
     */
    protected $name = 'weapp_version';

    public function getStatusNameAttr($value, $data) {
        if (isset($data['status'])) return CloudDict::getAppletUploadSatus($data['status']);
    }
}
