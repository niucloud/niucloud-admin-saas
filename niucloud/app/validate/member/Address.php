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

namespace app\validate\member;

use core\base\BaseValidate;
/**
 * 会员收货地址验证器
 * Class Address
 * @package addon\app\validate\member
 */
class Address extends BaseValidate
{

       protected $rule = [
            'name' => 'require',
            'mobile' => 'require',
            'province_id' => 'require',
            'city_id' => 'require',
            'district_id' => 'require',
            'address' => 'require',
            'full_address' => 'require',
            'type' => 'require',
        ];

       protected $message = [
            'name.require' => ['common_validate.require', ['name']],
            'mobile.require' => ['common_validate.require', ['mobile']],
            'address.require' => ['common_validate.require', ['address']],
            'full_address.require' => ['common_validate.require', ['full_address']],
            'type.require' => ['common_validate.require', ['type']],
        ];

       protected $scene = [
            "add" => ['name', 'mobile', 'address', 'full_address', 'lng', 'lat', 'type'],
            "edit" => ['name', 'mobile', 'address', 'full_address', 'lng', 'lat', 'type']
        ];

}
