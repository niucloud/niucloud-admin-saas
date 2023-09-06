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

use app\model\sys\SysConfig;
use core\base\BaseCoreService;
use think\Model;

/**
 * 配置服务层
 * Class BaseService
 * @package app\service
 */
class CoreConfigService extends BaseCoreService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new SysConfig();
    }
    /**
     * 获取配置信息
     * @param int $site_id
     * @param string $key
     * @return array
     */
    public function getConfig(int $site_id, string $key)
    {
        $where = array(
            ['config_key', '=', $key],
            ['site_id', '=', $site_id]
        );
        return $this->model->where($where)->field('id,site_id,config_key,value,status,create_time,update_time')->findOrEmpty()->toArray();
    }

    /**
     * 设置配置
     * @param int $site_id
     * @param string $key
     * @param array $value
     * @return SysConfig|bool|Model
     */
    public function setConfig(int $site_id, string $key, array $value)
    {
        $where = array(
            ['config_key', '=', $key],
            ['site_id', '=', $site_id]
        );
        $data = array(
            'site_id' => $site_id,
            'config_key' => $key,
            'value' => $value,
        );
        $info = $this->getConfig($site_id, $key);
        if(empty($info)){
            $data['create_time'] = time();
            $res = $this->model->create($data);
        }else{
            $data['update_time'] = time();
            $res = $this->model->where($where)->save($data);
        }

        return $res;
    }

    /**
     * 修改设置状态
     * @param int $site_id
     * @param int $status
     * @param string $key
     * @return bool
     */
    public function modifyStatus(int $site_id, int $status, string $key)
    {
        $where = array(
            ['config_key', '=', $key],
            ['site_id', '=', $site_id]
        );
        $data = array(
            'status' => $status,
        );
        return $this->model->where($where)->save($data);
    }
}