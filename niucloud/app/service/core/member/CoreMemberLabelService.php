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

use app\model\member\MemberLabel;
use core\base\BaseCoreService;
use think\facade\Cache;

/**
 * 会员标签服务层
 * Class CoreMemberAccountService
 * @package app\service\core\member
 */
class CoreMemberLabelService extends BaseCoreService
{
    protected static $cache_tag_name = 'member_label_cache';
    public function __construct()
    {
        parent::__construct();
        $this->model = new MemberLabel();
    }

    /**
     * 通过标签id获取标签列表
     * @param int $site_id
     * @param array $label_ids
     * @return mixed
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     */
    public function getMemberLabelListByLabelIds(int $site_id, array $label_ids){
        sort($label_ids);
        $cache_name = __METHOD__ . md5(implode("_", $label_ids));
        return cache_remember(
            $cache_name,
            function () use ($site_id, $label_ids) {
                return array_keys_search($this->getAll($site_id), $label_ids, 'label_id');
            },
            self::$cache_tag_name.$site_id
        );
//        return Cache::tag(self::$cache_tag_name.$site_id)->remember($cache_name, function () use ($site_id, $label_ids) {
//            return array_keys_search($this->getAll($site_id), $label_ids, 'label_id');
//        });
    }

    /**
     * 获取全部会员标签
     * @param $site_id
     * @return mixed
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     */
    public function getAll(int $site_id){
        $cache_name = __METHOD__ . $site_id;
        return cache_remember(
            $cache_name,
            function () use ($site_id) {
                $field = 'label_id, label_name';
                return $this->model->where([['site_id', '=', $site_id]])->field($field)->select()->toArray();

            },
            self::$cache_tag_name.$site_id
        );
//        return Cache::tag(self::$cache_tag_name.$site_id)->remember($cache_name, function () use ($site_id) {
//            $field = 'label_id, label_name';
//            return $this->model->where([['site_id', '=', $site_id]])->field($field)->select()->toArray();
//
//        });
    }

    /**
     * 清理站点会员标签缓存
     * @param int $site_id
     * @return true
     */
    public function clearCache(int $site_id){
        Cache::tag(self::$cache_tag_name.$site_id)->clear();
        return true;
    }
}