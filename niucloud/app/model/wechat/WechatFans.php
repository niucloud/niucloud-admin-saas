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

namespace app\model\wechat;

use app\model\BaseModel;

/**
 * 微信粉丝模型
 * Class WechatFans
 * @package app\model\wechat
 */
class WechatFans extends BaseModel
{

    /**
     * 数据表主键
     * @var string
     */
    protected $pk = 'fans_id';

    /**
     * 模型名称
     * @var string
     */
    protected $name = 'wechat_fans';



}
