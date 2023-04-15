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

use app\enum\channel\ReplyEnum;
use app\model\BaseModel;

/**
 * 微信回复模型
 * Class WechatReply
 * @package app\model\wechat
 */
class WechatReply extends BaseModel
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
    protected $name = 'wechat_reply';


    /**
     * 菜单类型
     * @param $value
     * @param $data
     * @return string
     */
    public function getContentAttr($value,$data)
    {

        return $data['content_type'] == ReplyEnum::CONTENT_TYPE_TEXT ? $value : json_decode($value, true);
    }

}
