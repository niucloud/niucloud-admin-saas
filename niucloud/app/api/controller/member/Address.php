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

namespace app\api\controller\member;

use core\base\BaseApiController;
use app\service\api\member\AddressService;


/**
 * 会员收货地址控制器
 * Class Address
 * @package app\api\controller\address
 */
class Address extends BaseApiController
{
   /**
    * 获取会员收货地址列表
    * @return \think\Response
    */
    public function lists(){
        $data = $this->request->params([
             ["type",""]
        ]);
        return success((new AddressService())->getList($data));
    }

    /**
     * 会员收货地址详情
     * @param int $id
     * @return \think\Response
     */
    public function info(int $id){
        return success((new AddressService())->getInfo($id));
    }

    /**
     * 添加会员收货地址
     * @return \think\Response
     */
    public function add(){
        $data = $this->request->params([
             ["name",""],
             ["mobile",""],
             ["province_id",0],
             ["city_id",0],
             ["district_id",0],
             ["address",""],
             ["address_name", ""],
             ["full_address",""],
             ["lng",""],
             ["lat",""],
             ["is_default",0],
             ["type",'']
        ]);
        $this->validate($data, 'app\validate\member\Address.add');
        $id = (new AddressService())->add($data);
        return success('ADD_SUCCESS', ['id' => $id]);
    }

    /**
     * 会员收货地址编辑
     * @param $id  会员收货地址id
     * @return \think\Response
     */
    public function edit($id){
        $data = $this->request->params([
             ["name",""],
             ["mobile",""],
             ["province_id",0],
             ["city_id",0],
             ["district_id",0],
             ["address",""],
             ["address_name", ""],
             ["full_address",""],
             ["lng",""],
             ["lat",""],
             ["is_default",0],
             ["type",'']
        ]);
        $this->validate($data, 'app\validate\member\Address.edit');
        (new AddressService())->edit($id, $data);
        return success('EDIT_SUCCESS');
    }

    /**
     * 会员收货地址删除
     * @param $id  会员收货地址id
     * @return \think\Response
     */
    public function del(int $id){
        (new AddressService())->del($id);
        return success('DELETE_SUCCESS');
    }
}
