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

namespace app\service\admin\dict;

use app\model\dict\Dict;
use core\base\BaseAdminService;


/**
 * 数据字典服务层
 * Class DictService
 * @package app\service\admin\dict
 */
class DictService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new Dict();
    }

    /**
     * 获取数据字典列表
     * @param array $where
     * @return array
     */
    public function getPage(array $where = [])
    {
        $field = 'id,name,key,memo,create_time,update_time';
        $order = 'id desc';

        $search_model = $this->model->withSearch(["name","key"], $where)->field($field)->order($order);
        $list = $this->pageQuery($search_model);
        return $list;
    }

    /**
     * 获取数据字典信息
     * @param int $id
     * @return array
     */
    public function getInfo(int $id)
    {
        $field = 'id,name,key,dictionary,memo,create_time,update_time';

        $info = $this->model->field($field)->where([['id', '=', $id]])->findOrEmpty()->toArray();
        if($info['dictionary'] == null)
        {
            $info['dictionary'] = [];
        }
        return $info;
    }

    /**
     * 添加数据字典
     * @param array $data
     * @return mixed
     */
    public function add(array $data)
    {

        $res = $this->model->create($data);
        return $res->id;

    }

    /**
     * 数据字典编辑
     * @param int $id
     * @param array $data
     * @return bool
     */
    public function edit(int $id, array $data)
    {
        $data['update_time'] = time();
        $this->model->where([['id', '=', $id]])->update($data);
        return true;
    }

    /**
     * 删除数据字典
     * @param int $id
     * @return bool
     */
    public function del(int $id)
    {
        $res = $this->model->where([['id', '=', $id]])->delete();
        return $res;
    }

    /**
     * 获取全部数据字典
     * @param array $where
     * @return array
     */
    public function getAll()
    {
        $field = 'id,name,key,dictionary,memo,create_time,update_time';
        $list = $this->model->field($field)->select()->toArray();
        return $list;
    }

    public function getKeyInfo($key)
    {
        $field = 'id,name,key,dictionary,memo,create_time,update_time';

        $info = $this->model->field($field)->where([['key', '=', $key]])->findOrEmpty()->toArray();
        if($info['dictionary'] == null)
        {
            $info['dictionary'] = [];
        }
        return $info;
    }


}
