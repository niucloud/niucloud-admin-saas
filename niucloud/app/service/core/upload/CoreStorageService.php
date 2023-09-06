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

namespace app\service\core\upload;

use app\dict\sys\StorageDict;
use app\service\core\sys\CoreConfigService;
use core\base\BaseCoreService;

/**
 * 上传服务层
 */
class CoreStorageService extends BaseCoreService
{

    /**
     * 获取当前启用的存储方式以及配置
     * @param int $site_id
     * @return void
     */
    public function getDefaultStorage(int $site_id = 0)
    {
        $storage_list = $this->getStorageConfigList($site_id);
        foreach($storage_list as $k => $v){
            if($v['is_use'] == StorageDict::ON){
                $item_storage = $v['params'] ?? [];
                $item_storage['storage_type'] = $v['storage_type'];
                return $item_storage;
            }
        }
    }

    /**
     * 通过存储方式获取配置
     * @param int $site_id
     * @param string $type
     * @return array|mixed|void
     */
    public function getStorageByType(int $site_id, string $type){
        $storage_list = $this->getStorageConfigList($site_id);
        foreach($storage_list as $k => $v){
            if($k == $type){
                $item_storage = $v['params'] ?? [];
                $item_storage['storage_type'] = $v['storage_type'];
                return $item_storage;
            }
        }

    }
    /**
     * 获取存储配置
     * @param int $site_id
     * @return void
     */
    public function getStorageConfig(int $site_id){
        $info = (new CoreConfigService())->getConfig($site_id, 'STORAGE')['value'] ?? [];
        if(empty($info))
            $info = ['default' => StorageDict::LOCAL];

        return $info;


    }

    /**
     * 获取云存储列表
     * @param int $site_id
     * @return array
     */
    public function getStorageList(int $site_id = 0)
    {
        $config_type = $this->getStorageConfig($site_id);
        $storage_type_list = StorageDict::getType();
        $list = [];
        foreach ($storage_type_list as $k => $v) {
            $data = [];
            $data['storage_type'] = $k;
            $data['is_use'] = $k == $config_type['default'] ? StorageDict::ON : StorageDict::OFF;
            $data['name'] = $v['name'];
            foreach ($v['params'] as $k_param => $v_param) {
                $data['params'][$k_param] = [
                    'name' => $v_param,
                    'value' => $config_type[$k][$k_param] ?? ''
                ];
            }
            $list[] = $data;
        }
        return $list;
    }


    /**
     * 获取配置列表
     * @param int $site_id
     * @return array
     */
    public function getStorageConfigList(int $site_id = 0)
    {
        $config_type = $this->getStorageConfig($site_id);
        $storage_type_list = StorageDict::getType();
        $list = [];
        foreach ($storage_type_list as $k => $v) {
            $data = [];
            $data['storage_type'] = $k;
            $data['is_use'] = $k == $config_type['default'] ? StorageDict::ON : StorageDict::OFF;
            $data['name'] = $v['name'];
            foreach ($v['params'] as $k_param => $v_param) {
                $data['params'][$k_param] = $config_type[$k][$k_param] ?? '';
            }
            $list[] = $data;
        }
        return $list;
    }
}