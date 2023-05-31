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

namespace app\service\admin\sys;

use app\model\sys\SysArea;
use core\base\BaseAdminService;
use think\facade\Cache;

/**
 * 地区服务层
 * Class AreaService
 * @package app\service\admin\sys
 */
class AreaService extends BaseAdminService
{
    public static $cache_tag_name = 'area_cache';
    public function __construct()
    {
        parent::__construct();
        $this->model = new SysArea();
    }

    /**
     * 获取地区信息
     * @param int $pid //上级pid
     * @return mixed
     */
    public function getListByPid(int $pid = 0)
    {

        $cache_name = self::$cache_tag_name.'_pid_'.$pid;
        return cache_remember(
            $cache_name,
            function() use($pid) {
                $list = $this->model->where([['pid', '=', $pid]])->field('id, pid, name, shortname, longitude, latitude, level, sort, status')->select()->toArray();
                return $list;
            },
            [self::$cache_tag_name]
        );
//        return Cache::tag([self::$cache_tag_name])->remember($cache_name,  function() use($pid) {
//            $list = $this->model->where([['pid', '=', $pid]])->field('id, pid, name, shortname, longitude, latitude, level, sort, status')->select()->toArray();
//            return $list;
//        });

    }

    /**
     * 查询地区树列表
     * @param int $level //层级1,2,3
     * @return mixed
     */
    public function getAreaTree(int $level = 3)
    {
        $cache_name = self::$cache_tag_name.'_tree_'.$level;
        return cache_remember(
            $cache_name,
            function() use($level) {
                $list = $this->model->where([['level', '<=', $level]])->field('id, pid, name, shortname, longitude, latitude, level, sort, status')->select()->toArray();
                $tree = list_to_tree($list, 'id', 'pid');
                return $tree;
            },
            [self::$cache_tag_name]
        );
//        return Cache::tag([self::$cache_tag_name])->remember($cache_name,  function() use($level) {
//            $list = $this->model->where([['level', '<=', $level]])->field('id, pid, name, shortname, longitude, latitude, level, sort, status')->select()->toArray();
//            $tree = list_to_tree($list, 'id', 'pid');
//            return $tree;
//        });
    }


}