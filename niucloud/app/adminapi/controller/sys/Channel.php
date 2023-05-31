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

namespace app\adminapi\controller\sys;

use app\dict\common\ChannelDict;
use core\base\BaseAdminController;

class Channel extends BaseAdminController
{

    /**
     * 获取渠道列表
     * @param int $level
     * @return mixed
     */
    public function getChannelType()
    {
        return success(ChannelDict::getType());
    }
}
