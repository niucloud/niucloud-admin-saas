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

namespace app\validate\site;

use think\Validate;
use app\model\site\Site as SiteModel;

/**
 * 站点验证
 * Class Site
 * @package app\validate\site
 */
class Site extends Validate
{


    protected $rule = [
        'site_name' => 'require|max:20',
        'group_id' => 'require|number',
        'expire_time' => 'date',
        'site_domain' => 'checkSiteDomain'
    ];

    protected $message = [
        'site_name.require' => 'validate_site.site_name_require',
        'site_name.max' => 'validate_site.site_name_max',
        'group_id.require' => 'validate_site.group_id_require',
        'group_id.number' => 'validate_site.group_id_number',
        'expire_time.number' => 'validate_site.expire_time_number',
    ];

    protected $scene = [
        'add' => ['site_name', 'group_id', 'expire_time', 'site_domain'],
        "edit" => ['site_name', 'site_domain']
    ];

    protected function checkSiteDomain($value, $rule, $data = [])
    {
        if (empty($value)) return true;
        $where = [
            ['site_domain', '=', $value]
        ];
        if (isset($data['site_id'])) $where[] = ['site_id', '<>', $data['site_id']];
        return (new SiteModel())->where($where)->count() ? get_lang("validate_site.site_domain_cannot_repeated") : true;
    }
}
