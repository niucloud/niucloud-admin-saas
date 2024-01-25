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

use app\model\addon\Addon;
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
    protected $json = ['app', 'addon'];

    // 设置JSON数据返回数组
    protected $jsonAssoc = true;

    /**
     * 模型名称
     * @var string
     */
    protected $name = 'site_group';


    /**
     * 关联应用
     * @param $value
     * @param $data
     * @return Addon[]|array|\think\Collection
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     */
    public function getAppNameAttr($value, $data)
    {
        if (empty($data['app']))
            return [];
        return (new Addon())->where([['key', 'in', $data['app']]])->column('title');
    }

    /**
     * 关联插件
     * @param $value
     * @param $data
     * @return array
     */
    public function getAddonNameAttr($value, $data)
    {
        if (empty($data['app']))
            return [];
        return (new Addon())->where([['key', 'in', $data['addon']]])->column('title');
    }

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
