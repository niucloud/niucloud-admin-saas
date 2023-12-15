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

namespace app\service\admin\applet;

use app\dict\applet\AppletlDict;
use app\dict\sys\FileDict;
use app\model\applet\AppletVersion;
use app\service\core\applet\CoreAppletVersionService;
use app\service\core\upload\CoreUploadService;
use core\base\BaseAdminService;
use Exception;

/**
 * 文章服务层
 * Class ArticleService
 * @package app\service\admin\article
 */
class AppletVersionService extends BaseAdminService
{

    protected $core_applet_version_service;

    public function __construct()
    {
        parent::__construct();
        $this->model = new AppletVersion();
        $this->core_applet_version_service = new CoreAppletVersionService;
    }

    /**
     * 获取列表
     * @param array $where
     * @return array
     */
    public function getPage(array $where = [])
    {
        return $this->core_applet_version_service->getPage($where);
    }

    /**
     * 获取信息
     * @param int $id
     * @return array
     */
    public function getInfo(int $id)
    {
        return $this->core_applet_version_service->getInfo($id);
    }

    /**
     * 添加
     * @param array $data
     * @return true
     */
    public function add(array $data)
    {
        $data['version_num'] = version_to_int($data['version']);//版本号数字
        $data['uid'] = $this->uid;//发布者
        $data['status'] = AppletlDict::OFF;
        $this->model->create($data);
        return true;
    }
    /**
     * 上传小程序包
     * @param $file
     * @return array
     * @throws Exception
     */
    public function upload($file){
        $core_upload_service = new CoreUploadService();
        $type = FileDict::APPLET;
        $dir = '/applet/'.$type.'/version/';
        return $core_upload_service->document($file, $this->site_id, $type, $dir, FileDict::LOCAL);
    }

    /**
     * 设置版本状态
     * @param int $id
     * @param $status
     * @return true
     */
    public function setStatus(int $id, $status){
        $data = array(
            'status' => $status
        );
        $where = array(
            ['id', '=', $id]
        );
        $this->model->where($where)->update($data);
        return true;
    }

    /**
     * 编辑
     * @param int $id
     * @param array $data
     * @return true
     */
    public function edit(int $id, array $data)
    {
        $data['version_num'] = version_to_int($data['version']);//版本号数字
        $data['status'] = AppletlDict::OFF;
        $data['update_time'] = time();
        $this->model->where([['id', '=', $id]])->create($data);
        return true;
    }

    /**
     * 删除
     * @param int $id
     * @return true
     */
    public function del(int $id){
        $this->model->where([['id', '=', $id]])->delete();
        return true;
    }

}