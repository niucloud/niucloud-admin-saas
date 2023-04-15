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

use app\enum\site\SiteEnum;
use app\model\BaseModel;

/**
 * 站点模型
 * Class Site
 * @package app\model\site
 */
class Site extends BaseModel
{

    protected $type = [
        'expire_time'  =>  'timestamp',
    ];
    /**
     * 数据表主键
     * @var string
     */
    protected $pk = 'site_id';

    /**
     * 模型名称
     * @var string
     */
    protected $name = 'site';


    /**
     * 状态字段转化
     * @param $value
     * @return mixed
     */
    public function getStatusNameAttr($value, $data)
    {
        return SiteEnum::getStatus()[$data['status'] ?? ''] ?? '';
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
            $query->where('site_name|keywords', 'like', '%' . $value . '%');
        }
    }

    /**
     * 站点状态搜索
     * @param $query
     * @param $value
     * @param $data
     */
    public function searchStatusAttr($query, $value, $data)
    {
        if ($value) {
            $query->where('status', '=', $value);
        }
    }

    /**
     * 站点分组搜索
     * @param $query
     * @param $value
     * @param $data
     */
    public function searchGroupIdAttr($query, $value, $data)
    {
        if ($value) {
            $query->where('group_id', '=', $value);
        }
    }

    /**
     * 分组名称
     * @return \think\model\relation\HasOne
     */
    public function groupName()
    {
        return $this->hasOne( SiteGroup::class, 'group_id', 'group_id')->joinType('left')->withField('group_id, group_name')->bind(['group_name' => 'group_name']);
    }





}
