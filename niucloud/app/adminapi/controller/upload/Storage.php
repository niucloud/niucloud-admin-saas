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

namespace app\adminapi\controller\upload;

use app\dict\sys\StorageDict;
use app\service\admin\upload\StorageConfigService;
use core\base\BaseAdminController;
use core\exception\AdminException;
use think\Response;

class Storage extends BaseAdminController
{

    /**
     * 云存储配置列表
     */
    public function storageList()
    {
        $res = (new StorageConfigService())->getStorageList();
        return success($res);
    }

    /**
     * 存储配置详情
     * @param $storage_type  存储驱动类型
     * @return Response
     */
    public function storageConfig($storage_type)
    {
        $res = (new StorageConfigService())->getStorageConfig($storage_type);
        return success($res);
    }

    /**
     * 存储设置修改
     * @return Response
     */
    public function editStorage($storage_type)
    {
        //参数获取
        $storage_type_list = StorageDict::getType();
        if (!array_key_exists($storage_type, $storage_type_list)) throw new AdminException('OSS_TYPE_NOT_EXIST');
        //数据验证
        $data = [
            ['is_use', 0]
        ];
        foreach ($storage_type_list[$storage_type]['params'] as $k_param => $v_param) {
            $data[] = [$k_param, ''];
        }

        $request_data = $this->request->params($data);
        (new StorageConfigService())->setStorageConfig($storage_type, $request_data);
        return success('SET_SUCCESS');
    }

}
