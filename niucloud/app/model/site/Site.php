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

use app\dict\site\SiteDict;
use app\model\addon\Addon;
use core\base\BaseModel;
use think\db\Query;
use think\model\relation\HasOne;

/**
 * 站点模型
 * Class Site
 * @package app\model\site
 */
class Site extends BaseModel
{

    protected $type = [
        'expire_time' => 'timestamp',
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

    protected $json = ['addons'];

    /**
     * 状态字段转化
     * @param $value
     * @param $data
     * @return mixed
     */
    public function getStatusNameAttr($value, $data)
    {
        if (empty($data['status']))
            return '';
        return SiteDict::getStatus()[$data['status']] ?? '';
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
     * 关键字搜索
     * @param $query
     * @param $value
     * @param $data
     */
    public function searchAppAttr($query, $value, $data)
    {
        if ($value) {
            $query->where('app', '=', $value);
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
     * @return HasOne
     */
    public function groupName()
    {
        return $this->hasOne(SiteGroup::class, 'group_id', 'group_id')->joinType('left')->withField('group_id, group_name')->bind(['group_name' => 'group_name']);
    }

    public function addon() {
        return $this->hasOne(Addon::class, 'key', 'app')->bind(['app_name' => 'title']);
    }

    /**
     * 创建时间搜索器
     * @param Query $query
     * @param $value
     * @param $data
     */
    public function searchCreateTimeAttr(Query $query, $value, $data)
    {
        $start_time = empty($value[0]) ? 0 : strtotime($value[0]);
        $end_time = empty($value[1]) ? 0 : strtotime($value[1]);
        if ($start_time > 0 && $end_time > 0) {
            $query->whereBetweenTime('create_time', $start_time, $end_time);
        } else if ($start_time > 0 && $end_time == 0) {
            $query->where([['create_time', '>=', $start_time]]);
        } else if ($start_time == 0 && $end_time > 0) {
            $query->where([['create_time', '<=', $end_time]]);
        }
    }

    /**
     * 到期时间搜索器
     * @param Query $query
     * @param $value
     * @param $data
     */
    public function searchExpireTimeAttr(Query $query, $value, $data)
    {
        $start_time = empty($value[0]) ? 0 : strtotime($value[0]);
        $end_time = empty($value[1]) ? 0 : strtotime($value[1]);
        if ($start_time > 0 && $end_time > 0) {
            $query->whereBetweenTime('expire_time', $start_time, $end_time);
        } else if ($start_time > 0 && $end_time == 0) {
            $query->where([['expire_time', '>=', $start_time]]);
        } else if ($start_time == 0 && $end_time > 0) {
            $query->where([['expire_time', '<=', $end_time]]);
        }
    }


}
