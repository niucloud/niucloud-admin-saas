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

namespace app\service\core\member;

use app\enum\pay\TransferEnum;
use app\enum\sys\ConfigKeyEnum;
use app\model\sys\SysConfig;
use app\service\core\BaseCoreService;
use app\service\core\sys\CoreConfigService;
use extend\exception\CommonException;
use think\Model;

/**
 * 会员相关设置
 * Class CoreMemberConfigService
 * @package app\service\core\member
 */
class CoreMemberConfigService extends BaseCoreService
{
    /**
     * 获取注册与登录设置
     * @param $site_id
     */
    public function getLoginConfig(int $site_id){
        $info = (new CoreConfigService())->getConfig($site_id, 'LOGIN')['value'] ?? [];
        $config = [
            'is_username' => $info['is_username'] ?? 1,//是否用户名密码登录
            'is_mobile' => $info['is_mobile'] ?? 0,//是否手机验证码登录
            'is_auth_register' => $info['is_auth_register'] ?? 1,//是否第三方自动注册
            'is_bind_mobile'            => $info['is_bind_mobile'] ?? 0,//是否强制绑定手机
        ];
        return $config;
    }

    /**
     * 注册与登录设置
     * @param $site_id
     * @param $data
     * @return SysConfig|bool|Model
     */
    public function setLoginConfig(int $site_id, array $data){
        $config = [
            'is_username' => $data['is_username'] ?? 1,//是否用户名密码登录
            'is_mobile' => $data['is_mobile'] ?? 0,//是否手机验证码登录
            'is_auth_register' => $data['is_auth_register'] ?? 1,//是否第三方自动注册
            'is_bind_mobile'            => $data['is_bind_mobile'] ?? 0,//是否强制绑定手机
        ];
        (new CoreConfigService())->setConfig($site_id, 'LOGIN', $config);
        return true;
    }



    /**
     * 获取会员提现设置
     * @param int $site_id
     * @return array
     */
    public function getWithdrawConfig(int $site_id){
        $config = (new CoreConfigService())->getConfig($site_id, ConfigKeyEnum::MEMBER_WITHDRAW)['value'] ?? [];
        if(empty($config)){
            $config = [
                'is_open' => 0,//是否启用提现
                'transfer_type' => [],//提现方式
                'min' => '0',//最低提现金额
//            'max'            => '0',//最高提现金额
                'rate'        => '0',//手续费比率

                'is_auto_verify' => '0',  //是否自动审核
                'is_auto_transfer' => '0',  //是否自动转账
            ];
        }
        return $config;
    }

    /**
     * 会员提现配置
     * @param $site_id
     * @param $data
     * @return SysConfig|bool|Model
     */
    public function setWithdrawConfig(int $site_id, array $data){
        //校验转账方式是否合法
        $transfer_type_list = array_keys(TransferEnum::getTransferType());
        if(array_diff(array_diff($data['transfer_type'], $transfer_type_list), $transfer_type_list)) throw new CommonException(302006);
        $config = [
            'is_open' => $data['is_open'],//是否启用提现
            'transfer_type' => $data['transfer_type'] ?? [],//提现方式
            'min' => $data['min'] ?? '',//最低提现金额
            'is_auto_verify' => $data['is_auto_verify'] ?? 0,  //是否自动审核
            'is_auto_transfer' => $data['is_auto_transfer'] ?? 0,  //是否自动转账
//            'max'            => $data['max'] ?? '',//最高提现金额
            'rate'        => $data['rate'] ?? '',//手续费比率
        ];
        (new CoreConfigService())->setConfig($site_id, ConfigKeyEnum::MEMBER_WITHDRAW, $config);
        return true;
    }

}