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

namespace app\service\core\applet;

use app\model\applet\AppletVersion;
use core\base\BaseCoreService;

/**
 * 小程序包发布版本
 */
class CoreAppletVersionService extends BaseCoreService
{

    public function __construct()
    {
        parent::__construct();
        $this->model = new AppletVersion();
    }

    /**
     * 获取版本列表
     * @param array $where
     * @return array
     */
    public function getPage(array $where = [])
    {
        $field = 'id, site_id, type, uid, version, version_num, path, create_time, update_time,desc, config';
        $search_model = $this->model->where($where)->field($field)->order('create_time desc');
        return $this->pageQuery($search_model);
    }

    /**
     * 获取版本信息
     * @param int $id
     * @return array
     */
    public function getInfo(int $id)
    {
        $field = 'id, site_id, type, uid, version, version_num, path, create_time, update_time,desc, config';
        return $this->model->where([[ 'id', '=', $id ]])->field($field)->findOrEmpty()->toArray();
    }


    /**
     * 通过版本号查询版本内容
     * @param string $version
     * @param string $type
     * @return array
     */
    public function getInfoByVersion(string $version, string $type){
        return $this->model->where([['version', '=', $version], ['type', '=', $type]])->findOrEmpty()->toArray();
    }



}