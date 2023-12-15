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

namespace app\service\api\member;

use app\model\member\MemberAddress;
use core\base\BaseApiService;


/**
 * 会员收货地址服务层
 * Class AddressService
 * @package app\service\admin\address
 */
class AddressService extends BaseApiService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new MemberAddress();
    }

    /**
     * 获取会员收货地址列表
     * @param array $where
     * @return array
     */
    public function getList(array $where = [])
    {
        $field = 'id,member_id,name,mobile,address,address_name,full_address,is_default,type';
        $order = 'is_default desc, id desc';

        $list = $this->model->where([ ['site_id', '=', $this->site_id],['member_id', '=', $this->member_id ] ])->withSearch(["type"], $where)->field($field)->order($order)->select()->toArray();
        return $list;
    }

    /**
     * 获取会员收货地址信息
     * @param int $id
     * @return array
     */
    public function getInfo(int $id)
    {
        $field = 'id,member_id,name,mobile,province_id,city_id,district_id,address,address_name,full_address,lng,lat,is_default,type';

        $info = $this->model->field($field)->where([ ['id', '=', $id], ['site_id', '=', $this->site_id], ['member_id', '=', $this->member_id ] ])->findOrEmpty()->toArray();
        return $info;
    }

    /**
     * 添加会员收货地址
     * @param array $data
     * @return mixed
     */
    public function add(array $data)
    {
        if ($data['is_default']) {
            $this->model->where([ ['member_id', '=', $this->member_id ], ['type', '=', $data['type']] ])->update(['is_default' => 0]);
        }
        $data['member_id'] = $this->member_id;
        $data['site_id'] = $this->site_id;
        $res = $this->model->create($data);
        return $res->id;
    }

    /**
     * 会员收货地址编辑
     * @param int $id
     * @param array $data
     * @return bool
     */
    public function edit(int $id, array $data)
    {
        if ($data['is_default']) {
            $this->model->where([ ['member_id', '=', $this->member_id ], ['type', '=', $data['type']] ])->update(['is_default' => 0]);
        }
        $this->model->where([ ['id', '=', $id], ['site_id', '=', $this->site_id], ['member_id', '=', $this->member_id ] ])->update($data);
        return true;
    }

    /**
     * 删除会员收货地址
     * @param int $id
     * @return bool
     */
    public function del(int $id)
    {
        $model = $this->model->where([ ['id', '=', $id], ['site_id', '=', $this->site_id], ['member_id', '=', $this->member_id ] ])->find();
        $res = $model->delete();
        return $res;
    }

}
