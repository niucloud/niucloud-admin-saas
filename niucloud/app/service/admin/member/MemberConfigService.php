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

namespace app\service\admin\member;

use app\service\core\member\CoreMemberConfigService;
use core\base\BaseAdminService;

/**
 * 会员设置
 * Class MemberConfigService
 * @package app\service\admin\member
 */
class MemberConfigService extends BaseAdminService
{
    /**
     * 获取注册与登录设置
     */
    public function getLoginConfig(){

        return (new CoreMemberConfigService())->getLoginConfig($this->site_id);
    }

    /**
     * 注册登录设置
     * @param $data
     */
    public function setLoginConfig(array $data){
        return (new CoreMemberConfigService())->setLoginConfig($this->site_id, $data);
    }
    /**
     * 获取提现设置
     */
    public function getCashOutConfig(){

        return (new CoreMemberConfigService())->getCashOutConfig($this->site_id);
    }

    /**
     * 提现设置
     * @param $data
     */
    public function setCashOutConfig(array $data){
        return (new CoreMemberConfigService())->setCashOutConfig($this->site_id, $data);
    }

    /**
     * 获取会员设置
     */
    public function getMemberConfig(){
        return (new CoreMemberConfigService())->getMemberConfig($this->site_id);
    }

    /**
     * 会员设置
     * @param $data
     */
    public function setMemberConfig(array $data){
        return (new CoreMemberConfigService())->setMemberConfig($this->site_id, $data);
    }
}