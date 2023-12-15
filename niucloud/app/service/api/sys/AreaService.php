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

namespace app\service\api\sys;

use app\model\sys\SysArea;
use app\service\admin\sys\ConfigService;
use core\base\BaseApiService;
use think\db\exception\DataNotFoundException;
use think\db\exception\DbException;
use think\db\exception\ModelNotFoundException;

/**
 * 地区服务层
 * Class AreaService
 * @package app\service\admin\sys
 */
class AreaService extends BaseApiService
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
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     */
    public function getListByPid(int $pid = 0)
    {

        $cache_name = self::$cache_tag_name.'_api_pid_'.$pid;
        return cache_remember(
            $cache_name,
            function() use($pid) {
                return $this->model->where([['pid', '=', $pid]])->field('id, name')->select()->toArray();
            },
            [self::$cache_tag_name]
        );
    }

    /**
     * 查询地区树列表
     * @param int $level //层级1,2,3
     * @return mixed
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     */
    public function getAreaTree(int $level = 3)
    {
        $cache_name = self::$cache_tag_name.'_api_tree_'.$level;
        return cache_remember(
            $cache_name,
            function() use($level) {
                $list = $this->model->where([['level', '<=', $level]])->field('id, pid, name')->select()->toArray();
                return list_to_tree($list);
            },
            [self::$cache_tag_name]
        );
    }

    public function getAreaByAreaCode($id) {
        $cache_name = self::$cache_tag_name.'_api_area_'. $id;
        return cache_remember(
            $cache_name,
            function() use($id) {
                $level = [1 => 'province', 2 => 'city', 3 => 'district'];
                $tree = [];
                $area = $this->model->where([ ['id', '=', $id] ])->field('id,level,pid,name')->findOrEmpty();

                if (!$area->isEmpty()) {
                    $tree[ $level[ $area['level'] ] ] = $area->toArray();

                    while ($area['level'] > 1) {
                        $area = $this->model->where([ ['id', '=', $area['pid'] ] ])->field('id,level,pid,name')->findOrEmpty();
                        $tree[ $level[ $area['level'] ] ] = $area->toArray();
                    }
                }
                return $tree;
            },
            [self::$cache_tag_name]
        );
    }

}
