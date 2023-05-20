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

namespace app\model\site;

use core\base\BaseModel;

/**
 * 站点分组模型
 * Class SiteGroup
 * @package app\model\site
 */
class SiteGroup extends BaseModel
{
    /**
     * 数据表主键
     * @var string
     */
    protected $pk = 'group_id';

    // 设置json类型字段
    protected $json = ['group_roles'];

    // 设置JSON数据返回数组
    protected $jsonAssoc = true;

    /**
     * 模型名称
     * @var string
     */
    protected $name = 'site_group';
    /**
     * 关键字搜索
     * @param $query
     * @param $value
     * @param $data
     */
    public function searchKeywordsAttr($query, $value, $data)
    {
        if ($value) {
            $query->where('group_name', 'like', '%' . $value . '%');
        }
    }
}
