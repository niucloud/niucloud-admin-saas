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

namespace app\model\applet;

use core\base\BaseModel;
use think\model\relation\HasOne;

/**
 * 小程序包 站点版本模型
 */
class AppletSiteVersion extends BaseModel
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
    protected $name = 'applet_site_version';

    /**
     * 版本主表
     * @return HasOne
     */
    public function appletVersion()
    {
        return $this->hasOne(AppletVersion::class, 'id', 'version_id')->joinType('left')
            ->withField('desc, status, version, version_num, release_version')
            ->bind(['desc', 'status', 'version', 'version_num', 'release_version']);
    }
}
