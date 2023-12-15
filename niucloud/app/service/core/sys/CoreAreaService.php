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
use core\base\BaseCoreService;
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
        return $this->model->where('id', $id)->field('id, pid, name, shortname, longitude, latitude, level, sort, status')->find()->toArray();
    }

    /**
     * 获取地址列表
     * @param int $pid
     * @return array
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     */
    public function getListByPid(int $pid)
    {
        return $this->model->where('pid', $pid)->field('id, pid, name, shortname, longitude, latitude, level, sort, status')->select()->toArray();
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
        return list_to_tree($list);
    }

    /**
     * 通过对应省市区县，地址，返回完整地址
     * @param $province_id
     * @param $city_id
     * @param $district_id
     * @param $address
     * @param string $tag 分隔符
     * @return string
     */
    public function getFullAddress($province_id, $city_id, $district_id, $address, $tag = ' ')
    {
        $province_name = ($this->model->where([['id', '=', $province_id]])->field("name")->findOrEmpty()->toArray())['name'] ?? '';
        $city_name = ($this->model->where([['id', '=', $city_id]])->field("name")->findOrEmpty()->toArray())['name'] ?? '';
        $district_name = ($this->model->where([['id', '=', $district_id]])->field("name")->findOrEmpty()->toArray())['name'] ?? '';
        return $province_name.$tag.$city_name.$tag. $district_name. $tag. $address;
    }
}