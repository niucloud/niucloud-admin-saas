<?php
// +----------------------------------------------------------------------
// | Niucloud-admin 企业快速开发的saas管理平台
// +----------------------------------------------------------------------
// | 官方网址：https://www.niucloud-admin.com
// +----------------------------------------------------------------------
// | niucloud团队 版权所有 开源版本可自由商用
// +----------------------------------------------------------------------
// | Author: Niucloud Team
// +----------------------------------------------------------------------

namespace app\model\sys;

use app\model\BaseModel;
/**
 * 系统设置模型
 * Class SysConfig
 * @package app\model\sys
 */
class SysConfig extends BaseModel
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
    protected $name = 'sys_config';

    // 设置json类型字段
    protected $json = ['value'];

    //设置只读字段
    protected $readonly = ['config_key'];

    // 设置JSON数据返回数组
    protected $jsonAssoc = true;

}
