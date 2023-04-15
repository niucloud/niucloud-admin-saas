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

namespace app\service\core\sys;

use app\model\sys\SysArea;
use app\service\core\BaseCoreService;
use think\db\exception\DataNotFoundException;
use think\db\exception\DbException;
use think\db\exception\ModelNotFoundException;

/**
 * 地址服务层
 * Class AreaService
 * @package app\service\core\sys
 */
class CoreAreaService extends BaseCoreService
{

    public function __construct()
    {
        parent::__construct();
        $this->model = new SysArea();
    }

    /**
     * 获取地址信息
     * @param $id
     * @return array
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     */
    public function getInfo($id)
    {
        $info = $this->model->where('id', $id)->field('id, pid, name, shortname, longitude, latitude, level, sort, status')->find()->toArray();
        return $info;
    }

    /**
     * 获取地址列表
     * @param $pid
     * @return array
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     */
    public function getListByPid(int $pid)
    {
        $list = $this->model->where('pid', $pid)->field('id, pid, name, shortname, longitude, latitude, level, sort, status')->select()->toArray();
        return $list;
    }

    /**
     * 获取地址的树形结构
     * @param int $level
     * @return array
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     */
    public function getTree(int $level = 3)
    {
        $list = $this->model->where('level', '<=', $level)->field('id, pid, name, shortname, longitude, latitude, level, sort, status')->select()->toArray();
        $tree = list_to_tree($list, 'id', 'pid', 'child', 0);
        return $tree;
    }
}